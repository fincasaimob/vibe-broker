import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { getSiteContent } from "@/lib/content.functions";
import {
  ArrowDownRight,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Building2,
  Calculator,
  Check,
  Eye,
  Handshake,
  Instagram,
  KeyRound,
  Menu,
  MessageCircle,
  Search,
  ShieldCheck,
  Sparkles,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import heroImage from "@/assets/vibe-hero.jpg";
import logoLockup from "@/assets/vibe-logo-lockup.png.asset.json";
import logoFull from "@/assets/vibe-logo-full.png.asset.json";
import symbol from "@/assets/vibe-symbol.png.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Vibe Broker — Inteligência imobiliária em movimento" },
      { name: "description", content: "Cinco visões, uma direção. Consultoria independente para encontrar, financiar e conquistar seu imóvel pelo MCMV." },
      { property: "og:title", content: "Vibe Broker — Cinco visões. Uma direção." },
      { property: "og:description", content: "Inteligência imobiliária para transformar planos em patrimônio." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  loader: ({ context }) => context.queryClient.ensureQueryData(contentQuery),
  component: Index,
  errorComponent: () => <div className="p-10 text-center">Não foi possível carregar a página.</div>,
  notFoundComponent: () => <div className="p-10 text-center">Página não encontrada.</div>,
});

const contentQuery = queryOptions({ queryKey: ["site-content"], queryFn: () => getSiteContent() });

const visions = [
  { n: "01", icon: Calculator, title: "Crédito Inteligente", text: "Análise rigorosa de renda, documentação e possibilidades reais. Sem simulações falsas, só soluções genuínas." },
  { n: "02", icon: Eye, title: "Transparência Total", text: "Sem enrolação. Você sabe exatamente onde está em cada etapa do processo." },
  { n: "03", icon: KeyRound, title: "Acesso Real", text: "Financiamento acessível para quem realmente precisa. MCMV, FGTS, subsídios — a gente conhece todas as portas." },
  { n: "04", icon: Handshake, title: "Suporte Completo", text: "Do primeiro contato até as chaves na mão. Visitas, comparações, documentação, pós-venda. A gente está com você." },
  { n: "05", icon: ShieldCheck, title: "Segurança Estratégica", text: "Escolhas que protegem seu investimento. Análise de mercado, precificação justa, contratos blindados." },
];
const navItems = [["Sobre", "sobre"], ["Serviços", "serviços"], ["Parceiros", "parceiros"], ["Conteúdo", "conteúdo"], ["5 Visões", "visões"]];

function Logo({ light = false }: { light?: boolean }) {
  return (
    <a href="#inicio" className={`inline-block ${light ? "text-primary-foreground" : "text-primary"}`} aria-label="Vibe Broker — início">
      <img src={logoLockup.url} alt="Vibe Broker — Inteligência Imobiliária" width={371} height={120} className="h-14 w-auto md:h-20" />
    </a>
  );
}

