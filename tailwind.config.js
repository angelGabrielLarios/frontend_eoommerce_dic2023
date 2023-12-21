
/** @type {import('tailwindcss').Config} */

import daisyui from "daisyui";
('tailwindcss-animated')
import tailwindcss_animated from "tailwindcss-animated";


export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Open Sans', 'sans-serif'],
        'header': ['Montserrat', 'sans-serif']
      }
    },
  },
  daisyui: {
    themes: ["halloween"],
  },
  plugins: [
    daisyui,
    tailwindcss_animated
  ],
}

