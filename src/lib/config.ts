import fs from 'fs'
import path from 'path'
import yaml from 'js-yaml'

// 配置文件类型定义
export interface SiteConfig {
  site: {
    name: string
    title: string
    description: string
    url: string
    ogImage: string
    language: string
    timezone: string
  }
  author: {
    name: string
    email: string
    avatar: string
    bio: string
    location: string
    website: string
    resume?: string
    social: {
      github?: string
      twitter?: string
      linkedin?: string
      email?: string
    }
  }
  navigation: Array<{
    name: string
    href: string
    weight: number
  }>
  home: {
    hero: {
      title: string
      subtitle: string
      description: string
      ctaText: string
      ctaLink: string
      backgroundImage?: string
    }
    stats: {
      title: string
      items?: Array<{
        label: string
        value: string
        description: string
      }>
    }
    featuredSection: {
      title: string
      description: string
      showCount: number
    }
    recentSection: {
      title: string
      description: string
      showCount: number
    }
  }
  about: {
    title: string
    description: string
    bio: string
    skills: Array<{
      category: string
      items: string[]
    }>
    experience: Array<{
      title: string
      company: string
      period: string
      description: string
    }>
    education?: Array<{
      degree: string
      school: string
      period: string
    }>
    contact: {
      title: string
      description: string
      email: string
      social: Array<{
        platform: string
        url: string
        handle: string
      }>
    }
  }
  footer: {
    copyright: string
    links: Array<{
      title: string
      items: Array<{
        name: string
        href: string
      }>
    }>
  }
  seo: {
    keywords: string[]
    googleAnalytics?: string
    baiduAnalytics?: string
  }
  features: {
    darkMode: boolean
    search: boolean
    comments: boolean
    rss: boolean
    sitemap: boolean
  }
}

let cachedConfig: SiteConfig | null = null

/**
 * 读取并解析YAML配置文件
 */
export function getConfig(): SiteConfig {
  if (cachedConfig) {
    return cachedConfig
  }

  try {
    // 在生产环境中，优先使用构建时生成的配置
    if (process.env.NODE_ENV === 'production') {
      try {
        const { buildTimeConfig } = require('./generated-config')
        cachedConfig = buildTimeConfig
        console.log('Configuration loaded from build-time generated config')
        return cachedConfig
      } catch (error) {
        console.warn('Build-time config not found, falling back to runtime loading')
      }
    }

    // 开发环境或构建时配置不可用时，尝试读取YAML文件
    const possiblePaths = [
      path.join(process.cwd(), 'config.yaml'),
      path.join(process.cwd(), '..', 'config.yaml'),
      path.join(__dirname, '..', '..', 'config.yaml'),
      path.join(__dirname, '..', '..', '..', 'config.yaml')
    ]

    let configPath = ''
    let fileContents = ''

    // 尝试找到配置文件
    for (const tryPath of possiblePaths) {
      try {
        if (fs.existsSync(tryPath)) {
          configPath = tryPath
          fileContents = fs.readFileSync(tryPath, 'utf8')
          break
        }
      } catch (err) {
        // 继续尝试下一个路径
        continue
      }
    }

    if (!fileContents) {
      throw new Error('config.yaml not found in any expected locations')
    }

    const config = yaml.load(fileContents) as SiteConfig
    
    // 验证配置的基本结构
    if (!config.site || !config.author || !config.navigation) {
      throw new Error('Invalid configuration structure')
    }
    
    // 缓存配置以提高性能
    cachedConfig = config
    console.log(`Configuration loaded from: ${configPath}`)
    return config
  } catch (error) {
    console.error('Error reading config.yaml:', error)
    
    // 最后的fallback：使用硬编码的默认配置
    console.warn('Using fallback configuration')
    cachedConfig = getFallbackConfig()
    return cachedConfig
  }
}

/**
 * 提供默认配置作为fallback
 */
