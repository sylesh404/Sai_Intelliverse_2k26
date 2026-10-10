import type { SymposiumConfig } from '../types';

export const REGISTRATION_FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSckUc-6BECKPy1sMlz5XaeoUup02dGaSK7u8KE9Goz5zuyaBw/viewform?usp=send_form";

export const symposiumConfig: SymposiumConfig = {
  name: "SAI INTELLIVERSE 3.0",
  year: "3.0",
  edition: "EDITION 3.0",
  department: "DEPARTMENT OF ARTIFICIAL INTELLIGENCE & MACHINE LEARNING",
  college: "SRI SAIRAM COLLEGE OF ENGINEERING",
  venue: "SEMINAR HALL",
  fullVenue: "SEMINAR HALL, SRI SAIRAM COLLEGE OF ENGINEERING",
  address: "Sai Leo Nagar, Guddanahalli, Anekal, Bangalore, Karnataka – 562106, India",
  fullAddress: "SRI SAIRAM COLLEGE OF ENGINEERING, SAI LEO NAGAR, GUDDANAHALLI, ANEKAL, BANGALORE, KARNATAKA – 562106, INDIA",
  tagline: "ONE DAY. COUNTLESS IDEAS.",
  subTagline: "SYNTHESIZING COGNITIVE INTELLIGENCE, EXPERIMENTAL COMPUTATION, AND VISIONARY ARCHITECTURES.",
  eventDate: "NOVEMBER 6, 2026",
  eventDateFormatted: "NOV 06, 2026",
  eventDateISO: "2026-11-06T10:30:00+05:30",
  timezone: "Asia/Kolkata",
  registrationUrl: REGISTRATION_FORM_URL,
  brochureUrl: "#",
  contactEmail: "intelliverse.aiml@sairam.edu.in",
  contactPhone: "+91 98401 23456 / +91 94440 98765",
  socials: {
    instagram: "https://instagram.com/sai_intelliverse",
    linkedin: "https://linkedin.com/company/sai-intelliverse",
    twitter: "https://twitter.com/sai_intelliverse",
    youtube: "https://youtube.com/@sai_intelliverse",
  },
  stats: {
    participants: "1200+",
    events: "08",
    institutions: "60+",
    prizePool: "₹12,000",
  },
};

export default symposiumConfig;
