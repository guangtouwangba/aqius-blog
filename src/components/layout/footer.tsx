import Link from 'next/link'
import { Github, Twitter, Mail, Rss } from 'lucide-react'

const footerLinks = [
  {
    title: '导航',
    links: [
      { name: '首页', href: '/' },
      { name: '文章', href: '/posts' },
      { name: '分类', href: '/categories' },
      { name: '关于', href: '/about' },
    ],
  },
  {
    title: '订阅',
    links: [
      { name: 'RSS 订阅', href: '/rss.xml', icon: Rss },
      { name: '邮件订阅', href: '/subscribe', icon: Mail },
    ],
  },
]

const socialLinks = [
  { name: 'GitHub', href: '#', icon: Github },
  { name: 'Twitter', href: '#', icon: Twitter },
  { name: 'Email', href: 'mailto:hello@example.com', icon: Mail },
]

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-50 dark:bg-slate-800 border-t border-gray-200 dark:border-slate-700">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link 
              href="/" 
              className="text-2xl font-bold text-gray-900 dark:text-white hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
            >
              TechBlog
            </Link>
            <p className="mt-4 text-gray-600 dark:text-slate-400 max-w-md">
              专注于前端技术、后端开发和软件工程的技术博客。分享实用的开发经验和技术洞察。
            </p>
            
            {/* Social Links */}
            <div className="mt-6 flex space-x-4">
              {socialLinks.map((item) => {
                const Icon = item.icon
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    className="p-2 rounded-lg text-gray-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={item.name}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                )
              })}
            </div>
          </div>

          {/* Footer Links */}
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link) => {
                  const Icon = 'icon' in link ? link.icon : null
                  return (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="flex items-center text-gray-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                      >
                        {Icon && <Icon className="w-4 h-4 mr-2" />}
                        {link.name}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-slate-700">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-600 dark:text-slate-400">
              © {currentYear} TechBlog. All rights reserved.
            </p>
            <div className="mt-4 md:mt-0 flex space-x-6">
              <Link
                href="/privacy"
                className="text-sm text-gray-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              >
                隐私政策
              </Link>
              <Link
                href="/terms"
                className="text-sm text-gray-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              >
                使用条款
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}