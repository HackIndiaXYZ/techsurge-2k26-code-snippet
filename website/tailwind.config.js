/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./context/**/*.{js,ts,jsx,tsx,mdx}",
    "./utils/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Rose Vale (#A94A4A) Primary Brand Palette
        rosevale: {
          50: '#fdf5f5',
          100: '#fbeaea',
          200: '#f7d5d5',
          300: '#eeaeae',
          400: '#e17f7f',
          500: '#c95b5b',
          600: '#a94a4a', // Base Rose Vale
          700: '#8c3a3a',
          800: '#743333',
          900: '#612f2f',
        },
        // Cornsilk (#FFF6DA) Background Palette
        cornsilk: {
          50: '#fffdf5',
          100: '#fff6da', // Base Cornsilk
          200: '#feebaf',
          300: '#fddc7a',
          400: '#fbc442',
          500: '#f9ab1a',
        },
        // Muted Gold (#C5A059 / #B8860B) Stakeholder Palette
        mutedgold: {
          50: '#faf6ec',
          100: '#f3e8cf',
          200: '#e6d0a0',
          300: '#d6b46c',
          400: '#c89b47',
          500: '#c5a059', // Base Muted Gold
          600: '#b8860b',
          700: '#936710',
          800: '#785114',
          900: '#644216',
        },
        // Map emerald to Rose Vale so all existing UI components dynamically render Rose Vale
        emerald: {
          50: '#fdf5f5',
          100: '#fbeaea',
          200: '#f7d5d5',
          300: '#eeaeae',
          400: '#e17f7f',
          500: '#c95b5b',
          600: '#a94a4a', // #A94A4A Rose Vale
          700: '#8c3a3a',
          800: '#743333',
          900: '#612f2f',
        },
        brand: {
          50: '#fdf5f5',
          100: '#fbeaea',
          500: '#c95b5b',
          600: '#a94a4a',
          700: '#8c3a3a',
          800: '#743333',
          900: '#612f2f',
        },
      },
    },
  },
  plugins: [],
}

