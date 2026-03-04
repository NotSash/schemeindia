import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  ArrowRight,
  CheckCircle2,
  ClipboardList,
  Cpu,
  FileText,
  Banknote,
  GraduationCap,
  Home,
  Heart,
  Leaf,
  Briefcase,
  TrendingUp,
  Shield,
  Users,
  Star,
  Quote,
  Zap,
  Lock,
  Globe,
} from 'lucide-react';
import { PRICING_PLANS } from '@/lib/constants';
import { formatCurrency } from '@/lib/utils';

// ==============================================================
// Landing Page
// ==============================================================

export default function LandingPage() {
  return (
    <>
      {/* ===== HERO SECTION ===== */}
      <section className="relative overflow-hidden gradient-hero text-white">
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-brand-saffron/10 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-brand-green/10 blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-white/[0.02] blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:py-28 lg:py-36 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-1.5 mb-6 text-sm border border-white/20">
              <span className="animate-pulse-slow">🇮🇳</span>
              <span>Trusted by thousands of Indian citizens</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight mb-6">
              Discover Government Schemes{' '}
              <span className="text-brand-saffron">You&apos;re Entitled To</span>
            </h1>

            <p className="text-lg sm:text-xl text-blue-100 max-w-3xl mx-auto mb-8 leading-relaxed">
              India has over <strong>3,000 government schemes</strong> worth lakhs of rupees.
              Most citizens don&apos;t know what they&apos;re eligible for.
              SchemeIndia uses <strong>AI</strong> to find every scheme that matches your profile.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <Link href="/auth/signup">
                <Button
                  size="lg"
                  className="bg-brand-saffron hover:bg-brand-saffron-light text-white font-semibold text-lg px-8 py-6 rounded-xl shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-0.5"
                >
                  Find My Schemes
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/#how-it-works">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white/10 font-semibold text-lg px-8 py-6 rounded-xl bg-transparent"
                >
                  Learn How It Works
                </Button>
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs sm:text-sm text-blue-200">
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4" />
                <span>Data from official govt sources</span>
              </div>
              <div className="flex items-center gap-2">
                <Lock className="h-4 w-4" />
                <span>Secure payments via Razorpay</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4" />
                <span>AI-powered matching</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M0 60L48 55C96 50 192 40 288 35C384 30 480 30 576 32.5C672 35 768 40 864 42.5C960 45 1056 45 1152 42.5C1248 40 1344 35 1392 32.5L1440 30V60H1392C1344 60 1248 60 1152 60C1056 60 960 60 864 60C768 60 672 60 576 60C480 60 384 60 288 60C192 60 96 60 48 60H0Z"
              className="fill-background"
            />
          </svg>
        </div>
      </section>

      {/* ===== STATS SECTION ===== */}
      <section className="py-12 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { value: '3,000+', label: 'Schemes Tracked', icon: FileText },
              { value: '10,000+', label: 'Users Helped', icon: Users },
              { value: '₹500 Cr+', label: 'Benefits Discovered', icon: Banknote },
              { value: '36', label: 'States & UTs', icon: Globe },
            ].map((stat) => (
              <Card key={stat.label} className="border-0 shadow-md hover:shadow-lg transition-shadow bg-card">
                <CardContent className="flex flex-col items-center text-center p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-blue/5 text-brand-blue mb-3">
                    <stat.icon className="h-6 w-6" />
                  </div>
                  <p className="text-2xl sm:text-3xl font-bold text-brand-blue">{stat.value}</p>
                  <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section id="how-it-works" className="py-20 bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              How <span className="text-brand-saffron">SchemeIndia</span> Works
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Three simple steps to discover every government scheme you&apos;re eligible for.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                icon: ClipboardList,
                title: 'Answer Simple Questions',
                description:
                  'Tell us about yourself, your family, income, and needs. It takes just 5 minutes to complete the questionnaire.',
                color: 'text-brand-blue',
                bg: 'bg-brand-blue/5',
              },
              {
                step: '02',
                icon: Cpu,
                title: 'AI Matches You',
                description:
                  'Our AI engine scans thousands of government schemes from official sources and finds every one you are eligible for.',
                color: 'text-brand-saffron',
                bg: 'bg-brand-saffron/5',
              },
              {
                step: '03',
                icon: FileText,
                title: 'Get Your Report',
                description:
                  'Receive a detailed report with scheme names, benefits, eligibility details, required documents, and application links.',
                color: 'text-brand-green',
                bg: 'bg-brand-green/5',
              },
            ].map((item) => (
              <Card key={item.step} className="relative border-0 shadow-md hover:shadow-xl transition-all group">
                <CardContent className="p-8 text-center">
                  <div className="absolute top-4 right-4 text-5xl font-bold text-muted/30 group-hover:text-muted/50 transition-colors">
                    {item.step}
                  </div>
                  <div className={`inline-flex h-16 w-16 items-center justify-center rounded-2xl ${item.bg} ${item.color} mb-6`}>
                    <item.icon className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/auth/signup">
              <Button
                size="lg"
                className="bg-brand-saffron hover:bg-brand-saffron/90 text-white font-semibold text-lg px-8 rounded-xl shadow-lg"
              >
                Start Now — It&apos;s Quick
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ===== CATEGORIES SECTION ===== */}
      <section className="py-20 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Schemes Across <span className="text-brand-saffron">Every Category</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We cover government schemes for all aspects of life — from financial aid to healthcare, education to agriculture.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              { icon: Banknote, label: 'Financial Aid', count: '500+' },
              { icon: GraduationCap, label: 'Education', count: '400+' },
              { icon: Home, label: 'Housing', count: '200+' },
              { icon: Heart, label: 'Health', count: '350+' },
              { icon: Leaf, label: 'Agriculture', count: '300+' },
              { icon: Briefcase, label: 'Employment', count: '250+' },
              { icon: TrendingUp, label: 'Business', count: '150+' },
              { icon: Shield, label: 'Pension', count: '100+' },
              { icon: Users, label: 'Women & Child', count: '200+' },
              { icon: Star, label: 'Insurance', count: '80+' },
            ].map((cat) => (
              <Card key={cat.label} className="border-0 shadow-sm hover:shadow-md transition-all cursor-pointer group hover:-translate-y-1">
                <CardContent className="p-4 text-center">
                  <div className="flex h-10 w-10 mx-auto items-center justify-center rounded-lg bg-brand-blue/5 text-brand-blue group-hover:bg-brand-blue group-hover:text-white transition-colors mb-2">
                    <cat.icon className="h-5 w-5" />
                  </div>
                  <p className="text-sm font-medium">{cat.label}</p>
                  <p className="text-xs text-muted-foreground">{cat.count} schemes</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="py-20 bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Trusted by Thousands of <span className="text-brand-saffron">Indian Citizens</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: 'Ramesh Kumar',
                location: 'Uttar Pradesh',
                text: 'I had no idea I was eligible for 8 government schemes. SchemeIndia found all of them and helped me apply. I received ₹6,000 under PM-KISAN within a month.',
                rating: 5,
              },
              {
                name: 'Priya Sharma',
                location: 'Maharashtra',
                text: 'As a single mother, I was struggling to find support. SchemeIndia matched me with 12 schemes including housing assistance and a scholarship for my daughter. Truly life-changing.',
                rating: 5,
              },
              {
                name: 'Gurmeet Singh',
                location: 'Punjab',
                text: 'The detailed report with step-by-step application instructions made the whole process so easy. I would have spent weeks finding this information on my own. Highly recommended!',
                rating: 5,
              },
            ].map((testimonial) => (
              <Card key={testimonial.name} className="border-0 shadow-md">
                <CardContent className="p-6">
                  <div className="flex items-center gap-1 mb-3">
                    {Array(testimonial.rating).fill(0).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-brand-saffron text-brand-saffron" />
                    ))}
                  </div>
                  <Quote className="h-6 w-6 text-brand-blue/20 mb-2" />
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                    &ldquo;{testimonial.text}&rdquo;
                  </p>
                  <div className="border-t pt-3">
                    <p className="text-sm font-semibold">{testimonial.name}</p>
                    <p className="text-xs text-muted-foreground">{testimonial.location}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PRICING SECTION ===== */}
      <section className="py-20 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Simple, Transparent <span className="text-brand-saffron">Pricing</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Choose a plan that suits your needs. All plans include AI-powered scheme matching.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-4 sm:gap-6 max-w-5xl mx-auto">
            {PRICING_PLANS.map((plan) => (
              <Card
                key={plan.type}
                className={`relative border-2 transition-all hover:shadow-xl ${plan.highlighted
                  ? 'border-brand-saffron shadow-lg md:scale-105 z-10'
                  : 'border-border hover:-translate-y-1'
                  }`}
              >
                {plan.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="bg-brand-saffron text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
                      {plan.badge}
                    </span>
                  </div>
                )}
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-1">{plan.name}</h3>
                  <p className="text-xs text-muted-foreground mb-4">{plan.validity} access • {plan.searches}</p>
                  <div className="flex items-baseline gap-1 mb-6">
                    <span className="text-4xl font-bold">{formatCurrency(plan.price)}</span>
                    <span className="text-sm text-muted-foreground">one-time</span>
                  </div>
                  <ul className="space-y-2.5 mb-6">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2 text-sm">
                        <CheckCircle2 className="h-4 w-4 text-brand-green shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link href="/auth/signup">
                    <Button
                      className={`w-full ${plan.highlighted
                        ? 'bg-brand-saffron hover:bg-brand-saffron/90 text-white'
                        : ''
                        }`}
                      variant={plan.highlighted ? 'default' : 'outline'}
                    >
                      Get Started
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FAQ SECTION ===== */}
      <section className="py-20 bg-muted/30">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Frequently Asked <span className="text-brand-saffron">Questions</span>
            </h2>
          </div>

          <Accordion type="single" collapsible className="space-y-3">
            {[
              {
                q: 'What is SchemeIndia?',
                a: 'SchemeIndia is an AI-powered platform that helps Indian citizens discover government schemes (central and state) they are eligible for based on their personal profile. We scan thousands of schemes from official government sources and match them with your profile.',
              },
              {
                q: 'Where does SchemeIndia get its data?',
                a: 'All scheme data is sourced from official government websites including MyScheme.gov.in, India.gov.in, the National Scholarship Portal, PM India, and individual state government portals. We do not use any hardcoded data — everything is fetched and updated in real-time.',
              },
              {
                q: 'Why is SchemeIndia a paid service?',
                a: 'Maintaining real-time government data, running AI matching algorithms, and operating this platform requires significant resources. Our prices (starting at just ₹99) are a fraction of what touts at government offices charge (₹500-5,000) for the same information. We provide verified, comprehensive, and accurate data.',
              },
              {
                q: 'Is my personal information safe?',
                a: 'Absolutely. We use industry-standard encryption (256-bit SSL), secure payment processing via Razorpay, and strict data protection policies. Your personal information is only used for scheme matching and is never shared with third parties.',
              },
              {
                q: 'What if I am not satisfied with the results?',
                a: 'We offer a refund within 7 days if you are not satisfied with the service. Please contact our support team with your payment details and reason for dissatisfaction, and we will process a refund.',
              },
            ].map((faq, index) => (
              <AccordionItem key={index} value={`faq-${index}`} className="bg-card border rounded-lg px-6">
                <AccordionTrigger className="text-left font-semibold text-sm sm:text-base hover:no-underline">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-sm leading-relaxed">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="text-center mt-8">
            <Link href="/faq" className="text-sm text-brand-blue hover:underline font-medium">
              View all FAQs →
            </Link>
          </div>
        </div>
      </section>

      {/* ===== CTA SECTION ===== */}
      <section className="py-20 gradient-hero text-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Don&apos;t Leave Money on the Table
          </h2>
          <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
            Thousands of Indian citizens are missing out on government schemes they&apos;re entitled to.
            Find out what you&apos;re eligible for in just 5 minutes.
          </p>
          <Link href="/auth/signup">
            <Button
              size="lg"
              className="bg-brand-saffron hover:bg-brand-saffron-light text-white font-semibold text-lg px-10 py-6 rounded-xl shadow-xl hover:shadow-2xl transition-all"
            >
              Find My Schemes Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
    </>
  );
}
