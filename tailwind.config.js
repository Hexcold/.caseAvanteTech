/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Red Hat Display"', "sans-serif"],
      },
      colors: {
        "brand-primary": "#c83b0e",
        "brand-green": "hsl(155, 60%, 40%)",
        "brand-rose": {
          50: "hsl(20, 50%, 98%)", // bg-brand-rose-50 (fundo da página)
          100: "hsl(13, 31%, 94%)", // border-brand-rose-100 (borda do botão)
          300: "hsl(14, 25%, 72%)", // text-brand-rose-300 (categoria)
          500: "hsl(12, 20%, 44%)",
          900: "hsl(7, 20%, 60%)",
        },
      },
    },
  },
  plugins: [],
};
