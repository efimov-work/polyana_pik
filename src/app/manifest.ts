import type { MetadataRoute } from 'next';
import { asset } from '@/lib/asset';
import { DESCRIPTION, SITE_NAME } from '@/lib/seo';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Поляна Пик: апартаменты в Красной Поляне',
    short_name: SITE_NAME,
    description: DESCRIPTION,
    lang: 'ru',
    start_url: asset('/'),
    display: 'standalone',
    background_color: '#0E1311',
    theme_color: '#0E1311',
    icons: [
      { src: asset('/icon.png'), sizes: '512x512', type: 'image/png', purpose: 'any' },
      { src: asset('/apple-icon.png'), sizes: '180x180', type: 'image/png' }
    ]
  };
}
