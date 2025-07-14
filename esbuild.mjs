import { build } from "esbuild";
import { rmSync } from "fs";
import dotEnv  from "dotenv";
// Remove the previous build directory
rmSync("dist", { recursive: true, force: true });

  dotEnv.config();

// Run esbuild with the specified options
build({
  entryPoints: ["src/index.js"],
  bundle: true,
  format: "cjs",
  platform: "node",
  target: "node20",
  external: [],
  outfile: "dist/index.js",
  define: {
    'process.env.APP_SECRET': JSON.stringify(process.env.APP_SECRET),
    'process.env.MONGODB_URI': JSON.stringify(process.env.MONGODB_URI)
  }
}).catch(() => process.exit(1));