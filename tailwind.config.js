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
        raleway: ["Raleway", "sans-serif"],
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
    ],
  },
};
