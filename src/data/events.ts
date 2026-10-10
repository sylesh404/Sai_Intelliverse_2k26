import type { EventItem } from '../types';

export const eventsData: EventItem[] = [
  // ==========================================
  // TECHNICAL EVENTS (01 - 04)
  // ==========================================
  {
    id: "intellipaper",
    code: "01",
    title: "INTELLIPAPER",
    subtitle: "RESEARCH & TECHNICAL PRESENTATION",
    tagline: "Present cutting-edge research and innovation before an expert panel.",
    category: "TECHNICAL",
    shortDescription: "Intellipaper provides participants with an opportunity to present original technical research, explain innovative ideas, and demonstrate their understanding of a relevant technical theme or domain.",
    fullDescription: "Intellipaper provides participants with an opportunity to present original technical research, explain innovative ideas, and demonstrate their understanding of a relevant technical theme or domain.",
    teamSize: "Max 2 Participants",
    teamFormat: [
      "The event is open to students from the institution and participating colleges.",
      "Participation may be individual or in a team.",
      "Each team may have a maximum of 2 participants.",
      "All participants must carry a valid college ID card."
    ],
    submissionRequirements: [
      "The paper must be original work by the participants.",
      "Plagiarized, copied, or previously published papers will be disqualified.",
      "The paper must relate to the given event theme or domain.",
      "Participants must submit their paper before the specified deadline.",
      "Late submissions may not be accepted.",
      "Major topic changes may not be permitted after submission."
    ],
    presentationFormat: [
      "1. Title",
      "2. Introduction",
      "3. Problem Statement",
      "4. Objectives",
      "5. Proposed Solution / Methodology",
      "6. Results / Findings",
      "7. Advantages / Applications",
      "8. Conclusion",
      "9. References"
    ],
    timeLimits: [
      "Presentation: 8 minutes per team.",
      "Question-and-answer session: 2 minutes.",
      "Participants must adhere strictly to the allotted time.",
      "Exceeding the time limit may result in mark deductions."
    ],
    rules: [
      "Participants must report to the venue at least 15 minutes before their scheduled slot.",
      "The presentation file must be submitted to the coordinators before the session begins.",
      "Participants should keep a backup copy on a pen drive or in cloud storage.",
      "Participants are responsible for ensuring that their presentation works properly.",
      "Technical issues caused by a participant's file or device may not result in additional presentation time.",
      "Participants must maintain professional language and conduct."
    ],
    entryFee: "₹150 / Team",
    prizes: {
      first: "₹1,500",
      second: "₹700",
    },
    venue: "Seminar Hall",
    date: "NOVEMBER 6, 2026",
    time: "10:30 AM — 01:30 PM",
    coordinators: [
      { name: "Kushanth", phone: "+91 9500445640" },
      { name: "Nandan C", phone: "+91 8431486842" },
      { name: "Radhika R", phone: "+91 9962932128" },
      { name: "Varsha T", phone: "+91 9363750548" },
    ],
    coordinator: {
      name: "Kushanth",
      phone: "+91 9500445640",
    },
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1200&auto=format&fit=crop",
    featured: true,
  },
  {
    id: "ui-chaos",
    code: "02",
    title: "UI CHAOS",
    subtitle: "UI/UX RECREATION CHALLENGE",
    tagline: "See It. Build It. Survive the Rush.",
    category: "TECHNICAL",
    shortDescription: "A fast-paced UI/UX recreation challenge testing observation, creativity, and design skills under pressure using only Canva or Figma.",
    fullDescription: "A fast-paced UI/UX recreation challenge that tests observation, creativity, design skills, and the ability to work under pressure. Participants receive a limited amount of time to observe a UI/UX reference and recreate it using only Canva or Figma.",
    teamSize: "3 Members per Team",
    teamFormat: [
      "3 members per team (mandatory)."
    ],
    rounds: [
      {
        title: "ROUND 1 — CHAOS SNAP",
        duration: "15 Minutes",
        description: "A rapid visual recreation challenge.",
        points: [
          "A UI/UX reference will be displayed for 1 minute.",
          "Pen, paper, phones, and screenshots are not allowed.",
          "Participants receive 15 minutes to recreate the design."
        ]
      },
      {
        title: "ROUND 2 — CHAOS RECALL",
        duration: "30 Minutes",
        description: "Memory and sketching-assisted recreation challenge.",
        points: [
          "A new UI/UX reference will be displayed for 1 minute and 30 seconds.",
          "Pen and paper are allowed for notes and sketches.",
          "Participants receive 30 minutes to recreate the design."
        ]
      }
    ],
    rules: [
      "Each team must consist of exactly 3 members.",
      "Mobile phones are not allowed during the event.",
      "AI tools such as ChatGPT, Gemini, Claude, Copilot, and AI design or generation tools are prohibited.",
      "Only Canva and Figma are permitted for digital design.",
      "Screenshots, photographs, screen recordings, or any other method of capturing the reference design are strictly prohibited.",
      "Designs must be completed within the allotted time.",
      "Participants must submit their work before the respective deadline.",
      "Prohibited tools or external assistance will result in disqualification.",
      "The organizers' decision will be final and binding."
    ],
    entryFee: "₹150 / Team",
    prizes: {
      first: "₹1,000",
      second: "₹500",
    },
    venue: "Seminar Hall",
    date: "NOVEMBER 6, 2026",
    time: "11:00 AM — 01:30 PM",
    coordinators: [
      { name: "Bhoomika R", phone: "+91 6363323421" },
      { name: "Ranjith B", phone: "+91 8904571759" },
      { name: "Manas Singh", phone: "+91 7889925151" },
      { name: "Hrushikesh", phone: "+91 9043196629" },
    ],
    coordinator: {
      name: "Bhoomika R",
      phone: "+91 6363323421",
    },
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=1200&auto=format&fit=crop",
    featured: true,
  },
  {
    id: "brand-blitz",
    code: "03",
    title: "BRAND BLITZ",
    subtitle: "AI-POWERED MARKETING CHALLENGE",
    tagline: "Think Fast. Brand Faster.",
    category: "TECHNICAL",
    shortDescription: "A fast-paced AI-powered marketing challenge where teams turn a fictional or unusual product into a complete marketing campaign within 60 minutes.",
    fullDescription: "A fast-paced AI-powered marketing challenge where teams turn a fictional or unusual product into a complete marketing campaign. Test creativity, branding, strategy, and AI skills by developing a campaign within 60 minutes.",
    teamSize: "3 Members per Team",
    teamFormat: [
      "3 members per team."
    ],
    rounds: [
      {
        title: "CHALLENGE — 60 MINUTES",
        duration: "60 Minutes",
        description: "Each team receives a fictional or unusual product and creates a complete marketing campaign.",
        points: [
          "Brand or product name and logo",
          "Tagline",
          "Target audience",
          "Marketing strategy",
          "Promotional or social media concept",
          "Advertisement of no more than 2 minutes",
          "Teams may use permitted free AI tools for ideation, content, visuals, scripts, and campaign development."
        ]
      },
      {
        title: "PITCH — 2 MINUTES",
        duration: "2 Minutes",
        description: "Each team receives 2 minutes to present its campaign to the judges.",
        points: [
          "Product and brand",
          "Target audience",
          "Marketing strategy",
          "Advertisement concept (may be shown during the pitch)",
          "Explanation of the use of AI"
        ]
      }
    ],
    rules: [
      "Each team must consist of exactly 3 members.",
      "Only free AI tools and permitted free design/video tools may be used.",
      "ChatGPT, Gemini, Claude, Copilot, Canva AI, and other AI tools are permitted.",
      "Canva, Figma, CapCut, Adobe Express, and similar free tools may be used.",
      "The campaign must be created within the 60-minute limit.",
      "The advertisement must not exceed 2 minutes.",
      "Paid tools, paid assets, previously prepared materials, and external assistance are not allowed.",
      "Teams must submit their campaign before the deadline.",
      "Content must be appropriate for a college event.",
      "Plagiarism or misuse of copyrighted material may result in disqualification.",
      "Teams must be able to explain their use of AI.",
      "The organizers' decision will be final and binding."
    ],
    entryFee: "₹150 / Team",
    prizes: {
      first: "₹1,000",
      second: "₹500",
    },
    venue: "Seminar Hall",
    date: "NOVEMBER 6, 2026",
    time: "11:30 AM — 02:00 PM",
    coordinators: [
      { name: "Kanika", phone: "+91 8610624391" },
      { name: "Kirthan", phone: "+91 9514683415" },
      { name: "Roopashree", phone: "+91 8310454107" },
      { name: "Ranjitha", phone: "+91 7619158178" },
    ],
    coordinator: {
      name: "Kanika",
      phone: "+91 8610624391",
    },
    image: "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=1200&auto=format&fit=crop",
    featured: true,
  },
  {
    id: "prompt-rush",
    code: "04",
    title: "PROMPT RUSH",
    subtitle: "FAST-PACED AI PROMPTING CHALLENGE",
    tagline: "Think. Prompt. Create. Adapt.",
    category: "TECHNICAL",
    shortDescription: "A fast-paced AI challenge competing through two creative rounds testing observation, memory, AI prompting, and visual problem-solving.",
    fullDescription: "PROMPT RUSH is a fast-paced AI challenge where teams compete through two creative rounds testing observation, memory, AI prompting, problem-solving, creativity, and adaptability. Participants must use AI tools strategically, make quick decisions, and transform ideas into compelling visual solutions within a limited time.",
    teamSize: "1–3 Members per Team",
    teamFormat: [
      "Each team must have 1–3 members.",
      "One laptop per team is mandatory.",
      "A laptop with good processing speed and a stable, high-speed internet connection is recommended."
    ],
    rounds: [
      {
        title: "ROUND 1 — WORLD FLIP",
        description: "A visual challenge where teams must observe, remember, recreate, and creatively transform a reference scene.",
        points: [
          "A reference scene",
          "A memory-based recreation challenge",
          "A creative world transformation",
          "AI-assisted visual creation"
        ]
      },
      {
        title: "ROUND 2 — IDEA TAKEOVER",
        description: "A creative AI challenge where teams transform a given problem or theme into a visual solution.",
        points: [
          "A problem or theme",
          "AI-assisted and prompt-based decision-making",
          "A three-part visual solution",
          "A creative solution poster"
        ]
      }
    ],
    judgingCriteria: [
      "Creativity",
      "Interpretation",
      "Effective use of AI",
      "Visual quality",
      "Strength of the proposed solution"
    ],
    importantNotes: [
      "The exact twists, challenges, and power mechanics of each round will be revealed during the event."
    ],
    rules: [
      "Mobile phones are strictly prohibited during the competition.",
      "Only one laptop per team may be used.",
      "Teams may use only the AI tools and platforms announced by the organizers.",
      "External assistance, answer-sharing, and communication with other teams are prohibited.",
      "All tasks must be completed and submitted within the given time. Late submissions may not be considered."
    ],
    closingLine: "Come prepared to think fast. Prompt smart. Create something unexpected.",
    entryFee: "₹150 / Team",
    prizes: {
      first: "₹1,000",
      second: "₹500",
    },
    venue: "Seminar Hall",
    date: "NOVEMBER 6, 2026",
    time: "01:30 PM — 03:30 PM",
    coordinators: [
      { name: "Nikitha", phone: "+91 9790166082" },
      { name: "Harshitha", phone: "+91 9108882321" },
      { name: "Manmadh Kumar", phone: "+91 8217272125" },
      { name: "Gowtham K", phone: "+91 9940143214" },
    ],
    coordinator: {
      name: "Nikitha",
      phone: "+91 9790166082",
    },
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop",
    featured: true,
  },

  // ==========================================
  // NON-TECHNICAL EVENTS (05 - 08)
  // ==========================================
  {
    id: "auction-battle",
    code: "05",
    title: "AUCTION BATTLE",
    subtitle: "STRATEGIC ASSET BIDDING ARENA",
    tagline: "Bid smart. Manage resources. Outperform competitors.",
    category: "NON-TECHNICAL",
    shortDescription: "A strategy-driven auction competition where teams compete to build the strongest virtual team or collection of assets within a fixed budget.",
    fullDescription: "Auction Battle is a strategy-driven auction competition where teams compete to build the strongest virtual team or collection of assets within a fixed budget. Participants must bid intelligently, manage resources, evaluate risk, and make strategic decisions to outperform their competitors.",
    teamSize: "4 Participants per Team",
    teamFormat: [
      "4 participants per team."
    ],
    rounds: [
      {
        title: "HOW IT WORKS",
        description: "Strategic auction bidding and purse management procedure.",
        points: [
          "Each team receives a virtual wallet of credits (e.g., 10,000 points example budget).",
          "Items such as players, gadgets, or other assets are auctioned one at a time.",
          "Teams bid competitively for the available items.",
          "The highest bidder wins the item.",
          "Hidden strengths and weaknesses are revealed only after purchase.",
          "Purchased items cannot be exchanged or returned.",
          "Teams must balance early spending against saving resources for later auction opportunities."
        ]
      }
    ],
    importantNotes: [
      "Note: The virtual wallet value of 10,000 points is an illustrative example, not a confirmed fixed budget. The exact amount will be confirmed by organizers on the day of the event."
    ],
    rules: [
      "Each team must consist of 4 participants.",
      "Teams must manage their budgets strategically.",
      "The highest valid bidder wins each auctioned item.",
      "No item exchanges or returns are allowed after purchase."
    ],
    entryFee: "₹150 / Team",
    prizes: {
      first: "₹1,000",
      second: "₹500",
    },
    venue: "Seminar Hall",
    date: "NOVEMBER 6, 2026",
    time: "10:30 AM — 01:00 PM",
    coordinators: [
      { name: "Anshuman Sharma", phone: "+91 8854963575" },
      { name: "Vishwanath", phone: "+91 7259201773" },
      { name: "Indraprakash", phone: "+91 7349503350" },
    ],
    coordinator: {
      name: "Anshuman Sharma",
      phone: "+91 8854963575",
    },
    image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=1200&auto=format&fit=crop",
    featured: true,
  },
  {
    id: "debate-battle",
    code: "06",
    title: "DEBATE BATTLE",
    subtitle: "DIALECTIC COMBAT & ORATORY",
    tagline: "Clash minds, articulate vision, and defend intellectual ground.",
    category: "NON-TECHNICAL",
    shortDescription: "Debate Battle brings together persuasive orators to clash minds on thought-provoking motions. Event details will be announced by the organizers.",
    fullDescription: "Debate Battle brings together persuasive orators to clash minds on thought-provoking motions. Event details will be announced by the organizers.",
    teamSize: "To Be Announced",
    teamFormat: [
      "Event details will be announced by the organizers."
    ],
    importantNotes: [
      "Event details will be announced by the organizers."
    ],
    rules: [
      "Event details will be announced by the organizers."
    ],
    entryFee: "₹150 / Team",
    prizes: {
      first: "₹1,000",
      second: "₹500",
    },
    venue: "Seminar Hall",
    date: "NOVEMBER 6, 2026",
    time: "11:30 AM — 02:30 PM",
    coordinators: [
      { name: "Ananya M.", phone: "+91 94443 77889" },
    ],
    coordinator: {
      name: "Ananya M.",
      phone: "+91 94443 77889",
    },
    image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?q=80&w=1200&auto=format&fit=crop",
    featured: true,
  },
  {
    id: "wrong-answers-only",
    code: "07",
    title: "WRONG ANSWERS ONLY",
    subtitle: "ABSURDIST COMEDY GAME SHOW",
    tagline: "The truth will get you disqualified.",
    category: "NON-TECHNICAL",
    shortDescription: "A high-energy, non-technical comedy game show where intellect is a liability and absurdity is rewarded. Quick wit and deadpan delivery win.",
    fullDescription: "Wrong Answers Only is a high-energy, non-technical comedy game show where intellect is a liability and absurdity is rewarded. Teams compete to demonstrate quick wit, straight-faced delivery, and creative imagination. The golden rule is simple: THE TRUTH WILL GET YOU DISQUALIFIED.",
    teamSize: "3 Members per Team",
    teamFormat: [
      "Exactly 3 members per team.",
      "No substitutions are allowed once the event begins."
    ],
    rounds: [
      {
        title: "ROUND 1 — FASTEST FINGER: BUZZER SHOWDOWN",
        duration: "3 Seconds per Answer",
        description: "Two teams compete head-to-head in a knockout format. The host asks rapid-fire questions, and teams race to hit the buzzer for the chance to deliver a funny, completely incorrect answer.",
        points: [
          "Teams compete in a 1v1 knockout bracket.",
          "The first team to hit the physical buzzer or permitted digital app earns the right to answer.",
          "The team has exactly 3 seconds to answer.",
          "There is no time to huddle or whisper after buzzing.",
          "One team member must respond immediately.",
          "+1 point: A creative, funny, completely wrong answer delivered within 3 seconds.",
          "Point to the opponent: If the team hesitates, stutters, remains silent, or accidentally gives the correct answer.",
          "Winning condition: The first team to reach 3 points wins the matchup and advances to Round 2. The losing team is eliminated."
        ]
      },
      {
        title: "ROUND 2 — INFOMERCIAL PITCH: GRAND FINALE",
        duration: "30s Prep / 60s Performance",
        description: "Finalist teams draw a mystery everyday object and pitch it as a revolutionary invention, demonstrating only incorrect and absurd uses.",
        points: [
          "One representative from each team draws an object from the coordinator's mystery box.",
          "Teams receive 30 seconds to plan and assign roles.",
          "The performance lasts exactly 60 seconds (warning bell at 45 seconds, final buzzer at 60 seconds).",
          "All 3 team members must actively participate.",
          "Suggested Role - Speaker 1: Explains the absurd features and fictional product name.",
          "Suggested Role - Speaker 2: Demonstrates the object's incorrect uses.",
          "Suggested Role - Speaker 3: Pitches the price, guarantee, or fictional customer reviews."
        ]
      }
    ],
    judgingCriteria: [
      "Absurdity and Creativity — 10 marks",
      "Stage Chemistry and Acting — 10 marks",
      "Crowd Reaction — 10 marks",
      "Total: 30 Points"
    ],
    rules: [
      "Any participant who accidentally gives a factually correct answer, a true definition, or the actual name of an object will receive a penalty or elimination for that round.",
      "All content must remain appropriate for a college event.",
      "Vulgarity, hate speech, religious disrespect, and targeted political or personal bullying may result in disqualification.",
      "Mobile phones are prohibited except for the buzzer app in Round 1.",
      "Audience hints and external help are prohibited.",
      "The host and designated timing referee have final authority over timing and answer validity.",
      "No arguments, slow-motion replays, or appeals will be entertained."
    ],
    closingLine: "THE TRUTH WILL GET YOU DISQUALIFIED.",
    entryFee: "₹150 / Team",
    prizes: {
      first: "₹1,000",
      second: "₹500",
    },
    venue: "Seminar Hall",
    date: "NOVEMBER 6, 2026",
    time: "01:30 PM — 03:30 PM",
    coordinators: [
      { name: "Tayeba Eram", phone: "+91 7676952183" },
      { name: "Vaishnavi Illur", phone: "+91 7795417054" },
      { name: "Naveen Kumar", phone: "+91 9380499282" },
      { name: "Chethan", phone: "+91 9036399607" },
    ],
    coordinator: {
      name: "Tayeba Eram",
      phone: "+91 7676952183",
    },
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1200&auto=format&fit=crop",
    featured: true,
  },
  {
    id: "protocol-chaos",
    code: "08",
    title: "PROTOCOL CHAOS",
    subtitle: "CUSTOM-ROOM GAMING COMPETITION",
    tagline: "Prepare for Ultimate Battlefield Anarchy.",
    category: "NON-TECHNICAL",
    shortDescription: "A high-energy custom-room gaming competition featuring BGMI and Free Fire. Organized by the Department of AI & ML.",
    fullDescription: "Protocol Chaos is a high-energy custom-room gaming competition featuring BGMI and Free Fire. Organized by the Department of AI & ML.",
    teamSize: "Squads of 1–4 Players",
    teamFormat: [
      "Squads of 1–4 players.",
      "Solo and Duo versus Squad entries are permitted."
    ],
    rounds: [
      {
        title: "TOURNAMENT PROGRESSION",
        description: "Multi-map competitive battleground for BGMI and Free Fire.",
        points: [
          "BGMI Qualifiers are conducted on Erangel and Sanhok.",
          "BGMI Grand Finals are conducted on Livik.",
          "Free Fire matches are organized according to the total number of entries."
        ]
      }
    ],
    judgingCriteria: [
      "Cumulative points leaderboard.",
      "Only the top 3 overall squads will receive awards based on cumulative points."
    ],
    importantNotes: [
      "Organized by the Department of AI & ML.",
      "Participants must read the complete official rulebook before registering."
    ],
    rules: [
      "Squads of 1–4 players (Solo and Duo versus Squad entries are permitted).",
      "Qualifiers are conducted on Erangel and Sanhok; Grand Finals on Livik.",
      "Free Fire matches are organized according to the total number of entries.",
      "Only the top 3 overall squads will receive awards based on cumulative points.",
      "Strict adherence to competitive fair play. Emulators, hacks, or third-party modifications are strictly prohibited."
    ],
    entryFee: "₹150 / Team",
    prizes: {
      first: "₹1,000",
      second: "₹500",
    },
    venue: "Seminar Hall",
    date: "NOVEMBER 6, 2026",
    time: "02:00 PM — 04:30 PM",
    coordinators: [
      { name: "Khan Saif", phone: "+91 7090381983" },
      { name: "Sathish", phone: "+91 8123248949" },
      { name: "Pawan", phone: "+91 8660229027" },
      { name: "Akshay", phone: "+91 8660643398" },
    ],
    coordinator: {
      name: "Khan Saif",
      phone: "+91 7090381983",
    },
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1200&auto=format&fit=crop",
    featured: true,
  },
];

export default eventsData;
