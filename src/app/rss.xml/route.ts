import { getAllPosts } from '@/lib/posts'
import { getSiteConfig, getAuthorConfig } from '@/lib/config'

export async function GET() {
  const posts = getAllPosts()
  const siteConfig = getSiteConfig()
  const authorConfig = getAuthorConfig()

  const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${siteConfig.title}</title>
    <description>${siteConfig.description}</description>
    <link>${siteConfig.url}</link>
    <language>zh-CN</language>
    <managingEditor>${authorConfig.email} (${authorConfig.name})</managingEditor>
    <webMaster>${authorConfig.email} (${authorConfig.name})</webMaster>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${siteConfig.url}/rss.xml" rel="self" type="application/rss+xml"/>
    
    ${posts
      .slice(0, 20) // 限制最新20篇文章
      .map(
        (post) => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <description><![CDATA[${post.excerpt}]]></description>
      <link>${siteConfig.url}/posts/${post.slug}</link>
      <guid isPermaLink="true">${siteConfig.url}/posts/${post.slug}</guid>
      <pubDate>${new Date(post.publishDate).toUTCString()}</pubDate>
      <author>${authorConfig.email} (${authorConfig.name})</author>
      ${post.tags.map(tag => `<category><![CDATA[${tag}]]></category>`).join('\n      ')}
    </item>`
      )
      .join('\n')}
  </channel>
</rss>`.trim()

  return new Response(rssXml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
    },
  })
}