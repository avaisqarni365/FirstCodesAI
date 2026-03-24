import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  BarChart3,
  Users,
  Mail,
  Phone,
  Bot,
  Shield,
  Code2,
  Database,
  Cloud,
  Cpu,
  LineChart,
  Globe,
  Star,
  CheckCircle2,
  Zap,
  Layers,
  Smartphone,
  Monitor,
  Braces,
  ChevronRight,
  MessageSquare,
  Award,
} from "lucide-react";

const services = [
  {
    icon: Bot,
    title: "AI & Machine Learning",
    description: "Custom AI solutions, intelligent chatbots, predictive analytics, and ML model development tailored to your business needs.",
  },
  {
    icon: Database,
    title: "Data Engineering",
    description: "End-to-end data pipelines, ETL workflows, data warehousing, and real-time processing for enterprise-scale operations.",
  },
  {
    icon: Cloud,
    title: "Cloud Solutions",
    description: "Cloud migration, multi-cloud architecture, serverless computing, and infrastructure optimization on AWS, Azure & GCP.",
  },
  {
    icon: Monitor,
    title: "Web Application Development",
    description: "Modern, responsive web applications using Next.js, React, and TypeScript with pixel-perfect UI/UX design.",
  },
  {
    icon: Smartphone,
    title: "Mobile App Development",
    description: "Native and cross-platform mobile apps for iOS and Android that deliver seamless user experiences.",
  },
  {
    icon: Braces,
    title: "Custom Software Development",
    description: "Bespoke software solutions built from scratch — CRM, ERP, SaaS platforms, and enterprise applications.",
  },
  {
    icon: LineChart,
    title: "Business Intelligence",
    description: "Transform raw data into actionable insights with interactive dashboards, automated reports, and KPI tracking.",
  },
  {
    icon: Shield,
    title: "Cybersecurity Solutions",
    description: "Comprehensive security audits, penetration testing, compliance implementation, and secure architecture design.",
  },
  {
    icon: Layers,
    title: "API & Integration Services",
    description: "Seamless API development, third-party integrations, microservices architecture, and system interconnectivity.",
  },
];

const stats = [
  { value: "150+", label: "Projects Delivered", icon: CheckCircle2 },
  { value: "50+", label: "Happy Clients", icon: Users },
  { value: "5+", label: "Years of Excellence", icon: Award },
  { value: "98%", label: "Client Satisfaction", icon: Star },
];

const portfolioProjects = [
  {
    title: "Enterprise Data Platform",
    client: "Anglian Water Services",
    category: "Data Engineering",
    description: "Built a comprehensive real-time data platform handling millions of daily events for water utility operations across eastern England.",
    tech: ["Python", "Azure", "Databricks", "Power BI"],
    color: "from-blue-500 to-blue-600",
  },
  {
    title: "AI Automation Suite",
    client: "TechCorp Ltd",
    category: "AI & Machine Learning",
    description: "Developed an intelligent automation platform that reduced manual processing by 85% using custom ML models and NLP.",
    tech: ["Python", "Claude API", "FastAPI", "React"],
    color: "from-violet-500 to-violet-600",
  },
  {
    title: "Cloud Migration & Modernisation",
    client: "GreenEnergy UK",
    category: "Cloud Solutions",
    description: "Migrated legacy on-premise infrastructure to a modern cloud-native architecture, reducing operational costs by 60%.",
    tech: ["AWS", "Docker", "Kubernetes", "Terraform"],
    color: "from-emerald-500 to-emerald-600",
  },
  {
    title: "FinTech Payment Platform",
    client: "FinanceHub PLC",
    category: "Custom Software",
    description: "Built a PCI-DSS compliant payment processing platform handling £2M+ daily transactions with 99.99% uptime.",
    tech: ["Node.js", "PostgreSQL", "Redis", "Stripe"],
    color: "from-amber-500 to-amber-600",
  },
];

const testimonials = [
  {
    quote: "CODES AI delivered an exceptional data platform that has transformed how we manage our operations. Their expertise in data engineering is truly outstanding.",
    name: "James Whitfield",
    title: "IT Director",
    company: "Anglian Water Services",
    rating: 5,
  },
  {
    quote: "Working with CODES AI has been a game-changer for our analytics capabilities. The platform they built exceeded all our expectations.",
    name: "Sarah Chen",
    title: "CTO",
    company: "DataFlow Systems",
    rating: 5,
  },
  {
    quote: "The AI automation suite from CODES AI is incredibly powerful. It has streamlined our development processes and saved us thousands of hours.",
    name: "David Chen",
    title: "CTO",
    company: "TechCorp Ltd",
    rating: 5,
  },
];

