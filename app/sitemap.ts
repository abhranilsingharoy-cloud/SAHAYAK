import { MetadataRoute } from 'next'
export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_APP_URL || 'https://sahayak-ai.vercel.app'
  return [
    { url: base, lastModified: new Date(), changeFrequency: 'daily', priority: 1 },
    { url: `${base}/dashboard`, lastModified: new Date(), changeFrequency: 'always', priority: 0.9 },
    { url: `${base}/suraksha`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.8 },
    { url: `${base}/hotspots`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.8 },
    { url: `${base}/sanctuary`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    { url: `${base}/telemetry`, lastModified: new Date(), changeFrequency: 'always', priority: 0.7 },
    { url: `${base}/mobile`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    { url: `${base}/integrations`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.6 },
    { url: `${base}/efir`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.6 },
    { url: `${base}/ncw`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.6 },
  ]
}
