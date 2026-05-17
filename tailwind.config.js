/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: "#F7F8F5",
          card: "#FFFFFF",
        },
        ink: {
          primary: "#111111",
          secondary: "#6B7280",
          muted: "#9CA3AF",
        },
        accent: {
          DEFAULT: "#1F7A5A",
          soft: "#DDEFE7",
        },
        secondaryAccent: "#F1E8D9",
        border: {
          DEFAULT: "#E5E7EB",
          divider: "#EEF0EC",
        },
        status: {
          success: "#1F9D66",
          warning: "#D98C24",
          error: "#D94A4A",
        },
      },
      borderRadius: {
        card: "24px",
      },
    },
  },
  plugins: [],
};
