/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        xs: '380px',
      },
      colors: {
        background: "#0D0D0D",
        "background-secondary": "#151019",
        "background-card": "#19131D",
        primary: "#6C3082",
        vibrant: "#8B35AD",
        electric: "#A855F7",
        lavender: "#C084FC",
        "lavender-light": "#E9D5FF",
        secondary: "#8B35AD",
        purple: {
          DEFAULT: "#6C3082",
          vibrant: "#8B35AD",
          electric: "#A855F7",
          lavender: "#C084FC",
          light: "#E9D5FF",
          dark: "#542565",
          glow: "rgba(168, 85, 247, 0.45)",
          ambient: "rgba(139, 53, 173, 0.25)",
        },
        ivory: "#FCFAED",
        muted: "#B8AFC0",
        neutral: {
          dark: "#1A1A1A",
          surface: "#151019",
          card: "#19131D",
          border: "#2E1F3B",
          gray: "#565656",
          muted: "#B8AFC0",
        },
      },
      fontFamily: {
        display: ['Syne', 'Space Grotesk', 'sans-serif'],
        mono: ['"Space Mono"', '"JetBrains Mono"', 'monospace'],
        body: ['Inter', 'sans-serif'],
      },
      clipPath: {
        diagonal: 'polygon(0 0, 100% 0, 100% 85%, 0 100%)',
        'diagonal-reverse': 'polygon(0 15%, 100% 0, 100% 100%, 0 100%)',
      },
      animation: {
        'marquee': 'marquee 25s linear infinite',
        'marquee-reverse': 'marquee-reverse 25s linear infinite',
        'pulse-fast': 'pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'marquee-reverse': {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0%)' },
        },
      },
    },
  },
  plugins: [],
}
