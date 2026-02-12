/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{js,jsx,ts,tsx}', './app/**/*.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  // @ts-ignore
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        background: 'hsl(174 64% 91%)',
        surface: 'hsl(0 0% 100%)',
        text: 'hsl(174 56% 14%)',
        muted: 'hsl(240 4% 46%)',
        border: 'hsl(180 5% 81%)',

        primary: 'hsl(173 70% 43%)',
        secondary: 'hsl(183 98% 22%)',
        accent: 'hsl(24 94% 61%)',
        destructive: 'hsl(359 98% 62%)',
      },
      borderRadius: {
        primary: 15,
        secondary: 10,
      },
      fontSize: {
        caption: ['12px', '16px'],
        base: ['16px', '22px'],
      },
    },
  },
  plugins: [],
};
