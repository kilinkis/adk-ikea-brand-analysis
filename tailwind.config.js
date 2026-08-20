/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ikea: {
          blue: '#0058a3',
          yellow: '#ffcc00',
          darkBlue: '#003e73',
          lightBg: '#f5f5f5',
          border: '#dfdfdf'
        }
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
