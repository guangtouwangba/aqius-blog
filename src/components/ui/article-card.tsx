import Link from 'next/link'
import { CalendarDays, Clock, Tag } from 'lucide-react'

interface ArticleCardProps {
  title: string
  excerpt: string
  publishDate: string
  readTime: number
  tags: string[]
  slug: string
  featured?: boolean
}

export function ArticleCard({
  title,
  excerpt,
  publishDate,
  readTime,
  tags,
  slug,
  featured = false
}: ArticleCardProps) {
  return (
    <article className={`
      group relative card p-6 hover:shadow-md transition-all duration-200
      ${featured ? 'md:col-span-2 lg:col-span-3' : ''}
    `}>
      <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-slate-400 mb-3">
        <CalendarDays className="w-4 h-4" />
        <time>{publishDate}</time>
        <span>•</span>
        <Clock className="w-4 h-4" />
        <span>{readTime} 分钟阅读</span>
      </div>
      
      <h3 className={`
        font-semibold text-gray-900 dark:text-white group-hover:text-primary-600 
        dark:group-hover:text-primary-400 transition-colors line-clamp-2 mb-3
        ${featured ? 'text-2xl mb-4' : 'text-lg'}
      `}>
        <Link href={`/posts/${slug}`} className="block">
          {title}
        </Link>
      </h3>
      
      <p className="text-gray-600 dark:text-slate-300 line-clamp-3 mb-4">
        {excerpt}
      </p>
      
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {tags.map(tag => (
            <Link
              key={tag}
              href={`/tags/${encodeURIComponent(tag)}`}
              className="inline-flex items-center gap-1 px-2 py-1 text-xs bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full hover:bg-primary-200 dark:hover:bg-primary-900/50 transition-colors"
            >
              <Tag className="w-3 h-3" />
              {tag}
            </Link>
          ))}
        </div>
      )}
    </article>
  )
}