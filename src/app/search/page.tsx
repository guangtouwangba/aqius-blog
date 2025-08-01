import { Metadata } from 'next'
import { SearchInterface } from '@/components/ui/search-interface'
import { getAllPosts, getAllTags } from '@/lib/posts'

export const metadata: Metadata = {
  title: '搜索文章',
  description: '搜索和筛选技术博客文章',
}

export default function SearchPage() {
  const posts = getAllPosts()
  const tags = getAllTags()

  return <SearchInterface posts={posts} tags={tags} />
}