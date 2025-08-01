import { getAllPosts, getAllTags } from '@/lib/posts'
import { getSiteConfig } from '@/lib/config'

export async function GET() {
  const posts = getAllPosts()
  const tags = getAllTags()
  const siteConfig = getSiteConfig()
  const baseUrl = siteConfig.url

  const staticPages = [
    '',
    '/posts',
    '/tags', 
    '/search',
    '/about'
  ]

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${staticPages
    .map(
      (route) => `
  <url>
    <loc>${baseUrl}${route}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>${route === '' ? 'daily' : 'weekly'}</changefreq>
    <priority>${route === '' ? '1.0' : '0.8'}</priority>
  </url>`
    )
    .join('')}
    
  ${posts
    .map(
      (post) => `
  <url>
    <loc>${baseUrl}/posts/${post.slug}</loc>
    <lastmod>${new Date(post.publishDate).toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>`
    )
    .join('')}
    
  ${tags
    .map(
      (tag) => `
  <url>
    <loc>${baseUrl}/tags/${encodeURIComponent(tag)}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`
    )
    .join('')}
</urlset>`.trim()

  return new Response(sitemapXml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  })
}