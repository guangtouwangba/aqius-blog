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
    const configPath = path.join(process.cwd(), 'config.yaml')
    const fileContents = fs.readFileSync(configPath, 'utf8')
    const config = yaml.load(fileContents) as SiteConfig
    
    // 缓存配置以提高性能
    cachedConfig = config
    return config
  } catch (error) {
    console.error('Error reading config.yaml:', error)
    throw new Error('Failed to load configuration file')
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