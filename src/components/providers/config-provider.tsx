'use client'

import { createContext, useContext } from 'react'

// 配置类型定义
export interface ConfigContextType {
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

const ConfigContext = createContext<ConfigContextType | null>(null)

interface ConfigProviderProps {
  children: React.ReactNode
  config: ConfigContextType
}

export function ConfigProvider({ children, config }: ConfigProviderProps) {
  return (
    <ConfigContext.Provider value={config}>
      {children}
    </ConfigContext.Provider>
  )
}

export function useConfig() {
  const context = useContext(ConfigContext)
  if (!context) {
    throw new Error('useConfig must be used within a ConfigProvider')
  }
  return context
}