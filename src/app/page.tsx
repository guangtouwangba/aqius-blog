import Link from 'next/link'
import { HeroSection } from '@/components/ui/hero-section'
import { ArticleCard } from '@/components/ui/article-card'
import { StatsSection } from '@/components/ui/stats-section'
import { ArrowRight, Star } from 'lucide-react'
import { getAllPosts, getFeaturedPosts, getAllTags } from '@/lib/posts'
import { getHomeConfig } from '@/lib/config'
import { getFormattedStats } from '@/lib/stats'

export default function Home() {
  const homeConfig = getHomeConfig()
  const allPosts = getAllPosts()
  const featuredPosts = getFeaturedPosts()
  const recentPosts = allPosts.slice(0, homeConfig.recentSection.showCount)
  const popularTags = getAllTags().slice(0, 10)
  const calculatedStats = getFormattedStats()
  return (
    <div>
      {/* Hero Section */}
      <HeroSection />
      
      {/* Featured Articles */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 mb-8">
            <Star className="w-6 h-6 text-primary-600 dark:text-primary-400" />
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              {homeConfig.featuredSection.title}
            </h2>
          </div>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            {homeConfig.featuredSection.description}
          </p>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {featuredPosts.map((post) => (
              <ArticleCard key={post.slug} {...post} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Stats Section */}
      <StatsSection stats={calculatedStats} />
      
      {/* Recent Articles */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                {homeConfig.recentSection.title}
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                {homeConfig.recentSection.description}
              </p>
            </div>
            <Link 
              href="/posts"
              className="inline-flex items-center gap-2 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium transition-colors"
            >
              查看全部
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentPosts.map((post) => (
              <ArticleCard key={post.slug} {...post} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Popular Tags */}
      <section className="py-16 bg-gray-50 dark:bg-slate-800/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            热门标签
          </h2>
          
          <div className="flex flex-wrap justify-center gap-3">
            {popularTags.map((tag) => (
              <Link
                key={tag}
                href={`/tags/${encodeURIComponent(tag)}`}
                className="px-4 py-2 bg-white dark:bg-slate-800 text-gray-700 dark:text-slate-300 rounded-full border border-gray-200 dark:border-slate-700 hover:border-primary-500 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              >
                #{tag}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
