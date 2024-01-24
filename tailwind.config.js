/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        gray: {
          "100": "#101010",
          "200": "rgba(255, 255, 255, 0.1)",
        },
        white: "#fff",
        darkgray: "#999",
        darkslategray: {
          "100": "#343638",
          "200": "#323232",
        },
        dimgray: {
          "100": "#666",
          "200": "#616161",
          "300": "#606060",
          "400": "#5f5f5f",
          "500": "rgba(102, 102, 102, 0.09)",
        },
        whitesmoke: "#f3f5f7",
        cornflowerblue: "#3e95ef",
      },
      spacing: {},
      fontFamily: {
        "sf-pro-display": "'SF Pro Display'",
      },
    },
    fontSize: {
      xs: "12px",
      sm: "14px",
      mini: "15px",
      base: "16px",
      smi: "13px",
      mid: "17px",
      inherit: "inherit",
    },
    screens: {
      mq1275: {
        raw: "screen and (max-width: 1275px)",
      },
      mq1100: {
        raw: "screen and (max-width: 1100px)",
      },
      mq750: {
        raw: "screen and (max-width: 750px)",
      },
      mq450: {
        raw: "screen and (max-width: 450px)",
      },
    },
  },
  corePlugins: {
    preflight: false,
  },
};
