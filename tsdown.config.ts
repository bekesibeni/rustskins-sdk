import { defineConfig } from "tsdown";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm"],
  target: "es2024",
  platform: "node",
  dts: true,
  sourcemap: true,
  clean: true,
  treeshake: true,
  external: ["@benji/stdlib"],
});
