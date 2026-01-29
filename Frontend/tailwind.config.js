/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#121212',
        surface: '#1E1E1E',
        primary: '#00B8AA',
        secondary: '#00D4C4',
        accent: {
          orange: '#FF9800',
          green: '#4CAF50',
        },
        text: {
          primary: '#DEDEDE',
          secondary: '#999999',
        },
        border: {
          dark: '#333333',
          error: '#F44336',
        },
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 0 20px rgba(0, 184, 170, 0.3)',
        'glow-lg': '0 0 30px rgba(0, 212, 196, 0.5)',
      },
    },
  },
  plugins: [],
};
