import type { ScheduleItem } from '../types';

export const scheduleData: ScheduleItem[] = [
  {
    id: "sch-1",
    time: "09:30 AM",
    title: "DELEGATE CHECK-IN & KIT DISTRIBUTION",
    category: "ONBOARDING",
    description: "Participants arrive, complete registration/check-in, and collect their delegate kits.",
    venue: "Seminar Hall, Sri Sairam College of Engineering",
    isHighlight: false,
  },
  {
    id: "sch-2",
    time: "10:30 AM",
    title: "GRAND INAUGURATION & KEYNOTE ADDRESS",
    category: "CEREMONY",
    description: "Official inauguration of SAI INTELLIVERSE 3.0, followed by the keynote address.",
    venue: "Seminar Hall, Sri Sairam College of Engineering",
    isHighlight: true,
  },
  {
    id: "sch-3",
    time: "11:00 AM",
    title: "EVENTS START",
    category: "COMPETITIONS",
    description: "Technical and non-technical competitions begin.",
    isHighlight: false,
  },
  {
    id: "sch-4",
    time: "01:30 PM",
    title: "LUNCH BREAK",
    category: "BREAK",
    description: "Scheduled lunch break for participants and organizers.",
    isHighlight: false,
  },
  {
    id: "sch-5",
    time: "03:00 PM",
    title: "EVENTS END",
    category: "COMPETITIONS",
    description: "All scheduled competitions conclude.",
    isHighlight: false,
  },
  {
    id: "sch-6",
    time: "03:30 PM",
    title: "VALEDICTORY & GRAND PRIZE DISTRIBUTION",
    category: "AWARDS",
    description: "The symposium concludes with the valedictory ceremony and grand prize distribution.",
    venue: "Seminar Hall, Sri Sairam College of Engineering",
    isHighlight: true,
  },
];

export default scheduleData;
