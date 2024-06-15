/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#15cae6",

          secondary: "#67e8f9",

          accent: "#0e7490",

          neutral: "#0ea5e9",

          "base-100": "#f3f4f6",

          info: "#075985",

          success: "#166534",

          warning: "#b45309",

          error: "#be123c",
        },
      },
    ],
  },

  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
};
