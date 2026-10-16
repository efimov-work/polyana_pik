import type { MetadataRoute } from 'next';
import { NOINDEX, siteUrl } from '@/lib/seo';

export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  const url = siteUrl();
  return {
    rules: [
      NOINDEX
        ? { userAgent: '*', disallow: '/' }
        : {
            userAgent: '*',
            allow: '/',
            disallow: ['/api/']
          }
    ],
    sitemap: `${url}/sitemap.xml`,
    host: url
  };
}
