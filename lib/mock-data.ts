export type College = {
  id: string;
  name: string;
  acronym: string;
  description: string;
  image: string;
  trending: boolean;
};

export type Society = {
  id: string;
  collegeId: string;
  name: string;
  acronym: string;
  category: "Technical" | "Cultural" | "Literary" | "Management" | "Arts" | "Entrepreneurship" | "Social";
  description: string;
  followerCount: number;
  logo: string;
  banner: string;
};

export type Event = {
  id: string;
  societyId: string;
  collegeId: string;
  title: string;
  description: string;
  image: string;
  category: "Technical" | "Cultural" | "Literary" | "Management" | "Arts" | "Entrepreneurship" | "Social" | "Workshop";
  mode: "Online" | "Offline";
  price: number; // 0 for free
  date: string;
  time: string;
  location: string;
};

// --- MOCK DATA ---

export const colleges: College[] = [
  {
    id: "c1",
    name: "Shri Ram College of Commerce",
    acronym: "SRCC",
    description: "Premier college for commerce and economics in India.",
    image: "linear-gradient(to right, #cfd9df, #e2ebf0)",
    trending: true,
  },
  {
    id: "c2",
    name: "St. Stephen's College",
    acronym: "SSC",
    description: "One of the oldest and most prestigious colleges for arts and sciences.",
    image: "linear-gradient(to right, #fdfbfb, #ebedee)",
    trending: true,
  },
  {
    id: "c3",
    name: "Hindu College",
    acronym: "Hindu",
    description: "Recognized as one of the premier academic institutions in the country.",
    image: "linear-gradient(to right, #a1c4fd, #c2e9fb)",
    trending: false,
  },
  {
    id: "c4",
    name: "Netaji Subhas University of Technology",
    acronym: "NSUT",
    description: "A state university renowned for technical and engineering excellence.",
    image: "linear-gradient(to right, #ffecd2, #fcb69f)",
    trending: true,
  },
  {
    id: "c5",
    name: "Delhi Technological University",
    acronym: "DTU",
    description: "A premier engineering university situated in the heart of Delhi.",
    image: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
    trending: true,
  },
  {
    id: "c6",
    name: "Hansraj College",
    acronym: "HRC",
    description: "A prominent constituent college of the University of Delhi.",
    image: "linear-gradient(to top, #cfd9df 0%, #e2ebf0 100%)",
    trending: false,
  },
  {
    id: "c7",
    name: "Miranda House",
    acronym: "MH",
    description: "A residential college for women under the University of Delhi.",
    image: "linear-gradient(120deg, #fbc2eb 0%, #a6c1ee 100%)",
    trending: false,
  },
  {
    id: "c8",
    name: "Indian Institute of Technology Delhi",
    acronym: "IIT Delhi",
    description: "Globally recognized institute for science, engineering and technology.",
    image: "linear-gradient(to top, #e6e9f0 0%, #eef1f5 100%)",
    trending: true,
  },
];

