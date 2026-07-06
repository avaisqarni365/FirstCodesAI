import {
  Bot, Database, Cloud, Monitor, Smartphone, Braces,
  LineChart, Lock, Layers, Brain, Cpu, Server, Zap,
  GitBranch, Shield, Eye, Gauge, FileCode, CircuitBoard,
  Boxes, BarChart3, Globe, Workflow, Terminal, Code2,
  Users, Search, Phone, Calculator, Sparkles,
} from "lucide-react";

export type ServiceVariant =
  | "terminal"    // command-line / ops desk feel
  | "pipeline"    // horizontal flowing pipeline
  | "switchboard" // comms / channels board
  | "ledger"      // finance / accounting sheet
  | "orbit"       // team / marketplace orbit
  | "neural"      // AI / model graph
  | "lakehouse"   // data layers
  | "cloudmap"    // cloud regions map
  | "browser"     // web app browser frame
  | "device"      // mobile device frame
  | "blueprint"   // custom software blueprint
  | "dashboard"   // BI dashboard
  | "vault"       // security vault
  | "graph";      // API/integration node graph

export interface ServiceData {
  slug: string;
  title: string;
  tagline: string;
  icon: typeof Bot;
  color: string;
  gradient: string;
  description: string;
  longDescription: string;
  benefits: string[];
  process: { step: string; title: string; desc: string; icon: typeof Bot; tech?: string[] }[];
  technologies: { category: string; items: string[] }[];
  useCases: { title: string; desc: string; metric: string }[];
  faq: { q: string; a: string }[];
}

