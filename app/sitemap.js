export const dynamic = "force-static";

export default function sitemap() {
  return [
    {
      url: "https://www.ariyan.app",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
