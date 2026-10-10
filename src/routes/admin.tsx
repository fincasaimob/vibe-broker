import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { LogOut, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { adminLogin, deleteItem, getSiteContent, savePartner, savePost, type Partner, type Post } from "@/lib/content.functions";

export const Route = createFileRoute("/admin")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Admin — Vibe Broker" },
      { name: "description", content: "Painel administrativo da Vibe Broker." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Admin — Vibe Broker" },
      { property: "og:description", content: "Painel administrativo da Vibe Broker." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AdminPage,
});

const KEY = "vibe-admin-token";

function AdminPage() {
  const [token, setToken] = useState<string | null>(null);
  useEffect(() => setToken(sessionStorage.getItem(KEY)), []);
  if (!token) return <Login onLogin={(t) => { sessionStorage.setItem(KEY, t); setToken(t); }} />;
  return <Dashboard token={token} onLogout={() => { sessionStorage.removeItem(KEY); setToken(null); }} />;
}

function Login({ onLogin }: { onLogin: (t: string) => void }) {
  const login = useServerFn(adminLogin);
  const [u, setU] = useState("");
  const [p, setP] = useState("");
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);
  return (
    <main className="flex min-h-screen items-center justify-center bg-primary px-4 text-primary-foreground">
      <form className="w-full max-w-sm space-y-4 border border-primary-foreground/15 p-8" onSubmit={async (e) => {
        e.preventDefault(); setBusy(true); setErr("");
        try { const r = await login({ data: { username: u, password: p } }); r.ok ? onLogin(r.token) : setErr("Usuário ou senha incorretos."); }
        catch { setErr("Erro ao entrar. Tente novamente."); } finally { setBusy(false); }
      }}>
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-copper-soft">Vibe Broker</p>
        <h1 className="text-3xl font-semibold">Painel admin</h1>
        <Input aria-label="Usuário" placeholder="Usuário" value={u} onChange={(e) => setU(e.target.value)} className="h-11 border-primary-foreground/20 bg-primary-foreground/5" />
        <Input aria-label="Senha" type="password" placeholder="Senha" value={p} onChange={(e) => setP(e.target.value)} className="h-11 border-primary-foreground/20 bg-primary-foreground/5" />
        {err && <p className="text-sm text-copper-soft">{err}</p>}
        <Button type="submit" variant="copper" className="h-11 w-full" disabled={busy}>{busy ? "Entrando..." : "Entrar"}</Button>
        <Link to="/" className="block text-center text-xs text-primary-foreground/50">Voltar ao site</Link>
      </form>
    </main>
  );
}

function Dashboard({ token, onLogout }: { token: string; onLogout: () => void }) {
  const [tab, setTab] = useState<"partners" | "posts">("partners");
  const fetchContent = useServerFn(getSiteContent);
  const q = useQuery({ queryKey: ["site-content"], queryFn: () => fetchContent() });
  return (
    <main className="min-h-screen bg-surface">
      <header className="bg-primary text-primary-foreground">
        <div className="section-shell flex h-16 items-center justify-between">
          <span className="font-display text-lg">Vibe Broker · Admin</span>
          <div className="flex items-center gap-2">
            <Link to="/" className="text-sm text-primary-foreground/70">Ver site</Link>
            <Button variant="ghost" size="sm" className="text-primary-foreground" onClick={onLogout}><LogOut /> Sair</Button>
          </div>
        </div>
      </header>
      <div className="section-shell py-8">
        <nav className="mb-6 flex gap-2">
          <Button variant={tab === "partners" ? "default" : "outline"} onClick={() => setTab("partners")}>Gerenciar Parceiros</Button>
          <Button variant={tab === "posts" ? "default" : "outline"} onClick={() => setTab("posts")}>Gerenciar Posts Instagram</Button>
        </nav>
        {q.isLoading ? <p className="text-muted-foreground">Carregando...</p> : q.error ? <p className="text-destructive">Erro ao carregar dados.</p> :
          tab === "partners" ? <Partners token={token} items={q.data?.partners ?? []} onAuthError={onLogout} /> : <Posts token={token} items={q.data?.posts ?? []} onAuthError={onLogout} />}
      </div>
    </main>
  );
}

function useActions(onAuthError: () => void) {
  const qc = useQueryClient();
  const [err, setErr] = useState("");
  const run = async (fn: () => Promise<unknown>) => {
    setErr("");
    try { await fn(); await qc.invalidateQueries({ queryKey: ["site-content"] }); return true; }
    catch (e) { const m = e instanceof Error ? e.message : "Erro"; if (m.includes("Sessão")) onAuthError(); setErr(m.startsWith("[") ? "Verifique os campos (URLs precisam começar com https://)." : m); return false; }
  };
  return { err, run };
}

const emptyPartner = { name: "", logo_url: "", cities: "", focus: "" };

