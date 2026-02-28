import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Instagram, 
  MessageCircle, 
  CheckCircle2, 
  Star, 
  ShieldCheck, 
  Camera, 
  ArrowRight,
  MapPin,
  Phone
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const WHATSAPP_LINK = "https://wa.me/5531995072528?text=vim%20pelo%20site";

const ProductCard = ({ item, addToReveal }: any) => {
  const [currentImg, setCurrentImg] = useState(0);
  const images = Array.isArray(item.img) ? item.img : [item.img];

  useEffect(() => {
    if (images.length > 1) {
      const timer = setInterval(() => {
        setCurrentImg((prev) => (prev + 1) % images.length);
      }, 3000);
      return () => clearInterval(timer);
    }
  }, [images.length]);

  return (
    <div className="group cursor-pointer" ref={addToReveal}>
      <div className="relative aspect-[3/4] rounded-[2rem] overflow-hidden mb-6">
        <AnimatePresence mode="wait">
          <motion.img 
            key={currentImg}
            src={images[currentImg]} 
            alt={item.title} 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            referrerPolicy="no-referrer"
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-t from-dark/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-8">
          <a 
            href={item.link || "https://loja.infinitepay.io/dexcrieart"} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="w-full bg-white text-dark py-4 rounded-2xl font-bold text-center"
          >
            Ver Detalhes
          </a>
        </div>
        {images.length > 1 && (
          <div className="absolute top-6 right-6 flex gap-1 z-20">
            {images.map((_: any, idx: number) => (
              <div 
                key={idx} 
                className={`w-2 h-2 rounded-full transition-all duration-300 ${idx === currentImg ? 'bg-accent w-4' : 'bg-white/30'}`}
              />
            ))}
          </div>
        )}
      </div>
      <h4 className="text-xl font-bold mb-1">{item.title}</h4>
      <p className="text-accent font-medium">{item.price}</p>
    </div>
  );
};

