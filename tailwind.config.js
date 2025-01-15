/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
    animation: {
      "spin-slow": "spin 20s linear infinite",
      "spin-slow1": "spin 18s linear infinite",
      "spin-slow2": "spin 15s linear infinite",
    },
  },
  plugins: [],
};