function Partners({ token, items, onAuthError }: { token: string; items: Partner[]; onAuthError: () => void }) {
  const save = useServerFn(savePartner);
  const del = useServerFn(deleteItem);
  const { err, run } = useActions(onAuthError);
  const [editId, setEditId] = useState<string | undefined>();
  const [f, setF] = useState(emptyPartner);
  const reset = () => { setEditId(undefined); setF(emptyPartner); };
  return (
    <div className="grid gap-8 lg:grid-cols-[380px_1fr]">
      <form className="space-y-3 bg-card p-6" onSubmit={async (e) => {
        e.preventDefault();
        const ok = await run(() => save({ data: { token, id: editId, name: f.name, logo_url: f.logo_url, focus: f.focus, cities: f.cities.split(",").map((c) => c.trim()).filter(Boolean) } }));
        if (ok) reset();
      }}>
        <h2 className="text-xl font-semibold">{editId ? "Editar parceiro" : "Adicionar parceiro"}</h2>
        <Input required placeholder="Nome da incorporadora" value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} />
        <Input placeholder="URL do logo (https://...)" value={f.logo_url} onChange={(e) => setF({ ...f, logo_url: e.target.value })} />
        <Input placeholder="Cidades (separadas por vírgula)" value={f.cities} onChange={(e) => setF({ ...f, cities: e.target.value })} />
        <Input placeholder="Descrição curta (opcional)" value={f.focus} onChange={(e) => setF({ ...f, focus: e.target.value })} />
        {err && <p className="text-sm text-destructive">{err}</p>}
        <div className="flex gap-2"><Button type="submit" variant="copper">{editId ? "Salvar" : "Adicionar"}</Button>{editId && <Button type="button" variant="outline" onClick={reset}>Cancelar</Button>}</div>
      </form>
      <ul className="grid gap-px bg-border">
        {items.length === 0 && <li className="bg-card p-6 text-muted-foreground">Nenhum parceiro cadastrado.</li>}
        {items.map((p) => (
          <li key={p.id} className="flex items-center gap-4 bg-card p-4">
            {p.logo_url ? <img src={p.logo_url} alt="" className="size-12 object-contain" /> : <div className="size-12 bg-secondary" />}
            <div className="min-w-0 flex-1"><p className="font-semibold">{p.name}</p><p className="truncate text-xs text-muted-foreground">{p.cities.join(" • ") || "Sem cidades"}</p></div>
            <Button size="icon" variant="outline" aria-label="Editar" onClick={() => { setEditId(p.id); setF({ name: p.name, logo_url: p.logo_url ?? "", cities: p.cities.join(", "), focus: p.focus ?? "" }); }}><Pencil /></Button>
            <Button size="icon" variant="outline" aria-label="Deletar" onClick={() => confirm(`Deletar ${p.name}?`) && run(() => del({ data: { token, table: "partners", id: p.id } }))}><Trash2 /></Button>
          </li>
        ))}
      </ul>
    </div>
  );
}

const emptyPost = { url: "", title: "", tag: "", image_url: "" };

function Posts({ token, items, onAuthError }: { token: string; items: Post[]; onAuthError: () => void }) {
  const save = useServerFn(savePost);
  const del = useServerFn(deleteItem);
  const { err, run } = useActions(onAuthError);
  const [editId, setEditId] = useState<string | undefined>();
  const [f, setF] = useState(emptyPost);
  const reset = () => { setEditId(undefined); setF(emptyPost); };
  return (
    <div className="grid gap-8 lg:grid-cols-[380px_1fr]">
      <form className="space-y-3 bg-card p-6" onSubmit={async (e) => {
        e.preventDefault();
        const ok = await run(() => save({ data: { token, id: editId, ...f } }));
        if (ok) reset();
      }}>
        <h2 className="text-xl font-semibold">{editId ? "Editar post" : "Adicionar post"}</h2>
        <Input required placeholder="URL do post do Instagram" value={f.url} onChange={(e) => setF({ ...f, url: e.target.value })} />
        <Input required placeholder="Título / descrição breve" value={f.title} onChange={(e) => setF({ ...f, title: e.target.value })} />
        <Input placeholder="Tema (ex: Crédito imobiliário)" value={f.tag} onChange={(e) => setF({ ...f, tag: e.target.value })} />
        <Input placeholder="URL da imagem de capa (opcional)" value={f.image_url} onChange={(e) => setF({ ...f, image_url: e.target.value })} />
        {err && <p className="text-sm text-destructive">{err}</p>}
        <div className="flex gap-2"><Button type="submit" variant="copper">{editId ? "Salvar" : "Adicionar"}</Button>{editId && <Button type="button" variant="outline" onClick={reset}>Cancelar</Button>}</div>
      </form>
      <ul className="grid gap-px bg-border">
        {items.length === 0 && <li className="bg-card p-6 text-muted-foreground">Nenhum post cadastrado.</li>}
        {items.map((p) => (
          <li key={p.id} className="flex items-center gap-4 bg-card p-4">
            <div className="min-w-0 flex-1"><p className="font-semibold">{p.title}</p><a href={p.url} target="_blank" rel="noreferrer" className="block truncate text-xs text-copper">{p.url}</a></div>
            <Button size="icon" variant="outline" aria-label="Editar" onClick={() => { setEditId(p.id); setF({ url: p.url, title: p.title, tag: p.tag ?? "", image_url: p.image_url ?? "" }); }}><Pencil /></Button>
            <Button size="icon" variant="outline" aria-label="Deletar" onClick={() => confirm("Deletar este post?") && run(() => del({ data: { token, table: "instagram_posts", id: p.id } }))}><Trash2 /></Button>
          </li>
        ))}
      </ul>
    </div>
  );
}
