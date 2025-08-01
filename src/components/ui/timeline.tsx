'use client'

import { motion } from 'framer-motion'
import { Calendar, MapPin, Building } from 'lucide-react'

interface TimelineItem {
  title: string
  company: string
  location: string
  period: string
  description: string
  achievements?: string[]
}

interface TimelineProps {
  items: TimelineItem[]
}

export function Timeline({ items }: TimelineProps) {
  return (
    <div className="relative">
      {/* 时间线 */}
      <div className="absolute left-4 md:left-8 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-slate-700" />

      <div className="space-y-8">
        {items.map((item, index) => (
          <motion.div
            key={index}
            className="relative flex items-start gap-6"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            {/* 时间点 */}
            <div className="relative flex-shrink-0">
              <motion.div
                className="w-8 h-8 md:w-12 md:h-12 bg-primary-500 rounded-full flex items-center justify-center z-10"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.1 + 0.2 }}
                viewport={{ once: true }}
              >
                <Building className="w-4 h-4 md:w-6 md:h-6 text-white" />
              </motion.div>
            </div>

            {/* 内容卡片 */}
            <motion.div
              className="flex-1 bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-gray-200 dark:border-slate-700 p-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
              viewport={{ once: true }}
            >
              {/* 头部信息 */}
              <div className="mb-4">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {item.title}
                </h3>
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-gray-600 dark:text-slate-400">
                  <div className="flex items-center gap-1">
                    <Building className="w-4 h-4" />
                    <span className="font-medium">{item.company}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    <span>{item.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{item.period}</span>
                  </div>
                </div>
              </div>

              {/* 描述 */}
              <p className="text-gray-700 dark:text-slate-300 mb-4 leading-relaxed">
                {item.description}
              </p>

              {/* 成就列表 */}
              {item.achievements && item.achievements.length > 0 && (
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                    主要成就:
                  </h4>
                  <ul className="space-y-1">
                    {item.achievements.map((achievement, achievementIndex) => (
                      <motion.li
                        key={achievementIndex}
                        className="flex items-start gap-2 text-sm text-gray-600 dark:text-slate-400"
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ 
                          duration: 0.3, 
                          delay: index * 0.1 + 0.4 + achievementIndex * 0.05 
                        }}
                        viewport={{ once: true }}
                      >
                        <div className="w-1.5 h-1.5 bg-primary-500 rounded-full mt-2 flex-shrink-0" />
                        <span>{achievement}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              )}
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}