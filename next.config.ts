import type { NextConfig } from "next";

const basePath = process.env.PAGES_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  trailingSlash: true,
  env: {
    // Public assets are not automatically prefixed by basePath.
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  images: {
    unoptimized: true,
  },
  experimental: {
    // TypeScript 5 exposes the compiler API and avoids an extra CLI process.
    useTypeScriptCli: false,
  },
};

export default nextConfig;
