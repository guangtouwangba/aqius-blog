'use client'

import { motion } from 'framer-motion'
import { Github, Twitter, Mail, Download, Code, Coffee, Heart, Linkedin } from 'lucide-react'
import { useConfig } from '@/components/providers/config-provider'

const socialIcons = {
  GitHub: Github,
  Twitter: Twitter,
  LinkedIn: Linkedin,
  Email: Mail,
}

export default function AboutPage() {
  const config = useConfig()
  
  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <motion.section
          className="text-center py-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="relative inline-block mb-8">
            <motion.div
              className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-primary-400 to-purple-600 p-1"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <div className="w-full h-full rounded-full bg-white dark:bg-slate-800 flex items-center justify-center">
                <div className="text-6xl">👨‍💻</div>
              </div>
            </motion.div>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            你好，我是 <span className="text-primary-600 dark:text-primary-400">{config.author.name}</span>
          </h1>
          
          <p className="text-xl text-gray-600 dark:text-slate-400 mb-8 max-w-3xl mx-auto leading-relaxed">
            {config.author.bio}
          </p>

          {/* 社交链接 */}
          <div className="flex justify-center gap-4 mb-8">
            {config.about.contact.social.map((social) => {
              const Icon = socialIcons[social.platform as keyof typeof socialIcons]
              return Icon ? (
                <motion.a
                  key={social.platform}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-lg bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon className="w-6 h-6" />
                </motion.a>
              ) : null
            })}
          </div>

          {/* 简历下载 */}
          {config.author.resume && (
            <motion.a
              href={config.author.resume}
              download
              className="btn-primary inline-flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Download className="w-5 h-5" />
              下载简历
            </motion.a>
          )}
        </motion.section>

        {/* 关于我 */}
        <section className="py-16 border-t border-gray-200 dark:border-slate-700">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
              {config.about.title}
            </h2>
            
            <div className="max-w-4xl mx-auto space-y-6 text-lg text-gray-700 dark:text-slate-300 leading-relaxed">
              <p>{config.about.bio}</p>

              <div className="flex items-center justify-center gap-4 pt-4">
                <Code className="w-6 h-6 text-primary-500" />
                <Coffee className="w-6 h-6 text-primary-500" />
                <Heart className="w-6 h-6 text-red-500" />
              </div>
            </div>
          </motion.div>
        </section>

        {/* 技能专长 */}
        <section className="py-16 border-t border-gray-200 dark:border-slate-700">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
              技能专长
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {config.about.skills.map((skillCategory, index) => (
                <motion.div
                  key={skillCategory.category}
                  className="card p-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    {skillCategory.category}
                  </h3>
                  <div className="space-y-2">
                    {skillCategory.items.map((skill) => (
                      <div
                        key={skill}
                        className="px-3 py-1 bg-gray-100 dark:bg-slate-800 rounded-full text-sm text-gray-700 dark:text-slate-300"
                      >
                        {skill}
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* 工作经历 */}
        <section className="py-16 border-t border-gray-200 dark:border-slate-700">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
              工作经历
            </h2>
            
            <div className="max-w-4xl mx-auto">
              {config.about.experience.map((exp, index) => (
                <motion.div
                  key={index}
                  className="relative pl-8 pb-8 last:pb-0"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-0 top-2 w-4 h-4 bg-primary-600 rounded-full border-4 border-white dark:border-slate-900"></div>
                  {/* Timeline line */}
                  {index !== config.about.experience.length - 1 && (
                    <div className="absolute left-2 top-6 w-0.5 h-full bg-gray-200 dark:bg-slate-700 -translate-x-0.5"></div>
                  )}
                  
                  <div className="card p-6">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                          {exp.title}
                        </h3>
                        <p className="text-primary-600 dark:text-primary-400 font-medium">
                          {exp.company}
                        </p>
                      </div>
                      <span className="text-sm text-gray-500 dark:text-slate-400 mt-1 sm:mt-0">
                        {exp.period}
                      </span>
                    </div>
                    <p className="text-gray-700 dark:text-slate-300">
                      {exp.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* 联系我 */}
        <section className="py-16 border-t border-gray-200 dark:border-slate-700">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
              {config.about.contact.title}
            </h2>
            <p className="text-lg text-gray-600 dark:text-slate-400 mb-8 max-w-2xl mx-auto">
              {config.about.contact.description}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={`mailto:${config.about.contact.email}`}
                className="btn-primary inline-flex items-center gap-2"
              >
                <Mail className="w-5 h-5" />
                发送邮件
              </a>
              {config.about.contact.social[0] && (
                <a
                  href={config.about.contact.social[0].url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary inline-flex items-center gap-2"
                >
                  <Github className="w-5 h-5" />
                  {config.about.contact.social[0].platform}
                </a>
              )}
            </div>
          </motion.div>
        </section>
      </div>
    </div>
  )
}