import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // TypeScript 5 exposes the compiler API and avoids an extra CLI process.
    useTypeScriptCli: false,
  },
};

export default nextConfig;
