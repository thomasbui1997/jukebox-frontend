/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],

  theme: {
    extend: {
      colors: {
        brandBlue: "#4f46e5",
        brandGreen: "#10b981",
        lightGray: "#f3f4f6",
      },
    },
  },
  plugins: [],
};

