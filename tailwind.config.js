/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0d9488',   // Teal-ish main color
        secondary: '#14b8a6', // Slightly lighter accent
        accent: '#fcd34d',    // Yellow accent for buttons, highlights
        background: '#f9fafb', // Light gray background
        text: '#111827',       // Dark text color
        muted: '#6b7280',      // Muted text color
      },
      fontSize: {
        'xs': '0.75rem',
        'sm': '0.875rem',
        'base': '1rem',
        'lg': '1.125rem',
        'xl': '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.875rem',
        '4xl': '2.25rem',
        '5xl': '3rem',
      },
      spacing: {
        '128': '32rem', // for larger containers if needed
        '144': '36rem',
      },
      borderRadius: {
        'xl': '1rem',
      },
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        myblog: {
          'primary': '#0d9488',
          'secondary': '#14b8a6',
          'accent': '#fcd34d',
          'neutral': '#f3f4f6',
          'base-100': '#ffffff',
          'info': '#3b82f6',
          'success': '#22c55e',
          'warning': '#fbbf24',
          'error': '#ef4444',
        },
      },
    ],
  },
}