function Index() {
  const { data: { partners, posts: articles } } = useSuspenseQuery(contentQuery);
  const developers = ["Todos", ...partners.map((p) => p.name)];
  const cities = ["Todas", ...Array.from(new Set(partners.flatMap((p) => p.cities)))];
  const [menuOpen, setMenuOpen] = useState(false);
  const [filter, setFilter] = useState("Todos");
  const [city, setCity] = useState("Todas");
  const [article, setArticle] = useState(0);
  const [sent, setSent] = useState(false);
  const shownPartners = partners.filter((p) => (filter === "Todos" || p.name === filter) && (city === "Todas" || p.cities.includes(city)));
  const currentArticle = articles[article] ?? articles[0];


  return (
    <main className="min-h-screen bg-background">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-primary-foreground/15 bg-primary/90 backdrop-blur-md">
        <div className="section-shell flex h-20 items-center justify-between md:h-28">
          <Logo light />
          <nav className="hidden items-center gap-8 text-sm text-primary-foreground/80 lg:flex" aria-label="Navegação principal">
            {navItems.map(([label, id]) => <a key={id} href={`#${id}`} className="transition-colors hover:text-primary-foreground">{label}</a>)}
          </nav>
          <Button asChild variant="copper" className="hidden lg:inline-flex"><a href="#contato">Falar com um especialista <ArrowUpRight /></a></Button>
          <Button variant="ghost" size="icon" className="text-primary-foreground lg:hidden" onClick={() => setMenuOpen(!menuOpen)} aria-label="Abrir menu">{menuOpen ? <X /> : <Menu />}</Button>
        </div>
        {menuOpen && <nav className="section-shell mb-4 grid gap-1 border border-primary-foreground/15 bg-primary p-3 lg:hidden">{[...navItems, ["Contato", "contato"]].map(([label, id]) => <a key={id} onClick={() => setMenuOpen(false)} href={`#${id}`} className="px-3 py-3 text-sm text-primary-foreground">{label}</a>)}</nav>}
      </header>

      <section id="inicio" className="relative min-h-[760px] bg-primary text-primary-foreground">
        <img src={heroImage} alt="Edifícios residenciais contemporâneos iluminados pelo entardecer" width={1536} height={1024} className="absolute inset-0 h-full w-full object-cover object-center" />
        <div className="hero-shade absolute inset-0" />
        <div className="section-shell relative z-10 flex min-h-[760px] items-end pb-16 pt-32 md:items-center md:pb-0">
          <div className="reveal max-w-2xl">
            <div className="mb-7 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-copper-soft"><span className="h-px w-10 bg-copper" /> Inteligência imobiliária</div>
            <h1 className="max-w-xl text-5xl font-semibold leading-[0.95] md:text-7xl">Cinco visões.<br /><span className="text-copper-soft">Uma direção.</span></h1>
            <p className="mt-7 max-w-lg text-base leading-7 text-primary-foreground/75 md:text-lg">Seu primeiro imóvel não começa na visita. Começa com uma escolha inteligente — e alguém que enxerga o caminho inteiro com você.</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button asChild variant="copper" size="lg" className="h-12"><a href="#contato"><MessageCircle /> Conversar com a Vibe</a></Button>
              <Button asChild variant="heroOutline" size="lg" className="h-12"><a href="#parceiros">Conhecer parceiros <ArrowDownRight /></a></Button>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 right-0 hidden w-[37%] border-l border-t border-primary-foreground/15 bg-primary/70 p-6 backdrop-blur-md md:block">
          <div className="flex items-center justify-between"><div><p className="text-xs uppercase tracking-[0.18em] text-copper-soft">Nossa essência</p><p className="mt-1 font-display text-lg">Movimento com propósito.</p></div><span className="font-display text-4xl text-copper">5→1</span></div>
        </div>
      </section>

      <section id="sobre" className="py-24 md:py-32">
        <div className="section-shell grid gap-14 md:grid-cols-[.85fr_1.15fr] md:items-center">
          <div><p className="text-xs font-bold uppercase tracking-[0.2em] text-copper">Por que a Vibe</p><h2 className="mt-5 text-4xl font-semibold leading-tight md:text-6xl">Diferentes olhares.<br />A mesma certeza.</h2></div>
          <div className="border-l border-copper/40 pl-7 md:pl-12"><p className="text-xl leading-8 text-foreground/80">A Vibe nasceu do encontro de cinco profissionais que acreditam que comprar um imóvel precisa ser mais claro, humano e estratégico.</p><p className="mt-5 leading-7 text-muted-foreground">Unimos leitura de mercado, inteligência de crédito e acompanhamento próximo para transformar possibilidades em uma direção segura — da primeira simulação às chaves na mão.</p></div>
        </div>
      </section>

      <section id="serviços" className="bg-primary py-24 text-primary-foreground md:py-32">
        <div className="section-shell"><div className="flex flex-col justify-between gap-6 md:flex-row md:items-end"><div><p className="text-xs font-bold uppercase tracking-[0.2em] text-copper-soft">Como fazemos</p><h2 className="mt-5 text-4xl font-semibold md:text-6xl">Clareza em cada passo.</h2></div><p className="max-w-md leading-7 text-primary-foreground/65">Sem pressão e sem promessas vazias. Traduzimos o mercado para você tomar decisões melhores.</p></div>
          <div className="mt-14 grid border-t border-primary-foreground/20 md:grid-cols-3">
            {[{n:"01",icon:Search,title:"Entender",text:"Analisamos renda, momento e planos para desenhar sua real capacidade de compra."},{n:"02",icon:Building2,title:"Encontrar",text:"Comparamos opções entre diferentes incorporadoras, regiões e condições."},{n:"03",icon:Sparkles,title:"Acompanhar",text:"Cuidamos da jornada de crédito, documentação, compra e pós-venda."}].map(({n,icon:Icon,title,text}) => <article key={n} className="group border-b border-primary-foreground/20 py-9 md:border-b-0 md:border-r md:px-8 md:first:pl-0 md:last:border-r-0"><div className="flex items-center justify-between"><span className="font-display text-sm text-copper">{n}</span><Icon className="size-6 text-copper" /></div><h3 className="mt-12 text-3xl">{title}</h3><p className="mt-4 leading-7 text-primary-foreground/60">{text}</p></article>)}
          </div>
        </div>
      </section>

      <section id="parceiros" className="py-24 md:py-32">
        <div className="section-shell"><div className="flex flex-col justify-between gap-8 md:flex-row md:items-end"><div><p className="text-xs font-bold uppercase tracking-[0.2em] text-copper">Developer Partners</p><h2 className="mt-5 text-4xl font-semibold md:text-6xl">Nossos parceiros.</h2></div><p className="max-w-sm text-sm leading-6 text-muted-foreground">Somos independentes: trabalhamos com as principais incorporadoras para comparar e indicar a melhor opção para você.</p></div>
          <div className="mt-10 flex flex-wrap items-center gap-2"><span className="mr-2 text-xs uppercase tracking-[0.16em] text-muted-foreground">Cidade</span>{cities.map((c) => <Button key={c} size="sm" variant={city === c ? "default" : "outline"} onClick={() => setCity(c)}>{c}</Button>)}</div>
          <div className="mt-3 flex gap-2 overflow-x-auto pb-3"><span className="mr-2 self-center text-xs uppercase tracking-[0.16em] text-muted-foreground">Incorporadora</span>{developers.map((dev) => <Button key={dev} size="sm" variant={filter === dev ? "default" : "outline"} onClick={() => setFilter(dev)}>{dev}</Button>)}</div>
          <div className="mt-6 grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-3">{shownPartners.length ? shownPartners.map((p) => <article key={p.name} className="lift flex flex-col justify-between bg-card p-7"><div className="flex flex-1 items-center justify-center py-6"><img src={p.logo_url || symbol.url} alt={p.name} className="size-40 object-contain"/></div>{p.focus && <p className="mt-4 text-center text-sm leading-6 text-muted-foreground">{p.focus}</p>}<p className="mt-6 text-center text-xs uppercase tracking-[0.14em] text-copper">{p.cities.join(" • ")}</p></article>) : <div className="col-span-full bg-card py-14 text-center text-muted-foreground">Nenhum parceiro com esse filtro ainda.</div>}</div>
          <p className="mt-5 text-xs text-muted-foreground">Cidades atendidas exibidas como demonstração até a confirmação da lista oficial.</p>
        </div>
      </section>

      <section id="conteúdo" className="bg-surface py-24 md:py-32">
        <div className="section-shell grid gap-12 md:grid-cols-[.85fr_1.15fr] md:items-center"><div><p className="text-xs font-bold uppercase tracking-[0.2em] text-copper">Vibe explica</p><h2 className="mt-5 text-4xl font-semibold md:text-6xl">Informação que move.</h2><p className="mt-6 max-w-sm leading-7 text-muted-foreground">Conteúdo direto sobre crédito, documentação e compra do primeiro imóvel, direto do Instagram @vibe.broker.</p><div className="mt-8 flex gap-2"><Button variant="outline" size="icon" onClick={() => setArticle((article + articles.length - 1) % articles.length)} aria-label="Conteúdo anterior"><ArrowLeft /></Button><Button variant="outline" size="icon" onClick={() => setArticle((article + 1) % articles.length)} aria-label="Próximo conteúdo"><ArrowRight /></Button></div></div>
          {currentArticle ? <article className="relative min-h-[400px] overflow-hidden bg-primary p-8 text-primary-foreground md:p-12">{currentArticle.image_url && <img src={currentArticle.image_url} alt="" className="absolute inset-0 h-full w-full object-cover opacity-40"/>}<div className="copper-rule absolute left-0 top-0 h-1 w-full"/><div className="relative flex justify-between"><span className="text-xs uppercase tracking-[0.18em] text-copper-soft">{currentArticle.tag}</span><span className="font-display text-5xl text-primary-foreground/10">{String(article + 1).padStart(2, "0")}</span></div><div className="absolute inset-x-8 bottom-8 md:inset-x-12 md:bottom-12"><h3 className="max-w-xl text-3xl font-semibold leading-tight md:text-5xl">{currentArticle.title}</h3><a href={currentArticle.url} target="_blank" rel="noreferrer" className="mt-8 inline-flex items-center gap-2 text-sm text-copper-soft">Ver post no Instagram <ArrowUpRight className="size-4" /></a></div></article> : <div className="bg-card p-12 text-muted-foreground">Novos conteúdos em breve.</div>}
        </div>
      </section>

      <section id="visões" className="py-24 md:py-32"><div className="section-shell"><div className="max-w-2xl"><h2 className="text-4xl font-semibold md:text-6xl">5 Visões</h2><p className="mt-5 text-lg leading-7 text-muted-foreground">Cinco perspectivas que convergem em uma direção.</p></div><div className="mt-14 grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-5">{visions.map(({ n, icon: Icon, title, text }) => <article key={n} className="group flex flex-col bg-card p-7"><div className="flex items-center justify-between"><Icon className="size-6 text-copper transition-transform group-hover:-translate-y-1" /><span className="font-display text-sm text-copper">{n}</span></div><h3 className="mt-10 text-xl font-semibold leading-snug">{title}</h3><p className="mt-3 text-sm leading-6 text-muted-foreground">{text}</p></article>)}</div></div></section>

      <section id="contato" className="bg-primary py-24 text-primary-foreground md:py-32"><div className="section-shell grid gap-14 md:grid-cols-[.8fr_1.2fr]"><div><p className="text-xs font-bold uppercase tracking-[0.2em] text-copper-soft">Seu próximo passo</p><h2 className="mt-5 text-4xl font-semibold md:text-6xl">Vamos encontrar sua direção?</h2><p className="mt-6 max-w-sm leading-7 text-primary-foreground/65">Conte em que momento você está. A gente organiza as possibilidades e conversa sem compromisso.</p><Button asChild variant="copper" className="mt-8 h-12"><a href="https://wa.me/55119640010433" target="_blank" rel="noreferrer"><MessageCircle /> Chamar no WhatsApp</a></Button><p className="text-xs text-primary-foreground/40">WhatsApp: (11) 96401-0433</p></div>
          <form className="grid gap-4" onSubmit={(e)=>{e.preventDefault();setSent(true)}}><div className="grid gap-4 sm:grid-cols-2"><Input required aria-label="Nome" placeholder="Seu nome" className="h-12 border-primary-foreground/20 bg-primary-foreground/5 text-primary-foreground placeholder:text-primary-foreground/45"/><Input required type="tel" aria-label="WhatsApp" placeholder="WhatsApp" className="h-12 border-primary-foreground/20 bg-primary-foreground/5 text-primary-foreground placeholder:text-primary-foreground/45"/></div><Input type="email" aria-label="Email" placeholder="Seu melhor e-mail" className="h-12 border-primary-foreground/20 bg-primary-foreground/5 text-primary-foreground placeholder:text-primary-foreground/45"/><Textarea aria-label="Mensagem" placeholder="Qual cidade ou tipo de imóvel você procura?" className="min-h-32 border-primary-foreground/20 bg-primary-foreground/5 text-primary-foreground placeholder:text-primary-foreground/45"/><Button type="submit" variant="light" className="h-12 justify-between px-5">{sent ? <><span className="flex items-center gap-2"><Check /> Interesse registrado</span></> : <>Quero falar com um especialista <ArrowRight /></>}</Button>{sent && <p className="text-sm text-copper-soft">Recebemos seus dados neste mockup. A integração de envio será conectada na próxima etapa.</p>}</form>
        </div></section>

      <footer className="bg-surface-dark py-12 text-primary-foreground"><div className="section-shell"><div className="flex flex-col justify-between gap-10 md:flex-row"><div><a href="#inicio" aria-label="Vibe Broker — início" className="inline-block"><img src={logoFull.url} alt="Vibe Broker — Inteligência Imobiliária" width={946} height={927} className="h-48 w-auto md:h-60" /></a><p className="mt-4 max-w-xs text-sm leading-6 text-primary-foreground/50">Inteligência imobiliária para transformar planos em patrimônio.</p></div><div className="flex gap-12 text-sm"><div><p className="mb-3 text-primary-foreground/40">Navegue</p><a href="#sobre" className="block py-1">Sobre</a><a href="#parceiros" className="block py-1">Parceiros</a></div><div><p className="mb-3 text-primary-foreground/40">Acompanhe</p><a href="https://instagram.com/vibe.broker" target="_blank" rel="noreferrer" className="flex items-center gap-2 py-1"><Instagram className="size-4" /> Instagram da Vibe Broker</a></div></div></div><div className="mt-12 flex flex-col justify-between gap-3 border-t border-primary-foreground/10 pt-6 text-xs text-primary-foreground/35 sm:flex-row"><span>© 2026 Vibe Broker</span><span>Consultoria imobiliária independente</span></div></div></footer>
    </main>
  );
}
