import type { Config } from "tailwindcss";
import sharedConfig from "@repo/tailwind-config";

const config: Pick<Config, "content" | "presets" | "prefix"> = {
  presets: [sharedConfig],
  prefix: "ui-",
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
};

export default config;
