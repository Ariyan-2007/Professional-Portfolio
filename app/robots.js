export const dynamic = "force-static";

export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    host: "https://www.ariyan.app",
    sitemap: "https://www.ariyan.app/sitemap.xml",
  };
}
