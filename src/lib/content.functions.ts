import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import { createHmac, timingSafeEqual } from "crypto";
import { z } from "zod";
import type { Database } from "@/integrations/supabase/types";

export type Partner = { id: string; name: string; logo_url: string | null; cities: string[]; focus: string | null };
export type Post = { id: string; url: string; title: string; tag: string | null; image_url: string | null };

function publicClient() {
  const key = process.env["SUPABASE_PUBLISHABLE_KEY"]!;
  return createClient<Database>(process.env["SUPABASE_URL"]!, key, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: {
      fetch: (input, init) => {
        const h = new Headers(init?.headers);
        if (key.startsWith("sb_") && h.get("Authorization") === `Bearer ${key}`) h.delete("Authorization");
        h.set("apikey", key);
        return fetch(input, { ...init, headers: h });
      },
    },
  });
}

const mockPartners: Partner[] = [
  {
    id: "1",
    name: "MRV Engenharia",
    logo_url: null,
    cities: ["São Paulo", "Campinas"],
    focus: "Empreendimentos residenciais de médio a alto padrão",
  },
  {
    id: "2",
    name: "Plano&Plano",
    logo_url: null,
    cities: ["São Paulo"],
    focus: "Projetos inovadores com design diferenciado",
  },
  {
    id: "3",
    name: "Cury Construtora",
    logo_url: null,
    cities: ["Campinas", "Rio Claro"],
    focus: "Construção de qualidade com valores acessíveis",
  },
];

const mockPosts: Post[] = [
  {
    id: "1",
    url: "https://instagram.com/vibe.broker",
    title: "Como calcular sua capacidade real de compra",
    tag: "Educação",
    image_url: null,
  },
  {
    id: "2",
    url: "https://instagram.com/vibe.broker",
    title: "MCMV: seus direitos e como aproveitar melhor",
    tag: "Dicas",
    image_url: null,
  },
];

export const getSiteContent = createServerFn({ method: "GET" }).handler(async () => {
  // If env vars are not defined, return mock data for testing
  if (!process.env["SUPABASE_URL"] || !process.env["SUPABASE_PUBLISHABLE_KEY"]) {
    console.warn("[getSiteContent] Using mock data - Supabase not configured");
    return { partners: mockPartners, posts: mockPosts };
  }

  try {
    const sb = publicClient();
    const [p, a] = await Promise.all([
      sb.from("partners").select("id,name,logo_url,cities,focus").order("created_at"),
      sb.from("instagram_posts").select("id,url,title,tag,image_url").order("created_at"),
    ]);
    return { partners: (p.data ?? []) as Partner[], posts: (a.data ?? []) as Post[] };
  } catch (error) {
    console.error("[getSiteContent] Error fetching from Supabase:", error);
    // Fall back to mock data on error
    return { partners: mockPartners, posts: mockPosts };
  }
});

// ---- Admin session (signed token, verified on every write) ----
const sign = (payload: string) => createHmac("sha256", process.env["ADMIN_SESSION_SECRET"]!).update(payload).digest("hex");

function verifyToken(token: string) {
  const [exp, sig] = token.split(".");
  if (!exp || !sig || Number(exp) < Date.now()) throw new Error("Sessão expirada. Entre novamente.");
  const a = Buffer.from(sig);
  const b = Buffer.from(sign(exp));
  if (a.length !== b.length || !timingSafeEqual(a, b)) throw new Error("Sessão inválida. Entre novamente.");
}

export const adminLogin = createServerFn({ method: "POST" })
  .inputValidator((d) => z.object({ username: z.string().max(100), password: z.string().max(200) }).parse(d))
  .handler(async ({ data }) => {
    const ok = data.username === "admin" && data.password === process.env["ADMIN_PASSWORD"];
    if (!ok) return { ok: false as const };
    const exp = String(Date.now() + 1000 * 60 * 60 * 12);
    return { ok: true as const, token: `${exp}.${sign(exp)}` };
  });

const url = z.string().trim().url().max(500);
const optUrl = z.union([url, z.literal("")]).optional();
const partnerInput = z.object({
  token: z.string(),
  id: z.string().uuid().optional(),
  name: z.string().trim().min(1).max(100),
  logo_url: optUrl,
  cities: z.array(z.string().trim().min(1).max(60)).max(30),
  focus: z.string().trim().max(300).optional(),
});
const postInput = z.object({
  token: z.string(),
  id: z.string().uuid().optional(),
  url,
  title: z.string().trim().min(1).max(200),
  tag: z.string().trim().max(60).optional(),
  image_url: optUrl,
});

const admin = async () => (await import("@/integrations/supabase/client.server")).supabaseAdmin;

export const savePartner = createServerFn({ method: "POST" })
  .inputValidator((d) => partnerInput.parse(d))
  .handler(async ({ data }) => {
    verifyToken(data.token);
    const row = { name: data.name, logo_url: data.logo_url || null, cities: data.cities, focus: data.focus || null };
    const sb = await admin();
    const { error } = data.id ? await sb.from("partners").update(row).eq("id", data.id) : await sb.from("partners").insert(row);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const savePost = createServerFn({ method: "POST" })
  .inputValidator((d) => postInput.parse(d))
  .handler(async ({ data }) => {
    verifyToken(data.token);
    const row = { url: data.url, title: data.title, tag: data.tag || null, image_url: data.image_url || null };
    const sb = await admin();
    const { error } = data.id ? await sb.from("instagram_posts").update(row).eq("id", data.id) : await sb.from("instagram_posts").insert(row);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const deleteItem = createServerFn({ method: "POST" })
  .inputValidator((d) => z.object({ token: z.string(), table: z.enum(["partners", "instagram_posts"]), id: z.string().uuid() }).parse(d))
  .handler(async ({ data }) => {
    verifyToken(data.token);
    const { error } = await (await admin()).from(data.table).delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });
