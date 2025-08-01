'use client'

import { motion } from 'framer-motion'

interface Skill {
  name: string
  level: number // 1-5
  category: string
}

interface SkillMatrixProps {
  skills: Skill[]
}

export function SkillMatrix({ skills }: SkillMatrixProps) {
  const categories = [...new Set(skills.map(s => s.category))]

  return (
    <div className="space-y-8">
      {categories.map((category, categoryIndex) => (
        <motion.div
          key={category}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
          viewport={{ once: true }}
        >
          <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
            {category}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {skills
              .filter(s => s.category === category)
              .map((skill, skillIndex) => (
                <motion.div
                  key={skill.name}
                  className="flex items-center justify-between p-3 bg-gray-50 dark:bg-slate-800 rounded-lg"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ 
                    duration: 0.4, 
                    delay: categoryIndex * 0.1 + skillIndex * 0.05 
                  }}
                  viewport={{ once: true }}
                >
                  <span className="text-gray-700 dark:text-slate-300 font-medium">
                    {skill.name}
                  </span>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map(level => (
                      <motion.div
                        key={level}
                        className={`w-3 h-3 rounded-full ${
                          level <= skill.level
                            ? 'bg-primary-500'
                            : 'bg-gray-200 dark:bg-slate-600'
                        }`}
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        transition={{ 
                          duration: 0.2, 
                          delay: categoryIndex * 0.1 + skillIndex * 0.05 + level * 0.02
                        }}
                        viewport={{ once: true }}
                      />
                    ))}
                  </div>
                </motion.div>
              ))}
          </div>
        </motion.div>
      ))}
    </div>
  )
}