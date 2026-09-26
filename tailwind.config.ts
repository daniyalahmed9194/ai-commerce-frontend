import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#161616",
        paper: "#f7f4ee",
        moss: "#566b4c",
        clay: "#b45c3d",
        mist: "#e8ece2"
      }
    }
  },
  plugins: []
};

export default config;
