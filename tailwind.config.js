/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        'gochi': ['"Gochi Hand"', 'cursive'],
        'roboto-mono': ['"Roboto Mono"', 'monospace'],
      },
      colors: {
        'menu-beige': '#f4eedf',
      },
    },
  },
  plugins: [],
};

