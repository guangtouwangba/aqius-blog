import { getAllPosts, getAllTags } from '@/lib/posts'
import { ArticleCard } from '@/components/ui/article-card'
import Link from 'next/link'
import { ArrowLeft, Tag } from 'lucide-react'

export default function PostsPage() {
  const posts = getAllPosts()
  const tags = getAllTags()

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-12">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            返回首页
          </Link>
          
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            所有文章
          </h1>
          <p className="text-xl text-gray-600 dark:text-slate-400">
            共 {posts.length} 篇技术文章，涵盖 {tags.length} 个技术领域
          </p>
        </div>

        {/* Tags Filter */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
            <Tag className="w-6 h-6" />
            技术标签
          </h2>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/posts"
              className="px-4 py-2 bg-primary-600 text-white rounded-full text-sm font-medium hover:bg-primary-700 transition-colors"
            >
              全部文章 ({posts.length})
            </Link>
            {tags.map((tag) => (
              <Link
                key={tag}
                href={`/tags/${encodeURIComponent(tag)}`}
                className="px-4 py-2 bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-slate-300 rounded-full text-sm font-medium hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors"
              >
                #{tag}
              </Link>
            ))}
          </div>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <ArticleCard key={post.slug} {...post} />
          ))}
        </div>

        {/* Empty State */}
        {posts.length === 0 && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
              暂无文章
            </h3>
            <p className="text-gray-600 dark:text-slate-400">
              还没有发布任何文章，请稍后再来查看。
            </p>
          </div>
        )}
      </div>
    </div>
  )
}