export type AppEnvironment = "development" | "staging" | "production";
const requestedEnvironment = process.env.NEXT_PUBLIC_APP_ENV;
export const appEnvironment: AppEnvironment =
  requestedEnvironment === "staging" || requestedEnvironment === "production" || requestedEnvironment === "development"
    ? requestedEnvironment : process.env.NODE_ENV === "development" ? "development" : "production";

// Keep literal process.env accesses: Next.js replaces these at build time.
export const siteConfig = {
  environment: appEnvironment,
  siteUrl: (process.env.NEXT_PUBLIC_SITE_URL || "https://elpejae.com").replace(/\/$/, ""),
  contactEmail: "help@elpejae.com",
  analyticsEnabled: process.env.NEXT_PUBLIC_ANALYTICS_ENABLED === "true",
  analyticsDebug: appEnvironment !== "production" && process.env.NEXT_PUBLIC_ANALYTICS_DEBUG === "true",
  cloudflareEnabled: process.env.NEXT_PUBLIC_CLOUDFLARE_ANALYTICS_ENABLED === "true",
  cloudflareToken: process.env.NEXT_PUBLIC_CLOUDFLARE_ANALYTICS_TOKEN || "",
  // This flag only controls placeholders. No advertising SDK ships in this MVP.
  adsEnabled: process.env.NEXT_PUBLIC_ADS_ENABLED === "true",
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || "",
} as const;
export function canLoadCloudflareAnalytics(analyticsConsent: boolean): boolean {
  return siteConfig.analyticsEnabled && siteConfig.cloudflareEnabled && analyticsConsent &&
    /^[a-f0-9]{32}$/i.test(siteConfig.cloudflareToken);
}
