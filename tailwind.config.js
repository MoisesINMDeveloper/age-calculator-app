/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      // ### Primary
      Purple: "hsl(259, 100%, 65%)",
      Lightred: "hsl(0, 100%, 67%)",

      //### Neutral
      White: "hsl(0, 0%, 100%)",
      Offwhite: "hsl(0, 0 %, 94 %)",
      Lightgrey: "hsl(0, 0%, 95%)",
      Smokeygrey: "hsl(0, 1%, 44%)",
      Offblack: "hsl(0, 0%, 8%)",
    },
    extend: {},
  },
  plugins: [],
};
