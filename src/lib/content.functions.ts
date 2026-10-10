import { z } from "zod";

export type Partner = { id: string; name: string; logo_url: string | null; cities: string[]; focus: string | null };
export type Post = { id: string; url: string; title: string; tag: string | null; image_url: string | null };

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

export async function getSiteContent() {
  return { partners: mockPartners, posts: mockPosts };
}
