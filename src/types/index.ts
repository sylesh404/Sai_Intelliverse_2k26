export type EventCategory = 
  | 'ALL'
  | 'TECHNICAL'
  | 'NON-TECHNICAL'
  | 'CREATIVE'
  | 'WORKSHOP'
  | 'SPECIAL';

export interface RoundItem {
  title: string;
  duration?: string;
  description?: string;
  points?: string[];
  rules?: string[];
}

export interface EventItem {
  id: string;
  code: string; // e.g. "01", "02"
  title: string;
  subtitle: string;
  tagline?: string;
  category: EventCategory;
  shortDescription: string;
  fullDescription: string;
  teamSize: string;
  teamFormat?: string[];
  rounds?: RoundItem[];
  rules: string[];
  judgingCriteria?: string[];
  timeLimits?: string[];
  submissionRequirements?: string[];
  presentationFormat?: string[];
  importantNotes?: string[];
  closingLine?: string;
  registrationLink?: string;
  entryFee: string;
  entryFeeOptions?: {
    team?: string;
    individual?: string;
  };
  prizes?: {
    first: string;
    second: string;
    third?: string;
  };
  winnerRewards?: string;
  venue: string;
  date: string;
  time: string;
  coordinator?: {
    name: string;
    phone: string;
    email?: string;
  };
  coordinators?: {
    name: string;
    phone: string;
    email?: string;
  }[];
  image: string;
  featured?: boolean;
}

export interface ScheduleItem {
  id: string;
  time: string;
  title: string;
  category: string;
  description: string;
  venue?: string;
  isHighlight?: boolean;
}

export interface SpeakerItem {
  id: string;
  name: string;
  role: string;
  organization: string;
  topic: string;
  bio: string;
  image: string;
  badge: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  category: 'FACULTY' | 'STUDENT LEAD' | 'CORE TEAM';
  department: string;
  image: string;
  linkedin?: string;
  email?: string;
}

export interface FacultyMember {
  id: string;
  name: string;
  designation?: string;
  department?: string;
  image?: string;
  featured?: boolean;
  positionNumber: number;
  isAwaitingDetails?: boolean;
}

export interface GalleryItem {
  id: string;
  title: string;
  year: string;
  category: string;
  image: string;
  aspectRatio?: 'tall' | 'wide' | 'square';
  caption: string;
}

export interface PrizeCategory {
  id: string;
  tier: string;
  rank: string;
  amount: string;
  title: string;
  perks: string[];
}

export interface SymposiumConfig {
  name: string;
  year: string;
  edition: string;
  department: string;
  college: string;
  address?: string;
  fullAddress?: string;
  tagline: string;
  subTagline: string;
  eventDate: string;
  eventDateFormatted?: string;
  eventDateISO: string;
  venue: string;
  fullVenue?: string;
  timezone?: string;
  registrationUrl: string;
  brochureUrl: string;
  contactEmail: string;
  contactPhone: string;
  socials: {
    instagram: string;
    linkedin: string;
    twitter: string;
    youtube: string;
  };
  stats: {
    participants: string;
    events: string;
    institutions: string;
    prizePool: string;
  };
}