export const servicesData: ServiceData[] = [
  {
    slug: "remote-sales-crm-ops",
    title: "Remote Sales & CRM Ops",
    tagline: "We run your entire sales pipeline remotely — contacts, deals, and follow-ups, handled",
    icon: Users,
    color: "text-peach-600",
    gradient: "from-peach-500 to-peach-600",
    description: "Your outsourced remote sales desk. We operate your CRM — contacts, Kanban deal pipeline, and the full activity timeline — so nothing slips.",
    longDescription: "CODES AI becomes your remote sales operations team. We manage your contacts database, drive deals across a visual Kanban pipeline, and log every interaction on a single activity timeline — calls, emails, meetings and notes. You get a professionally run sales function without hiring, onboarding, or managing an in-house team, operated on CRM software we've already built and run for our own business.",
    benefits: [
      "A fully staffed remote sales desk without in-house headcount",
      "Every deal tracked on a visual Kanban pipeline with clear stages",
      "Complete interaction history — calls, emails, notes — on one timeline",
      "Consistent, timezone-agnostic follow-up so no lead goes cold",
      "Weekly pipeline reviews and forecast visibility",
      "Clean, deduplicated contact data maintained continuously",
    ],
    process: [
      { step: "01", title: "Onboard", desc: "We import your contacts and map your sales stages into the CRM pipeline.", icon: Eye },
      { step: "02", title: "Structure", desc: "Define deal stages, ownership, and follow-up cadences for your business.", icon: Boxes },
      { step: "03", title: "Operate", desc: "Our remote team works the pipeline daily — advancing deals and logging every interaction.", icon: Workflow },
      { step: "04", title: "Report", desc: "Weekly pipeline health, conversion and forecast reporting.", icon: BarChart3 },
      { step: "05", title: "Optimise", desc: "We refine stages and cadences based on what's converting.", icon: Gauge },
    ],
    technologies: [
      { category: "CRM Platform", items: ["Contacts Database", "Kanban Deal Pipeline", "Activity Timeline", "Interaction Logging"] },
      { category: "Integrations", items: ["Email Sync", "VoIP Call Logs", "WhatsApp Threads", "Lead Pipeline Handoff"] },
      { category: "Reporting", items: ["Pipeline Forecasts", "Conversion Metrics", "Activity Reports"] },
    ],
    useCases: [
      { title: "Outsourced SDR Desk", desc: "We run first-touch and follow-up for inbound and sourced leads, keeping every deal moving through the pipeline.", metric: "0 leads left un-actioned" },
      { title: "Founder-Led Sales Handover", desc: "Took over pipeline management from a time-poor founder, structuring stages and running daily follow-up.", metric: "100% activity logged" },
      { title: "Multi-Timezone Coverage", desc: "Operated a UK client's pipeline against EU and US prospects with timezone-aware follow-up.", metric: "3 regions covered" },
    ],
    faq: [
      { q: "Do we need our own CRM?", a: "No. We operate everything on the CRM platform we've already built and run in-house — contacts, Kanban pipeline and activity timeline are all included. If you have an existing CRM, we can work alongside it." },
      { q: "Who owns the data?", a: "You do. All contacts, deals and interaction history are yours and can be exported at any time. Everything is handled under NDA and GDPR." },
      { q: "How is this different from hiring a salesperson?", a: "You get a trained remote team operating proven software from day one — no recruitment, onboarding, tooling cost, or management overhead, and no single point of failure." },
    ],
  },
  {
    slug: "global-lead-generation",
    title: "Global Lead Generation",
    tagline: "We find and enrich your ideal customers — worldwide — and hand them to your pipeline",
    icon: Search,
    color: "text-blue-600",
    gradient: "from-blue-600 to-cyan-600",
    description: "Remote prospecting powered by Companies House data, SIC-code IT directories, and web enrichment across UK, EU, US, IN and AE.",
    longDescription: "Our remote lead-generation desk builds you a steady flow of qualified, enriched prospects. We search live UK company data via the Companies House API, target sectors by SIC code through our IT directory, and run Profile Intelligence — discovering the company behind a person and enriching records with web data via Google Custom Search and DuckDuckGo, plus job-listing signals. We support UK, EU, US, IN and AE regions, save qualified companies, and feed them straight into your sales pipeline.",
    benefits: [
      "Live UK company search via the Companies House API",
      "Sector targeting by SIC code through a curated IT directory",
      "Profile Intelligence: person-to-company discovery with web enrichment",
      "Job-listing signals to spot hiring and buying intent",
      "Multi-region coverage — UK, EU, US, IN, AE",
      "Qualified companies saved and pushed into your sales pipeline",
    ],
    process: [
      { step: "01", title: "Define ICP", desc: "We agree your ideal customer profile — sector, size, region, and buying signals.", icon: Eye },
      { step: "02", title: "Source", desc: "Search Companies House and the SIC-code IT directory for matching companies.", icon: Search },
      { step: "03", title: "Enrich", desc: "Profile Intelligence enriches records via web search and job-listing parsing.", icon: Globe },
      { step: "04", title: "Qualify", desc: "We filter and save the companies that fit, discarding the noise.", icon: Shield },
      { step: "05", title: "Handoff", desc: "Qualified prospects flow into your CRM pipeline ready for outreach.", icon: Workflow },
    ],
    technologies: [
      { category: "Data Sources", items: ["Companies House UK API", "SIC-Code IT Directory", "Google Custom Search", "DuckDuckGo", "Job Listings"] },
      { category: "Enrichment", items: ["Profile Intelligence", "Person → Company Discovery", "Web Enrichment", "Regional Support (UK/EU/US/IN/AE)"] },
      { category: "Pipeline", items: ["Saved Companies", "Lead Pipeline", "CRM Handoff"] },
    ],
    useCases: [
      { title: "UK IT-Sector Prospecting", desc: "Built a targeted list of UK IT companies by SIC code, enriched with decision-maker profiles and current job openings.", metric: "SIC-targeted lists" },
      { title: "Person-to-Company Discovery", desc: "Started from named individuals and used Profile Intelligence to resolve their companies and enrich full records.", metric: "Web-enriched profiles" },
      { title: "Multi-Region Expansion", desc: "Generated qualified prospects across EU, US and AE for a UK client entering new markets.", metric: "5 regions supported" },
    ],
    faq: [
      { q: "Where does the company data come from?", a: "Primarily the official Companies House UK API for live company records, plus our SIC-code IT directory, and web enrichment via Google Custom Search and DuckDuckGo. All sourcing is public-data and GDPR-conscious." },
      { q: "Can you generate leads outside the UK?", a: "Yes. Our Profile Intelligence supports UK, EU, US, IN and AE regions, with web enrichment and job-listing signals for each." },
      { q: "How do leads reach our sales team?", a: "Qualified companies are saved and pushed into the CRM pipeline, so your remote sales desk (or your own team) can action them immediately." },
    ],
  },
  {
    slug: "remote-communications-desk",
    title: "Remote Communications Desk",
    tagline: "Your calls, WhatsApp and email — answered and actioned by a remote team, anywhere",
    icon: Phone,
    color: "text-emerald-600",
    gradient: "from-emerald-600 to-teal-600",
    description: "A remote front desk running WhatsApp Business chat, a Twilio VoIP dialer with call logs, and a unified email inbox — all logged to your CRM.",
    longDescription: "We operate your customer communications remotely across every channel. Our desk handles WhatsApp Business conversations, outbound and inbound calls through a Twilio-powered VoIP dialer with full call logging, and a unified email inbox over SMTP/IMAP. Every conversation is captured against the right contact in your CRM, so your history stays complete and nothing falls through the cracks — regardless of timezone.",
    benefits: [
      "WhatsApp Business chat handled by a remote team",
      "Twilio VoIP dialer with complete, searchable call logs",
      "Unified email inbox over SMTP/IMAP across your addresses",
      "Every interaction logged against the CRM contact",
      "Timezone-agnostic coverage for inbound enquiries",
      "Consistent, on-brand responses across all channels",
    ],
    process: [
      { step: "01", title: "Connect", desc: "We connect your WhatsApp Business, VoIP numbers, and email accounts.", icon: Phone },
      { step: "02", title: "Playbook", desc: "Agree tone, response templates, and escalation rules for your business.", icon: FileCode },
      { step: "03", title: "Operate", desc: "Our desk answers chats, makes and logs calls, and works the inbox daily.", icon: Workflow },
      { step: "04", title: "Log", desc: "Every conversation is attached to the right CRM contact automatically.", icon: Boxes },
      { step: "05", title: "Review", desc: "Response-time and volume reporting, with continuous playbook tuning.", icon: Gauge },
    ],
    technologies: [
      { category: "Channels", items: ["WhatsApp Business API", "Twilio VoIP Dialer", "Unified Inbox", "SMTP/IMAP Email"] },
      { category: "Logging", items: ["Call Logs", "Chat History", "CRM Interaction Timeline"] },
      { category: "Operations", items: ["Response Templates", "Escalation Rules", "Coverage Scheduling"] },
    ],
    useCases: [
      { title: "Outsourced Front Desk", desc: "Handled all inbound WhatsApp and email for a services business, logging each thread to the CRM.", metric: "One unified inbox" },
      { title: "Outbound Calling Campaign", desc: "Ran a VoIP dialer campaign with full call logging and CRM follow-up tasks.", metric: "Every call logged" },
      { title: "After-Hours Coverage", desc: "Provided remote coverage across timezones so enquiries were never left waiting.", metric: "Timezone-agnostic" },
    ],
    faq: [
      { q: "Which channels can you run?", a: "WhatsApp Business chat, voice calls via a Twilio-powered VoIP dialer with call logs, and a unified email inbox over SMTP/IMAP — all operated on software we already run in-house." },
      { q: "Do calls and messages get recorded in our CRM?", a: "Yes. Every call log, chat and email is captured against the relevant contact on the CRM activity timeline, so your history stays complete." },
      { q: "Can you use our existing phone numbers and email?", a: "Yes. We connect your existing WhatsApp Business number, VoIP numbers, and email accounts rather than replacing them." },
    ],
  },
  {
    slug: "remote-finance-invoicing-ops",
    title: "Remote Finance & Invoicing Ops",
    tagline: "Invoices, expenses and VAT-ready reporting — run remotely so your books stay clean",
    icon: Calculator,
    color: "text-amber-600",
    gradient: "from-amber-600 to-orange-600",
    description: "Your remote back-office finance desk: VAT invoices, expense tracking, and P&L, VAT-return and cash-flow reports — kept up to date for you.",
    longDescription: "CODES AI runs the finance admin most owners dread. Our remote back-office raises and tracks VAT invoices, records and categorises expenses, and produces the reports you actually need to run the business — profit & loss, VAT return, and cash flow. Everything is kept current so you always know where you stand and month-end is never a scramble, operated on accounting software we've already built and ship as our own product, ACCA (acca.codes-ai.uk) — fully-remote accounting for clients worldwide.",
    benefits: [
      "VAT-compliant invoices raised and chased for you",
      "Expenses recorded and categorised continuously",
      "P&L, VAT-return and cash-flow reports kept current",
      "A clean, always-up-to-date financial picture",
      "Remote back-office with no in-house finance hire",
      "Handled under NDA with GDPR-conscious data handling",
    ],
    process: [
      { step: "01", title: "Set Up", desc: "We configure your VAT settings, invoice templates, and expense categories.", icon: FileCode },
      { step: "02", title: "Invoice", desc: "Raise, send and track VAT invoices, with follow-up on overdue amounts.", icon: Calculator },
      { step: "03", title: "Record", desc: "Log and categorise expenses as they happen.", icon: Boxes },
      { step: "04", title: "Report", desc: "Produce P&L, VAT-return and cash-flow reports on a regular cadence.", icon: BarChart3 },
      { step: "05", title: "Review", desc: "Monthly review of numbers and cash position with you.", icon: Gauge },
    ],
    technologies: [
      { category: "Invoicing", items: ["VAT Invoices", "Invoice Tracking", "Payment Follow-up"] },
      { category: "Expenses", items: ["Expense Recording", "Categorisation", "Receipt Tracking"] },
      { category: "Reporting", items: ["Profit & Loss", "VAT Return", "Cash Flow"] },
    ],
    useCases: [
      { title: "Outsourced Invoicing", desc: "Took over raising and chasing VAT invoices for a growing services business.", metric: "VAT-compliant billing" },
      { title: "Always-Current Books", desc: "Kept expenses and reports up to date so month-end reporting was instant.", metric: "Real-time P&L" },
      { title: "Cash-Flow Visibility", desc: "Delivered regular cash-flow reporting so the owner could plan spend with confidence.", metric: "Cash flow on demand" },
    ],
    faq: [
      { q: "Are you a replacement for an accountant?", a: "We handle day-to-day finance operations — invoicing, expenses and management reporting (P&L, VAT return, cash flow). We complement your accountant rather than replace statutory filing and audit responsibilities." },
      { q: "Do your invoices handle UK VAT?", a: "Yes. Invoices are VAT-compliant and we produce VAT-return reporting on the software we run in-house." },
      { q: "How do we share financial data securely?", a: "Everything is handled under NDA with GDPR-conscious data handling, and you retain full ownership and export of all records." },
    ],
  },
  {
    slug: "remote-team-enablement",
    title: "Remote Team Enablement",
    tagline: "Team profiles, an AI-tools marketplace and collaboration — your ops team, equipped",
    icon: Sparkles,
    color: "text-violet-600",
    gradient: "from-violet-600 to-purple-600",
    description: "The Team Hub behind our remote operations: team profiles, a curated AI-tools marketplace, and shared collaboration workspace.",
    longDescription: "Every remote operation we run is powered by our Team Hub. It gives you visibility into the team operating your account, a curated marketplace of the AI tools we use — Claude, Cursor, Kimi, Databricks, Fabric and Power BI — and a shared collaboration space to keep work moving. This is how we deliver a coordinated, well-equipped remote back-office rather than a set of disconnected freelancers.",
    benefits: [
      "Clear visibility of the team operating your account",
      "Curated AI-tools marketplace: Claude, Cursor, Kimi, Databricks, Fabric, Power BI",
      "Shared collaboration workspace for coordinated delivery",
      "Consistent tooling and process across every engagement",
      "A coordinated remote team, not disconnected freelancers",
      "Best-practice AI tooling applied to your operations",
    ],
    process: [
      { step: "01", title: "Assemble", desc: "We assign and profile the remote team operating your account.", icon: Users },
      { step: "02", title: "Equip", desc: "Provision the right AI tools from the marketplace for your workload.", icon: Sparkles },
      { step: "03", title: "Collaborate", desc: "Run delivery through a shared collaboration workspace.", icon: Workflow },
      { step: "04", title: "Coordinate", desc: "Keep CRM, comms, leads and finance ops joined up across the team.", icon: Boxes },
      { step: "05", title: "Improve", desc: "Continuously refine tooling and process as your needs evolve.", icon: Gauge },
    ],
    technologies: [
      { category: "Team Hub", items: ["Team Profiles", "Collaboration Workspace", "Shared Context"] },
      { category: "AI Tools Marketplace", items: ["Claude", "Cursor", "Kimi", "Databricks", "Fabric", "Power BI"] },
      { category: "Coordination", items: ["Cross-Module Workflows", "Shared Reporting", "Process Playbooks"] },
    ],
    useCases: [
      { title: "Coordinated Remote Desk", desc: "Ran a client's sales, comms and finance ops through one coordinated Team Hub instead of siloed contractors.", metric: "One coordinated team" },
      { title: "AI-Equipped Operations", desc: "Applied Claude and Power BI from the marketplace to speed up outreach and reporting.", metric: "AI-assisted delivery" },
      { title: "Transparent Delivery", desc: "Gave a client full visibility of the team and tools operating their account.", metric: "Full team visibility" },
    ],
    faq: [
      { q: "Which AI tools do you use?", a: "Our Team Hub marketplace includes Claude, Cursor, Kimi, Databricks, Fabric and Power BI. We apply the right tool to each part of your operations." },
      { q: "Will we know who is working on our account?", a: "Yes. Team profiles give you clear visibility of the remote team operating your account and how work is coordinated." },
      { q: "Is this a standalone service?", a: "It underpins all our remote-ops services. It's the collaboration and tooling layer that makes the sales, comms, leads and finance desks work as one team." },
    ],
  },
  {
    slug: "ai-machine-learning",
    title: "AI & Machine Learning",
    tagline: "Custom AI solutions that think, learn, and adapt for your business",
    icon: Bot,
    color: "text-violet-600",
    gradient: "from-violet-600 to-purple-600",
    description: "Custom AI models, intelligent chatbots, predictive analytics. Claude, GPT & bespoke LLM solutions.",
    longDescription: "We build AI systems that go beyond basic automation. From fine-tuned language models to computer vision pipelines, our solutions are designed for production — not demos. We use Claude, GPT, and custom-trained models to solve real business problems at enterprise scale. We also ship our own AI-native product, SparkVibe (vibe.codes-ai.uk) — a vibe engineering studio for Claude & Cursor — built end-to-end with this same approach.",
    benefits: [
      "40% reduction in development time with AI-assisted coding",
      "99.9% accuracy on data processing pipelines",
      "Custom models trained on your proprietary data",
      "Production-ready MLOps with monitoring and retraining",
      "Natural language interfaces for non-technical users",
      "Seamless integration with existing workflows",
    ],
    process: [
      { step: "01", title: "Discovery", desc: "We analyse your data, workflows, and bottlenecks to identify high-impact AI opportunities.", icon: Eye },
      { step: "02", title: "Model Design", desc: "Architecture selection — fine-tuning vs RAG vs custom training — based on your data and budget.", icon: Brain },
      { step: "03", title: "Development", desc: "Iterative model development with continuous evaluation against your real-world test cases.", icon: Code2 },
      { step: "04", title: "Integration", desc: "API deployment, monitoring dashboards, and seamless integration into your tech stack.", icon: Layers },
      { step: "05", title: "Optimise", desc: "Continuous improvement — model retraining, performance tuning, and cost optimization.", icon: Gauge },
    ],
    technologies: [
      { category: "LLMs & APIs", items: ["Claude (Anthropic)", "GPT-4", "Local LLMs", "Hugging Face", "LangChain", "RAG Pipelines"] },
      { category: "ML Frameworks", items: ["PyTorch", "TensorFlow", "scikit-learn", "XGBoost", "MLflow", "Weights & Biases"] },
      { category: "Infrastructure", items: ["Azure ML Studio", "AWS SageMaker", "Databricks ML", "Docker", "Kubernetes", "FastAPI"] },
    ],
    useCases: [
      { title: "AI-Assisted Development Framework", desc: "Built a local LLM-powered system that automates data warehouse design, ETL pipeline generation, and cloud infrastructure code.", metric: "40% faster development" },
      { title: "Intelligent Customer Support", desc: "RAG-based chatbot trained on 50K+ support tickets, resolving 70% of queries without human intervention.", metric: "70% ticket deflection" },
      { title: "Predictive Maintenance System", desc: "ML pipeline processing billions of IoT sensor readings to predict equipment failures 48 hours in advance.", metric: "99.9% data accuracy" },
    ],
    faq: [
      { q: "Do you use pre-built AI or custom models?", a: "Both. We evaluate your needs — sometimes a fine-tuned Claude or GPT is perfect, other times a custom-trained model on your data delivers better results. We always choose the most cost-effective approach." },
      { q: "How do you handle data privacy?", a: "All projects are NDA-secured. We can deploy models on your own infrastructure (on-premise or private cloud) so your data never leaves your control. We support Azure Private Endpoints, AWS PrivateLink, and air-gapped deployments." },
      { q: "What's the typical timeline for an AI project?", a: "MVP in 4-8 weeks, production system in 8-16 weeks depending on complexity. We ship incrementally so you see value from week 2." },
    ],
  },
  {
    slug: "data-engineering",
    title: "Data Engineering",
    tagline: "Enterprise data pipelines that process billions of records with 99.9% accuracy",
    icon: Database,
    color: "text-blue-600",
    gradient: "from-blue-600 to-cyan-600",
    description: "Delta Lakehouse, ETL/ELT pipelines, real-time streaming. Azure, Databricks, Snowflake at enterprise scale.",
    longDescription: "12+ years of building enterprise data platforms for companies like Anglian Water, Carl Zeiss, E.ON, and Volkswagen. We specialise in medallion architectures (Landing → Curated → Serving), Delta Lakehouse implementations, and real-time streaming pipelines that process terabytes daily.",
    benefits: [
      "Medallion architecture (Bronze/Silver/Gold) for data quality",
      "Process billions of JSON/CSV files with ACID compliance",
      "40% query performance improvements through optimization",
      "€120K+ annual cloud cost savings through architecture design",
      "Real-time streaming with 99% processing guarantee",
      "Automated data quality monitoring and alerting",
    ],
    process: [
      { step: "01", title: "Data Audit", desc: "Map all data sources, assess quality, identify gaps, and define the target architecture.", icon: FileCode },
      { step: "02", title: "Architecture Design", desc: "Design medallion Lakehouse (Landing → Curated → Serving) with Delta Lake and ACID compliance.", icon: Boxes },
      { step: "03", title: "Pipeline Development", desc: "Build ETL/ELT pipelines with Azure Data Factory, Databricks, and PySpark for batch and streaming.", icon: Workflow },
      { step: "04", title: "Quality & Governance", desc: "Implement data validation, lineage tracking, Microsoft Purview, and automated monitoring.", icon: Shield },
      { step: "05", title: "Visualization", desc: "Power BI/Tableau dashboards with Row Level Security and automated refresh schedules.", icon: BarChart3 },
    ],
    technologies: [
      { category: "Data Platforms", items: ["Databricks", "Delta Lake", "Snowflake", "Azure Synapse", "Microsoft Fabric", "AWS Glue"] },
      { category: "Processing", items: ["PySpark", "Python", "SQL", "Azure Data Factory", "SSIS", "Informatica PowerCenter"] },
      { category: "Storage & Governance", items: ["ADLS Gen2", "OneLake", "Delta-Parquet", "Microsoft Purview", "Apache Kafka", "Event Hubs"] },
    ],
    useCases: [
      { title: "Enterprise Data Platform — Anglian Water", desc: "Microsoft Fabric & Databricks implementation controlling 250+ products as a framework with Delta-Parquet in OneLake.", metric: "250+ products managed" },
      { title: "IoT Sensor Lakehouse", desc: "Delta Lakehouse processing billions of sensor JSON files with ACID-compliant storage, automated schema evolution, and real-time monitoring.", metric: "99.9% data accuracy" },
      { title: "SAP-to-Azure Migration — Carl Zeiss", desc: "Customer 360 analytics integrating SAP CRM/ERP with Azure Synapse. 40% faster reporting and 50% less manual reconciliation.", metric: "€120K/year savings" },
    ],
    faq: [
      { q: "What's a medallion architecture?", a: "It's a data design pattern with three layers: Bronze (raw landing), Silver (cleaned/validated), Gold (business-ready). Each layer adds quality and structure, making data progressively more reliable for analytics and reporting." },
      { q: "Can you migrate our existing data warehouse?", a: "Yes. We've migrated SSIS, Informatica, and on-premise SQL Server warehouses to Azure/Databricks for multiple enterprise clients including Flaschenpost, E.ON, and Dornbracht." },
      { q: "How do you handle data quality?", a: "Automated validation rules at every pipeline stage, data profiling, anomaly detection, and Microsoft Purview for governance. We typically achieve 99.5%+ data accuracy." },
    ],
  },
  {
    slug: "cloud-architecture",
    title: "Cloud Architecture",
    tagline: "Multi-cloud infrastructure optimized for cost, performance, and security",
    icon: Cloud,
    color: "text-emerald-600",
    gradient: "from-emerald-600 to-teal-600",
    description: "Multi-cloud infrastructure. Serverless, Kubernetes, IaC. AWS, Azure, GCP — optimized for cost and speed.",
    longDescription: "We design and implement cloud architectures that scale with your business. From serverless microservices to Kubernetes clusters, we optimize for cost, performance, and security across AWS, Azure, and GCP. Our architectures have saved clients over €150K in annual cloud costs.",
    benefits: [
      "30-60% cloud cost reduction through architecture optimization",
      "Infrastructure as Code with Terraform/ARM templates",
      "Zero-downtime deployments with blue/green strategies",
      "Multi-region disaster recovery and high availability",
      "Automated scaling based on real-time demand",
      "SOC2/ISO 27001 compliant infrastructure",
    ],
    process: [
      { step: "01", title: "Assessment", desc: "Audit current infrastructure, identify waste, and define target cloud architecture.", icon: Eye },
      { step: "02", title: "Design", desc: "Architecture design with IaC, networking, security groups, and cost projections.", icon: CircuitBoard },
      { step: "03", title: "Migration", desc: "Phased migration with rollback plans. Zero-downtime cutover strategies.", icon: Server },
      { step: "04", title: "Automation", desc: "CI/CD pipelines, auto-scaling, monitoring, and alerting configuration.", icon: Workflow },
      { step: "05", title: "Optimise", desc: "Continuous cost optimization, reserved instances, spot instances, and right-sizing.", icon: Gauge },
    ],
    technologies: [
      { category: "Cloud Providers", items: ["Azure", "AWS", "Google Cloud Platform", "IONOS", "DigitalOcean"] },
      { category: "Containers & Orchestration", items: ["Docker", "Kubernetes", "Azure AKS", "AWS EKS", "Helm", "Istio"] },
      { category: "IaC & DevOps", items: ["Terraform", "ARM Templates", "CloudFormation", "Azure DevOps", "GitHub Actions", "Jenkins"] },
    ],
    useCases: [
      { title: "Cloud Migration — GreenEnergy UK", desc: "Migrated legacy on-premise infrastructure to modern cloud-native architecture on AWS with Kubernetes.", metric: "60% cost reduction" },
      { title: "Azure Optimization — Hermes", desc: "Redesigned Azure infrastructure with Delta Lake optimization, Z-Order indexing, and reserved instances.", metric: "30% Azure cost savings" },
      { title: "Multi-Cloud Architecture", desc: "Designed hybrid cloud setup with Azure for data, AWS for compute, and CDN for static assets.", metric: "99.99% uptime" },
    ],
    faq: [
      { q: "Which cloud provider do you recommend?", a: "It depends on your stack. Azure excels for Microsoft/data workloads, AWS for general compute and services breadth, GCP for ML/BigQuery. We're certified on all three and will recommend what fits your needs." },
      { q: "Can you manage our cloud after migration?", a: "Yes. We offer ongoing cloud management including monitoring, cost optimization, security patching, and scaling adjustments." },
      { q: "How do you handle security?", a: "Zero-trust architecture, VPC/VNet isolation, encryption at rest and in transit, IAM best practices, and automated security scanning in CI/CD." },
    ],
  },
  {
    slug: "web-applications",
    title: "Web Applications",
    tagline: "Lightning-fast web apps with modern frameworks and stunning UI",
    icon: Monitor,
    color: "text-peach-600",
    gradient: "from-peach-500 to-peach-600",
    description: "Next.js, React, TypeScript. Server-rendered, real-time, pixel-perfect responsive interfaces.",
    longDescription: "We build web applications that are fast, beautiful, and accessible. Using Next.js, React, and TypeScript, we create server-rendered apps with real-time features, authentication, and pixel-perfect responsive design. Our apps score 90+ on Lighthouse across all metrics.",
    benefits: [
      "Server-side rendering for SEO and performance",
      "Real-time features with WebSockets and streaming",
      "90+ Lighthouse scores across all metrics",
      "Accessible (WCAG 2.1 AA compliant)",
      "Progressive Web App capabilities",
      "Optimistic UI updates for instant feedback",
    ],
    process: [
      { step: "01", title: "UX Design", desc: "Wireframes, user flows, and interactive prototypes before writing any code.", icon: Eye },
      { step: "02", title: "Architecture", desc: "Component architecture, state management strategy, API design, and database schema.", icon: Boxes },
      { step: "03", title: "Development", desc: "AI-assisted development with Cursor and Claude. Feature-by-feature with continuous demos.", icon: Code2 },
      { step: "04", title: "Testing", desc: "Unit tests, integration tests, E2E tests, accessibility audits, and security review.", icon: Shield },
      { step: "05", title: "Deploy", desc: "CI/CD pipeline, staging environment, production deployment with monitoring.", icon: Zap },
    ],
    technologies: [
      { category: "Frontend", items: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion", "shadcn/ui"] },
      { category: "Backend", items: ["Node.js", "Express", "Prisma ORM", "PostgreSQL", "Redis", "NextAuth"] },
      { category: "DevOps", items: ["Vercel", "IONOS", "Nginx", "PM2", "GitHub Actions", "Docker"] },
    ],
    useCases: [
      { title: "CODES AI Business Platform", desc: "Full CRM, HR lead gen, email marketing, VoIP, and accounting platform built with Next.js 16, React 19, and PostgreSQL.", metric: "22 pages, 19 DB models" },
      { title: "E-Commerce Platform", desc: "Server-rendered product catalog with Stripe payments, inventory management, and admin dashboard.", metric: "Sub-1s page loads" },
      { title: "Real-Time Dashboard", desc: "WebSocket-powered monitoring dashboard with live charts, alerting, and team collaboration features.", metric: "50ms update latency" },
    ],
    faq: [
      { q: "Why Next.js over plain React?", a: "Next.js gives us server-side rendering (better SEO), API routes (no separate backend needed), image optimization, and incremental static regeneration — all out of the box. It's the production framework for React." },
      { q: "Do you build the backend too?", a: "Yes. We're full-stack. API routes in Next.js, standalone Node.js backends, or both. Database design, authentication, real-time features — we handle everything." },
      { q: "How long does a web app take to build?", a: "MVP in 2-4 weeks with AI-assisted development. Full production app in 6-12 weeks depending on complexity." },
    ],
  },
  {
    slug: "mobile-development",
    title: "Mobile Development",
    tagline: "Cross-platform mobile apps with native performance",
    icon: Smartphone,
    color: "text-pink-600",
    gradient: "from-pink-600 to-rose-600",
    description: "React Native cross-platform apps. Offline-first, push notifications, native-like performance.",
    longDescription: "One codebase, two platforms. We build React Native apps that feel native on both iOS and Android. Offline-first architecture, push notifications, biometric auth, and smooth 60fps animations — all from a single TypeScript codebase.",
    benefits: ["Single codebase for iOS and Android", "Native performance with 60fps animations", "Offline-first with local data sync", "Push notifications and deep linking", "Biometric authentication support", "Over-the-air updates without app store review"],
    process: [
      { step: "01", title: "Prototype", desc: "Interactive mobile prototypes for user testing before development starts.", icon: Smartphone },
      { step: "02", title: "Architecture", desc: "Navigation structure, state management, offline storage, and API integration design.", icon: Boxes },
      { step: "03", title: "Development", desc: "Component-driven development with Storybook. Feature flags for gradual rollout.", icon: Code2 },
      { step: "04", title: "Testing", desc: "Device testing on 20+ real devices, performance profiling, and crash reporting setup.", icon: Shield },
      { step: "05", title: "Launch", desc: "App Store and Play Store submission, ASO optimization, and analytics setup.", icon: Zap },
    ],
    technologies: [
      { category: "Framework", items: ["React Native", "Expo", "TypeScript", "React Navigation"] },
      { category: "Features", items: ["Push Notifications", "Biometric Auth", "Camera/AR", "Offline Storage", "Deep Linking"] },
      { category: "Backend", items: ["Node.js", "Firebase", "PostgreSQL", "WebSockets", "GraphQL"] },
    ],
    useCases: [
      { title: "Field Service App", desc: "Offline-first mobile app for field engineers with photo capture, GPS tracking, and real-time sync.", metric: "500+ daily users" },
      { title: "Customer Portal App", desc: "Mobile companion to web CRM with push notifications, deal tracking, and instant messaging.", metric: "4.8★ App Store" },
      { title: "IoT Control App", desc: "Real-time device monitoring and control with WebSocket connections and biometric security.", metric: "50ms response time" },
    ],
    faq: [
      { q: "React Native or native iOS/Android?", a: "React Native for 90% of projects — it's faster, cheaper, and the quality gap has effectively closed. We recommend native only for GPU-intensive apps (games, AR/VR) or when specific native APIs are critical." },
      { q: "Do you publish to app stores?", a: "Yes, we handle the full submission process including screenshots, descriptions, and compliance review for both Apple App Store and Google Play Store." },
      { q: "Can you convert our existing web app?", a: "Yes. We can share business logic and API layers between your web and mobile apps, significantly reducing development time." },
    ],
  },
  {
    slug: "custom-software",
    title: "Custom Software",
    tagline: "Bespoke software built to match your exact business workflow",
    icon: Braces,
    color: "text-amber-600",
    gradient: "from-amber-600 to-orange-600",
    description: "Bespoke CRM, ERP, SaaS platforms. Tailored to your exact business workflow from day one.",
    longDescription: "Off-the-shelf software forces you to adapt your business to the tool. We build the opposite — software that adapts to your business. CRM, ERP, SaaS platforms, internal tools — all built from scratch with your exact workflow in mind.",
    benefits: ["100% tailored to your business processes", "No per-seat licensing fees forever", "Full ownership of source code and data", "Integrates with your existing tools", "Scales with your business growth", "Competitive advantage through unique tooling"],
    process: [
      { step: "01", title: "Requirements", desc: "Deep-dive workshops to map every workflow, user role, and integration point.", icon: Eye },
      { step: "02", title: "Specification", desc: "Detailed technical spec with database design, API contracts, and UI wireframes.", icon: FileCode },
      { step: "03", title: "Build", desc: "Agile sprints with weekly demos. You see progress every 5 days.", icon: Code2 },
      { step: "04", title: "Migrate", desc: "Data migration from legacy systems with validation and rollback plans.", icon: Database },
      { step: "05", title: "Support", desc: "Post-launch support, bug fixes, and feature enhancements included.", icon: Shield },
    ],
    technologies: [
      { category: "Backend", items: ["Node.js", "Python", "FastAPI", "Express", "PostgreSQL", "Redis"] },
      { category: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Electron (Desktop)"] },
      { category: "Integration", items: ["REST APIs", "GraphQL", "Webhooks", "Zapier", "Stripe", "Twilio"] },
    ],
    useCases: [
      { title: "Business Management Platform", desc: "Complete CRM + HR lead gen + email marketing + VoIP + accounting platform — replacing 6 separate SaaS tools.", metric: "6 tools → 1 platform" },
      { title: "Logistics Management System", desc: "Custom fleet tracking with route optimization, driver management, and automated invoicing.", metric: "35% route efficiency gain" },
      { title: "Healthcare Patient Portal", desc: "GDPR-compliant patient management system with appointment booking, records, and messaging.", metric: "NHS compliant" },
    ],
    faq: [
      { q: "How much does custom software cost?", a: "Typical projects range from £15K-£100K+ depending on complexity. We provide detailed fixed-price quotes after the discovery phase. Our AI-first approach means you get more for less than traditional development." },
      { q: "Do we own the code?", a: "Yes, 100%. You get full ownership of all source code, documentation, and intellectual property. No vendor lock-in." },
      { q: "How long does a custom project take?", a: "MVP in 4-8 weeks, full platform in 12-24 weeks. Our AI-assisted development is 3-5× faster than traditional approaches." },
    ],
  },
  {
    slug: "business-intelligence",
    title: "Business Intelligence",
    tagline: "Data-driven dashboards that turn numbers into decisions",
    icon: LineChart,
    color: "text-cyan-600",
    gradient: "from-cyan-600 to-blue-600",
    description: "Power BI & Tableau dashboards. Automated reports, KPI tracking, data-driven storytelling.",
    longDescription: "We transform raw data into interactive dashboards and automated reports that drive real business decisions. Power BI Premium, Tableau, and custom visualization solutions with Row Level Security, scheduled refreshes, and mobile-optimized layouts.",
    benefits: ["Interactive dashboards with drill-down capability", "Row Level Security for multi-tenant data", "Automated scheduled reporting via email", "Mobile-optimized dashboard layouts", "Natural language Q&A for non-technical users", "Real-time data refresh capabilities"],
    process: [
      { step: "01", title: "KPI Workshop", desc: "Define the metrics that matter. Map data sources to business questions.", icon: BarChart3 },
      { step: "02", title: "Data Model", desc: "Star/snowflake schema design optimized for fast aggregation and filtering.", icon: Database },
      { step: "03", title: "Dashboard Build", desc: "Interactive visualizations with Power BI or Tableau. Iterative design with user feedback.", icon: Monitor },
      { step: "04", title: "Security", desc: "Row Level Security, workspace permissions, and data governance configuration.", icon: Lock },
      { step: "05", title: "Training", desc: "User training, documentation, and handover. Self-service analytics capability.", icon: Brain },
    ],
    technologies: [
      { category: "Visualization", items: ["Power BI Pro", "Power BI Premium", "Tableau", "SSRS", "Custom D3.js"] },
      { category: "Data Modeling", items: ["Star Schema", "Snowflake Schema", "DAX", "MDX", "SSAS Tabular"] },
      { category: "Data Sources", items: ["Azure Synapse", "Databricks", "Snowflake", "SAP BW", "Dynamics 365", "PostgreSQL"] },
    ],
    useCases: [
      { title: "Global Survey Dashboard — E.ON", desc: "Dashboard handling 2000+ column survey files across multiple countries with Row Level Security in Power BI.", metric: "99.5% data accuracy" },
      { title: "Sales Analytics — PlayMobil", desc: "Global sales dashboard integrating Amazon, Print Media, TV & Social Media data sources.", metric: "50% faster reporting" },
      { title: "Financial Reporting — Dornbracht", desc: "Income Statement, Balance Sheet, and General Account data marts with automated reconciliation.", metric: "30% faster reconciliations" },
    ],
    faq: [
      { q: "Power BI or Tableau?", a: "Power BI for Microsoft-centric stacks (Azure, D365, SharePoint). Tableau for more complex visualizations and cross-platform data. We're experts in both and will recommend based on your ecosystem." },
      { q: "Can you connect to our existing data?", a: "Yes. We've connected to every major data source — SAP, Dynamics 365, Salesforce, PostgreSQL, Excel, APIs, and custom databases." },
      { q: "Do you provide training?", a: "Yes. We include user training, admin training, and comprehensive documentation. We want your team to be self-sufficient." },
    ],
  },
  {
    slug: "cybersecurity",
    title: "Cybersecurity",
    tagline: "Protect your digital assets with enterprise-grade security",
    icon: Lock,
    color: "text-red-600",
    gradient: "from-red-600 to-rose-600",
    description: "OWASP audits, penetration testing, SOC2/ISO compliance, zero-trust architecture design.",
    longDescription: "Security isn't an afterthought — it's built into everything we do. We provide comprehensive security audits, penetration testing, compliance implementation, and zero-trust architecture design. Our approach covers the full stack from infrastructure to application layer.",
    benefits: ["OWASP Top 10 vulnerability assessment", "Automated security scanning in CI/CD", "SOC2 Type II and ISO 27001 compliance", "Zero-trust architecture implementation", "Incident response planning and runbooks", "Regular penetration testing and red team exercises"],
    process: [
      { step: "01", title: "Audit", desc: "Comprehensive security assessment of your infrastructure, applications, and processes.", icon: Eye },
      { step: "02", title: "Threat Model", desc: "Identify attack vectors, classify risks, and prioritize remediation efforts.", icon: Shield },
      { step: "03", title: "Remediate", desc: "Fix vulnerabilities, implement security controls, and harden configurations.", icon: Lock },
      { step: "04", title: "Automate", desc: "Security scanning in CI/CD, dependency auditing, and SAST/DAST integration.", icon: Workflow },
      { step: "05", title: "Monitor", desc: "Continuous monitoring, alerting, and incident response procedures.", icon: Gauge },
    ],
    technologies: [
      { category: "Security Tools", items: ["OWASP ZAP", "Burp Suite", "Snyk", "SonarQube", "Dependabot", "Trivy"] },
      { category: "Compliance", items: ["SOC2 Type II", "ISO 27001", "GDPR", "PCI-DSS", "HIPAA", "Cyber Essentials"] },
      { category: "Infrastructure", items: ["WAF", "VPN", "Zero Trust", "MFA", "SSO/SAML", "Encryption at Rest/Transit"] },
    ],
    useCases: [
      { title: "FinTech Security Audit", desc: "Full PCI-DSS compliance audit for payment processing platform handling £2M+ daily transactions.", metric: "Zero critical findings" },
      { title: "SOC2 Implementation", desc: "End-to-end SOC2 Type II compliance implementation for a SaaS platform with 500+ enterprise customers.", metric: "First-pass certification" },
      { title: "Zero Trust Architecture", desc: "Designed and implemented zero-trust network architecture for a healthcare provider with PHI data.", metric: "100% access logging" },
    ],
    faq: [
      { q: "Do you do penetration testing?", a: "Yes. We provide black-box, grey-box, and white-box penetration testing with detailed reports and remediation guidance." },
      { q: "Can you help with compliance?", a: "Yes. We've helped companies achieve SOC2, ISO 27001, GDPR, PCI-DSS, and Cyber Essentials certifications." },
      { q: "How often should we do security audits?", a: "At minimum annually, but we recommend quarterly automated scans and semi-annual manual penetration tests for any system handling sensitive data." },
    ],
  },
  {
    slug: "api-integrations",
    title: "API & Integrations",
    tagline: "Connect everything — seamless system unification",
    icon: Layers,
    color: "text-indigo-600",
    gradient: "from-indigo-600 to-violet-600",
    description: "REST, GraphQL, microservices. Third-party connectors, webhook orchestration, system unification.",
    longDescription: "Modern businesses run on connected systems. We design and build APIs that are fast, secure, and maintainable. REST, GraphQL, microservices, event-driven architecture — whatever pattern fits your needs. Plus third-party integrations with any service that has an API.",
    benefits: ["RESTful and GraphQL API design", "Microservices architecture patterns", "Event-driven with webhooks and message queues", "Third-party SaaS integration (Stripe, Twilio, etc.)", "API versioning and backward compatibility", "Comprehensive API documentation with OpenAPI/Swagger"],
    process: [
      { step: "01", title: "Map Systems", desc: "Identify all systems that need to communicate and define data flows.", icon: CircuitBoard },
      { step: "02", title: "API Design", desc: "OpenAPI specification, authentication strategy, rate limiting, and error handling.", icon: FileCode },
      { step: "03", title: "Build", desc: "API development with automated testing, documentation generation, and versioning.", icon: Code2 },
      { step: "04", title: "Integrate", desc: "Connect third-party services, build webhooks, and implement retry logic.", icon: Layers },
      { step: "05", title: "Monitor", desc: "API analytics, uptime monitoring, and performance optimization.", icon: Gauge },
    ],
    technologies: [
      { category: "API Frameworks", items: ["Express.js", "FastAPI", "NestJS", "GraphQL", "tRPC", "gRPC"] },
      { category: "Integration", items: ["Stripe", "Twilio", "SendGrid", "Slack", "Zapier", "Salesforce"] },
      { category: "Infrastructure", items: ["Redis", "RabbitMQ", "Apache Kafka", "AWS SQS", "Azure Service Bus", "WebSockets"] },
    ],
    useCases: [
      { title: "Payment Platform API", desc: "RESTful API handling £2M+ daily transactions with Stripe integration, webhook processing, and idempotency.", metric: "99.99% uptime" },
      { title: "CRM Integration Hub", desc: "Unified API connecting Salesforce, HubSpot, and custom CRM with bi-directional sync and conflict resolution.", metric: "Real-time sync" },
      { title: "IoT Data Gateway", desc: "Event-driven API processing 80K+ JSON files daily from IoT devices with schema validation and routing.", metric: "80K+ files/day" },
    ],
    faq: [
      { q: "REST or GraphQL?", a: "REST for most standard CRUD APIs — it's simpler and widely understood. GraphQL when you have complex data relationships and clients that need flexible queries. We often use both in the same project." },
      { q: "Can you integrate with our existing systems?", a: "If it has an API, we can integrate with it. We've worked with SAP, Dynamics 365, Salesforce, custom legacy systems, and everything in between." },
      { q: "How do you handle API security?", a: "JWT/OAuth2 authentication, rate limiting, input validation, CORS policies, and API key management. All APIs are secured by default." },
    ],
  },
];
