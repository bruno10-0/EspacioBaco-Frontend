/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        madecarving: ["MADECARVING", "sans-serif"],
        "madecarving-bold": ["MADECARVINGPersonalUse-Bold", "sans-serif"],
        "madecarving-semi-bold": [
          "MADECARVINGPersonalUse-SemiBold",
          "sans-serif",
        ],
      },
    },
  },
  // eslint-disable-next-line no-undef
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        autumn: {
          ...require("daisyui/src/theming/themes")["autumn"],
          accent: "#FB923C",
          "--rounded-box": "0",
          "--rounded-btn": "0", 
          "--rounded-badge": "0",     
          "--animation-btn": "0.55s", 
        },
      },
      "light",
      "dark",
      "cupcake",
      "bumblebee",
      "emerald",
      "corporate",
      "synthwave",
      "retro",
      "cyberpunk",
      "valentine",
      "halloween",
      "garden",
      "forest",
      "aqua",
      "lofi",
      "pastel",
      "fantasy",
      "wireframe",
      "black",
      "luxury",
      "dracula",
      "cmyk",
      "business",
      "acid",
      "lemonade",
      "night",
      "coffee",
      "winter",
      "dim",
      "nord",
      "sunset",
    ],
    
  },
};
