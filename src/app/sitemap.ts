import { MetadataRoute } from 'next';
import { getBaseUrl } from '@/lib/utils';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: getBaseUrl(),
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
  ];
}
