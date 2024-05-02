import type { Config } from "tailwindcss";
import sharedConfig from "@repo/tailwind-config";

const config: Pick<Config, "content" | "presets" | "prefix" | "theme"> = {
  presets: [sharedConfig],
  prefix: "ui-",
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        teste: "#f1f11f",
      },
    },
  },
};

export default config;
