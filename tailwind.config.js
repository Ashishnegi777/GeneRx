/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ["'Instrument Serif'", 'serif'],
        playfair: ["'Playfair'", 'serif'],
        body: ["'Poppins'", 'sans-serif'],
        secondary: ["'Poppins'", 'sans-serif'],
        poppins: ["'Poppins'", 'sans-serif'],
        mono: ["'JetBrains Mono'", 'monospace'],
      },
    },
  },
  plugins: [],
};
