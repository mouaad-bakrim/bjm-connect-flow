import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useI18n } from '@/lib/i18n';
import { 
  ArrowRight, 
  CheckCircle2, 
  MessageCircle, 
  Shield, 
  Headphones,
  UserPlus,
  Search,
  Handshake,
  TrendingUp,
  Star,
  Quote,
  ChevronDown
} from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import heroBg from '@/assets/hero-bg.jpg';

export default function Home() {
  const { t } = useI18n();

  const features = [
    {
      icon: CheckCircle2,
      title: t('features.verified.title'),
      description: t('features.verified.desc'),
    },
    {
      icon: MessageCircle,
      title: t('features.direct.title'),
      description: t('features.direct.desc'),
    },
    {
      icon: Shield,
      title: t('features.secure.title'),
      description: t('features.secure.desc'),
    },
    {
      icon: Headphones,
      title: t('features.support.title'),
      description: t('features.support.desc'),
    },
  ];

  const steps = [
    {
      icon: UserPlus,
      title: 'Créez votre compte',
      description: 'Inscrivez-vous en tant que vendeur ou grossiste en quelques clics.',
    },
    {
      icon: Search,
      title: 'Explorez les produits',
      description: 'Parcourez des milliers de produits de grossistes vérifiés.',
    },
    {
      icon: Handshake,
      title: 'Contactez et négociez',
      description: 'Discutez directement avec les fournisseurs via WhatsApp ou chat.',
    },
    {
      icon: TrendingUp,
      title: 'Développez votre business',
      description: 'Passez vos commandes et faites croître votre commerce.',
    },
  ];

  const testimonials = [
    {
      name: 'Ahmed B.',
      role: 'E-commerçant, Casablanca',
      content: 'Grâce à BJMLA, j\'ai trouvé des fournisseurs fiables pour mon magasin en ligne. Les prix sont compétitifs et la qualité est au rendez-vous.',
      rating: 5,
    },
    {
      name: 'Fatima Z.',
      role: 'Grossiste textile, Fès',
      content: 'La plateforme m\'a permis d\'atteindre de nouveaux clients dans tout le Maroc. Le processus de vérification rassure mes acheteurs.',
      rating: 5,
    },
    {
      name: 'Youssef M.',
      role: 'Revendeur, Marrakech',
      content: 'Interface simple et efficace. Je contacte les grossistes directement sur WhatsApp et je négocie les meilleurs prix.',
      rating: 5,
    },
  ];

  const faqs = [
    {
      question: 'Comment devenir grossiste sur BJMLA?',
      answer: 'Créez un compte en tant que grossiste, remplissez les informations de votre entreprise. Notre équipe vérifiera votre profil sous 24-48h.',
    },
    {
      question: 'Quels sont les frais pour les vendeurs?',
      answer: 'L\'inscription est gratuite pour les vendeurs. Vous pouvez parcourir les produits et contacter les grossistes sans frais.',
    },
    {
      question: 'Comment sont vérifiés les grossistes?',
      answer: 'Nous vérifions le registre de commerce, les références et effectuons un appel de confirmation avant d\'approuver un compte grossiste.',
    },
    {
      question: 'Puis-je négocier les prix?',
      answer: 'Absolument! BJMLA vous permet de contacter directement les grossistes pour négocier prix et quantités selon vos besoins.',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{ backgroundImage: `url(${heroBg})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
        
        <div className="container relative mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary"></span>
              </span>
              Plateforme B2B #1 au Maroc
            </div>
            
            <h1 className="mb-6 text-4xl font-extrabold leading-tight tracking-tight md:text-5xl lg:text-6xl">
              {t('hero.title')},{' '}
              <span className="text-primary">{t('hero.subtitle')}</span>
            </h1>
            
            <p className="mb-8 text-lg text-muted-foreground md:text-xl">
              {t('hero.description')}
            </p>
            
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button size="lg" className="group gap-2 text-base" asChild>
                <Link to="/register?type=buyer">
                  {t('hero.cta.buyer')}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="gap-2 text-base" asChild>
                <Link to="/register?type=wholesaler">
                  {t('hero.cta.wholesaler')}
                </Link>
              </Button>
            </div>

            {/* Stats */}
            <div className="mt-16 grid grid-cols-2 gap-8 border-t border-border pt-8 md:grid-cols-4">
              <div>
                <div className="text-3xl font-bold text-primary">500+</div>
                <div className="text-sm text-muted-foreground">Grossistes vérifiés</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary">10K+</div>
                <div className="text-sm text-muted-foreground">Produits disponibles</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary">2K+</div>
                <div className="text-sm text-muted-foreground">Vendeurs actifs</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary">12</div>
                <div className="text-sm text-muted-foreground">Villes couvertes</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-muted/50 py-20">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">{t('features.title')}</h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              Découvrez les avantages qui font de BJMLA la plateforme de référence pour le commerce B2B au Maroc.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group rounded-2xl border border-border bg-card p-6 shadow-card transition-all duration-300 hover:shadow-card-hover"
              >
                <div className="mb-4 inline-flex rounded-xl bg-primary/10 p-3 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="mb-2 font-semibold">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">{t('how.title')}</h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              Rejoindre BJMLA est simple et rapide. Suivez ces étapes pour commencer.
            </p>
          </div>

          <div className="relative mx-auto max-w-4xl">
            {/* Connection line */}
            <div className="absolute left-1/2 top-0 hidden h-full w-0.5 -translate-x-1/2 bg-gradient-to-b from-primary via-primary/50 to-transparent md:block" />

            <div className="space-y-12 md:space-y-0">
              {steps.map((step, index) => (
                <div
                  key={index}
                  className={`relative flex flex-col items-center gap-6 md:flex-row ${
                    index % 2 === 1 ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  <div className="flex-1" />
                  <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg">
                    <step.icon className="h-7 w-7" />
                    <span className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-accent text-xs font-bold text-accent-foreground">
                      {index + 1}
                    </span>
                  </div>
                  <div className={`flex-1 text-center md:text-left ${index % 2 === 1 ? 'md:text-right' : ''}`}>
                    <h3 className="mb-2 text-xl font-semibold">{step.title}</h3>
                    <p className="text-muted-foreground">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-secondary py-20 text-secondary-foreground">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">Ce que disent nos utilisateurs</h2>
            <p className="mx-auto max-w-2xl text-secondary-foreground/70">
              Des milliers de professionnels font confiance à BJMLA pour leur commerce.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="rounded-2xl bg-secondary-foreground/5 p-6 backdrop-blur"
              >
                <Quote className="mb-4 h-8 w-8 text-primary" />
                <p className="mb-4 text-secondary-foreground/90">{testimonial.content}</p>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-secondary-foreground/60">{testimonial.role}</div>
                  </div>
                  <div className="ml-auto flex gap-0.5">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">Questions fréquentes</h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              Retrouvez les réponses aux questions les plus posées.
            </p>
          </div>

          <div className="mx-auto max-w-2xl">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="gradient-hero py-20 text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">
            Prêt à développer votre commerce?
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-primary-foreground/80">
            Rejoignez des milliers de professionnels qui utilisent BJMLA pour acheter et vendre en gros au Maroc.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button size="lg" variant="secondary" className="gap-2 text-base" asChild>
              <Link to="/register">
                Créer un compte gratuit
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="gap-2 border-primary-foreground/30 text-base text-primary-foreground hover:bg-primary-foreground/10" asChild>
              <Link to="/products">
                Explorer les produits
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