function getFallbackConfig(): SiteConfig {
  return {
    site: {
      name: "Tech Blog",
      title: "现代前端技术博客",
      description: "专注于前端技术、Web开发和编程实践的技术博客",
      url: process.env.NEXT_PUBLIC_SITE_URL || "https://your-blog.com",
      ogImage: "/og-image.jpg",
      language: "zh-CN",
      timezone: "Asia/Shanghai"
    },
    author: {
      name: "Developer",
      email: "developer@example.com",
      avatar: "/avatar.jpg",
      bio: "后端开发，专注于AI应用，分享个人最新AI观点",
      location: "中国",
      website: process.env.NEXT_PUBLIC_SITE_URL || "https://your-blog.com",
      resume: "/resume.pdf",
      social: {
        github: "https://github.com/yourusername",
        twitter: "https://twitter.com/yourusername",
        linkedin: "https://linkedin.com/in/yourusername",
        email: "developer@example.com"
      }
    },
    navigation: [
      { name: "首页", href: "/", weight: 1 },
      { name: "文章", href: "/posts", weight: 2 },
      { name: "标签", href: "/tags", weight: 3 },
      { name: "搜索", href: "/search", weight: 4 },
      { name: "关于", href: "/about", weight: 5 }
    ],
    home: {
      hero: {
        title: "现代前端技术博客",
        subtitle: "探索前沿技术，分享开发经验",
        description: "后端开发，专注于AI应用，分享个人最新AI观点",
        ctaText: "开始阅读",
        ctaLink: "/posts"
      },
      stats: {
        title: "博客数据"
      },
      featuredSection: {
        title: "精选文章",
        description: "最受欢迎和最具价值的技术文章",
        showCount: 3
      },
      recentSection: {
        title: "最新文章",
        description: "最近更新的技术内容",
        showCount: 6
      }
    },
    about: {
      title: "关于我",
      description: "了解更多关于这位后端开发者的信息",
      bio: "后端开发，专注于AI应用，分享个人最新AI观点",
      skills: [
        {
          category: "前端技术",
          items: ["React", "Vue.js", "TypeScript", "Next.js", "Tailwind CSS", "Vite"]
        },
        {
          category: "后端技术", 
          items: ["Node.js", "Python", "Express", "FastAPI", "PostgreSQL", "MongoDB"]
        }
      ],
      experience: [
        {
          title: "高级前端工程师",
          company: "科技公司",
          period: "2022 - 至今",
          description: "负责大型Web应用的前端架构设计和开发"
        }
      ],
      contact: {
        title: "联系方式",
        description: "欢迎与我交流技术问题或合作机会",
        email: "developer@example.com",
        social: [
          { platform: "GitHub", url: "https://github.com/yourusername", handle: "@yourusername" }
        ]
      }
    },
    footer: {
      copyright: "© 2024 Tech Blog. All rights reserved.",
      links: [
        {
          title: "导航",
          items: [
            { name: "首页", href: "/" },
            { name: "文章", href: "/posts" },
            { name: "标签", href: "/tags" },
            { name: "关于", href: "/about" }
          ]
        }
      ]
    },
    seo: {
      keywords: ["前端开发", "JavaScript", "TypeScript", "React", "技术博客"]
    },
    features: {
      darkMode: true,
      search: true,
      comments: false,
      rss: true,
      sitemap: true
    }
  }
}

/**
 * 获取站点基本信息
 */
export function getSiteConfig() {
  const config = getConfig()
  return config.site
}

/**
 * 获取作者信息
 */
export function getAuthorConfig() {
  const config = getConfig()
  return config.author
}

/**
 * 获取导航配置
 */
export function getNavigationConfig() {
  const config = getConfig()
  return config.navigation.sort((a, b) => a.weight - b.weight)
}

/**
 * 获取首页配置
 */
export function getHomeConfig() {
  const config = getConfig()
  return config.home
}

/**
 * 获取关于页面配置
 */
export function getAboutConfig() {
  const config = getConfig()
  return config.about
}

/**
 * 获取页脚配置
 */
export function getFooterConfig() {
  const config = getConfig()
  return config.footer
}

/**
 * 获取SEO配置
 */
export function getSEOConfig() {
  const config = getConfig()
  return config.seo
}

/**
 * 获取功能开关配置
 */
export function getFeaturesConfig() {
  const config = getConfig()
  return config.features
}

/**
 * 清除配置缓存（用于开发环境热更新）
 */
export function clearConfigCache() {
  cachedConfig = null
}