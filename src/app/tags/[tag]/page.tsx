import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Tag } from 'lucide-react'
import { getPostsByTag, getAllTags } from '@/lib/posts'
import { ArticleCard } from '@/components/ui/article-card'

interface TagPageProps {
  params: Promise<{ tag: string }>
}

export default async function TagPage({ params }: TagPageProps) {
  const { tag } = await params
  const decodedTag = decodeURIComponent(tag)
  const posts = getPostsByTag(decodedTag)

  if (posts.length === 0) {
    notFound()
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* 返回链接 */}
      <Link
        href="/search"
        className="inline-flex items-center gap-2 text-gray-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors mb-8"
      >
        <ArrowLeft className="w-4 h-4" />
        返回搜索
      </Link>

      {/* 标签头部 */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full mb-4">
          <Tag className="w-5 h-5" />
          <span className="text-lg font-medium">{decodedTag}</span>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          标签: {decodedTag}
        </h1>
        <p className="text-gray-600 dark:text-slate-400">
          共找到 {posts.length} 篇相关文章
        </p>
      </div>

      {/* 文章列表 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map(post => (
          <ArticleCard key={post.slug} {...post} />
        ))}
      </div>
    </div>
  )
}

// 生成静态参数
export async function generateStaticParams() {
  const tags = getAllTags()
  return tags.map((tag) => ({
    tag: encodeURIComponent(tag),
  }))
}

// 生成页面元数据
export async function generateMetadata({ params }: TagPageProps): Promise<Metadata> {
  const { tag } = await params
  const decodedTag = decodeURIComponent(tag)
  const posts = getPostsByTag(decodedTag)

  return {
    title: `标签: ${decodedTag}`,
    description: `浏览所有关于 ${decodedTag} 的文章，共 ${posts.length} 篇`,
    keywords: [decodedTag, '技术博客', '文章标签'],
  }
}