export default function App() {
  const heroRef = useRef<HTMLDivElement>(null);
  const bentoRef = useRef<HTMLDivElement>(null);
  const revealRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    // Hero Entrance Animation
    const ctx = gsap.context(() => {
      gsap.from('.hero-title', {
        y: 100,
        opacity: 0,
        duration: 1.2,
        ease: 'power4.out',
        stagger: 0.2
      });

      gsap.from('.hero-sub', {
        y: 50,
        opacity: 0,
        duration: 1,
        delay: 0.5,
        ease: 'power3.out'
      });

      gsap.from('.hero-cta', {
        scale: 0.8,
        opacity: 0,
        duration: 0.8,
        delay: 0.8,
        ease: 'back.out(1.7)'
      });

      // Scroll Reveal Animations
      revealRefs.current.forEach((el) => {
        gsap.from(el, {
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none none'
          },
          y: 60,
          opacity: 0,
          duration: 1,
          ease: 'power3.out'
        });
      });

      // Bento Grid Stagger
      gsap.from('.bento-item', {
        scrollTrigger: {
          trigger: bentoRef.current,
          start: 'top 80%'
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power2.out'
      });
    });

    return () => ctx.revert();
  }, []);

  const addToReveal = (el: HTMLDivElement | null) => {
    if (el && !revealRefs.current.includes(el)) {
      revealRefs.current.push(el);
    }
  };

  return (
    <div className="min-h-screen selection:bg-accent selection:text-dark">
      {/* Header */}
      <header className="fixed top-0 left-0 w-full z-50 px-6 py-4">
        <nav className="max-w-7xl mx-auto flex items-center justify-between glass rounded-full px-8 py-3">
          <div className="flex items-center gap-2">
            <span className="font-display text-2xl font-bold tracking-tighter text-gradient">DEX</span>
            <span className="hidden sm:inline-block text-[10px] uppercase tracking-[0.3em] opacity-50 mt-1">Experiência Decorativa</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8 text-sm font-medium uppercase tracking-widest">
            <a href="#historia" className="hover:text-accent transition-colors">Nossa História</a>
            <a href="#diferenciais" className="hover:text-accent transition-colors">Diferenciais</a>
            <a href="#produtos" className="hover:text-accent transition-colors">Galeria</a>
            <a href="#depoimentos" className="hover:text-accent transition-colors">Depoimentos</a>
          </div>

          <a 
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white text-dark px-6 py-2 rounded-full text-sm font-bold hover:bg-accent hover:scale-105 transition-all flex items-center gap-2"
          >
            Orçamento <ArrowRight size={16} />
          </a>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://lh3.googleusercontent.com/rd-gg-dl/AOI_d_--4wEHKpO4Hg_dlAmoCfMuQ5MydUvEIyBuli7IiqKsfWzzUp-npPVFY7J0ShgcHfTciig3zjH-m-D9eKJhw2b5Fh8Xm4m6hSws6UX6s8mnuqjjDs4cCLlk7Av8ObrbQkTqnX7c9L43yMjdgcuzaGUeIukLD4LRrNkKCNbmKIW-twEtd4x_q8HoG8DhTu5capHvTThqY9oAqj8WKpUiBr1ToacS7PULKX3SCBr3RP1ggoymYEQE9BU_3bgrNUjA1SkXHgIvxsiXymr3fwn4g5DwMvtsCdm4ie7ZxYWmQK7lWF2dRuSC9VQujb4nCbHmr8xLm7vgLz59pc4xkruKn5opwXga5bPa4hgBzKD0-fMVbPPhDGrkLxa6yu9C-jxGPb7D35YbScUbltnQhRJ8OooyveeWmfzwCu6gMs3eCCy_pVQnguMAf6PHI7hAzSyGfU2drjSLdVCbyv4kTnupBQFShX8oUHDzlCthUr-c3IjPnJW8urLGcRqf2_F9LkvbmvBEDCz8rc_oYU363R_Cv8y2MJbLuozOPljTlV5MHBxrWl1ADj4y-goMG15BEQmgebGhQfKpxUfle8Cnfatya0AsLG2uYZOT6CMkfRRcp-GFvnG0m6f2G-SENzCPZPYnbbLIKbbbpLUeYnz3Hh7SkbqUtSslUTCt3LvcImeTSYm2Y5kOLSfN0NY2Wr2nczPTMCvPbJGIpkRgYHjhv6Ai2sgepqi4w2NAN5wdGNZ3IinvSWMdseVziQFZc8oNEHOWokJ3ezPmGHPiyejz_vhxMPofIr-v0C8QviFuT72wBTUQvtuJ0BClbCZs1mzwwGEPx9qEdX7enilqW0DM_kUmFGCO8uzT2-NxBSXNmXZE6-JECGmJASawDIRHhBCgvsvqIuXunsn2y0H-MRHSrqPtjYCUj1QpWFadSD-iCeZ7Okr_YyATAJqnLmedLIoCqBYdnvORmVmN2gITqvC3GhliahlIQwv_20SFN3dBB0pu50EktdrKxuT4pljxaxQSfLh2IXmXFUTZD73SNULmn7_9syal4bv_DUB_0YK69rLRKTxdn6OEAFXTVg_lJ7D5GbM-IBTIjtsJW19DlA09U5FSIFMghOCaTIE9caxmx6PgduEDWFpYcMmvZh41tR-u1_WH7urhy2S7SsGPuUAdyvWL5X-JxCs9DmCcbRPVwd-MRhVhM8GsReI-yE42qMj7RJUTn82ISh8JNN3U-cQSp0qB5xt8nFY=s1024-rj" 
            alt="Artistic Background"
            className="w-full h-full object-cover opacity-40"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-dark via-dark/80 to-dark"></div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center" ref={heroRef}>
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full glass mb-8 hero-sub">
            <Star size={14} className="text-accent fill-accent" />
            <span className="text-[10px] uppercase tracking-[0.2em] font-semibold">Desde 2019 transformando ambientes</span>
          </div>
          
          <h1 className="font-display text-6xl md:text-8xl lg:text-9xl font-bold leading-[0.9] tracking-tighter mb-8 hero-title">
            Sua Arte em <br />
            <span className="text-gradient italic">Alta Definição.</span>
          </h1>
          
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-white/60 mb-10 hero-sub">
            Quadros personalizados em MDF sob medida com a melhor resolução do mercado. 
            Onde cada detalhe conta a sua história.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 hero-cta">
            <a 
              href="#historia"
              className="w-full sm:w-auto bg-accent text-dark px-10 py-5 rounded-2xl font-bold text-lg hover:scale-105 active:scale-95 transition-all shadow-[0_0_40px_rgba(212,175,55,0.3)]"
            >
              Nossa História
            </a>
            <a 
              href="#produtos"
              className="w-full sm:w-auto glass px-10 py-5 rounded-2xl font-bold text-lg hover:bg-white/10 transition-all"
            >
              Ver Galeria
            </a>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-30">
          <div className="w-px h-12 bg-gradient-to-b from-white to-transparent"></div>
        </div>
      </section>

      {/* Authority Marquee */}
      <section className="py-20 border-y border-white/5 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
            <div className="space-y-1">
              <div className="text-4xl font-display font-bold text-accent">5k+</div>
              <div className="text-[10px] uppercase tracking-widest opacity-50">Quadros Produzidos</div>
            </div>
            <div className="space-y-1">
              <div className="text-4xl font-display font-bold text-accent">2019</div>
              <div className="text-[10px] uppercase tracking-widest opacity-50">No Mercado</div>
            </div>
            <div className="space-y-1">
              <div className="text-4xl font-display font-bold text-accent">100%</div>
              <div className="text-[10px] uppercase tracking-widest opacity-50">Personalizado</div>
            </div>
            <div className="space-y-1">
              <div className="text-4xl font-display font-bold text-accent">BH/MG</div>
              <div className="text-[10px] uppercase tracking-widest opacity-50">Atendimento Premium</div>
            </div>
          </div>
        </div>
      </section>

      {/* Nossa História Section */}
      <section id="historia" className="py-32 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
            <div ref={addToReveal}>
              <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full glass mb-8">
                <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-accent">Nossa Essência</span>
              </div>
              <h2 className="font-display text-5xl md:text-7xl font-bold mb-10 leading-tight">
                Como Tudo <span className="text-gradient italic">Começou</span>
              </h2>
              <div className="space-y-6 text-white/70 text-lg leading-relaxed">
                <p>
                  A semente da DEX foi plantada a partir de uma conexão profunda com a arte em todas as suas formas. 
                  Movidos pela energia vibrante da cultura geek, nerd e otaku, e inspirados pela grandiosidade das galerias e dos museus, 
                  percebemos que a expressão artística não deveria estar confinada. Ela precisa ser vivida no dia a dia.
                </p>
                <p>
                  Foi dessa paixão por grandes narrativas visuais e por estéticas marcantes que nasceu o desejo de democratizar a decoração, 
                  levando arte de qualidade para todos os ambientes por valores verdadeiramente acessíveis.
                </p>
              </div>

              <div className="mt-16 p-8 glass rounded-3xl border-accent/20">
                <h3 className="font-display text-3xl font-bold mb-4 text-accent">Nossa Missão</h3>
                <p className="text-white/80 italic">
                  "Acreditamos que as paredes de um ambiente contam a história de quem ali vive ou trabalha. 
                  Nossa missão é entregar identidade, conforto e leveza para lares, escritórios e comércios. 
                  Um espaço decorado de forma personalizada não é apenas um detalhe estético; 
                  é uma maneira de expressar quem você é, transformando qualquer lugar em um refúgio de inspiração."
                </p>
              </div>
            </div>

            <div className="relative" ref={addToReveal}>
              <div className="aspect-[4/5] rounded-[3rem] overflow-hidden relative z-10 shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&q=80&w=1000" 
                  alt="Atelier DEX" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark via-transparent to-transparent"></div>
                <div className="absolute bottom-10 left-10 right-10">
                  <div className="text-4xl font-display font-bold text-accent mb-2">Desde 2019</div>
                  <div className="text-sm uppercase tracking-widest opacity-60">Criando conexões através da arte</div>
                </div>
              </div>
              {/* Decorative Elements */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-accent/20 blur-[80px] rounded-full"></div>
              <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-accent/10 blur-[100px] rounded-full"></div>
            </div>
          </div>

          <div className="mt-32" ref={addToReveal}>
            <h3 className="font-display text-4xl font-bold mb-12 text-center">Nossa Jornada <span className="text-accent italic">Plural</span></h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="glass p-8 rounded-3xl hover:border-accent/30 transition-colors">
                <div className="text-accent font-display text-2xl mb-4">A Nossa Raiz</div>
                <h4 className="font-bold mb-3">Quadros em MDF</h4>
                <p className="text-sm text-white/60">
                  Onde nossa jornada ganhou forma. Trazemos desde coleções elegantes, como a Preto e Dourado, 
                  até os universos favoritos com artes de Jujutsu Kaisen, Demon Slayer e Your Name.
                </p>
              </div>
              <div className="glass p-8 rounded-3xl hover:border-accent/30 transition-colors">
                <div className="text-accent font-display text-2xl mb-4">Alta Resolução</div>
                <h4 className="font-bold mb-3">Pôsteres Colecionáveis</h4>
                <p className="text-sm text-white/60">
                  Para os verdadeiros fãs da cultura pop e otaku, oferecemos pôsteres em tamanhos A4 e A3 
                  de obras consagradas como One Piece, Dragon Ball e Chainsaw Man.
                </p>
              </div>
              <div className="glass p-8 rounded-3xl hover:border-accent/30 transition-colors">
                <div className="text-accent font-display text-2xl mb-4">Acabamento Premium</div>
                <h4 className="font-bold mb-3">Artes Emolduradas</h4>
                <p className="text-sm text-white/60">
                  Elevando o padrão de sofisticação com molduras em madeira, celebrando de clássicos 
                  dos animes a séries como American Horror Story.
                </p>
              </div>
              <div className="glass p-8 rounded-3xl hover:border-accent/30 transition-colors">
                <div className="text-accent font-display text-2xl mb-4">Soluções Completas</div>
                <h4 className="font-bold mb-3">Kits e Composições</h4>
                <p className="text-sm text-white/60">
                  Transforme uma parede inteira. Temos desde os impactantes Trios Psicodélicos até a 
                  delicadeza dos nossos Kits para Quartos de Bebê.
                </p>
              </div>
              <div className="glass p-8 rounded-3xl hover:border-accent/30 transition-colors">
                <div className="text-accent font-display text-2xl mb-4">Sua Vida é Arte</div>
                <h4 className="font-bold mb-3">Linha Personalizada</h4>
                <p className="text-sm text-white/60">
                  Oferecemos quadros e mega kits (de 15x20cm até 40x60cm) feitos sob medida com a sua própria foto ou arte.
                </p>
              </div>
              <div className="glass p-8 rounded-3xl hover:border-accent/30 transition-colors">
                <div className="text-accent font-display text-2xl mb-4">Arte nos Detalhes</div>
                <h4 className="font-bold mb-3">Acessórios Geek</h4>
                <p className="text-sm text-white/60">
                  Foto Ímãs em MDF e charmosos Marcadores de Livro exclusivos com tassel, 
                  porque a paixão acompanha você em todo lugar.
                </p>
              </div>
            </div>
            <div className="mt-16 text-center text-white/50 max-w-3xl mx-auto italic">
              "A DEX - Experiência Decorativa não entrega apenas produtos; nós entregamos a peça que faltava 
              para tornar o seu espaço, as suas leituras e as suas memórias verdadeiramente suas."
            </div>
          </div>
        </div>
      </section>

      {/* Differentials - Bento Grid */}
      <section id="diferenciais" className="py-32 px-6 max-w-7xl mx-auto">
        <div className="mb-16 text-center" ref={addToReveal}>
          <h2 className="font-display text-4xl md:text-6xl font-bold mb-4">Por que escolher a <span className="text-accent">DEX</span>?</h2>
          <p className="text-white/50">A excelência está nos detalhes que você não vê, mas sente.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6" ref={bentoRef}>
          {/* Item 1 */}
          <div className="md:col-span-2 glass rounded-[2rem] p-10 flex flex-col justify-between group bento-item overflow-hidden relative">
            <div className="relative z-10">
              <Camera className="text-accent mb-6" size={40} />
              <h3 className="text-3xl font-bold mb-4">Alta Resolução Real</h3>
              <p className="text-white/60 max-w-md">
                Utilizamos tecnologia de impressão de última geração que garante cores vibrantes e detalhes nítidos que não desbotam com o tempo.
              </p>
            </div>
            <div className="absolute right-0 bottom-0 w-1/2 h-full opacity-20 group-hover:opacity-40 transition-opacity">
               <img src="https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&q=80&w=800" alt="Detail" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </div>
          </div>

          {/* Item 2 */}
          <div className="glass rounded-[2rem] p-10 bento-item hover:bg-white/10 transition-colors">
            <ShieldCheck className="text-accent mb-6" size={40} />
            <h3 className="text-2xl font-bold mb-4">Durabilidade Garantida</h3>
            <p className="text-white/60">
              MDF de 3mm com acabamento premium. Nossos quadros são feitos para durar gerações.
            </p>
          </div>

          {/* Item 3 */}
          <div className="glass rounded-[2rem] p-10 bento-item hover:bg-white/10 transition-colors">
            <MessageCircle className="text-accent mb-6" size={40} />
            <h3 className="text-2xl font-bold mb-4">Sua Ideia, Nossa Arte</h3>
            <p className="text-white/60">
              Personalizamos com qualquer foto ou tema. Do anime favorito às fotos de família.
            </p>
          </div>

          {/* Item 4 */}
          <div className="md:col-span-2 glass rounded-[2rem] p-10 flex flex-col md:flex-row items-center gap-10 bento-item">
            <div className="flex-1">
              <CheckCircle2 className="text-accent mb-6" size={40} />
              <h3 className="text-3xl font-bold mb-4">Custo-Benefício Imbatível</h3>
              <p className="text-white/60">
                O melhor preço de Belo Horizonte e região sem abrir mão da qualidade luxuosa que sua casa merece.
              </p>
            </div>
            <div className="flex-1 grid grid-cols-2 gap-4">
              <div className="aspect-square glass rounded-2xl flex items-center justify-center text-center p-4">
                <span className="text-xs font-bold uppercase tracking-tighter">Moldura Premium</span>
              </div>
              <div className="aspect-square glass rounded-2xl flex items-center justify-center text-center p-4">
                <span className="text-xs font-bold uppercase tracking-tighter">Vidro Opcional</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="produtos" className="py-32 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6" ref={addToReveal}>
            <div className="max-w-2xl">
              <h2 className="font-display text-4xl md:text-6xl font-bold mb-4">Experiências <br /><span className="text-accent">Decorativas</span></h2>
              <p className="text-white/50 text-lg">Uma curadoria do que há de mais moderno em decoração de interiores.</p>
            </div>
            <a 
              href="https://loja.infinitepay.io/dexcrieart" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-accent font-bold flex items-center gap-2 group"
            >
              Ver catálogo completo <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { 
                title: "Kit Infantil", 
                price: "R$ 79,90", 
                link: "https://loja.infinitepay.io/dexcrieart?categories=1409952-kit-infantil",
                img: [
                  "https://lh3.googleusercontent.com/d/1oD_Xw06_FPFmD6otkG07dqYMixnFqXKN",
                  "https://lh3.googleusercontent.com/d/1W1mi5eCZOPMwN__ZiBWMxIyiHFaq92pB",
                  "https://lh3.googleusercontent.com/d/160Ym9qw6aVKEAf-4dXCDmbyUJo7vtL0B",
                  "https://lh3.googleusercontent.com/d/1e4y0kChaalRYCCGrj4uh8gnvgDkbH3qt",
                  "https://lh3.googleusercontent.com/d/1kOue9qiFPj-Q2o3Mb-PDNOz9NbN2gu_r"
                ]
              },
              { 
                title: "Marcador de livro", 
                price: "A partir de R$ 6,99", 
                link: "https://loja.infinitepay.io/dexcrieart?categories=1394375-marcador-de-livro",
                img: [
                  "https://assets.infinitepay.io/unsafe/384x0/filters:quality(75)/https%3A%2F%2Fapi.infinitepay.io%2Fpdv%2Fv1%2Fproducts%2Fvariation%2Fmedia_proxy%2Fb88fe70c-3801-46b0-a84d-b4de6b973c69%3Fv%3D20260227154644%26q%3Dthumbnail",
                  "https://assets.infinitepay.io/unsafe/384x0/filters:quality(75)/https%3A%2F%2Fapi.infinitepay.io%2Fpdv%2Fv1%2Fproducts%2Fvariation%2Fmedia_proxy%2F1c24df26-79b3-4461-9774-0a7d306e691c%3Fv%3D20260227154434%26q%3Dthumbnail",
                  "https://assets.infinitepay.io/unsafe/384x0/filters:quality(75)/https%3A%2F%2Fapi.infinitepay.io%2Fpdv%2Fv1%2Fproducts%2Fvariation%2Fmedia_proxy%2Fff732871-d0ef-4545-8e47-3d920d258272%3Fv%3D20260227154301%26q%3Dthumbnail"
                ]
              },
              { title: "Coleção Jujutsu Kaisen", price: "R$ 19,99", img: "https://lh3.googleusercontent.com/d/1-AhwvlJS3lvJkSVkqbBw2i6a9-r1pwvy", link: "https://loja.infinitepay.io/dexcrieart?categories=1397661-jujutsu-kaisen" },
              { title: "Personalizados", price: "A partir de R$ 11,99", img: "https://assets.infinitepay.io/unsafe/384x0/filters:quality(75)/https%3A%2F%2Fapi.infinitepay.io%2Fpdv%2Fv1%2Fproducts%2Fvariation%2Fmedia_proxy%2Fa9010dc6-8628-477d-814e-a57c2b54def7%3Fv%3D20260211215547%26q%3Dthumbnail", link: "https://loja.infinitepay.io/dexcrieart?categories=1394549-personalizados" },
              { 
                title: "Poster Dragon Ball", 
                price: "A partir de R$ 9,99", 
                link: "https://loja.infinitepay.io/dexcrieart?categories=1408401-dragon-ball",
                img: [
                  "https://lh3.googleusercontent.com/d/1lZhp76LNUsHlD3udvaCk0incoC8xaHjc",
                  "https://lh3.googleusercontent.com/d/1YKZxwlm28R7uoDTYrLlXi3F9O5WD6tqc",
                  "https://lh3.googleusercontent.com/d/1N4iorE_XtJu_oWvmFWhfZL5SmBNl5nI3",
                  "https://lh3.googleusercontent.com/d/1FY3w_xl8jfN0KEkFIvsJ1mfuqqt0BunP",
                  "https://lh3.googleusercontent.com/d/1PEeapIg0Gtl8l-NEMC9vK3E17BQVhTHx",
                  "https://lh3.googleusercontent.com/d/1cBxD_Hz0VZs0D-jellPTpvNCB9D835He"
                ]
              },
              { title: "Foto imas", price: "A partir de R$ 19,99", img: "https://assets.infinitepay.io/unsafe/384x0/filters:quality(75)/https%3A%2F%2Fapi.infinitepay.io%2Fpdv%2Fv1%2Fproducts%2Fvariation%2Fmedia_proxy%2Fc547c016-39a2-4db4-8bee-5935f58cdc23%3Fv%3D20260210233847%26q%3Dthumbnail" },
            ].map((item: any, i) => (
              <ProductCard key={i} item={item} addToReveal={addToReveal} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="depoimentos" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20" ref={addToReveal}>
            <h2 className="font-display text-4xl md:text-6xl font-bold mb-4">O que dizem nossos <span className="text-accent">clientes</span></h2>
            <div className="flex items-center justify-center gap-1 text-accent">
              <Star size={20} fill="currentColor" />
              <Star size={20} fill="currentColor" />
              <Star size={20} fill="currentColor" />
              <Star size={20} fill="currentColor" />
              <Star size={20} fill="currentColor" />
              <span className="ml-2 text-white/50 text-sm font-bold">5.0 (27 avaliações no Google)</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Neimar Costa", text: "Produtos criativos e de qualidade, entrega no prazo e vendedor super atencioso." },
              { name: "Adriano Kastro", text: "Trabalho excelente top dos top Parabens" },
              { name: "Eunaria RODRIGUES DE SOUZA", text: "Super atencioso, excelente trabalho. Tenho em casa vários quadrinhos que somos apaixonados, tudo trabalho desse maravilhoso profissional." },
              { name: "Marcelo Souza", text: "Produto de qualidade com preço acessível, atendimento impecável. Vendedor nota 10. Super recomendo!" },
            ].map((testimonial, i) => (
              <div key={i} className="glass p-10 rounded-[2rem] relative" ref={addToReveal}>
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-accent rounded-full flex items-center justify-center text-dark font-bold text-2xl font-display italic">"</div>
                <p className="text-white/70 italic mb-8 leading-relaxed">
                  {testimonial.text}
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center font-bold text-accent">
                    {testimonial.name[0]}
                  </div>
                  <div>
                    <div className="font-bold">{testimonial.name}</div>
                    <div className="text-[10px] uppercase tracking-widest opacity-40">Cliente Google</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6">
        <div className="max-w-5xl mx-auto glass rounded-[3rem] p-12 md:p-24 text-center relative overflow-hidden" ref={addToReveal}>
          <div className="absolute top-0 left-0 w-full h-full bg-accent/5 pointer-events-none"></div>
          <h2 className="font-display text-4xl md:text-7xl font-bold mb-8 relative z-10">Pronto para dar vida <br />às suas <span className="text-accent italic">paredes?</span></h2>
          <p className="text-white/60 text-lg mb-12 max-w-2xl mx-auto relative z-10">
            Entre em contato agora e receba uma consultoria gratuita para escolher o melhor layout para seu ambiente.
          </p>
          <a 
            href="https://loja.infinitepay.io/dexcrieart?categories="
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-white text-dark px-12 py-6 rounded-2xl font-bold text-xl hover:scale-105 transition-all relative z-10"
          >
            Compre Agora <ArrowRight size={24} />
          </a>
        </div>
      </section>

      {/* Google Maps Section */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto" ref={addToReveal}>
          <div className="mb-16 text-center">
            <h2 className="font-display text-4xl md:text-6xl font-bold mb-4">Onde <span className="text-accent">estamos</span></h2>
            <p className="text-white/50">Venha nos visitar ou retire seu pedido em nossa unidade.</p>
          </div>
          
          <div className="glass rounded-[3rem] overflow-hidden h-[450px] relative border border-white/10">
            <iframe 
              src="https://maps.google.com/maps?q=Rua%20Ana%20Granato%20de%20Faria,%20880%20-%20Veneza,%20Ribeir%C3%A3o%20das%20Neves%20-%20MG&t=&z=15&ie=UTF8&iwloc=&output=embed"
              width="100%" 
              height="100%" 
              style={{ border: 0, filter: 'grayscale(1) invert(0.9) contrast(1.2)' }} 
              allowFullScreen={true} 
              loading="lazy" 
              title="Localização DEX"
            ></iframe>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-2">
            <div className="font-display text-3xl font-bold tracking-tighter text-gradient mb-6">DEX</div>
            <p className="text-white/40 max-w-sm mb-8">
              Desde 2019 criando quadros em MDF sob medida. O melhor custo-benefício de BH e região. Personalizados no estilo que você ama.
            </p>
            <div className="flex items-center gap-6">
              <a href="https://www.instagram.com/quadroxx7/" target="_blank" className="text-white/40 hover:text-accent transition-colors">
                <Instagram size={24} />
              </a>
              <a href="https://br.pinterest.com/DEX22222/" target="_blank" className="text-white/40 hover:text-accent transition-colors">
                <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.08 3.14 9.43 7.62 11.17-.1-.95-.19-2.41.04-3.44.21-.93 1.35-5.71 1.35-5.71s-.34-.69-.34-1.71c0-1.61.93-2.81 2.09-2.81 1 0 1.48.75 1.48 1.64 0 1-.64 2.5-.97 3.89-.28 1.17.58 2.13 1.73 2.13 2.08 0 3.68-2.19 3.68-5.36 0-2.8-2.02-4.76-4.89-4.76-3.33 0-5.28 2.5-5.28 5.08 0 1.01.39 2.1.87 2.68.1.12.11.22.08.34-.09.37-.28 1.14-.32 1.29-.05.21-.16.25-.37.15-1.39-.65-2.26-2.67-2.26-4.3 0-3.5 2.54-6.71 7.33-6.71 3.85 0 6.84 2.74 6.84 6.41 0 3.83-2.41 6.91-5.76 6.91-1.12 0-2.18-.58-2.54-1.27l-.69 2.63c-.25.96-.93 2.16-1.39 2.91 1.12.35 2.31.54 3.54.54 6.63 0 12-5.37 12-12S18.63 0 12 0z" />
                </svg>
              </a>
              <a href="https://www.tiktok.com/@dex20252" target="_blank" className="text-white/40 hover:text-accent transition-colors">
                <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.17-2.81-.74-3.94-1.69-.17-.14-.33-.29-.48-.45v6.45c.01 2.27-.85 4.51-2.5 6.06-1.81 1.71-4.44 2.33-6.8 1.81-2.31-.52-4.32-2.13-5.29-4.27-.95-2.11-.73-4.69.59-6.59 1.32-1.89 3.63-2.99 5.95-2.82.02 1.31.01 2.62.02 3.92-.79-.07-1.62.14-2.27.61-.8.56-1.29 1.54-1.2 2.52.1 1.05.88 1.99 1.92 2.18 1.14.21 2.4-.3 3.02-1.27.35-.55.48-1.21.47-1.85V.02z" />
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h5 className="font-bold uppercase tracking-widest text-xs mb-6">Contato</h5>
            <ul className="space-y-4 text-white/40 text-sm">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-accent shrink-0" />
                <span>Rua Ana Granato de Faria, 880 - Veneza, Ribeirão das Neves - MG</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-accent shrink-0" />
                <span>(31) 99507-2528</span>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="font-bold uppercase tracking-widest text-xs mb-6">Horário</h5>
            <ul className="space-y-2 text-white/40 text-sm">
              <li>Seg - Sex: 09:00 - 18:00</li>
              <li>Sáb: 09:00 - 13:00</li>
              <li>Dom: Fechado</li>
            </ul>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] uppercase tracking-[0.2em] text-white/20">
          <div>© 2026 DEX - Experiência Decorativa. Todos os direitos reservados.</div>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">Privacidade</a>
            <a href="#" className="hover:text-white transition-colors">Termos</a>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <a 
        href={WHATSAPP_LINK}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 z-[100] bg-[#25D366] text-white p-4 rounded-full shadow-[0_10px_30px_rgba(37,211,102,0.4)] hover:scale-110 active:scale-95 transition-all group"
        aria-label="Falar no WhatsApp"
      >
        <MessageCircle size={32} fill="currentColor" className="group-hover:rotate-12 transition-transform" />
        <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-white text-dark px-4 py-2 rounded-xl text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-xl">
          Fale conosco agora!
        </span>
      </a>
    </div>
  );
}

