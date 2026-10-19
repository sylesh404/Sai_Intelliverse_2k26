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
        background: "#080A0F",
        "background-secondary": "#141C26",
        "background-card": "#10151D",
        primary: "#35DDF5",
        vibrant: "#7DEBFF",
        electric: "#A5F3FF",
        lavender: "#64CFFF",
        "lavender-light": "#D9FAFF",
        secondary: "#7DEBFF",
        // Ice-Blue design tokens
        ice: {
          primary: "#A5F3FF",
          bright: "#7DEBFF",
          cyan: "#35DDF5",
          frost: "#D9FAFF",
          glacier: "#64CFFF",
          white: "#F4FDFF",
          border: "#4DE6FF",
          navy: "#0A111C",
          arctic: "#071521",
          card: "#10151D",
          glow: "rgba(125, 235, 255, 0.45)",
          ambient: "rgba(53, 221, 245, 0.25)",
        },
        // Legacy alias to ice-blue to prevent any residual purple
        purple: {
          DEFAULT: "#35DDF5",
          vibrant: "#7DEBFF",
          electric: "#A5F3FF",
          lavender: "#64CFFF",
          light: "#D9FAFF",
          dark: "#071521",
          glow: "rgba(125, 235, 255, 0.45)",
          ambient: "rgba(53, 221, 245, 0.25)",
        },
        ivory: "#F4FDFF",
        muted: "#A9BAC8",
        neutral: {
          dark: "#0A111C",
          surface: "#141C26",
          card: "#10151D",
          border: "#263643",
          gray: "#3D5162",
          muted: "#A9BAC8",
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
