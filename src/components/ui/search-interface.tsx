'use client'

import { useState, useEffect, useMemo } from 'react'
import { Search, X, Filter, Tag, Calendar } from 'lucide-react'
import { ArticleCard } from './article-card'
import { PostMetadata } from '@/lib/posts'

interface SearchInterfaceProps {
  posts: PostMetadata[]
  tags: string[]
}

export function SearchInterface({ posts, tags }: SearchInterfaceProps) {
  const [query, setQuery] = useState('')
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [sortBy, setSortBy] = useState<'date' | 'title' | 'readTime'>('date')
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  // 搜索和过滤逻辑
  const filteredPosts = useMemo(() => {
    let filtered = posts

    // 文本搜索
    if (query.trim()) {
      const lowercaseQuery = query.toLowerCase()
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(lowercaseQuery) ||
        post.excerpt.toLowerCase().includes(lowercaseQuery) ||
        post.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
      )
    }

    // 标签过滤
    if (selectedTags.length > 0) {
      filtered = filtered.filter(post =>
        selectedTags.every(selectedTag =>
          post.tags.some(tag => tag.toLowerCase() === selectedTag.toLowerCase())
        )
      )
    }

    // 排序
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'title':
          return a.title.localeCompare(b.title)
        case 'readTime':
          return a.readTime - b.readTime
        case 'date':
        default:
          return new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
      }
    })

    return filtered
  }, [posts, query, selectedTags, sortBy])

  // 热门标签（按文章数量排序）
  const popularTags = useMemo(() => {
    const tagCounts = tags.reduce((acc, tag) => {
      const count = posts.filter(post => 
        post.tags.some(postTag => postTag.toLowerCase() === tag.toLowerCase())
      ).length
      acc[tag] = count
      return acc
    }, {} as Record<string, number>)

    return Object.entries(tagCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 20)
      .map(([tag]) => tag)
  }, [posts, tags])

  // 切换标签选择
  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    )
  }

  // 清除所有过滤器
  const clearFilters = () => {
    setQuery('')
    setSelectedTags([])
    setSortBy('date')
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* 搜索头部 */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          搜索文章
        </h1>
        <p className="text-gray-600 dark:text-slate-400">
          找到你感兴趣的技术文章
        </p>
      </div>

      {/* 搜索框 */}
      <div className="relative mb-6">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="search"
          placeholder="搜索标题、内容或标签..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full pl-12 pr-4 py-3 bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
        />
        {query && (
          <button
            onClick={() => setQuery('')}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* 过滤器和排序 */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <button
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-slate-300 rounded-lg hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors"
        >
          <Filter className="w-4 h-4" />
          过滤器
          {selectedTags.length > 0 && (
            <span className="bg-primary-500 text-white px-2 py-0.5 rounded-full text-xs">
              {selectedTags.length}
            </span>
          )}
        </button>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as 'date' | 'title' | 'readTime')}
          className="px-4 py-2 bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-600 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        >
          <option value="date">按日期排序</option>
          <option value="title">按标题排序</option>
          <option value="readTime">按阅读时间排序</option>
        </select>

        {(query || selectedTags.length > 0) && (
          <button
            onClick={clearFilters}
            className="px-4 py-2 text-gray-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
          >
            清除过滤器
          </button>
        )}
      </div>

      {/* 过滤器面板 */}
      {isFilterOpen && (
        <div className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 p-6 mb-6">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
            按标签筛选
          </h3>
          <div className="flex flex-wrap gap-2">
            {popularTags.map(tag => (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-sm transition-colors ${
                  selectedTags.includes(tag)
                    ? 'bg-primary-500 text-white'
                    : 'bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-slate-300 hover:bg-gray-200 dark:hover:bg-slate-600'
                }`}
              >
                <Tag className="w-3 h-3" />
                {tag}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 搜索结果 */}
      <div className="mb-6">
        <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-slate-400">
          <span>
            找到 <span className="font-semibold text-gray-900 dark:text-white">{filteredPosts.length}</span> 篇文章
          </span>
          {selectedTags.length > 0 && (
            <div className="flex items-center gap-2">
              <span>标签:</span>
              <div className="flex gap-1">
                {selectedTags.map(tag => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 px-2 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded text-xs"
                  >
                    {tag}
                    <button
                      onClick={() => toggleTag(tag)}
                      className="hover:text-primary-900 dark:hover:text-primary-100"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 文章列表 */}
      {filteredPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map(post => (
            <ArticleCard key={post.slug} {...post} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            没有找到匹配的文章
          </h3>
          <p className="text-gray-600 dark:text-slate-400 mb-4">
            尝试调整搜索条件或清除过滤器
          </p>
          <button
            onClick={clearFilters}
            className="btn-primary"
          >
            清除所有过滤器
          </button>
        </div>
      )}
    </div>
  )
}