export const societies: Society[] = [
  // SRCC
  { id: "s1", collegeId: "c1", name: "The Debating Society", acronym: "DebSoc", category: "Literary", description: "Fostering excellent oratory and critical thinking skills.", followerCount: 1420, logo: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", banner: "linear-gradient(to right, #4facfe 0%, #00f2fe 100%)" },
  { id: "s2", collegeId: "c1", name: "Enactus SRCC", acronym: "Enactus", category: "Social", description: "Using entrepreneurial action to transform lives and shape a better world.", followerCount: 2200, logo: "linear-gradient(135deg, #f6d365 0%, #fda085 100%)", banner: "linear-gradient(120deg, #d4fc79 0%, #96e6a1 100%)" },
  { id: "s3", collegeId: "c1", name: "The Fine Arts Society", acronym: "FAS", category: "Arts", description: "A haven for artists to express and evolve their creativity.", followerCount: 950, logo: "linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%)", banner: "linear-gradient(to right, #ff758c 0%, #ff7eb3 100%)" },
  
  // St. Stephen's
  { id: "s4", collegeId: "c2", name: "The Shakespeare Society", acronym: "Shakesoc", category: "Cultural", description: "Celebrating literature and dramatic arts through the Bard's works.", followerCount: 1800, logo: "linear-gradient(to right, #fa709a 0%, #fee140 100%)", banner: "linear-gradient(to top, #30cfd0 0%, #330867 100%)" },
  { id: "s5", collegeId: "c2", name: "Planning Forum", acronym: "PF", category: "Management", description: "Engaging discussions on economics, policy, and comprehensive planning.", followerCount: 1100, logo: "linear-gradient(to top, #a18cd1 0%, #fbc2eb 100%)", banner: "linear-gradient(to right, #43e97b 0%, #38f9d7 100%)" },
  
  // Hindu College
  { id: "s6", collegeId: "c3", name: "Abstractions - The Fine Arts Society", acronym: "Abstractions", category: "Arts", description: "Unleashing colors and imagination.", followerCount: 890, logo: "linear-gradient(to top, #ff0844 0%, #ffb199 100%)", banner: "linear-gradient(to top, #5ee7df 0%, #b490ca 100%)" },
  { id: "s7", collegeId: "c3", name: "Panchtatva - The Environment Society", acronym: "Panchtatva", category: "Social", description: "Dedicated to the preservation and appreciation of the environment.", followerCount: 600, logo: "linear-gradient(to top, #0ba360 0%, #3cba92 100%)", banner: "linear-gradient(to right, #74ebd5 0%, #9face6 100%)" },
  
  // NSUT
  { id: "s8", collegeId: "c4", name: "Google Developer Student Clubs", acronym: "GDSC NSUT", category: "Technical", description: "Community group for students interested in Google developer technologies.", followerCount: 3100, logo: "linear-gradient(120deg, #f093fb 0%, #f5576c 100%)", banner: "linear-gradient(120deg, #e0c3fc 0%, #8ec5fc 100%)" },
  { id: "s9", collegeId: "c4", name: "IEEE NSUT", acronym: "IEEE", category: "Technical", description: "Advancing technology for humanity.", followerCount: 2800, logo: "linear-gradient(to right, #4facfe 0%, #00f2fe 100%)", banner: "linear-gradient(to right, #43e97b 0%, #38f9d7 100%)" },
  { id: "s10", collegeId: "c4", name: "Crescendo - The Music Society", acronym: "Crescendo", category: "Cultural", description: "The soul of NSUT, bringing melodies to life.", followerCount: 1400, logo: "linear-gradient(120deg, #89f7fe 0%, #66a6ff 100%)", banner: "linear-gradient(to right, #fa709a 0%, #fee140 100%)" },
  
  // DTU
  { id: "s11", collegeId: "c5", name: "Round Table DTU", acronym: "RT DTU", category: "Technical", description: "Fostering algorithmic thinking and competitive programming.", followerCount: 3500, logo: "linear-gradient(to top, #a18cd1 0%, #fbc2eb 100%)", banner: "linear-gradient(135deg, #f6d365 0%, #fda085 100%)" },
  { id: "s12", collegeId: "c5", name: "Entrepreneurship Cell", acronym: "E-Cell DTU", category: "Entrepreneurship", description: "Inspiring and incubating startup ideas.", followerCount: 2900, logo: "linear-gradient(to right, #f78ca0 0%, #f9748f 19%, #fd868c 60%, #fe9a8b 100%)", banner: "linear-gradient(to top, #5ee7df 0%, #b490ca 100%)" },
  
  // Hansraj
  { id: "s13", collegeId: "c6", name: "Oorja - The Western Dance Society", acronym: "Oorja", category: "Cultural", description: "Expressing energy and rhythm through contemporary dance forms.", followerCount: 2100, logo: "linear-gradient(120deg, #f6d365 0%, #fda085 100%)", banner: "linear-gradient(to right, #ff758c 0%, #ff7eb3 100%)" },
  { id: "s14", collegeId: "c6", name: "Neeti - The Policy and Debating Society", acronym: "Neeti", category: "Literary", description: "Where diplomacy and intellect meet.", followerCount: 1050, logo: "linear-gradient(to right, #43e97b 0%, #38f9d7 100%)", banner: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" },
  
  // IIT Delhi
  { id: "s15", collegeId: "c8", name: "DevClub", acronym: "DevClub", category: "Technical", description: "The official computer science and development club of IITD.", followerCount: 5200, logo: "linear-gradient(to top, #c471f5 0%, #fa71cd 100%)", banner: "linear-gradient(to right, #3ab5b0 0%, #3d99be 31%, #56317a 100%)" },
  { id: "s16", collegeId: "c8", name: "Board for Student Publications", acronym: "BSP", category: "Literary", description: "The journalistic and creative writing hub.", followerCount: 1600, logo: "linear-gradient(to top, #48c6ef 0%, #6f86d6 100%)", banner: "linear-gradient(to right, #eea2a2 0%, #bbc1bf 19%, #57c6e1 42%, #b49fda 79%, #7ac5d8 100%)" }
];

export const events: Event[] = [
  {
    id: "e1",
    societyId: "s8", // GDSC NSUT
    collegeId: "c4",
    title: "Hackverse 3.0",
    description: "A 48-hour global hackathon focused on Web3, AI, and Sustainability. Compete with the best minds and build innovative solutions.",
    image: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    category: "Technical",
    mode: "Offline",
    price: 0,
    date: "2026-05-15",
    time: "10:00 AM",
    location: "NSUT Main Campus"
  },
  {
    id: "e2",
    societyId: "s12", // E-Cell DTU
    collegeId: "c5",
    title: "E-Summit 2026",
    description: "The flagship entrepreneurship summit featuring keynote speakers, startup pitches, and networking sessions with VCs.",
    image: "linear-gradient(to right, #f78ca0 0%, #f9748f 19%, #fd868c 60%, #fe9a8b 100%)",
    category: "Entrepreneurship",
    mode: "Offline",
    price: 299,
    date: "2026-06-10",
    time: "09:30 AM",
    location: "DTU Auditorium"
  },
  {
    id: "e3",
    societyId: "s13", // Oorja
    collegeId: "c6",
    title: "Rhythm '26",
    description: "Annual inter-college western dance competition. Watch the best dance crews of Delhi university battle it out.",
    image: "linear-gradient(120deg, #f093fb 0%, #f5576c 100%)",
    category: "Cultural",
    mode: "Offline",
    price: 150,
    date: "2026-04-20",
    time: "03:00 PM",
    location: "Hansraj College Ground"
  },
  {
    id: "e4",
    societyId: "s1", // DebSoc SRCC
    collegeId: "c1",
    title: "Asian Parliamentary Debate",
    description: "National level APD tournament with teams from across the country. Cash prizes worth 1 Lakh.",
    image: "linear-gradient(to top, #a18cd1 0%, #fbc2eb 100%)",
    category: "Literary",
    mode: "Online",
    price: 500,
    date: "2026-05-25",
    time: "08:00 AM",
    location: "Discord / Zoom"
  },
  {
    id: "e5",
    societyId: "s2", // Enactus SRCC
    collegeId: "c1",
    title: "Social Impact Case Challenge",
    description: "Solve a real-world social entrepreneurship problem for an NGO and help create scalable impact.",
    image: "linear-gradient(120deg, #d4fc79 0%, #96e6a1 100%)",
    category: "Management",
    mode: "Online",
    price: 0,
    date: "2026-05-05",
    time: "02:00 PM",
    location: "Online / Meet"
  },
  {
    id: "e6",
    societyId: "s15", // DevClub IITD
    collegeId: "c8",
    title: "Open Source Bootcamp",
    description: "Learn how to contribute to open source, understand git, and make your first PR to a major repository.",
    image: "linear-gradient(to top, #48c6ef 0%, #6f86d6 100%)",
    category: "Workshop",
    mode: "Online",
    price: 0,
    date: "2026-04-28",
    time: "05:00 PM",
    location: "Online via Webex"
  },
  {
    id: "e7",
    societyId: "s10", // Crescendo NSUT
    collegeId: "c4",
    title: "Acoustic Nights",
    description: "An evening of unplugged musical performances. Sit back, relax, and enjoy the melodies under the stars.",
    image: "linear-gradient(120deg, #89f7fe 0%, #66a6ff 100%)",
    category: "Cultural",
    mode: "Offline",
    price: 0,
    date: "2026-04-25",
    time: "06:30 PM",
    location: "NSUT Student Centre"
  },
  {
    id: "e8",
    societyId: "s11", // Round Table DTU
    collegeId: "c5",
    title: "AlgoMania",
    description: "Competitive programming contest simulating ICPC rules. Bring your team of 3 and conquer the challenges.",
    image: "linear-gradient(to right, #4facfe 0%, #00f2fe 100%)",
    category: "Technical",
    mode: "Offline",
    price: 0,
    date: "2026-05-02",
    time: "09:00 AM",
    location: "DTU Computer Labs"
  }
];

export const myRegistrations = [
  "e1", "e6", "e3"
];
