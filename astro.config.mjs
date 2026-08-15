import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://kim-hyunjin.github.io",
  base: "/algo-roadmap",
  vite: {
    plugins: [tailwindcss()],
  },
});
