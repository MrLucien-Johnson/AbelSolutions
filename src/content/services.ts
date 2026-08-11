export type ServiceItem = {
  title: string;
  description: string;
};

export type ServiceCategory = {
  id: string;
  title: string;
  intro: string;
  items: ServiceItem[];
  note?: string;
};

export const technologyCategories: ServiceCategory[] = [
  {
    id: "computer-laptop",
    title: "Computer and laptop services",
    intro:
      "Practical help when a machine is slow, unreliable, or simply not doing what you need it to.",
    items: [
      {
        title: "Diagnostics",
        description:
          "Identify hardware and software issues so you know what needs attention before committing to repairs.",
      },
      {
        title: "Repairs",
        description:
          "Address common faults where parts and labour make sense for the age and value of the device.",
      },
      {
        title: "Performance upgrades",
        description:
          "Improve responsiveness through carefully chosen storage, memory and configuration changes.",
      },
      {
        title: "Storage upgrades",
        description:
          "Move to faster drives and expand capacity with data transfer handled carefully throughout.",
      },
      {
        title: "Memory upgrades",
        description:
          "Add suitable RAM where the device supports it, to ease multitasking and everyday use.",
      },
      {
        title: "Operating system assistance",
        description:
          "Help with setup, recovery and common OS problems on supported Windows systems.",
      },
      {
        title: "Software troubleshooting",
        description:
          "Resolve application errors, startup issues and conflicting software that get in the way of work.",
      },
      {
        title: "Data transfer",
        description:
          "Move files between devices with a clear plan so important documents and media are not left behind.",
      },
      {
        title: "General setup",
        description:
          "Get new computers ready for home or business use, including accounts, updates and essentials.",
      },
    ],
  },
  {
    id: "custom-pc-builds",
    title: "Custom PC builds",
    intro:
      "Systems assembled around your budget, workload and space — from gaming machines to practical workstations.",
    items: [
      {
        title: "Gaming PCs",
        description:
          "Balanced builds aimed at smooth gameplay within an agreed budget and performance target.",
      },
      {
        title: "Workstations",
        description:
          "Reliable systems for design, office work, content creation or everyday professional use.",
      },
      {
        title: "Budget-conscious builds",
        description:
          "Honest component choices that prioritise value without spending on features you will not use.",
      },
      {
        title: "Upgrade planning",
        description:
          "Advice on what to replace now and what can wait, based on your current hardware.",
      },
      {
        title: "Component selection",
        description:
          "Help choosing compatible parts so power, cooling and performance work together properly.",
      },
      {
        title: "Assembly and testing",
        description:
          "Careful build, cable management and functional checks before the system is handed over.",
      },
    ],
    note: "Software licences are not included unless agreed separately in writing.",
  },
  {
    id: "mobile-device",
    title: "Mobile and device support",
    intro:
      "Assistance with phones and everyday devices when something needs diagnosing, setting up or transferring.",
    items: [
      {
        title: "Basic diagnostics",
        description:
          "Assess common device issues and explain realistic repair or replacement options.",
      },
      {
        title: "Supported repairs",
        description:
          "Carry out repairs where parts and methods are suitable for the device and fault.",
      },
      {
        title: "Setup and data-transfer assistance",
        description:
          "Help moving accounts, photos and essentials to a new or replacement device.",
      },
    ],
    note: "Component-level board repairs are not assumed; suitability is confirmed case by case.",
  },
  {
    id: "business-it",
    title: "Business IT support",
    intro:
      "Straightforward technical support for small and medium-sized businesses that need dependable day-to-day help.",
    items: [
      {
        title: "Small-business technical support",
        description:
          "Practical assistance when systems slow down, fail to connect or interrupt trading.",
      },
      {
        title: "Device setup",
        description:
          "Prepare laptops, desktops and peripherals so staff can get productive quickly.",
      },
      {
        title: "Network troubleshooting",
        description:
          "Investigate Wi-Fi and wired network problems affecting homes and small offices.",
      },
      {
        title: "Hardware support",
        description:
          "Advice and hands-on help with printers, monitors, storage and related equipment.",
      },
      {
        title: "Software support",
        description:
          "Help resolving common application and operating-system issues that affect daily work.",
      },
      {
        title: "Technology planning",
        description:
          "Clear recommendations for upgrades and replacements based on real needs and budget.",
      },
    ],
  },
  {
    id: "secure-removal",
    title: "Secure equipment removal and data services",
    intro:
      "Help clearing out redundant computers and handling data carefully when equipment reaches end of life.",
    items: [
      {
        title: "Redundant computer removal",
        description:
          "Collect and remove unused computers and related equipment by arrangement.",
      },
      {
        title: "Data-destruction options",
        description:
          "Discuss practical approaches to clearing data before disposal or recycling.",
      },
      {
        title: "Responsible equipment handling",
        description:
          "Handle retired devices carefully so they are not left in an unsafe or disorderly state.",
      },
    ],
    note: "Government-standard destruction or certified recycling is not claimed unless separately confirmed in writing.",
  },
];

