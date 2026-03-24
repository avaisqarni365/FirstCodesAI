import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcryptjs";

const connectionString = process.env.DATABASE_URL || "";
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Seeding database...");

  // Clean existing data in dependency order
  await prisma.whatsAppMessage.deleteMany();
  await prisma.whatsAppChat.deleteMany();
  await prisma.invoiceItem.deleteMany();
  await prisma.invoice.deleteMany();
  await prisma.expense.deleteMany();
  await prisma.activity.deleteMany();
  await prisma.email.deleteMany();
  await prisma.campaign.deleteMany();
  await prisma.emailAccount.deleteMany();
  await prisma.deal.deleteMany();
  await prisma.contact.deleteMany();
  await prisma.company.deleteMany();
  await prisma.callLog.deleteMany();
  await prisma.teamProfile.deleteMany();
  await prisma.aITool.deleteMany();
  await prisma.webPage.deleteMany();
  await prisma.service.deleteMany();
  await prisma.testimonial.deleteMany();
  await prisma.siteSetting.deleteMany();
  await prisma.user.deleteMany();

  console.log("Cleaned existing data.");

  // ==================== USERS ====================
  const hashedPassword = await bcrypt.hash("password123", 10);

  const admin = await prisma.user.create({
    data: {
      name: "Avais Ahmad Qarni",
      email: "avais@codes-ai.uk",
      password: hashedPassword,
      role: "ADMIN",
      phone: "+447586094540",
      title: "CEO & Founder",
      department: "Executive",
    },
  });

  const manager = await prisma.user.create({
    data: {
      name: "Sarah Mitchell",
      email: "sarah@codes-ai.uk",
      password: hashedPassword,
      role: "MANAGER",
      phone: "+447700900001",
      title: "Operations Manager",
      department: "Operations",
    },
  });

  const salesRep = await prisma.user.create({
    data: {
      name: "James Wilson",
      email: "james@codes-ai.uk",
      password: hashedPassword,
      role: "SALES",
      phone: "+447700900002",
      title: "Sales Executive",
      department: "Sales",
    },
  });

  const hrLead = await prisma.user.create({
    data: {
      name: "Emma Thompson",
      email: "emma@codes-ai.uk",
      password: hashedPassword,
      role: "HR",
      phone: "+447700900003",
      title: "HR Lead",
      department: "Human Resources",
    },
  });

  const developer = await prisma.user.create({
    data: {
      name: "Rahul Patel",
      email: "rahul@codes-ai.uk",
      password: hashedPassword,
      role: "DEVELOPER",
      phone: "+447700900004",
      title: "Senior Developer",
      department: "Engineering",
    },
  });

  console.log("Created 5 users.");

  // ==================== COMPANIES ====================
  const companies = await Promise.all([
    prisma.company.create({
      data: {
        name: "TechCorp Ltd",
        registrationNumber: "12345678",
        website: "https://techcorp.co.uk",
        industry: "Technology",
        size: "50-200",
        address: "123 Tech Street",
        city: "London",
        phone: "+442071234567",
        email: "info@techcorp.co.uk",
        description: "Enterprise software and cloud solutions provider",
        source: "Companies House",
        pipelineStage: "PROPOSAL_SENT",
        tags: ["enterprise", "cloud", "software"],
      },
    }),
    prisma.company.create({
      data: {
        name: "GreenEnergy UK",
        registrationNumber: "23456789",
        website: "https://greenenergy.uk",
        industry: "Energy",
        size: "200-500",
        address: "45 Solar Lane",
        city: "Manchester",
        phone: "+441612345678",
        email: "contact@greenenergy.uk",
        description: "Renewable energy solutions for businesses and homes",
        source: "LinkedIn",
        pipelineStage: "NEGOTIATING",
        tags: ["energy", "renewable", "sustainability"],
      },
    }),
    prisma.company.create({
      data: {
        name: "DataFlow Systems",
        registrationNumber: "34567890",
        website: "https://dataflow.io",
        industry: "Data Analytics",
        size: "10-50",
        address: "78 Data Drive",
        city: "Birmingham",
        phone: "+441213456789",
        email: "hello@dataflow.io",
        description: "Real-time data processing and analytics platform",
        source: "Referral",
        pipelineStage: "MEETING_SCHEDULED",
        tags: ["analytics", "data", "real-time"],
      },
    }),
    prisma.company.create({
      data: {
        name: "Anglian Water Services",
        registrationNumber: "45678901",
        website: "https://anglianwater.co.uk",
        industry: "Utilities",
        size: "500+",
        address: "Lancaster House",
        city: "Huntingdon",
        phone: "+441234567890",
        email: "business@anglianwater.co.uk",
        description: "Water and wastewater services across eastern England",
        source: "Companies House",
        pipelineStage: "WON",
        tags: ["utilities", "water", "enterprise"],
      },
    }),
    prisma.company.create({
      data: {
        name: "SmartFactory Solutions",
        registrationNumber: "56789012",
        website: "https://smartfactory.co.uk",
        industry: "Manufacturing",
        size: "50-200",
        address: "Industrial Park, Unit 5",
        city: "Sheffield",
        phone: "+441142345678",
        email: "sales@smartfactory.co.uk",
        description: "IoT-powered manufacturing intelligence platform",
        source: "Trade Show",
        pipelineStage: "CONTACTED",
        tags: ["manufacturing", "IoT", "automation"],
      },
    }),
    prisma.company.create({
      data: {
        name: "Vertex Consulting",
        registrationNumber: "67890123",
        website: "https://vertexconsulting.uk",
        industry: "Consulting",
        size: "10-50",
        address: "The Shard, Level 24",
        city: "London",
        phone: "+442079876543",
        email: "info@vertexconsulting.uk",
        description: "Digital transformation and strategy consulting",
        source: "Website",
        pipelineStage: "RESEARCHING",
        tags: ["consulting", "digital", "strategy"],
      },
    }),
    prisma.company.create({
      data: {
        name: "MedTech Innovations",
        registrationNumber: "78901234",
        website: "https://medtechinnovations.co.uk",
        industry: "Healthcare",
        size: "50-200",
        address: "Life Sciences Park",
        city: "Cambridge",
        phone: "+441234567891",
        email: "info@medtechinnovations.co.uk",
        description: "Healthcare technology and medical device solutions",
        source: "LinkedIn",
        pipelineStage: "IDENTIFIED",
        tags: ["healthcare", "medtech", "innovation"],
      },
    }),
    prisma.company.create({
      data: {
        name: "FinanceHub PLC",
        registrationNumber: "89012345",
        website: "https://financehub.co.uk",
        industry: "Financial Services",
        size: "200-500",
        address: "Canary Wharf Tower",
        city: "London",
        phone: "+442071239999",
        email: "corporate@financehub.co.uk",
        description: "Digital banking and payment processing platform",
        source: "Referral",
        pipelineStage: "RESPONDING",
        tags: ["fintech", "banking", "payments"],
      },
    }),
  ]);

  console.log(`Created ${companies.length} companies.`);

  // ==================== CONTACTS ====================
  const contacts = await Promise.all([
    prisma.contact.create({
      data: {
        firstName: "David",
        lastName: "Chen",
        email: "david.chen@techcorp.co.uk",
        phone: "+447700100001",
        company: "TechCorp Ltd",
        jobTitle: "CTO",
        source: "LinkedIn",
        status: "QUALIFIED",
        notes: "Interested in our AI automation suite. Had intro call.",
        tags: ["decision-maker", "tech"],
        ownerId: salesRep.id,
        companyId: companies[0].id,
      },
    }),
    prisma.contact.create({
      data: {
        firstName: "Alice",
        lastName: "Morgan",
        email: "alice.morgan@greenenergy.uk",
        phone: "+447700100002",
        company: "GreenEnergy UK",
        jobTitle: "Head of Digital",
        source: "Website",
        status: "PROSPECT",
        notes: "Downloaded our whitepaper on energy analytics.",
        tags: ["energy", "digital"],
        ownerId: salesRep.id,
        companyId: companies[1].id,
      },
    }),
    prisma.contact.create({
      data: {
        firstName: "Sarah",
        lastName: "Chen",
        email: "sarah.chen@dataflow.io",
        phone: "+447700100003",
        company: "DataFlow Systems",
        jobTitle: "CTO",
        source: "Referral",
        status: "CUSTOMER",
        notes: "Existing client. Very happy with our data platform.",
        tags: ["existing-client", "tech-lead"],
        ownerId: admin.id,
        companyId: companies[2].id,
      },
    }),
    prisma.contact.create({
      data: {
        firstName: "James",
        lastName: "Whitfield",
        email: "j.whitfield@anglianwater.co.uk",
        phone: "+447700100004",
        company: "Anglian Water Services",
        jobTitle: "IT Director",
        source: "Companies House",
        status: "CUSTOMER",
        notes: "Key account. Enterprise data platform project ongoing.",
        tags: ["enterprise", "key-account"],
        ownerId: admin.id,
        companyId: companies[3].id,
      },
    }),
    prisma.contact.create({
      data: {
        firstName: "Mark",
        lastName: "Stevens",
        email: "mark@smartfactory.co.uk",
        phone: "+447700100005",
        company: "SmartFactory Solutions",
        jobTitle: "Operations Director",
        source: "Trade Show",
        status: "LEAD",
        notes: "Met at IoT World Conference. Interested in dashboard solution.",
        tags: ["manufacturing", "IoT"],
        ownerId: salesRep.id,
        companyId: companies[4].id,
      },
    }),
    prisma.contact.create({
      data: {
        firstName: "Priya",
        lastName: "Sharma",
        email: "priya@vertexconsulting.uk",
        phone: "+447700100006",
        company: "Vertex Consulting",
        jobTitle: "Managing Partner",
        source: "Referral",
        status: "PROSPECT",
        notes: "Referred by David Chen. Exploring partnership opportunities.",
        tags: ["partnership", "consulting"],
        ownerId: manager.id,
        companyId: companies[5].id,
      },
    }),
    prisma.contact.create({
      data: {
        firstName: "Oliver",
        lastName: "Brown",
        email: "oliver.b@medtechinnovations.co.uk",
        phone: "+447700100007",
        company: "MedTech Innovations",
        jobTitle: "VP Engineering",
        source: "LinkedIn",
        status: "LEAD",
        notes: "Connected on LinkedIn. Company expanding their tech stack.",
        tags: ["healthcare", "engineering"],
        ownerId: hrLead.id,
        companyId: companies[6].id,
      },
    }),
    prisma.contact.create({
      data: {
        firstName: "Emily",
        lastName: "Clark",
        email: "emily.clark@financehub.co.uk",
        phone: "+447700100008",
        company: "FinanceHub PLC",
        jobTitle: "Head of Technology",
        source: "Website",
        status: "QUALIFIED",
        notes: "Requested a demo. Budget approved for Q2.",
        tags: ["fintech", "hot-lead"],
        ownerId: salesRep.id,
        companyId: companies[7].id,
      },
    }),
    prisma.contact.create({
      data: {
        firstName: "Tom",
        lastName: "Richards",
        email: "tom.richards@techcorp.co.uk",
        phone: "+447700100009",
        company: "TechCorp Ltd",
        jobTitle: "Engineering Manager",
        source: "Referral",
        status: "PROSPECT",
        notes: "Technical contact. Evaluating our API integration capabilities.",
        tags: ["technical", "evaluation"],
        ownerId: developer.id,
        companyId: companies[0].id,
      },
    }),
    prisma.contact.create({
      data: {
        firstName: "Lisa",
        lastName: "Taylor",
        email: "lisa@greenenergy.uk",
        phone: "+447700100010",
        company: "GreenEnergy UK",
        jobTitle: "Procurement Manager",
        source: "Email Campaign",
        status: "LEAD",
        notes: "Opened our AI services email campaign.",
        tags: ["procurement", "energy"],
        ownerId: salesRep.id,
        companyId: companies[1].id,
      },
    }),
  ]);

  console.log(`Created ${contacts.length} contacts.`);

  // ==================== DEALS ====================
  const deals = await Promise.all([
    prisma.deal.create({
      data: {
        title: "Enterprise Data Platform",
        value: 85000,
        stage: "PROPOSAL",
        probability: 75,
        expectedClose: new Date("2026-05-15"),
        notes: "Large-scale data platform for water utility operations.",
        ownerId: admin.id,
        contactId: contacts[3].id,
        companyId: companies[3].id,
      },
    }),
    prisma.deal.create({
      data: {
        title: "AI Automation Suite",
        value: 52000,
        stage: "NEGOTIATION",
        probability: 60,
        expectedClose: new Date("2026-04-30"),
        notes: "Full AI automation for their software development pipeline.",
        ownerId: salesRep.id,
        contactId: contacts[0].id,
        companyId: companies[0].id,
      },
    }),
    prisma.deal.create({
      data: {
        title: "Cloud Migration Project",
        value: 45000,
        stage: "QUALIFICATION",
        probability: 40,
        expectedClose: new Date("2026-06-30"),
        notes: "Migrating legacy systems to cloud infrastructure.",
        ownerId: salesRep.id,
        contactId: contacts[1].id,
        companyId: companies[1].id,
      },
    }),
    prisma.deal.create({
      data: {
        title: "IoT Dashboard Solution",
        value: 38000,
        stage: "DISCOVERY",
        probability: 20,
        expectedClose: new Date("2026-08-15"),
        notes: "Real-time manufacturing monitoring dashboard.",
        ownerId: salesRep.id,
        contactId: contacts[4].id,
        companyId: companies[4].id,
      },
    }),
    prisma.deal.create({
      data: {
        title: "Data Analytics Platform",
        value: 28000,
        stage: "CLOSED_WON",
        probability: 100,
        expectedClose: new Date("2026-03-01"),
        notes: "Completed. Client very satisfied with the implementation.",
        ownerId: admin.id,
        contactId: contacts[2].id,
        companyId: companies[2].id,
      },
    }),
    prisma.deal.create({
      data: {
        title: "FinTech API Integration",
        value: 62000,
        stage: "PROPOSAL",
        probability: 55,
        expectedClose: new Date("2026-05-30"),
        notes: "Custom API integration for payment processing.",
        ownerId: salesRep.id,
        contactId: contacts[7].id,
        companyId: companies[7].id,
      },
    }),
  ]);

  console.log(`Created ${deals.length} deals.`);

  // ==================== ACTIVITIES ====================
  await Promise.all([
    prisma.activity.create({
      data: {
        type: "CALL",
        subject: "Introduction call with David Chen",
        description: "Discussed their requirements for AI automation. Very interested.",
        duration: 25,
        userId: salesRep.id,
        contactId: contacts[0].id,
        dealId: deals[1].id,
      },
    }),
    prisma.activity.create({
      data: {
        type: "EMAIL",
        subject: "Sent proposal to Anglian Water",
        description: "Detailed proposal for Enterprise Data Platform project.",
        userId: admin.id,
        contactId: contacts[3].id,
        dealId: deals[0].id,
      },
    }),
    prisma.activity.create({
      data: {
        type: "MEETING",
        subject: "Technical review with DataFlow",
        description: "Reviewed architecture and discussed next phase.",
        duration: 60,
        userId: developer.id,
        contactId: contacts[2].id,
        dealId: deals[4].id,
      },
    }),
    prisma.activity.create({
      data: {
        type: "NOTE",
        subject: "Competitor analysis for SmartFactory deal",
        description: "Identified 3 main competitors. Our IoT integration is the differentiator.",
        userId: salesRep.id,
        contactId: contacts[4].id,
        dealId: deals[3].id,
      },
    }),
    prisma.activity.create({
      data: {
        type: "TASK",
        subject: "Prepare demo environment for FinanceHub",
        description: "Set up sandbox with mock financial data for demo next week.",
        userId: developer.id,
        contactId: contacts[7].id,
        dealId: deals[5].id,
      },
    }),
    prisma.activity.create({
      data: {
        type: "CALL",
        subject: "Follow-up call with Emily Clark",
        description: "Confirmed Q2 budget allocation. Demo scheduled for next Tuesday.",
        duration: 15,
        userId: salesRep.id,
        contactId: contacts[7].id,
        dealId: deals[5].id,
      },
    }),
    prisma.activity.create({
      data: {
        type: "WHATSAPP",
        subject: "Quick check-in with Priya Sharma",
        description: "She confirmed partnership discussion for next month.",
        userId: manager.id,
        contactId: contacts[5].id,
      },
    }),
  ]);

  console.log("Created 7 activities.");

  // ==================== EMAIL ACCOUNT ====================
  const emailAccount = await prisma.emailAccount.create({
    data: {
      email: "info@codes-ai.uk",
      displayName: "CODES AI",
      smtpHost: "smtp.codes-ai.uk",
      smtpPort: 587,
      imapHost: "imap.codes-ai.uk",
      imapPort: 993,
      username: "info@codes-ai.uk",
      password: "placeholder",
      isDefault: true,
    },
  });

  console.log("Created email account.");

  // ==================== CAMPAIGNS ====================
  await Promise.all([
    prisma.campaign.create({
      data: {
        name: "AI Services Q1 2026",
        subject: "Transform Your Business with AI-Powered Automation",
        bodyTemplate: "Dear {{firstName}},\n\nCODES AI Private Limited is excited to introduce our latest AI automation solutions...",
        status: "SENT",
        sentCount: 150,
        openCount: 87,
        replyCount: 23,
        userId: admin.id,
      },
    }),
    prisma.campaign.create({
      data: {
        name: "Data Engineering Workshop",
        subject: "Free Workshop: Modern Data Engineering Practices",
        bodyTemplate: "Hi {{firstName}},\n\nJoin us for an exclusive workshop on modern data engineering...",
        status: "SCHEDULED",
        scheduledAt: new Date("2026-04-15"),
        userId: manager.id,
      },
    }),
    prisma.campaign.create({
      data: {
        name: "Spring Product Launch",
        subject: "Introducing Our New Cloud Platform",
        bodyTemplate: "Hello {{firstName}},\n\nWe are thrilled to announce our new cloud platform...",
        status: "DRAFT",
        userId: admin.id,
      },
    }),
  ]);

  console.log("Created 3 campaigns.");

  // ==================== EMAILS ====================
  await Promise.all([
    prisma.email.create({
      data: {
        subject: "Proposal: Enterprise Data Platform",
        body: "Dear James,\n\nPlease find attached our detailed proposal for the Enterprise Data Platform project...",
        bodyHtml: "<p>Dear James,</p><p>Please find attached our detailed proposal...</p>",
        from: "avais@codes-ai.uk",
        to: ["j.whitfield@anglianwater.co.uk"],
        cc: [],
        bcc: [],
        status: "OPENED",
        direction: "OUTBOUND",
        sentAt: new Date("2026-03-20"),
        openedAt: new Date("2026-03-20"),
        userId: admin.id,
        contactId: contacts[3].id,
        companyId: companies[3].id,
        accountId: emailAccount.id,
      },
    }),
    prisma.email.create({
      data: {
        subject: "Re: AI Automation Demo",
        body: "Hi James,\n\nThank you for the demo yesterday. Our team was very impressed...",
        from: "david.chen@techcorp.co.uk",
        to: ["james@codes-ai.uk"],
        cc: [],
        bcc: [],
        status: "REPLIED",
        direction: "INBOUND",
        receivedAt: new Date("2026-03-22"),
        userId: salesRep.id,
        contactId: contacts[0].id,
        companyId: companies[0].id,
        accountId: emailAccount.id,
      },
    }),
    prisma.email.create({
      data: {
        subject: "Cloud Migration Discussion",
        body: "Dear Alice,\n\nFollowing our call, I wanted to outline the key points...",
        from: "james@codes-ai.uk",
        to: ["alice.morgan@greenenergy.uk"],
        cc: ["avais@codes-ai.uk"],
        bcc: [],
        status: "SENT",
        direction: "OUTBOUND",
        sentAt: new Date("2026-03-23"),
        userId: salesRep.id,
        contactId: contacts[1].id,
        companyId: companies[1].id,
        accountId: emailAccount.id,
      },
    }),
  ]);

  console.log("Created 3 emails.");

  // ==================== CALL LOGS ====================
  await Promise.all([
    prisma.callLog.create({
      data: {
        phoneNumber: "+447700100001",
        contactName: "David Chen",
        direction: "OUTBOUND",
        status: "COMPLETED",
        duration: 1500,
        notes: "Discussed AI automation requirements and timeline.",
        startedAt: new Date("2026-03-22T10:00:00"),
        endedAt: new Date("2026-03-22T10:25:00"),
        userId: salesRep.id,
      },
    }),
    prisma.callLog.create({
      data: {
        phoneNumber: "+447700100004",
        contactName: "James Whitfield",
        direction: "INBOUND",
        status: "COMPLETED",
        duration: 720,
        notes: "Called to discuss proposal details and pricing.",
        startedAt: new Date("2026-03-21T14:30:00"),
        endedAt: new Date("2026-03-21T14:42:00"),
        userId: admin.id,
      },
    }),
    prisma.callLog.create({
      data: {
        phoneNumber: "+447700100008",
        contactName: "Emily Clark",
        direction: "OUTBOUND",
        status: "COMPLETED",
        duration: 900,
        notes: "Follow-up on FinTech API demo scheduling.",
        startedAt: new Date("2026-03-23T11:00:00"),
        endedAt: new Date("2026-03-23T11:15:00"),
        userId: salesRep.id,
      },
    }),
    prisma.callLog.create({
      data: {
        phoneNumber: "+447700100005",
        contactName: "Mark Stevens",
        direction: "OUTBOUND",
        status: "MISSED",
        duration: 0,
        notes: "No answer. Will try again tomorrow.",
        startedAt: new Date("2026-03-23T15:00:00"),
        userId: salesRep.id,
      },
    }),
  ]);

  console.log("Created 4 call logs.");

  // ==================== WHATSAPP CHATS ====================
  const chat1 = await prisma.whatsAppChat.create({
    data: {
      phoneNumber: "+447700100006",
      contactName: "Priya Sharma",
      lastMessage: "Sounds great! Let's schedule it for next week.",
      lastMessageAt: new Date("2026-03-23T16:30:00"),
      unreadCount: 0,
      contactId: contacts[5].id,
    },
  });

  await prisma.whatsAppMessage.createMany({
    data: [
      { body: "Hi Priya, hope you're doing well! Quick question about the partnership discussion.", direction: "OUTBOUND", timestamp: new Date("2026-03-23T16:00:00"), chatId: chat1.id },
      { body: "Hi! Yes, I've been thinking about it. We're definitely interested.", direction: "INBOUND", timestamp: new Date("2026-03-23T16:15:00"), chatId: chat1.id },
      { body: "Fantastic! Shall we set up a formal meeting to discuss terms?", direction: "OUTBOUND", timestamp: new Date("2026-03-23T16:20:00"), chatId: chat1.id },
      { body: "Sounds great! Let's schedule it for next week.", direction: "INBOUND", timestamp: new Date("2026-03-23T16:30:00"), chatId: chat1.id },
    ],
  });

  const chat2 = await prisma.whatsAppChat.create({
    data: {
      phoneNumber: "+447700100001",
      contactName: "David Chen",
      lastMessage: "I'll review the proposal and get back to you by Friday.",
      lastMessageAt: new Date("2026-03-22T18:00:00"),
      unreadCount: 1,
      contactId: contacts[0].id,
    },
  });

  await prisma.whatsAppMessage.createMany({
    data: [
      { body: "Hi David, just sent over the updated proposal. Let me know if you have any questions.", direction: "OUTBOUND", timestamp: new Date("2026-03-22T17:30:00"), chatId: chat2.id },
      { body: "I'll review the proposal and get back to you by Friday.", direction: "INBOUND", timestamp: new Date("2026-03-22T18:00:00"), chatId: chat2.id },
    ],
  });

  console.log("Created WhatsApp chats with messages.");

  // ==================== INVOICES ====================
  const invoice1 = await prisma.invoice.create({
    data: {
      invoiceNumber: "INV-2026-001",
      clientName: "DataFlow Systems",
      clientEmail: "accounts@dataflow.io",
      clientAddress: "78 Data Drive, Birmingham, B1 1AA",
      dueDate: new Date("2026-04-15"),
      status: "PAID",
      subtotal: 28000,
      vatRate: 20,
      vatAmount: 5600,
      total: 33600,
      notes: "Data Analytics Platform - Final Payment",
      paidAt: new Date("2026-03-10"),
      userId: admin.id,
    },
  });

  await prisma.invoiceItem.createMany({
    data: [
      { description: "Data Analytics Platform - Development", quantity: 1, unitPrice: 18000, total: 18000, invoiceId: invoice1.id },
      { description: "Data Analytics Platform - Integration", quantity: 1, unitPrice: 6000, total: 6000, invoiceId: invoice1.id },
      { description: "Training & Documentation", quantity: 1, unitPrice: 4000, total: 4000, invoiceId: invoice1.id },
    ],
  });

  const invoice2 = await prisma.invoice.create({
    data: {
      invoiceNumber: "INV-2026-002",
      clientName: "TechCorp Ltd",
      clientEmail: "accounts@techcorp.co.uk",
      clientAddress: "123 Tech Street, London, EC1A 1BB",
      dueDate: new Date("2026-04-30"),
      status: "SENT",
      subtotal: 15000,
      vatRate: 20,
      vatAmount: 3000,
      total: 18000,
      notes: "AI Automation Suite - Phase 1 Deposit",
      userId: admin.id,
    },
  });

  await prisma.invoiceItem.createMany({
    data: [
      { description: "AI Automation Suite - Phase 1 (50% deposit)", quantity: 1, unitPrice: 15000, total: 15000, invoiceId: invoice2.id },
    ],
  });

  const invoice3 = await prisma.invoice.create({
    data: {
      invoiceNumber: "INV-2026-003",
      clientName: "Anglian Water Services",
      clientEmail: "accounts@anglianwater.co.uk",
      clientAddress: "Lancaster House, Huntingdon, PE29 6XU",
      dueDate: new Date("2026-05-15"),
      status: "DRAFT",
      subtotal: 42500,
      vatRate: 20,
      vatAmount: 8500,
      total: 51000,
      notes: "Enterprise Data Platform - Milestone 1",
      userId: admin.id,
    },
  });

  await prisma.invoiceItem.createMany({
    data: [
      { description: "Enterprise Data Platform - Architecture & Design", quantity: 1, unitPrice: 12500, total: 12500, invoiceId: invoice3.id },
      { description: "Enterprise Data Platform - Core Development", quantity: 1, unitPrice: 25000, total: 25000, invoiceId: invoice3.id },
      { description: "Project Management", quantity: 1, unitPrice: 5000, total: 5000, invoiceId: invoice3.id },
    ],
  });

  console.log("Created 3 invoices with items.");

  // ==================== EXPENSES ====================
  await prisma.expense.createMany({
    data: [
      { description: "AWS Cloud Hosting - March 2026", amount: 1250, category: "Infrastructure", date: new Date("2026-03-01"), vendor: "Amazon Web Services", status: "APPROVED" },
      { description: "GitHub Enterprise License", amount: 189, category: "Software", date: new Date("2026-03-01"), vendor: "GitHub", status: "APPROVED" },
      { description: "Office Supplies", amount: 145.50, category: "Office", date: new Date("2026-03-05"), vendor: "Staples", status: "APPROVED" },
      { description: "Client Dinner - TechCorp", amount: 285, category: "Entertainment", date: new Date("2026-03-15"), vendor: "The Ivy", status: "PENDING" },
      { description: "Train Tickets - Birmingham", amount: 95.40, category: "Travel", date: new Date("2026-03-18"), vendor: "National Rail", status: "APPROVED" },
      { description: "Anthropic API Credits", amount: 500, category: "Software", date: new Date("2026-03-01"), vendor: "Anthropic", status: "APPROVED" },
      { description: "Domain Renewal - codes-ai.uk", amount: 12.99, category: "Infrastructure", date: new Date("2026-03-10"), vendor: "IONOS", status: "APPROVED" },
      { description: "LinkedIn Premium Business", amount: 59.99, category: "Marketing", date: new Date("2026-03-01"), vendor: "LinkedIn", status: "APPROVED" },
    ],
  });

  console.log("Created 8 expenses.");

  // ==================== WEB PAGES ====================
  await prisma.webPage.createMany({
    data: [
      {
        title: "Home",
        slug: "home",
        content: { sections: [{ type: "hero", heading: "CODES AI Private Limited", subheading: "AI-Powered Business Solutions" }] },
        metaTitle: "CODES AI | AI-Powered Business Solutions",
        metaDescription: "CODES AI Private Limited builds intelligent automation and data engineering solutions.",
        isPublished: true,
        publishedAt: new Date("2026-01-01"),
        sortOrder: 1,
      },
      {
        title: "About Us",
        slug: "about",
        content: { sections: [{ type: "text", heading: "About CODES AI", body: "We are a technology company specialising in AI solutions." }] },
        metaTitle: "About | CODES AI",
        isPublished: true,
        publishedAt: new Date("2026-01-01"),
        sortOrder: 2,
      },
      {
        title: "Services",
        slug: "services",
        content: { sections: [{ type: "services-grid" }] },
        metaTitle: "Services | CODES AI",
        isPublished: true,
        publishedAt: new Date("2026-01-01"),
        sortOrder: 3,
      },
      {
        title: "Contact",
        slug: "contact",
        content: { sections: [{ type: "contact-form" }] },
        metaTitle: "Contact | CODES AI",
        isPublished: true,
        publishedAt: new Date("2026-01-01"),
        sortOrder: 4,
      },
    ],
  });

  console.log("Created 4 web pages.");

  // ==================== SERVICES ====================
  await prisma.service.createMany({
    data: [
      {
        title: "AI Automation",
        description: "Intelligent automation solutions powered by cutting-edge AI models.",
        icon: "bot",
        features: ["Process Automation", "NLP", "Predictive Analytics", "Custom AI Models"],
        sortOrder: 1,
      },
      {
        title: "Data Engineering",
        description: "End-to-end data pipeline design, implementation, and optimization.",
        icon: "database",
        features: ["ETL Pipelines", "Data Warehousing", "Real-time Processing", "Data Quality"],
        sortOrder: 2,
      },
      {
        title: "Cloud Solutions",
        description: "Cloud migration, architecture, and optimization across AWS, Azure, and GCP.",
        icon: "cloud",
        features: ["Cloud Migration", "Infrastructure as Code", "Cost Optimization", "Security"],
        sortOrder: 3,
      },
      {
        title: "Web Development",
        description: "Modern, responsive web applications built with Next.js, React, and TypeScript.",
        icon: "code",
        features: ["Full-Stack Development", "Progressive Web Apps", "API Development", "UI/UX Design"],
        sortOrder: 4,
      },
      {
        title: "Business Intelligence",
        description: "Transform raw data into actionable insights with custom dashboards.",
        icon: "bar-chart",
        features: ["Custom Dashboards", "Automated Reports", "KPI Tracking", "Data Visualization"],
        sortOrder: 5,
      },
    ],
  });

  console.log("Created 5 services.");

  // ==================== TESTIMONIALS ====================
  await prisma.testimonial.createMany({
    data: [
      {
        clientName: "James Whitfield",
        clientTitle: "IT Director",
        clientCompany: "Anglian Water Services",
        content: "CODES AI delivered an exceptional data platform that has transformed how we manage our operations.",
        rating: 5,
        isPublished: true,
      },
      {
        clientName: "Sarah Chen",
        clientTitle: "CTO",
        clientCompany: "DataFlow Systems",
        content: "Working with CODES AI has been a game-changer for our analytics capabilities.",
        rating: 5,
        isPublished: true,
      },
      {
        clientName: "David Chen",
        clientTitle: "CTO",
        clientCompany: "TechCorp Ltd",
        content: "The AI automation suite from CODES AI is incredibly powerful and has streamlined our processes.",
        rating: 4,
        isPublished: true,
      },
    ],
  });

  console.log("Created 3 testimonials.");

  // ==================== SITE SETTINGS ====================
  await prisma.siteSetting.createMany({
    data: [
      { key: "site_name", value: "CODES AI Private Limited", type: "text", group: "general" },
      { key: "site_tagline", value: "AI-Powered Business Solutions", type: "text", group: "general" },
      { key: "contact_email", value: "info@codes-ai.uk", type: "text", group: "contact" },
      { key: "contact_phone", value: "+447586094540", type: "text", group: "contact" },
      { key: "address", value: "United Kingdom", type: "text", group: "contact" },
      { key: "linkedin_url", value: "https://linkedin.com/company/codes-ai", type: "text", group: "social" },
      { key: "github_url", value: "https://github.com/codes-ai", type: "text", group: "social" },
      { key: "primary_color", value: "#D4764E", type: "color", group: "theme" },
      { key: "analytics_enabled", value: "true", type: "boolean", group: "general" },
    ],
  });

  console.log("Created 9 site settings.");

  // ==================== TEAM PROFILES ====================
  await Promise.all([
    prisma.teamProfile.create({
      data: {
        bio: "Founder & CEO with expertise in Data Engineering, AI/ML, and cloud architecture.",
        skills: ["Python", "TypeScript", "Azure", "AWS", "Data Engineering", "Machine Learning"],
        specializations: ["AI Automation", "Data Pipelines", "Cloud Architecture"],
        linkedinUrl: "https://linkedin.com/in/avaisahmad",
        githubUrl: "https://github.com/avaisahmad",
        availability: "available",
        userId: admin.id,
      },
    }),
    prisma.teamProfile.create({
      data: {
        bio: "Operations Manager ensuring smooth delivery of all client projects.",
        skills: ["Project Management", "Agile", "Scrum", "Client Relations", "Operations"],
        specializations: ["Project Delivery", "Team Management", "Process Optimization"],
        availability: "available",
        userId: manager.id,
      },
    }),
    prisma.teamProfile.create({
      data: {
        bio: "Senior Developer specialising in full-stack development with React, Next.js, and Node.js.",
        skills: ["React", "Next.js", "Node.js", "TypeScript", "PostgreSQL", "Docker"],
        specializations: ["Full-Stack Development", "API Design", "Database Architecture"],
        githubUrl: "https://github.com/rahulpatel",
        availability: "available",
        userId: developer.id,
      },
    }),
  ]);

  console.log("Created 3 team profiles.");

  // ==================== AI TOOLS ====================
  await prisma.aITool.createMany({
    data: [
      {
        name: "Claude (Anthropic)",
        description: "Advanced AI assistant for code generation, analysis, and intelligent automation.",
        category: "AI Assistant",
        website: "https://anthropic.com",
        isIntegrated: true,
        config: { model: "claude-sonnet-4-20250514", maxTokens: 4096 },
      },
      {
        name: "GitHub Copilot",
        description: "AI-powered code completion and suggestion tool.",
        category: "Code Generation",
        website: "https://github.com/features/copilot",
        isIntegrated: true,
      },
      {
        name: "Vercel AI SDK",
        description: "Build AI-powered applications with streaming text and chat interfaces.",
        category: "Development Framework",
        website: "https://sdk.vercel.ai",
        isIntegrated: false,
      },
    ],
  });

  console.log("Created 3 AI tools.");

  console.log("\n========================================");
  console.log("Database seeding completed successfully!");
  console.log("========================================");
  console.log("\nDemo login credentials:");
  console.log("  Admin:     avais@codes-ai.uk / password123");
  console.log("  Manager:   sarah@codes-ai.uk / password123");
  console.log("  Sales:     james@codes-ai.uk / password123");
  console.log("  HR:        emma@codes-ai.uk / password123");
  console.log("  Developer: rahul@codes-ai.uk / password123");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
