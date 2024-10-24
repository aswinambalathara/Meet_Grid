import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        'footer-brown':'#0F0606',
      },
      fontFamily:{
        sans: ['Poppins', 'Arial', 'sans-serif'],    
        poltawski: ['Poltawski Nowy', 'serif'],       
        alegreya: ['Alegreya SC', 'serif'],    
      }
    },
  },
  plugins: [],
};
export default config;
