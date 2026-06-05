import { OnboardingAnswers, Task, Province, TaskPriority, TaskCategory, ImmigrationStatus } from '../types';

export function generatePersonalizedTasks(answers: OnboardingAnswers): Task[] {
  const { province, status, family, concern, tier } = answers;
  const isFree = tier === 'free';

  // Province-specific health cards
  let healthCardName = 'Provincial Health Insurance';
  let healthAgency = 'your provincial health authority';
  let healthDocs = ['Passport', 'Status document (COPR, Work Permit, Study Permit)', 'Proof of residency'];

  if (province === 'Ontario') {
    healthCardName = 'Register for OHIP (Ontario Health Insurance Plan)';
    healthAgency = 'ServiceOntario Centre';
    healthDocs = [
      'Passport',
      'Confirmation of PR (COPR) or Work/Study Permit',
      'Ontario Residency proof (e.g., residential utility bill, signed lease, bank statement, or Ontario Photo ID)',
      'A third document showing identity with photo (e.g., foreign driver\'s license)'
    ];
  } else if (province === 'BC') {
    healthCardName = 'Apply for MSP (Medical Services Plan) & BC Services Card';
    healthAgency = 'Health Insurance BC (online or paper form)';
    healthDocs = [
      'Study/work permit or PR card / landing documents',
      'Confirmation of Identity',
      'Proof of BC residency'
    ];
  } else if (province === 'Alberta') {
    healthCardName = 'Register for AHCIP (Alberta Health Care Insurance Plan)';
    healthAgency = 'Authorized Alberta Registry Agent office';
    healthDocs = [
      'Valid Canadian passport, PR Card, or Work Permit',
      'Proof of Alberta residency (e.g., utility bill or driver\'s license)',
      'Government Photo ID supporting document'
    ];
  } else if (province === 'Quebec') {
    healthCardName = 'Apply for RAMQ Medicare Card (Assurance maladie)';
    healthAgency = 'RAMQ (Régie de l\'assurance maladie du Québec) offices or online';
    healthDocs = [
      'Passport & PR card / landing papers / work permit',
      'Proof of residency in Quebec (e.g. residential lease, utility bill)',
      'Eligible identity documentation'
    ];
  }

  // Province-specific travel / transit card
  let transitCardName = 'Get your local transit card';
  let transitDesc = 'Load and utilize local transit for easy navigation.';
  if (province === 'Ontario') {
    transitCardName = 'Purchase and Register a PRESTO Card';
    transitDesc = 'The PRESTO card handles fares for Metrolinx, GO Transit, TTC (Toronto), and major GTA networks.';
  } else if (province === 'BC') {
    transitCardName = 'Get a Compass Card';
    transitDesc = 'Compass is the unified payment card for TransLink transit services in Metro Vancouver.';
  } else if (province === 'Alberta') {
    transitCardName = 'Obtain an Arc Calgary/Edmonton Transit Card';
    transitDesc = 'Arc is the tokenized payment card used for Calgary Transit and Edmonton Transit Service Systems.';
  } else if (province === 'Quebec') {
    transitCardName = 'Purchase an OPUS Card';
    transitDesc = 'The OPUS card handles smart-fare payments for the STM in Montreal and RTL, STL, and Exo networks.';
  }

  const rawTasks: Omit<Task, 'lockedOnFree'>[] = [
    {
      id: 'task-sin',
      title: 'Get your Social Insurance Number (SIN)',
      week: 1,
      priority: 'Critical',
      category: 'Documentation',
      dueDateDays: 3,
      status: 'not_started',
      whatAndWhy: 'Your Social Insurance Number (SIN) is a 9-digit confidential number issued by Canada. You absolutely need it to work in Canada, pay taxes, and access essential government programs and benefits (like the Canada Child Benefit). Having a SIN immediately on file with your bank starts your positive tax relation.',
      whereText: 'Your nearest Service Canada Centre. (Or apply online, though visiting in person will give you your SIN letter on the very same day).',
      whereLink: 'https://www.canada.ca/en/employment-social-development/services/sin.html',
      howSteps: [
        'Find your nearby Service Canada Centre using the official locator.',
        'Ensure you have original paper copies of all primary documents (photocopies are not accepted).',
        'Arrive early in the morning to beat long queues.',
        'Present documents to the officer; they will print out your SIN letter immediately without charging any fee.'
      ],
      requiredDocs: [
        { text: 'Valid Passport', checked: false },
        { text: 'Proof of legal status (e.g., Confirmation of Permanent Residence [COPR], Work Permit, or Study Permit)', checked: false }
      ]
    },
    {
      id: 'task-bank',
      title: 'Open a Newcomer Checking Account and Credit Card',
      week: 1,
      priority: 'Critical',
      category: 'Finance',
      dueDateDays: 5,
      status: 'not_started',
      whatAndWhy: 'You need a local bank account to receive payroll direct deposits, pay rent, and handle day-to-day purchases. Without a Canadian credit card, you cannot begin establishing a credit score (under Equifax or TransUnion), which is highly weighted when renting apartments or financing vehicles in the future.',
      whereText: 'Any major Canadian branch (RBC, TD, Scotiabank, BMO, CIBC) — most offer specialized \'Newcomer Packages\' featuring 12 months with $0 monthly fees, a free checking account, and a guaranteed limits credit card without prior Canadian history.',
      howSteps: [
        'Research newcomer banking offers online to select which fits you best.',
        'Book a newcomer appointment online at your preferred branch.',
        'Bring your passport, status documents, and some initial funds (cash, wire transfer details) to deposit.',
        'Request checking/savings accounts, activate online banking, and request a newcomer credit card with a starting limit.'
      ],
      requiredDocs: [
        { text: 'Valid Passport', checked: false },
        { text: 'Immigration documents (COPR/PR Card/Work Permit/Study Permit)', checked: false },
        { text: 'Canadian residential address details', checked: false }
      ]
    },
    {
      id: 'task-health',
      title: healthCardName,
      week: 1,
      priority: 'Critical',
      category: 'Healthcare',
      dueDateDays: 7,
      status: 'not_started',
      whatAndWhy: 'Healthcare represents a cornerstone of living in Canada. Basic medically-necessary services and emergency hospitalization are fully covered by public funds. Registering on Week 1 ensures you secure health coverage immediately on arrival.',
      whereText: `Your local official agency: ${healthAgency}. Or start the initial registry on the provincial portal online.`,
      howSteps: [
        'Collect all required proof papers. Province regulations are extremely strict regarding local residency checks.',
        'Complete the physical, printed or online enrollment form.',
        'Locate and visit your closest administrative registration office.',
        'Keep the temporary confirmation receipt until your formal plastic Health Card arrives in the post.'
      ],
      requiredDocs: healthDocs.map(doc => ({ text: doc, checked: false }))
    },
    {
      id: 'task-phone',
      title: 'Obtain a Canadian SIM Card & Phone Number',
      week: 1,
      priority: 'Important',
      category: 'Documentation',
      dueDateDays: 4,
      status: 'not_started',
      whatAndWhy: 'You need an active Canadian phone number. Landlords, employers, government portals, and banks will look for a +1 number. Using international roaming is extremely expensive and discourages local calls from hiring managers.',
      whereText: 'Any cellular provider kiosk, mall hub, or retail partner. Check Rogers, Bell, or Telus for premium packages, or more affordable flankers like Fido, Koodo, Virgin Plus, and Freedom Mobile.',
      howSteps: [
        'Compare pre-paid versus monthly post-paid (bring-your-own-device or BYOD to avoid lock-ins) configurations.',
        'Ensure your phone is unlocked from your country of origin.',
        'Bring structural pieces of identification to the kiosk.',
        'Purchase and insert the physical SIM card or scan the e-SIM barcode.'
      ],
      requiredDocs: [
        { text: 'Primary ID (Passport)', checked: false },
        { text: 'Secondary ID (Immigration Status document or major Credit Card)', checked: false }
      ]
    },
    {
      id: 'task-transit',
      title: transitCardName,
      week: 2,
      priority: 'Important',
      category: 'Community',
      dueDateDays: 9,
      status: 'not_started',
      whatAndWhy: `Navigation in Canadian cities is key. ${transitDesc} Registering your smart card online protects any loaded funds in the event your card is ever lost or stolen.`,
      whereText: 'Transit hubs, train stations, local convenience stores, or municipal service booths.',
      howSteps: [
        'Locate a transit vending kiosk or service retail vendor.',
        'Purchase the empty smart card.',
        'Register your account on the official transit mobile app or webpage.',
        'Load a baseline budget or a month-long pass to make transportation effortless.'
      ],
      requiredDocs: [
        { text: 'Funds to load (Debit or Credit card)', checked: false },
        { text: 'Student ID (if applying for student concession fares)', checked: false }
      ]
    },
    {
      id: 'task-housing',
      title: concern === 'Housing' ? 'Secure Long-Term Rental Housing (Urgent Focus)' : 'Research and Secure Long-term Housing',
      week: 2,
      priority: 'Critical',
      category: 'Housing',
      dueDateDays: 14,
      status: 'not_started',
      whatAndWhy: 'Transitioning out of short-term airbnbs or initial hotels into your own apartment is a vital milestone. A formal residential lease acts as your absolute gold standard for provincial proof of address, resolving all administrative compliance down the road.',
      whereText: 'Rental listing platforms (Realtor.ca, Zumper, Rentals.ca, PadMapper) or working alongside a licensed Real Estate Agent (free for tenants in provinces like Ontario as landlords pay the commission).',
      howSteps: [
        'Draft a clean newcomer renter package PDF: bank balances certificate, letter of employment or previous references, bank letter of introduction.',
        'Strictly monitor for fraudulent listings (never pay deposits without viewing the unit in person).',
        'Conduct physical unit viewings representing yourself professionally.',
        'Sign the standard lease agreement and obtain keys upon clearing your first and last month deposits.'
      ],
      requiredDocs: [
        { text: 'Bank letter/statements proving sufficient Canadian or overseas funds', checked: false },
        { text: 'Job contract or Letter of Employment (if available)', checked: false },
        { text: 'Government-issued Photo ID (Passport)', checked: false }
      ]
    },
    {
      id: 'task-resume',
      title: concern === 'Employment' ? 'Refactor Resume to Canadian Standards (Urgent Focus)' : 'Reformat Resume to Canadian Formats',
      week: 3,
      priority: 'Important',
      category: 'Employment',
      dueDateDays: 20,
      status: 'not_started',
      whatAndWhy: 'Canadian recruiters use automated Applicant Tracking Systems (ATS) and expect resume structures centered on concrete accomplishments rather than demographic details. Including items like birthdates, photographs, and marital status violates local human rights regulations, causing recruiters to automatically filter out your profile.',
      whereText: 'Utilize online templates, local newcomer settlement career counselors, or tool checkers.',
      howSteps: [
        'Strictly remove photos, race, religion, gender, marital status, and age statistics.',
        'Limit information to 1-2 pages maximum, prioritizing results utilizing strong action verbs.',
        'Create a Canadian LinkedIn profile representing your local metro city as your current home search area.',
        'Adapt sections to focus heavily on transferable skills matching local industry terminologies.'
      ],
      requiredDocs: [
        { text: 'Your existing historical record resume draft', checked: false },
        { text: 'Local Canadian phone number & residential city tag to display in contact details', checked: false }
      ]
    },
    {
      id: 'task-photoid',
      title: 'Apply for a Provincial Photo ID Card / Driver\'s License',
      week: 3,
      priority: 'Important',
      category: 'Documentation',
      dueDateDays: 21,
      status: 'not_started',
      whatAndWhy: 'Using your international passport for routine identification (for bars, mail collection, or library access) is highly risky due to replacement complexities. A provincial photo card is a legally accepted government-issued cards system providing ease of daily travel verification.',
      whereText: 'Driver licensing offices or Service Centres (e.g. ServiceOntario, ICBC licensing, Alberta Registry Agencies, SAAQ).',
      howSteps: [
        'Confirm if your home nation shares a license exchange treaty with your province to convert your old license directly without examinations.',
        'If not exchanging, gather overseas driving records (describing years of licensing) to skip initial waiting intervals.',
        'Visit the licensing branch, pass the basic vision screening, and pay standard documentation testing fees.',
        'If you do not drive, request the local non-driver Provincial Photo Identification scheme card.'
      ],
      requiredDocs: [
        { text: 'Original foreign driver\'s license (if attempting exchange or proof of experience)', checked: false },
        { text: 'Official translated license letter (if foreign license is not in English/French)', checked: false },
        { text: 'Immigration status confirmation document', checked: false },
        { text: 'Passport with signature record', checked: false }
      ]
    },
    {
      id: 'task-doctor',
      title: 'Search for a Local Primary Care / Family Doctor',
      week: 5,
      priority: 'Important',
      category: 'Healthcare',
      dueDateDays: 35,
      status: 'not_started',
      whatAndWhy: 'In Canada, walk-in clinics provide hasty care but having a designated Family Doctor ensures long term preventive care, chronic follow-ups, and specialist clinical referrals. Finding a doctor takes time due to widespread national shortage limits.',
      whereText: 'Provincial registration waitlists, such as Ontario\'s "Health Care Connect", BC\'s Health Connect Registry, or checking accepting clinics directly.',
      howSteps: [
        'Submit your official patient application to your provincial waitlist system online.',
        'Search independent practice maps and call surrounding community clinics asking if they are accepting new patients.',
        'Note local walk-in clinics near you for immediate healthcare needs until matched.'
      ],
      requiredDocs: [
        { text: 'Provincial Health Card', checked: false }
      ]
    }
  ];

  // Conditional task: Dependents / Schooling
  if (family === 'With dependents') {
    rawTasks.push({
      id: 'task-school',
      title: 'Enroll Dependents in the Local Public School System',
      week: 4,
      priority: 'Important',
      category: 'Community',
      dueDateDays: 28,
      status: 'not_started',
      whatAndWhy: 'Public primary and secondary school education is entirely free in Canada for permanent residents, work permit holders, and student families. Prioritizing school onboarding ensures children transition into high-quality education programs promptly and without delays.',
      whereText: 'Your municipal or regional public school board office (or Catholic school board if preferred and eligible).',
      howSteps: [
        'Locate your corresponding school board district using your new residential address.',
        'Reach out to their newcomer welcome centre to schedule a placement assessment (standard for foreign language children).',
        'Complete registration materials detailing vaccination immunizations certificates.',
        'Attend parent orientation meetings.'
      ],
      requiredDocs: [
        { text: 'Children\'s birth certificates and passport proofs', checked: false },
        { text: 'Proof of residential address in school district (e.g., signed Lease or Electric/Gas Bill)', checked: false },
        { text: 'Children\'s immunization/vaccination records', checked: false },
        { text: 'Parent\'s work permit, study permit, or PR landing landing sheets', checked: false }
      ]
    });
  }

  // Task: Free LINC / Settlement services
  rawTasks.push({
    id: 'task-settlement',
    title: 'Register for Free Government-Funded Settlement & LINC Services',
    week: 6,
    priority: 'Important',
    category: 'Community',
    dueDateDays: 42,
    status: 'not_started',
    whatAndWhy: 'The government of Canada pays non-profits to support newcomer integration. Services include resume reviews, language training classes (LINC: Language Instruction for Newcomers to Canada), community matching, and tax coaching resources entirely free.',
    whereText: 'Your nearest eligible settlement agency office (YMCA, ACCES Employment, ISSofBC, CCIS Alberta, etc.).',
    howSteps: [
      'Find a federally integrated service program using the Immigration, Refugees and Citizenship Canada (IRCC) web directory.',
      'Book your first assessment intake slot with an assigned advisor.',
      'Request LINC diagnostic tests to assess your language level.',
      'Enroll in free job searching workshops or mentorship circles tailored to your industry.'
    ],
    requiredDocs: [
      { text: 'Proof of residency / mailing address', checked: false },
      { text: 'PR landing sheet (COPR) or PR Card (Note: some services are limited for work/student permit holders)', checked: false }
    ]
  });

  // Task: CRA Account and Taxes
  rawTasks.push({
    id: 'task-cra',
    title: 'Register for your Canada Revenue Agency (CRA) Account',
    week: 10,
    priority: 'Optional',
    category: 'Finance',
    dueDateDays: 75,
    status: 'not_started',
    whatAndWhy: 'The CRA manages federal and provincial tax operations. Registering for your online My Account allows you to direct deposit vital payments (including GST rebates, CCB payments, and climate action incentives) and access annual tax return data easily.',
    whereText: 'The official Canada Revenue Agency digital web portal.',
    howSteps: [
      'Wait for your first Canadian tax year report, or register early if eligible.',
      'Submit direct deposit banking identifiers to link newcomer tax rebates.',
      'Secure your CRA security code sent via mail to unlock total administrative capabilities.'
    ],
    requiredDocs: [
      { text: '9-digit SIN (Social Insurance Number)', checked: false },
      { text: 'Date of birth', checked: false },
      { text: 'Your primary residential postal code', checked: false }
    ]
  });

  // Sort tasks by week, then by priority (Critical > Important > Optional)
  const priorityWeight = { Critical: 3, Important: 2, Optional: 1 };
  const sortedTasks = rawTasks.sort((a, b) => {
    if (a.week !== b.week) {
      return a.week - b.week;
    }
    return priorityWeight[b.priority] - priorityWeight[a.priority];
  });

  // Format with dynamic hasPaid limit:
  // "Free Essentials ($0: preview 3 priority tasks, basic overview, resource links)"
  // So, if they are free, lock all tasks after index 2 (first 3 tasks are free preview)
  return sortedTasks.map((t, index) => {
    const lockedOnFree = isFree && index >= 3;
    return {
      ...t,
      lockedOnFree
    };
  });
}
