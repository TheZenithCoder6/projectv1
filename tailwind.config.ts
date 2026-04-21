import type { Config } from "tailwindcss";

const config: Config = {
  // Ye line add karni hai
  darkMode: "class", 
  
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",      // Agar src folder hai toh ye paths check karein
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        processing: {
          '0%': { width: '0%' },
          '100%': { width: '100%' },
        },
        tick: {
          '0%': { transform: 'scale(0.1)' },
          '75%': { transform: 'scale(1.2)' },
          '100%': { transform: 'scale(1)' },
        },
      },
      animation: {
        processing: 'processing 5s linear forwards',
        tick: 'tick 0.6s ease-in-out forwards',
      },
    },
  },
  plugins: [],
};

export default config;