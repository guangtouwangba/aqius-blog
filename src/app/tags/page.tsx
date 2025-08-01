import { getAllTags, getAllPosts } from '@/lib/posts'
import Link from 'next/link'
import { ArrowLeft, Hash, FileText } from 'lucide-react'

export default function TagsPage() {
  const tags = getAllTags()
  const posts = getAllPosts()
  
  // 计算每个标签的文章数量
  const tagCounts = tags.map(tag => {
    const count = posts.filter(post => post.tags.includes(tag)).length
    return { tag, count }
  }).sort((a, b) => b.count - a.count) // 按文章数量排序

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
          
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
            <Hash className="w-10 h-10" />
            技术标签
          </h1>
          <p className="text-xl text-gray-600 dark:text-slate-400">
            共 {tags.length} 个技术标签，涵盖 {posts.length} 篇文章
          </p>
        </div>

        {/* Tags Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {tagCounts.map(({ tag, count }) => (
            <Link
              key={tag}
              href={`/tags/${encodeURIComponent(tag)}`}
              className="group"
            >
              <div className="card p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 bg-primary-100 dark:bg-primary-900/30 rounded-lg group-hover:bg-primary-200 dark:group-hover:bg-primary-900/50 transition-colors">
                    <Hash className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                  </div>
                  <span className="text-sm text-gray-500 dark:text-slate-400 bg-gray-100 dark:bg-slate-800 px-2 py-1 rounded-full">
                    {count} 篇
                  </span>
                </div>
                
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                  {tag}
                </h3>
                
                <p className="text-sm text-gray-600 dark:text-slate-400">
                  包含 {count} 篇相关文章
                </p>
                
                <div className="mt-4 flex items-center text-primary-600 dark:text-primary-400 text-sm font-medium">
                  <FileText className="w-4 h-4 mr-1" />
                  查看文章
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Popular Tags Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-8">
            热门标签
          </h2>
          <div className="flex flex-wrap gap-3">
            {tagCounts.slice(0, 10).map(({ tag, count }) => (
              <Link
                key={tag}
                href={`/tags/${encodeURIComponent(tag)}`}
                className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary-500 to-purple-600 text-white rounded-full text-sm font-medium hover:from-primary-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
              >
                <Hash className="w-3 h-3" />
                {tag}
                <span className="bg-white/20 px-1.5 py-0.5 rounded-full text-xs">
                  {count}
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl">
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
              {tags.length}
            </div>
            <div className="text-sm text-blue-800 dark:text-blue-300">
              技术标签总数
            </div>
          </div>
          
          <div className="text-center p-6 bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl">
            <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">
              {posts.length}
            </div>
            <div className="text-sm text-green-800 dark:text-green-300">
              技术文章总数
            </div>
          </div>
          
          <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl">
            <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">
              {Math.round(posts.length / tags.length)}
            </div>
            <div className="text-sm text-purple-800 dark:text-purple-300">
              平均每标签文章数
            </div>
          </div>
        </div>

        {/* Empty State */}
        {tags.length === 0 && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🏷️</div>
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
              暂无标签
            </h3>
            <p className="text-gray-600 dark:text-slate-400">
              还没有任何技术标签，请先发布一些文章。
            </p>
          </div>
        )}
      </div>
    </div>
  )
}