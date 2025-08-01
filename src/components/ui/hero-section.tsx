'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Code, Sparkles } from 'lucide-react'
import { motion } from 'framer-motion'
import { useConfig } from '@/components/providers/config-provider'

export function HeroSection() {
  const config = useConfig()
  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900" />
      
      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-primary-200 dark:bg-primary-800 rounded-full opacity-20 animate-pulse" />
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-purple-200 dark:bg-purple-800 rounded-full opacity-20 animate-pulse delay-1000" />
      
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-2 mb-6">
              <Sparkles className="w-6 h-6 text-primary-600 dark:text-primary-400" />
              <span className="text-sm font-medium text-primary-600 dark:text-primary-400 uppercase tracking-wider">
                {config.home.hero.subtitle}
              </span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 text-balance">
              {config.home.hero.title}
            </h1>
            
            <p className="text-xl text-gray-600 dark:text-slate-300 mb-8 text-balance">
              {config.home.hero.description}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                href={config.home.hero.ctaLink}
                className="btn-primary inline-flex items-center gap-2 text-center justify-center"
              >
                <Code className="w-5 h-5" />
                {config.home.hero.ctaText}
                <ArrowRight className="w-4 h-4" />
              </Link>
              
              <Link 
                href="/about"
                className="btn-secondary inline-flex items-center gap-2 text-center justify-center"
              >
                了解更多
              </Link>
            </div>
          </motion.div>
          
          {/* Right Content - Avatar/Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex justify-center lg:justify-end"
          >
            <div className="relative">
              <div className="w-80 h-80 rounded-full bg-gradient-to-br from-primary-400 to-purple-600 p-1">
                <div className="w-full h-full rounded-full bg-white dark:bg-slate-800 flex items-center justify-center">
                  <div className="text-8xl">👨‍💻</div>
                </div>
              </div>
              
              {/* Floating Elements */}
              <motion.div
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-4 -right-4 bg-white dark:bg-slate-800 rounded-lg shadow-lg p-3"
              >
                <Code className="w-6 h-6 text-primary-600 dark:text-primary-400" />
              </motion.div>
              
              <motion.div
                animate={{ y: [10, -10, 10] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -bottom-4 -left-4 bg-white dark:bg-slate-800 rounded-lg shadow-lg p-3"
              >
                <Sparkles className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}