import {
  Database, Cloud, Bot, Gauge, Server, Zap, Shield, BarChart3,
  Layers, Brain, Code2, Monitor, Workflow, Eye, FileCode, Cpu,
  CircuitBoard, Lock, GitBranch, CheckCircle2,
} from "lucide-react";

export interface CaseStudy {
  slug: string;
  title: string;
  client: string;
  industry: string;
  value: string;
  category: string;
  gradient: string;
  icon: typeof Database;
  heroMetric: string;
  heroMetricLabel: string;
  summary: string;
  challenge: string;
  solution: string;
  results: { metric: string; label: string; detail: string }[];
  techStack: string[];
  timeline: string;
  teamSize: string;
  processSteps: { title: string; desc: string; icon: typeof Database; tech: string[] }[];
  architectureLayers: { label: string; items: string[]; color: string }[];
  testimonial: { quote: string; name: string; role: string } | null;
}

export const caseStudies: CaseStudy[] = [
  {
    slug: "anglian-water-data-platform",
    title: "Enterprise Data Platform",
    client: "Anglian Water Services",
    industry: "Utilities",
    value: "£85K",
    category: "Data Engineering",
    gradient: "from-blue-600 to-cyan-500",
    icon: Database,
    heroMetric: "250+",
    heroMetricLabel: "Products Controlled",
    summary: "Built a comprehensive enterprise data platform using Microsoft Fabric and Databricks, controlling 250+ data products with automated ETL/ELT architecture and Delta-Parquet format in OneLake.",
    challenge: "Anglian Water needed a unified data platform to manage data from hundreds of operational systems across eastern England. Legacy systems were siloed, reporting was manual, and data quality was inconsistent across 250+ data products serving different business units.",
    solution: "Designed and implemented a Microsoft Fabric-based data platform with Databricks as the compute engine. Implemented central storage in OneLake using Delta-Parquet format for both raw and transformed data. Built Curated and Gold layers using a customizable Microsoft framework with automated ETL/ELT architecture.",
    results: [
      { metric: "250+", label: "Products Managed", detail: "All data products controlled through a single framework" },
      { metric: "99.5%", label: "Data Accuracy", detail: "Automated validation at every pipeline stage" },
      { metric: "60%", label: "Faster Reporting", detail: "From days to hours for complex operational reports" },
      { metric: "40%", label: "Cost Reduction", detail: "Optimized compute and storage architecture" },
    ],
    techStack: ["Microsoft Fabric", "Databricks", "Delta Lake", "PySpark", "Azure Data Factory", "Power BI", "Azure DevOps CI/CD", "OneLake", "Delta-Parquet"],
    timeline: "9 months",
    teamSize: "3 engineers",
    processSteps: [
      { title: "Data Audit & Discovery", desc: "Mapped 250+ data sources across operational systems, identified quality gaps, and defined target medallion architecture.", icon: Eye, tech: ["Microsoft Purview", "Azure Data Catalog"] },
      { title: "OneLake Foundation", desc: "Implemented central storage in OneLake with Delta-Parquet format. Designed Landing, Curated, and Gold layer structure.", icon: Database, tech: ["OneLake", "Delta-Parquet", "Microsoft Fabric"] },
      { title: "Pipeline Automation", desc: "Built automated ETL/ELT pipelines with Azure Data Factory and Databricks notebooks. Framework approach for 250+ products.", icon: Workflow, tech: ["Databricks", "PySpark", "Azure Data Factory"] },
      { title: "Gold Layer & BI", desc: "Built Curated and Gold layers using customizable Microsoft framework. Delivered Power BI dashboards integrated with Fabric.", icon: BarChart3, tech: ["Power BI", "DAX", "SSAS Tabular"] },
      { title: "DevOps & Governance", desc: "CI/CD pipelines with Azure DevOps. Automated testing, data lineage tracking, and governance with Microsoft Purview.", icon: GitBranch, tech: ["Azure DevOps", "CI/CD YAML", "Microsoft Purview"] },
    ],
    architectureLayers: [
      { label: "Landing Zone (Bronze)", items: ["Raw data ingestion", "250+ source systems", "Delta-Parquet format", "OneLake storage"], color: "from-amber-500 to-amber-600" },
      { label: "Curated Layer (Silver)", items: ["Data cleansing", "Schema validation", "Business rules", "Databricks notebooks"], color: "from-gray-400 to-gray-500" },
      { label: "Serving Layer (Gold)", items: ["Business aggregations", "Power BI datasets", "API endpoints", "Star schema models"], color: "from-yellow-500 to-amber-500" },
    ],
    testimonial: { quote: "CODES AI delivered an exceptional data platform that has transformed how we manage our operations. Their expertise in data engineering is truly world-class.", name: "James Whitfield", role: "IT Director, Anglian Water Services" },
  },
  {
    slug: "codes-ai-development-framework",
    title: "AI Development Framework",
    client: "CODES AI (Internal)",
    industry: "Software Development",
    value: "£52K",
    category: "AI & Automation",
    gradient: "from-violet-600 to-purple-500",
    icon: Bot,
    heroMetric: "40%",
    heroMetricLabel: "Dev Time Reduction",
    summary: "Pioneered an AI-assisted development framework using local LLMs to automate data warehouse design, standardize ETL pipelines, and manage Azure cloud infrastructure code.",
    challenge: "Traditional data engineering projects require weeks of repetitive boilerplate — schema design, ETL pipeline code, infrastructure templates, and testing. Senior engineers spend 60%+ of their time on code that follows predictable patterns rather than solving novel problems.",
    solution: "Built a comprehensive AI-assisted development framework using local LLMs (Claude, custom models) that automates the repetitive parts of data engineering. The system generates data warehouse schemas from business requirements, creates ETL pipeline code from data mappings, and produces Azure infrastructure templates from architecture diagrams.",
    results: [
      { metric: "40%", label: "Faster Development", detail: "Reduced development time across all data engineering projects" },
      { metric: "3×", label: "Code Output", detail: "Engineers produce 3× more deliverables per sprint" },
      { metric: "95%", label: "First-Pass Quality", detail: "AI-generated code passes review with minimal changes" },
      { metric: "Zero", label: "Security Issues", detail: "Automated OWASP audit on every generated module" },
    ],
    techStack: ["Claude (Anthropic)", "Local LLMs", "Python", "PySpark", "Azure DevOps", "Databricks", "Delta Lake", "Cursor IDE", "FastAPI"],
    timeline: "Ongoing (started Nov 2025)",
    teamSize: "2 engineers",
    processSteps: [
      { title: "Requirements in English", desc: "Engineer describes what they need in plain English — 'Build a star schema for sales data with SCD Type 2 on customer dimension'.", icon: Brain, tech: ["Natural Language", "CRAFT Framework"] },
      { title: "AI Architecture Generation", desc: "Claude analyses the requirement and generates the full database schema, ETL mapping document, and architecture diagram.", icon: Bot, tech: ["Claude API", "Custom Prompts"] },
      { title: "Code Generation", desc: "Cursor agent mode generates production PySpark code, SQL DDL, Data Factory pipelines, and Azure DevOps YAML.", icon: Code2, tech: ["Cursor", "PySpark", "SQL"] },
      { title: "Automated Review", desc: "AI reviews generated code for security (OWASP), performance (query optimization), and best practices compliance.", icon: Shield, tech: ["Claude Code Review", "SonarQube"] },
      { title: "Deploy & Monitor", desc: "One-click deployment to Azure with automated testing, monitoring dashboards, and performance baselines.", icon: Zap, tech: ["Azure DevOps CI/CD", "Databricks"] },
    ],
    architectureLayers: [
      { label: "Prompt Layer", items: ["CRAFT framework prompts", "Context-aware templates", "Project-specific rules", "Code style guides"], color: "from-violet-500 to-violet-600" },
      { label: "AI Processing", items: ["Claude Opus reasoning", "Cursor agent generation", "Kimi 2M context refactoring", "Automated testing"], color: "from-purple-500 to-purple-600" },
      { label: "Output Layer", items: ["Production PySpark code", "Azure IaC templates", "CI/CD pipelines", "Documentation"], color: "from-indigo-500 to-indigo-600" },
    ],
    testimonial: null,
  },
  {
    slug: "carl-zeiss-sap-azure",
    title: "SAP-to-Azure Migration",
    client: "Carl Zeiss GmbH",
    industry: "Manufacturing / Optics",
    value: "£120K",
    category: "Cloud Migration",
    gradient: "from-emerald-600 to-teal-500",
    icon: Cloud,
    heroMetric: "€120K",
    heroMetricLabel: "Annual Savings",
    summary: "Designed Customer 360 analytics platform integrating SAP CRM/ERP with Azure Synapse, achieving 40% faster reporting and 50% reduction in manual data reconciliation.",
    challenge: "Carl Zeiss had customer data spread across SAP CRM, SAP ERP, and multiple regional systems. Generating a unified customer view required manual reconciliation that took the analytics team days. SSIS-based ETL was slow, fragile, and impossible to maintain.",
    solution: "Designed a Customer360 architecture in Azure Synapse with automated migration from SSIS to cloud-native pipelines. Implemented a Landing Zone using Azure Synapse Pipelines with a customizable framework for ingesting complex unstructured files from SAP CRM and ERP systems.",
    results: [
      { metric: "€120K", label: "Annual Savings", detail: "Cloud cost optimization and eliminated manual reconciliation" },
      { metric: "40%", label: "Faster Reporting", detail: "From multi-day to same-day customer analytics" },
      { metric: "50%", label: "Less Manual Work", detail: "Automated reconciliation replaced spreadsheet processes" },
      { metric: "360°", label: "Customer View", detail: "Unified view across all SAP modules and regional systems" },
    ],
    techStack: ["Azure Synapse", "SAP CRM", "SAP ERP", "Azure Data Factory", "Snowflake", "Power BI", "SSIS Migration", "SQL Pools"],
    timeline: "18 months",
    teamSize: "2 consultants",
    processSteps: [
      { title: "SAP Data Mapping", desc: "Mapped all SAP CRM and ERP data entities, relationships, and transformation rules for the Customer360 model.", icon: FileCode, tech: ["SAP CRM", "SAP ERP", "Data Modeling"] },
      { title: "SSIS-to-Cloud Migration", desc: "Migrated legacy SSIS packages to Azure Synapse Pipelines with automated testing and validation.", icon: Cloud, tech: ["Azure Synapse", "Azure Data Factory"] },
      { title: "Landing Zone Framework", desc: "Built customizable ingestion framework for complex SAP extracts with automated schema detection.", icon: Layers, tech: ["Synapse Pipelines", "SQL Pools"] },
      { title: "Customer360 Model", desc: "Designed star schema for unified customer view with SCD Type 2 for historical tracking.", icon: Database, tech: ["Star Schema", "SCD Type 2", "Snowflake"] },
      { title: "BI & Analytics", desc: "Power BI dashboards for customer behavior, product trends, and regional performance analysis.", icon: BarChart3, tech: ["Power BI", "DAX", "RLS"] },
    ],
    architectureLayers: [
      { label: "SAP Source Systems", items: ["SAP CRM", "SAP ERP", "Regional databases", "Flat file exports"], color: "from-emerald-500 to-emerald-600" },
      { label: "Azure Data Platform", items: ["Azure Synapse", "Data Factory pipelines", "SQL Pools", "Staging area"], color: "from-teal-500 to-teal-600" },
      { label: "Analytics & Reporting", items: ["Customer360 model", "Power BI dashboards", "Snowflake warehouse", "Self-service analytics"], color: "from-cyan-500 to-cyan-600" },
    ],
    testimonial: { quote: "The Customer360 platform has given us unprecedented insight into our customer relationships across all regions. The Azure migration was seamless.", name: "Foli Josee", role: "Product Owner, Carl Zeiss" },
  },
  {
    slug: "hermes-iot-analytics",
    title: "IoT Sensor Analytics",
    client: "Hermes Logistics",
    industry: "Logistics",
    value: "£65K",
    category: "Real-Time Analytics",
    gradient: "from-amber-600 to-orange-500",
    icon: Gauge,
    heroMetric: "99.9%",
    heroMetricLabel: "Data Accuracy",
    summary: "Built an end-to-end Azure data platform for sensor data analytics processing billions of JSON files with Delta Lake, achieving 99.9% data accuracy and 30% Azure cost reduction.",
    challenge: "Hermes needed to process billions of IoT sensor readings from their logistics network. The data arrived as JSON files in massive volumes, with inconsistent schemas and quality issues. Existing processing was batch-only with 24-hour delays, making real-time operational decisions impossible.",
    solution: "Designed a Delta Lakehouse architecture with Landing, Curated, and Serving zones. Built real-time ingestion pipelines using Azure Databricks, Redis caching, and Azure Functions. Implemented automated schema evolution, data quality checks, and anomaly detection at every layer.",
    results: [
      { metric: "99.9%", label: "Data Accuracy", detail: "Automated validation across billions of sensor records" },
      { metric: "30%", label: "Cost Reduction", detail: "Optimized Azure infrastructure and compute patterns" },
      { metric: "60%", label: "Faster Processing", detail: "From 24-hour batch to near real-time analytics" },
      { metric: "Billions", label: "Records Processed", detail: "Handling massive IoT data volumes with ACID compliance" },
    ],
    techStack: ["Azure Databricks", "Delta Lake", "PySpark", "Azure Functions", "Redis", "Power BI", "Tableau", "Azure DevOps CI/CD", "Microsoft Purview"],
    timeline: "18 months",
    teamSize: "2 engineers",
    processSteps: [
      { title: "Sensor Data Ingestion", desc: "Built real-time ingestion pipelines for billions of JSON files using Azure Event Hubs and Databricks structured streaming.", icon: Cpu, tech: ["Event Hubs", "Structured Streaming"] },
      { title: "Delta Lakehouse Design", desc: "Designed Landing → Curated → Serving architecture with ACID-compliant Delta Lake and automated schema evolution.", icon: Database, tech: ["Delta Lake", "ACID", "Schema Evolution"] },
      { title: "Data Quality Framework", desc: "Implemented validation rules, anomaly detection, and data profiling at every pipeline stage with automated alerting.", icon: Shield, tech: ["Great Expectations", "PySpark", "Alerting"] },
      { title: "Performance Optimization", desc: "Optimized queries by 40% through Z-Order indexing, partitioning, and SQL pool tuning. Reduced Azure costs by 30%.", icon: Zap, tech: ["Z-Order", "Partitioning", "Cost Optimization"] },
      { title: "Monitoring Dashboards", desc: "Delivered Power BI and Tableau dashboards for sensor health monitoring, anomaly detection, and operational insights.", icon: Monitor, tech: ["Power BI", "Tableau", "Real-time Refresh"] },
    ],
    architectureLayers: [
      { label: "Ingestion Layer", items: ["Azure Event Hubs", "IoT Hub", "Azure Functions", "Redis cache", "JSON parsing"], color: "from-amber-500 to-amber-600" },
      { label: "Processing Layer", items: ["Databricks clusters", "PySpark transformations", "Delta Lake ACID", "Schema evolution"], color: "from-orange-500 to-orange-600" },
      { label: "Analytics Layer", items: ["Power BI dashboards", "Tableau visualizations", "Anomaly detection", "Alerting"], color: "from-red-500 to-red-600" },
    ],
    testimonial: null,
  },
];
