/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        lightHover: '#fcf4ff',
        darkHover: '#2a004a',
        darkTheme: '#11001F',
        primaryColor: "#EB5A3C"
      },
      fontFamily: {
        Poppins: ["Poppins", "san-serif"],
        Fruktur: ["Fruktur", "cursive"],
      },
      boxShadow: {
        'black': '4px 4px #000',
        'white': '4px 4px #fff',
      },
    },
  },
  darkMode: 'selector',
  plugins: [],
};