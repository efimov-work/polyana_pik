import { COMPLEX, SERVICES } from './content';

export const DEFAULT_SITE_URL = 'http://localhost:3000';

export const SITE_NAME = 'Поляна Пик';

export const YANDEX_VERIFICATION = process.env.YANDEX_VERIFICATION || undefined;
export const GOOGLE_VERIFICATION = process.env.GOOGLE_SITE_VERIFICATION || undefined;

export const TITLE = 'Поляна Пик: апартаменты в Красной Поляне под управлением Hilton';
export const DESCRIPTION =
  'Апартаменты, пентхаусы и шале в комплексе «Поляна Пик» в центре Красной Поляны. Отделка, мебель и техника в цене, рассрочка 0% до сдачи, сделка по 214-ФЗ. Пришлём свободные лоты и цены.';

export const KEYWORDS = [
  'апартаменты в Красной Поляне',
  'купить апартаменты в Красной Поляне',
  'апартаменты в Сочи с доходом',
  'пентхаус в Красной Поляне',
  'шале в Красной Поляне',
  'апартаменты под управлением Hilton',
  'коммерческая недвижимость Красная Поляна',
  'рассрочка от застройщика',
  SITE_NAME
];

export function siteUrl(): string {
  const raw = (process.env.NEXT_PUBLIC_SITE_URL || '').trim();
  if (!raw) return DEFAULT_SITE_URL;
  try {
    return new URL(raw).origin;
  } catch {
    return DEFAULT_SITE_URL;
  }
}

export function buildJsonLd(): Record<string, unknown> {
  const url = siteUrl();
  const site = `${url}/#website`;
  const page = `${url}/#webpage`;
  const complex = `${url}/#complex`;

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': site,
        url,
        name: SITE_NAME,
        inLanguage: 'ru-RU'
      },
      {
        '@type': 'WebPage',
        '@id': page,
        url,
        name: TITLE,
        description: DESCRIPTION,
        inLanguage: 'ru-RU',
        isPartOf: { '@id': site },
        about: { '@id': complex },
        primaryImageOfPage: { '@type': 'ImageObject', url: `${url}/opengraph-image.jpg` }
      },
      {
        '@type': 'ApartmentComplex',
        '@id': complex,
        name: COMPLEX.name,
        description: DESCRIPTION,
        url,
        image: [`${url}/assets/hero.webp`, `${url}/opengraph-image.jpg`],
        address: {
          '@type': 'PostalAddress',
          addressCountry: COMPLEX.country,
          addressRegion: COMPLEX.region,
          addressLocality: COMPLEX.locality,
          streetAddress: COMPLEX.street
        },
        amenityFeature: SERVICES.map((name) => ({
          '@type': 'LocationFeatureSpecification',
          name,
          value: true
        }))
      }
    ]
  };
}
