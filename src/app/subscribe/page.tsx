'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Mail, Send, Check, AlertCircle } from 'lucide-react'

export default function SubscribePage() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email) {
      setStatus('error')
      setMessage('请输入邮箱地址')
      return
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus('error')
      setMessage('请输入有效的邮箱地址')
      return
    }

    setStatus('loading')
    
    // 模拟API调用 - 在实际项目中替换为真实的邮件订阅服务
    try {
      // 这里可以集成 Mailchimp, ConvertKit, EmailJS 等服务
      // 或者发送到自己的后端API
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // 成功状态
      setStatus('success')
      setMessage('订阅成功！我们会将最新的技术文章发送到您的邮箱。')
      setEmail('')
    } catch {
      setStatus('error')
      setMessage('订阅失败，请稍后重试。')
    }
  }

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-12">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            返回首页
          </Link>
          
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
            <Mail className="w-10 h-10" />
            邮件订阅
          </h1>
          <p className="text-xl text-gray-600 dark:text-slate-400">
            订阅我们的技术博客，获取最新的技术文章和见解
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* 订阅表单 */}
          <div>
            <div className="card p-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
                立即订阅
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">
                    邮箱地址
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-slate-800 text-gray-900 dark:text-white"
                      disabled={status === 'loading'}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status === 'loading' ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      订阅中...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      订阅更新
                    </>
                  )}
                </button>

                {/* 状态消息 */}
                {message && (
                  <div className={`flex items-center gap-2 p-4 rounded-lg ${
                    status === 'success' 
                      ? 'bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-300' 
                      : 'bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-300'
                  }`}>
                    {status === 'success' ? (
                      <Check className="w-5 h-5" />
                    ) : (
                      <AlertCircle className="w-5 h-5" />
                    )}
                    {message}
                  </div>
                )}
              </form>

              <div className="mt-8 pt-6 border-t border-gray-200 dark:border-slate-700">
                <p className="text-sm text-gray-600 dark:text-slate-400">
                  我们承诺：
                </p>
                <ul className="mt-2 space-y-1 text-sm text-gray-600 dark:text-slate-400">
                  <li>• 只发送高质量的技术内容</li>
                  <li>• 不会将您的邮箱分享给第三方</li>
                  <li>• 您可以随时取消订阅</li>
                  <li>• 大约每周发送 1-2 篇精选文章</li>
                </ul>
              </div>
            </div>
          </div>

          {/* 订阅优势 */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
                为什么要订阅？
              </h2>
              
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                      <Mail className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      第一时间获取更新
                    </h3>
                    <p className="text-gray-600 dark:text-slate-400">
                      新文章发布后立即通过邮件通知，不错过任何精彩内容。
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                      <Check className="w-6 h-6 text-green-600 dark:text-green-400" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      精选优质内容
                    </h3>
                    <p className="text-gray-600 dark:text-slate-400">
                      我们只分享经过精心筛选的高质量技术文章和深度见解。
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                      <Send className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      独家内容预览
                    </h3>
                    <p className="text-gray-600 dark:text-slate-400">
                      订阅用户可以获得文章摘要和独家技术见解。
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* 热门文章预览 */}
            <div className="card p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                最近热门文章
              </h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white text-sm">
                      React 18 新特性深度解析
                    </div>
                    <div className="text-xs text-gray-500 dark:text-slate-400">
                      3 天前
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white text-sm">
                      TypeScript 5.0 实战指南
                    </div>
                    <div className="text-xs text-gray-500 dark:text-slate-400">
                      1 周前
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white text-sm">
                      Next.js 性能优化最佳实践
                    </div>
                    <div className="text-xs text-gray-500 dark:text-slate-400">
                      2 周前
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}