export const constructionCategories: ServiceCategory[] = [
  {
    id: "media-walls",
    title: "Media walls and TV installations",
    intro:
      "Clean, practical installations for living rooms and media spaces — planned around your room, screen and cable routes.",
    items: [
      {
        title: "Media-wall preparation and installation",
        description:
          "Build and finish media-wall structures suited to your space, screen size and storage needs.",
      },
      {
        title: "TV mounting",
        description:
          "Secure wall mounting with attention to height, viewing position and wall suitability.",
      },
      {
        title: "Shelving and display areas",
        description:
          "Integrate shelving and display niches that work with the media wall design.",
      },
      {
        title: "Cable-management planning",
        description:
          "Plan routes for power and signal cables so the finished result looks tidy and usable.",
      },
      {
        title: "Finishing coordination",
        description:
          "Coordinate with decoration and finishing work so the installation sits cleanly in the room.",
      },
    ],
    note: "Specialist electrical work may require a suitably qualified electrician. Abel Solutions does not claim electrical certification.",
  },
  {
    id: "interior-installations",
    title: "Interior installations",
    intro:
      "Fitting and improvement work that makes rooms more useful — from shelving to stud walls and practical alterations.",
    items: [
      {
        title: "Shelving",
        description:
          "Install shelving suited to the load, wall type and intended use.",
      },
      {
        title: "Wall-mounted fixtures",
        description:
          "Fit wall-mounted items carefully, with fixing methods matched to the surface.",
      },
      {
        title: "Stud walls",
        description:
          "Construct stud walls for room division, framing or media-wall backings where appropriate.",
      },
      {
        title: "Practical room improvements",
        description:
          "Carry out sensible alterations that improve how a space works day to day.",
      },
      {
        title: "General fitting assistance",
        description:
          "Support with carpentry and fitting tasks as part of a wider project or standalone job.",
      },
    ],
  },
  {
    id: "exterior-groundwork",
    title: "Exterior and groundwork support",
    intro:
      "Labour and support for outdoor and ground-level work where dependable hands and clear communication matter.",
    items: [
      {
        title: "Block-paving support",
        description:
          "Assist with block-paving work as part of a planned outdoor project.",
      },
      {
        title: "Ground preparation",
        description:
          "Help prepare ground for subsequent construction or landscaping stages.",
      },
      {
        title: "General groundwork",
        description:
          "Provide practical groundwork support matched to the scope of the job.",
      },
      {
        title: "Construction labour",
        description:
          "Reliable labour for construction companies and property projects that need extra capacity.",
      },
    ],
  },
  {
    id: "access-support",
    title: "Access and project support",
    intro:
      "Support for projects that need careful access planning, labour and coordination on site.",
    items: [
      {
        title: "Working-at-height support",
        description:
          "Assist with work that involves height, subject to site conditions and safe working practice.",
      },
      {
        title: "Mobile access tower support",
        description:
          "Support tower-related work where qualifications, site conditions and regulations permit.",
      },
      {
        title: "General labour and project assistance",
        description:
          "Provide dependable help across mixed construction tasks under clear instruction.",
      },
    ],
    note: "PASMA-related access work is only offered once the relevant certification status is confirmed. Every project is assessed individually for scope, safety and access requirements.",
  },
];

export const featuredServices = [
  {
    title: "Computer and laptop repairs",
    description:
      "Diagnostics, repairs and upgrades when a machine is slowing you down or failing to start.",
    href: "/technology-services#computer-laptop",
    division: "technology" as const,
  },
  {
    title: "Custom and gaming PC builds",
    description:
      "Systems planned around your budget, games or workload — assembled and tested carefully.",
    href: "/technology-services#custom-pc-builds",
    division: "technology" as const,
  },
  {
    title: "Small-business IT support",
    description:
      "Practical help with devices, networks and day-to-day technical problems for local businesses.",
    href: "/technology-services#business-it",
    division: "technology" as const,
  },
  {
    title: "Media walls and TV mounting",
    description:
      "Clean media-wall installations and secure TV mounting planned around your room and cables.",
    href: "/construction-services#media-walls",
    division: "construction" as const,
  },
  {
    title: "Shelving and interior fitting",
    description:
      "Shelving, stud walls and practical interior fitting that make a space work harder.",
    href: "/construction-services#interior-installations",
    division: "construction" as const,
  },
  {
    title: "Construction labour support",
    description:
      "Dependable labour and project support for property improvements and site work.",
    href: "/construction-services#exterior-groundwork",
    division: "construction" as const,
  },
];

export const whyChoose = [
  {
    title: "Clear communication",
    description:
      "Plain explanations of what is wrong, what can be done, and what it is likely to involve.",
  },
  {
    title: "Practical advice",
    description:
      "Recommendations based on the job in front of us — not unnecessary upgrades or extras.",
  },
  {
    title: "Careful workmanship",
    description:
      "Attention to detail whether the work involves a PC, a media wall or on-site labour.",
  },
  {
    title: "Honest quotations",
    description:
      "Clear pricing based on what we can see and assess — with no inflated promises.",
  },
];

export const processSteps = [
  {
    step: 1,
    title: "Tell us what you need",
    description:
      "Share a short description of the issue or project, along with photos or details where helpful.",
  },
  {
    step: 2,
    title: "Receive an initial assessment",
    description:
      "We review the information and confirm whether an on-site visit or further details are needed.",
  },
  {
    step: 3,
    title: "Get a clear quotation",
    description:
      "You receive a quotation based on the assessed scope. Some jobs need photographs, specifications or a site visit first.",
  },
  {
    step: 4,
    title: "Arrange the work",
    description:
      "Agree a suitable time and any access requirements so the work can proceed smoothly.",
  },
  {
    step: 5,
    title: "Completion and follow-up",
    description:
      "Work is completed as agreed, with a brief handover so you know what was done and what to expect next.",
  },
];
