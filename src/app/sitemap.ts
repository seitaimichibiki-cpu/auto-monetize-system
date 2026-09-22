import { MetadataRoute } from 'next';
import postsData from '@/data/posts.json';

const BASE_URL = 'https://auto-monetize-system.vercel.app';

export default function sitemap(): MetadataRoute.Sitemap {
  const blogPosts = postsData.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.createdAt),
    changeFrequency: 'weekly' as const,
    priority: (post as any).type === 'pillar' ? 0.9 : 0.7,
  }));

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/tools`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/legal`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.3,
    },
    ...blogPosts,
  ];
}
