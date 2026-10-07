import type { MetadataRoute } from 'next';
import { DESCRIPTION, SITE_NAME } from '@/lib/seo';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Поляна Пик: апартаменты в Красной Поляне',
    short_name: SITE_NAME,
    description: DESCRIPTION,
    lang: 'ru',
    start_url: '/',
    display: 'standalone',
    background_color: '#0E1311',
    theme_color: '#0E1311',
    icons: [
      { src: '/icon.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
      { src: '/apple-icon.png', sizes: '180x180', type: 'image/png' }
    ]
  };
}
