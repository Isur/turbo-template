import type { Config } from "tailwindcss";

// We want each package to be responsible for its own content.
const config: Omit<Config, "content"> = {
  theme: {
    extend: {
      colors: {
        primary: "#d65d0e",
        backgroundColor: "#282828",
        teste: "#00ff00",
      },
    },
  },
  plugins: [],
};
export default config;
