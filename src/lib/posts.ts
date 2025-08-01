import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const postsDirectory = path.join(process.cwd(), 'content/posts')

export interface PostMetadata {
  title: string
  excerpt: string
  publishDate: string
  readTime: number
  tags: string[]
  slug: string
  featured?: boolean
  author?: string
  image?: string
}

export interface Post extends PostMetadata {
  content: string
}

export function getAllPosts(): PostMetadata[] {
  try {
    if (!fs.existsSync(postsDirectory)) {
      return []
    }
    
    const fileNames = fs.readdirSync(postsDirectory)
    const allPostsData = fileNames
      .filter(fileName => fileName.endsWith('.mdx'))
      .map((fileName) => {
        const slug = fileName.replace(/\.mdx$/, '')
        const fullPath = path.join(postsDirectory, fileName)
        const fileContents = fs.readFileSync(fullPath, 'utf8')
        const { data } = matter(fileContents)

        return {
          slug,
          title: data.title || 'Untitled',
          excerpt: data.excerpt || '',
          publishDate: data.publishDate || new Date().toISOString().split('T')[0],
          readTime: data.readTime || 5,
          tags: data.tags || [],
          featured: data.featured || false,
          author: data.author || 'TechBlog',
          image: data.image,
        } as PostMetadata
      })

    return allPostsData.sort((a, b) => {
      return new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
    })
  } catch (error) {
    console.error('Error reading posts:', error)
    return []
  }
}

export function getPostBySlug(slug: string): Post | null {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.mdx`)
    
    if (!fs.existsSync(fullPath)) {
      return null
    }
    
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)

    return {
      slug,
      title: data.title || 'Untitled',
      excerpt: data.excerpt || '',
      publishDate: data.publishDate || new Date().toISOString().split('T')[0],
      readTime: data.readTime || 5,
      tags: data.tags || [],
      featured: data.featured || false,
      author: data.author || 'TechBlog',
      image: data.image,
      content,
    }
  } catch (error) {
    console.error(`Error reading post ${slug}:`, error)
    return null
  }
}

export function getFeaturedPosts(): PostMetadata[] {
  const allPosts = getAllPosts()
  return allPosts.filter(post => post.featured)
}

export function getPostsByTag(tag: string): PostMetadata[] {
  const allPosts = getAllPosts()
  return allPosts.filter(post => 
    post.tags.some(postTag => 
      postTag.toLowerCase() === tag.toLowerCase()
    )
  )
}

export function getAllTags(): string[] {
  const allPosts = getAllPosts()
  const tags = new Set<string>()
  
  allPosts.forEach(post => {
    post.tags.forEach(tag => tags.add(tag))
  })
  
  return Array.from(tags).sort()
}

export function getRecentPosts(limit: number = 6): PostMetadata[] {
  const allPosts = getAllPosts()
  return allPosts.slice(0, limit)
}