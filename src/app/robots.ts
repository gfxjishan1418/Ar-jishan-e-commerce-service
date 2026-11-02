import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/checkout/payment-sandbox"],
      },
    ],
    sitemap: "https://arjishan.com/sitemap.xml",
  };
}
