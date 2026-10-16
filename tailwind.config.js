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
        primary: "#FF0022",
        secondary: "#FF3D00",
        ivory: "#FCFAED",
        neutral: {
          dark: "#1A1A1A",
          surface: "#141414",
          border: "#262626",
          gray: "#565656",
          muted: "#888888",
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
