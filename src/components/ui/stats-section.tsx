'use client'

import { motion } from 'framer-motion'
import { useConfig } from '@/components/providers/config-provider'

interface StatsItem {
  label: string
  value: string
  description: string
}

interface StatsSectionProps {
  stats?: StatsItem[]
}

export function StatsSection({ stats }: StatsSectionProps) {
  const config = useConfig()
  
  // 如果传入了stats则使用传入的，否则使用配置中的（如果存在）
  const displayStats = stats || config.home.stats.items || []
  
  return (
    <section className="py-16 bg-gray-50 dark:bg-slate-800/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            {config.home.stats.title}
          </h2>
        </motion.div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayStats.map((item, index) => {
            return (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card p-6 text-center hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <div className="w-6 h-6 text-primary-600 dark:text-primary-400 text-2xl">
                    {index === 0 ? '📝' : index === 1 ? '💻' : index === 2 ? '🔧' : '📊'}
                  </div>
                </div>
                
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  {item.value}
                </div>
                
                <div className="text-sm text-gray-600 dark:text-slate-400 mb-3">
                  {item.label}
                </div>
                
                <div className="text-xs text-gray-500 dark:text-slate-500">
                  {item.description}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}