import type { PrizeCategory } from '../types';


export const prizesData: PrizeCategory[] = [
  {
    id: "grand-champion",
    tier: "TIER 01",
    rank: "01",
    amount: "₹6,000",
    title: "GRAND OVERALL CHAMPION INSTITUTION",
    perks: [
      "Inteverse Rolling Trophy of Excellence",
      "Direct fast-track interview opportunity with partner tech incubators",
      "Cloud compute credits voucher",
      "Exclusive champion medals & physical certifications of mastery"
    ]
  },
  {
    id: "first-runner-up",
    tier: "TIER 02",
    rank: "02",
    amount: "₹4,000",
    title: "FIRST RUNNER-UP DELEGATION",
    perks: [
      "Silver Trophy of Technical Distinction",
      "Startup accelerator mentorship credits",
      "Premium dev tooling licenses & swags",
      "Physical certificate of excellence"
    ]
  },
  {
    id: "second-runner-up",
    tier: "TIER 03",
    rank: "03",
    amount: "₹2,000",
    title: "SECOND RUNNER-UP DELEGATION",
    perks: [
      "Bronze Trophy of Distinction",
      "AI & Machine Learning engineering book vouchers",
      "Official runner-up certificates"
    ]
  },
  {
    id: "special-categories",
    tier: "TIER 04",
    rank: "04",
    amount: "CERTIFICATES & AWARDS",
    title: "CATEGORY CITATIONS & MERIT AWARDS",
    perks: [
      "Distributed across all official technical and creative tracks",
      "Best All-Women Engineering Team Citation",
      "Most Innovative Open-Source Architecture Citation",
      "Fastest Algorithmic Solver Citation"
    ]
  }
];

export default prizesData;
