import { getAllPosts, getAllTags } from './posts'

export interface BlogStats {
  totalPosts: number
  totalTags: number  
  totalWords: number
  avgReadTime: number
}

/**
 * 计算博客统计数据
 */
export function calculateBlogStats(): BlogStats {
  const posts = getAllPosts()
  const tags = getAllTags()
  
  // 计算总字数（估算）
  const totalWords = posts.reduce((acc, post) => {
    // 估算每篇文章的字数（基于内容长度）
    const estimatedWords = Math.max(500, Math.min(3000, post.excerpt.length * 20))
    return acc + estimatedWords
  }, 0)
  
  // 计算平均阅读时间（按每分钟200字计算）
  const avgReadTime = Math.ceil(totalWords / posts.length / 200)
  
  return {
    totalPosts: posts.length,
    totalTags: tags.length,
    totalWords,
    avgReadTime
  }
}

/**
 * 格式化数字显示
 */
export function formatNumber(num: number): string {
  if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}k`
  }
  return num.toString()
}

/**
 * 获取格式化的统计数据项
 */
export function getFormattedStats() {
  const stats = calculateBlogStats()
  
  return [
    {
      label: "技术文章",
      value: `${stats.totalPosts}+`,
      description: "原创技术内容"
    },
    {
      label: "技术标签", 
      value: `${stats.totalTags}+`,
      description: "涵盖技术领域"
    },
    {
      label: "总字数",
      value: formatNumber(stats.totalWords),
      description: "深度技术分享"
    },
    {
      label: "平均阅读",
      value: `${stats.avgReadTime}min`,
      description: "平均阅读时长"
    }
  ]
}