const solutions = [
  { icon: Users, title: "CRM Systems", description: "Custom CRM solutions to manage contacts, deals, and customer relationships effectively." },
  { icon: BarChart3, title: "ERP Solutions", description: "Enterprise resource planning systems that streamline your entire business workflow." },
  { icon: Mail, title: "Email Marketing Platforms", description: "AI-powered email marketing with campaign automation and analytics." },
  { icon: Phone, title: "VoIP & Communication Tools", description: "Integrated voice, video, and messaging solutions for modern businesses." },
  { icon: Globe, title: "E-Commerce Platforms", description: "Scalable online stores with payment integration and inventory management." },
  { icon: Cpu, title: "IoT Dashboards", description: "Real-time monitoring dashboards for connected devices and smart systems." },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* ===== TOP BAR ===== */}
      <div className="bg-warm-800 text-warm-300 text-xs py-2">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <span>info@codes-ai.uk</span>
            <span className="hidden sm:inline">+44 7586 094540</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden md:inline">Mon - Fri: 9:00 AM - 6:00 PM GMT</span>
          </div>
        </div>
      </div>

      {/* ===== NAVIGATION ===== */}
      <nav className="sticky top-0 z-50 bg-white border-b border-warm-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/logo.svg" alt="CODES AI" width={160} height={40} priority />
          </Link>
          <div className="hidden lg:flex items-center gap-8">
            <Link href="#services" className="text-sm font-medium text-warm-600 hover:text-peach-600 transition-colors">
              Services
            </Link>
            <Link href="#portfolio" className="text-sm font-medium text-warm-600 hover:text-peach-600 transition-colors">
              Our Work
            </Link>
            <Link href="#solutions" className="text-sm font-medium text-warm-600 hover:text-peach-600 transition-colors">
              Solutions
            </Link>
            <Link href="#testimonials" className="text-sm font-medium text-warm-600 hover:text-peach-600 transition-colors">
              Testimonials
            </Link>
            <Link href="#about" className="text-sm font-medium text-warm-600 hover:text-peach-600 transition-colors">
              About
            </Link>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="#contact"
              className="hidden sm:inline-flex text-sm font-medium text-warm-600 hover:text-peach-600 transition-colors"
            >
              Contact Us
            </Link>
            <Link
              href="/login"
              className="inline-flex items-center gap-2 text-sm font-semibold text-white bg-gradient-to-r from-peach-500 to-peach-400 hover:from-peach-600 hover:to-peach-500 px-5 py-2.5 rounded-lg shadow-md shadow-peach-200/50 transition-all"
            >
              Client Portal
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </nav>

      {/* ===== HERO SECTION ===== */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#FEF9F4] via-white to-[#FFF1E8]">
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: `radial-gradient(circle at 25px 25px, rgba(212, 118, 78, 0.06) 2px, transparent 0)`,
          backgroundSize: '50px 50px'
        }}></div>
        <div className="max-w-7xl mx-auto px-6 py-16 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: Text */}
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 bg-peach-50 border border-peach-200 rounded-full px-4 py-1.5 mb-6">
                <Zap className="w-3.5 h-3.5 text-peach-500" />
                <span className="text-xs font-semibold text-peach-700">AI-Powered Software Solutions</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-bold text-warm-800 leading-[1.15] tracking-tight">
                Custom Software
                <br />
                <span className="text-peach-500">Development</span>
                <br />
                Company
              </h1>
              <p className="mt-6 text-lg text-warm-500 leading-relaxed max-w-lg">
                CODES AI Private Limited is a trusted software development company specialising in
                AI automation, data engineering, and cloud solutions — serving clients across the UK and worldwide.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row items-start gap-4">
                <Link
                  href="#contact"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-peach-500 to-peach-600 hover:from-peach-600 hover:to-peach-700 text-white font-semibold px-8 py-3.5 rounded-xl shadow-lg shadow-peach-300/40 transition-all text-sm hover:shadow-xl hover:shadow-peach-300/50 hover:-translate-y-0.5"
                >
                  Schedule a FREE Consultation
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="#portfolio"
                  className="inline-flex items-center gap-2 bg-white border border-warm-200 text-warm-600 hover:text-warm-800 hover:border-warm-300 font-medium px-8 py-3.5 rounded-xl transition-all text-sm hover:shadow-md"
                >
                  View Our Work
                </Link>
              </div>
              <p className="mt-4 text-xs text-warm-400 flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5" />
                All our projects are secured by NDA
              </p>
            </div>

            {/* Right: Visual */}
            <div className="relative hidden lg:block">
              <div className="relative w-full aspect-square max-w-lg mx-auto">
                {/* Decorative background circles */}
                <div className="absolute inset-0 bg-gradient-to-br from-peach-100 to-peach-50 rounded-3xl rotate-3"></div>
                <div className="absolute inset-2 bg-white rounded-3xl shadow-2xl shadow-peach-200/30 -rotate-1 flex items-center justify-center p-8">
                  <div className="w-full h-full bg-gradient-to-br from-[#FEF9F4] to-white rounded-2xl border border-warm-100 p-8 flex flex-col items-center justify-center gap-6">
                    {/* Code icon */}
                    <div className="w-24 h-24 bg-gradient-to-br from-peach-400 to-peach-600 rounded-2xl flex items-center justify-center shadow-xl shadow-peach-200">
                      <Code2 className="w-12 h-12 text-white" />
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-warm-800">CODES AI</p>
                      <p className="text-sm text-warm-400 mt-1">Private Limited</p>
                    </div>
                    {/* Floating tech badges */}
                    <div className="flex flex-wrap justify-center gap-2">
                      {["AI/ML", "Data", "Cloud", "Web", "Mobile", "DevOps"].map((tech) => (
                        <span key={tech} className="px-3 py-1 bg-peach-50 border border-peach-200 rounded-full text-xs font-medium text-peach-700">
                          {tech}
                        </span>
                      ))}
                    </div>
                    {/* Mini stats */}
                    <div className="grid grid-cols-3 gap-4 w-full mt-2">
                      <div className="text-center p-3 bg-warm-50 rounded-xl">
                        <p className="text-lg font-bold text-warm-800">150+</p>
                        <p className="text-[10px] text-warm-400">Projects</p>
                      </div>
                      <div className="text-center p-3 bg-warm-50 rounded-xl">
                        <p className="text-lg font-bold text-warm-800">50+</p>
                        <p className="text-[10px] text-warm-400">Clients</p>
                      </div>
                      <div className="text-center p-3 bg-warm-50 rounded-xl">
                        <p className="text-lg font-bold text-warm-800">98%</p>
                        <p className="text-[10px] text-warm-400">Retention</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== TRUST BADGES ===== */}
      <section className="bg-white border-y border-warm-100 py-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
            {[
              { icon: Star, text: "5.0 Google Reviews", sub: "50+ Reviews" },
              { icon: Award, text: "Top Software Company", sub: "Clutch 2025" },
              { icon: Shield, text: "ISO 27001 Compliant", sub: "Security Certified" },
              { icon: CheckCircle2, text: "GDPR Compliant", sub: "Data Protection" },
            ].map((badge) => (
              <div key={badge.text} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-peach-50 flex items-center justify-center">
                  <badge.icon className="w-5 h-5 text-peach-500" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-warm-800">{badge.text}</p>
                  <p className="text-xs text-warm-400">{badge.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== STATS ===== */}
      <section className="py-16 bg-gradient-to-r from-warm-800 to-warm-700">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-7 h-7 text-peach-300" />
                </div>
                <p className="text-3xl sm:text-4xl font-bold text-white">{stat.value}</p>
                <p className="text-sm text-warm-300 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SERVICES ===== */}
      <section id="services" className="py-20 bg-[#FEF9F4]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-peach-500 uppercase tracking-wider mb-3">What We Offer</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-warm-800">
              Our Software Development Services
            </h2>
            <p className="mt-4 text-warm-500 max-w-2xl mx-auto">
              We deliver end-to-end software solutions that help businesses automate, scale, and innovate
              with cutting-edge technology.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <div
                key={service.title}
                className="group p-6 rounded-2xl bg-white border border-warm-100 hover:border-peach-200 hover:shadow-xl hover:shadow-peach-100/50 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-14 h-14 rounded-xl bg-peach-50 group-hover:bg-peach-100 flex items-center justify-center mb-5 transition-colors">
                  <service.icon className="w-7 h-7 text-peach-500" />
                </div>
                <h3 className="text-lg font-semibold text-warm-800 mb-2">{service.title}</h3>
                <p className="text-sm text-warm-500 leading-relaxed">{service.description}</p>
                <div className="mt-4 flex items-center gap-1 text-peach-500 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  Learn more <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== MID CTA ===== */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-gradient-to-br from-[#FFF8F3] to-[#FFF1E8] rounded-3xl border-2 border-peach-200 p-10 sm:p-14 text-center shadow-xl shadow-peach-100/30">
            <h2 className="text-2xl sm:text-3xl font-bold text-warm-800 mb-4">
              Need a Custom Software Solution?
            </h2>
            <p className="text-warm-500 max-w-xl mx-auto mb-8">
              Talk to our team about your requirements — whether you need to build a new product,
              modernise legacy systems, or integrate AI into your workflows. We&apos;ll help you plan and build exactly what you need.
            </p>
            <Link
              href="#contact"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-peach-500 to-peach-600 text-white font-semibold px-8 py-3.5 rounded-xl shadow-lg shadow-peach-300/40 hover:shadow-xl hover:shadow-peach-300/50 hover:-translate-y-0.5 transition-all text-sm"
            >
              Book Your Free Consultation
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ===== PORTFOLIO ===== */}
      <section id="portfolio" className="py-20 bg-[#FEF9F4]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-peach-500 uppercase tracking-wider mb-3">Our Work</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-warm-800">
              Projects & Case Studies
            </h2>
            <p className="mt-4 text-warm-500 max-w-2xl mx-auto">
              See how we&apos;ve helped businesses transform their operations with custom software solutions.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {portfolioProjects.map((project) => (
              <div
                key={project.title}
                className="group bg-white rounded-2xl border border-warm-100 overflow-hidden hover:shadow-xl hover:shadow-warm-100 transition-all duration-300 hover:-translate-y-1"
              >
                {/* Project header with gradient */}
                <div className={`h-48 bg-gradient-to-br ${project.color} p-6 flex flex-col justify-between`}>
                  <span className="inline-flex self-start bg-white/20 backdrop-blur-sm text-white text-xs font-medium px-3 py-1 rounded-full">
                    {project.category}
                  </span>
                  <div>
                    <p className="text-white/70 text-sm">{project.client}</p>
                    <h3 className="text-xl font-bold text-white">{project.title}</h3>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-sm text-warm-500 leading-relaxed mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((t) => (
                      <span key={t} className="px-2.5 py-1 bg-warm-50 text-warm-600 text-xs font-medium rounded-lg">
                        {t}
                      </span>
                    ))}
                  </div>
                  <span className="text-peach-500 text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                    View Case Study <ChevronRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SOLUTIONS ===== */}
      <section id="solutions" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-peach-500 uppercase tracking-wider mb-3">Solutions</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-warm-800">
              Custom Software Solutions We Build
            </h2>
            <p className="mt-4 text-warm-500 max-w-2xl mx-auto">
              We build industry-ready software solutions tailored to your specific business needs.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {solutions.map((solution) => (
              <div
                key={solution.title}
                className="group p-6 rounded-2xl border border-warm-100 bg-[#FEF9F4] hover:bg-white hover:border-peach-200 hover:shadow-lg hover:shadow-peach-100/30 transition-all duration-300 text-center"
              >
                <div className="w-16 h-16 rounded-2xl bg-white group-hover:bg-peach-50 border border-warm-100 group-hover:border-peach-200 flex items-center justify-center mx-auto mb-4 transition-all shadow-sm">
                  <solution.icon className="w-7 h-7 text-peach-500" />
                </div>
                <h3 className="text-base font-semibold text-warm-800 mb-2">{solution.title}</h3>
                <p className="text-sm text-warm-500 leading-relaxed">{solution.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section id="testimonials" className="py-20 bg-[#FEF9F4]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-peach-500 uppercase tracking-wider mb-3">Testimonials</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-warm-800">
              Clients Love CODES AI
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.name}
                className="bg-white rounded-2xl border border-warm-100 p-8 hover:shadow-xl hover:shadow-warm-100 transition-all duration-300"
              >
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                {/* Quote */}
                <p className="text-warm-600 leading-relaxed mb-6 text-sm">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
                {/* Author */}
                <div className="flex items-center gap-3 pt-4 border-t border-warm-100">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-peach-400 to-peach-500 flex items-center justify-center text-white font-semibold text-sm">
                    {testimonial.name.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-warm-800">{testimonial.name}</p>
                    <p className="text-xs text-warm-400">{testimonial.title}, {testimonial.company}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== ABOUT ===== */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-sm font-semibold text-peach-500 uppercase tracking-wider mb-3">About Us</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-warm-800 mb-6">
                Why Choose CODES AI?
              </h2>
              <p className="text-warm-500 leading-relaxed mb-6">
                CODES AI Private Limited is a UK-based technology company founded with a mission to
                make AI and advanced software accessible to businesses of all sizes. We combine deep
                technical expertise with a client-first approach.
              </p>
              <div className="space-y-4">
                {[
                  "Expert team with 5+ years in AI, Data Engineering & Cloud",
                  "Agile development methodology with weekly sprints",
                  "Transparent pricing with no hidden costs",
                  "Post-launch support and maintenance included",
                  "UK-based with global delivery capabilities",
                  "NDA-secured projects with GDPR compliance",
                ].map((point) => (
                  <div key={point} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-peach-500 shrink-0 mt-0.5" />
                    <p className="text-sm text-warm-600">{point}</p>
                  </div>
                ))}
              </div>
              <div className="mt-8">
                <Link
                  href="#contact"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-peach-500 to-peach-600 text-white font-semibold px-8 py-3.5 rounded-xl shadow-lg shadow-peach-300/40 hover:shadow-xl hover:-translate-y-0.5 transition-all text-sm"
                >
                  Start Your Project
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: Bot, label: "AI & ML", desc: "Claude, GPT, Custom Models" },
                  { icon: Database, label: "Data Engineering", desc: "Azure, AWS, Databricks" },
                  { icon: Cloud, label: "Cloud", desc: "AWS, Azure, GCP" },
                  { icon: Code2, label: "Full Stack", desc: "React, Next.js, Node" },
                ].map((item) => (
                  <div key={item.label} className="p-6 bg-[#FEF9F4] rounded-2xl border border-warm-100 text-center hover:shadow-lg hover:border-peach-200 transition-all">
                    <div className="w-12 h-12 rounded-xl bg-peach-50 flex items-center justify-center mx-auto mb-3">
                      <item.icon className="w-6 h-6 text-peach-500" />
                    </div>
                    <p className="font-semibold text-warm-800 text-sm">{item.label}</p>
                    <p className="text-xs text-warm-400 mt-1">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CONTACT CTA ===== */}
      <section id="contact" className="py-20 bg-gradient-to-br from-warm-800 via-warm-700 to-warm-800">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-peach-400 to-peach-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-peach-900/20">
            <MessageSquare className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Let&apos;s Build Something Great Together
          </h2>
          <p className="text-warm-300 max-w-xl mx-auto mb-8 leading-relaxed">
            Get a free consultation and project estimate. Our team will get back to you within 24 hours.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="mailto:info@codes-ai.uk"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-peach-500 to-peach-400 text-white font-semibold px-8 py-3.5 rounded-xl shadow-lg shadow-peach-900/30 hover:shadow-xl hover:-translate-y-0.5 transition-all text-sm"
            >
              <Mail className="w-4 h-4" />
              info@codes-ai.uk
            </a>
            <a
              href="tel:+447586094540"
              className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white font-medium px-8 py-3.5 rounded-xl hover:bg-white/20 transition-all text-sm"
            >
              <Phone className="w-4 h-4" />
              +44 7586 094540
            </a>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="bg-warm-900 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
            {/* Company Info */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Image src="/logo-white.svg" alt="CODES AI" width={140} height={35} />
              </div>
              <p className="text-sm text-warm-400 leading-relaxed mb-4">
                AI-powered software solutions, data engineering, and cloud computing services for businesses across the UK and worldwide.
              </p>
              <p className="text-xs text-warm-500">CODES AI Private Limited</p>
              <p className="text-xs text-warm-500">United Kingdom</p>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-sm font-semibold text-white mb-4">Services</h4>
              <ul className="space-y-2">
                {["AI & Machine Learning", "Data Engineering", "Cloud Solutions", "Web Development", "Mobile Apps", "Custom Software"].map((s) => (
                  <li key={s}>
                    <span className="text-sm text-warm-400 hover:text-peach-400 transition-colors cursor-pointer">{s}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="text-sm font-semibold text-white mb-4">Company</h4>
              <ul className="space-y-2">
                {["About Us", "Our Work", "Testimonials", "Contact Us", "Privacy Policy", "Terms of Service"].map((s) => (
                  <li key={s}>
                    <span className="text-sm text-warm-400 hover:text-peach-400 transition-colors cursor-pointer">{s}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-sm font-semibold text-white mb-4">Get in Touch</h4>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-peach-400" />
                  <span className="text-sm text-warm-400">info@codes-ai.uk</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-peach-400" />
                  <span className="text-sm text-warm-400">+44 7586 094540</span>
                </div>
                <div className="flex items-center gap-3">
                  <Globe className="w-4 h-4 text-peach-400" />
                  <span className="text-sm text-warm-400">codes-ai.uk</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="pt-8 border-t border-warm-700 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-warm-500">
              &copy; {new Date().getFullYear()} CODES AI Private Limited. All rights reserved.
            </p>
            <div className="flex items-center gap-4 text-xs text-warm-500">
              <span className="hover:text-warm-300 cursor-pointer">Privacy Policy</span>
              <span className="hover:text-warm-300 cursor-pointer">Terms of Service</span>
              <span className="hover:text-warm-300 cursor-pointer">Cookie Policy</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
