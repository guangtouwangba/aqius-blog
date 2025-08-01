import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Metadata } from 'next'
import { CalendarDays, Clock, User, ArrowLeft, Tag } from 'lucide-react'
import { getPostBySlug, getAllPosts } from '@/lib/posts'
import { MDXContent } from '@/components/ui/mdx-content'
import { TableOfContentsWrapper } from '@/components/ui/table-of-contents-wrapper'

interface PostPageProps {
  params: Promise<{ slug: string }>
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 返回链接 */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-gray-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          返回首页
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* 主内容区域 */}
          <div className="lg:col-span-3">
            <article className="max-w-none">
              {/* 文章头部 */}
              <header className="mb-8 pb-8 border-b border-gray-200 dark:border-slate-700">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                  {post.title}
                </h1>
                
                <div className="flex flex-wrap items-center gap-4 text-gray-600 dark:text-slate-400 mb-6">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    <span>{post.author}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CalendarDays className="w-4 h-4" />
                    <time>{post.publishDate}</time>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{post.readTime} 分钟阅读</span>
                  </div>
                </div>

                {/* 标签 */}
                {post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map(tag => (
                      <Link
                        key={tag}
                        href={`/tags/${encodeURIComponent(tag)}`}
                        className="inline-flex items-center gap-1 px-3 py-1 text-sm bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full hover:bg-primary-200 dark:hover:bg-primary-900/50 transition-colors"
                      >
                        <Tag className="w-3 h-3" />
                        {tag}
                      </Link>
                    ))}
                  </div>
                )}
              </header>

              {/* 文章内容 */}
              <div className="article-content">
                <MDXContent source={post.content} />
              </div>
            </article>

            {/* 文章底部 */}
            <footer className="mt-12 pt-8 border-t border-gray-200 dark:border-slate-700">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <p className="text-gray-600 dark:text-slate-400 mb-2">
                    喜欢这篇文章？分享给更多人！
                  </p>
                  <div className="flex gap-2">
                    <a
                      href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(`https://techblog.example.com/posts/${post.slug}`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm"
                    >
                      分享到 Twitter
                    </a>
                    <a
                      href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(`https://techblog.example.com/posts/${post.slug}`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors text-sm inline-block text-center"
                    >
                      分享
                    </a>
                  </div>
                </div>
                
                <div className="text-right">
                  <p className="text-sm text-gray-500 dark:text-slate-500">
                    最后更新：{post.publishDate}
                  </p>
                </div>
              </div>
            </footer>
          </div>

          {/* 侧边栏 - 相关文章推荐 */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-4 border border-gray-200 dark:border-slate-700">
                <h4 className="font-semibold text-sm text-gray-900 dark:text-white mb-3">
                  相关文章
                </h4>
                <p className="text-sm text-gray-600 dark:text-slate-400">
                  更多相关文章即将推出...
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// 生成静态参数
export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

// 生成页面元数据
export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }

  return {
    title: post.title,
    description: post.excerpt,
    keywords: post.tags,
    authors: [{ name: post.author }],
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.publishDate,
      authors: post.author ? [post.author] : undefined,
      tags: post.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
    },
  }
}