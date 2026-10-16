import type { MetadataRoute } from 'next';
import { siteUrl } from '@/lib/seo';

export const dynamic = 'force-static';

const BUILT_AT = new Date();

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl(),
      lastModified: BUILT_AT,
      changeFrequency: 'monthly',
      priority: 1,
      images: [`${siteUrl()}/assets/hero.webp`, `${siteUrl()}/opengraph-image.jpg`, `${siteUrl()}/logo.png`]
    }
  ];
}
