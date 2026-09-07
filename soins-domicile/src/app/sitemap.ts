import type { MetadataRoute } from "next";
import { site } from "@/data/site";
import { services } from "@/data/services";
import { communes } from "@/data/communes";
import { articles } from "@/data/articles";

export default function sitemap(): MetadataRoute.Sitemap {
  const maintenant = new Date();
  const fixes = ["", "/services", "/zones-desservies", "/tarifs", "/simulateur-katz", "/promo", "/conditions-generales", "/a-propos", "/blog", "/contact"];

  return [
    ...fixes.map((chemin) => ({
      url: `${site.url}${chemin}`,
      lastModified: maintenant,
      changeFrequency: "monthly" as const,
      priority: chemin === "" ? 1 : 0.8,
    })),
    ...services.map((s) => ({
      url: `${site.url}/services/${s.slug}`,
      lastModified: maintenant,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...articles.map((a) => ({
      url: `${site.url}/blog/${a.slug}`,
      lastModified: new Date(a.date),
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
    ...communes.map((c) => ({
      url: `${site.url}/${c.slug}`,
      lastModified: maintenant,
      changeFrequency: "monthly" as const,
      priority: 0.9, // pages locales : cœur de l'acquisition
    })),
  ];
}
