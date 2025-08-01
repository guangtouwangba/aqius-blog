'use client'

import { useState, useEffect } from 'react'
import { List } from 'lucide-react'

interface Heading {
  id: string
  text: string
  level: number
}

interface TableOfContentsProps {
  content: string
}

export function TableOfContents({ content }: TableOfContentsProps) {
  const [headings, setHeadings] = useState<Heading[]>([])
  const [activeId, setActiveId] = useState<string>('')
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // 提取标题
    const headingRegex = /^(#{1,6})\s+(.+)$/gm
    const extractedHeadings: Heading[] = []
    let match

    while ((match = headingRegex.exec(content)) !== null) {
      const level = match[1].length
      const text = match[2].trim()
      const id = text
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .trim()

      extractedHeadings.push({ id, text, level })
    }

    setHeadings(extractedHeadings)
  }, [content])

  useEffect(() => {
    if (headings.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      {
        rootMargin: '-100px 0px -60% 0px',
        threshold: 0
      }
    )

    // 观察所有标题元素
    headings.forEach(({ id }) => {
      const element = document.getElementById(id)
      if (element) {
        observer.observe(element)
      }
    })

    return () => observer.disconnect()
  }, [headings])

  if (headings.length === 0) return null

  return (
    <>
      {/* 移动端切换按钮 */}
      <button
        className="fixed bottom-6 right-6 lg:hidden bg-primary-600 text-white p-3 rounded-full shadow-lg z-40 hover:bg-primary-700 transition-colors"
        onClick={() => setIsVisible(!isVisible)}
        aria-label="切换目录"
      >
        <List className="w-5 h-5" />
      </button>

      {/* 移动端遮罩 */}
      {isVisible && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsVisible(false)}
        />
      )}

      {/* 目录内容 */}
      <nav
        className={`
          fixed lg:sticky lg:top-24 right-4 lg:right-0 w-64 lg:w-auto max-h-96 lg:max-h-[calc(100vh-8rem)]
          bg-white dark:bg-slate-800 lg:bg-transparent lg:dark:bg-transparent
          rounded-lg lg:rounded-none shadow-lg lg:shadow-none border lg:border-none border-gray-200 dark:border-slate-700
          p-4 lg:p-0 overflow-y-auto z-50 transition-transform duration-200
          ${isVisible ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'}
        `}
      >
        <div className="lg:bg-white lg:dark:bg-slate-800 lg:rounded-lg lg:shadow-lg lg:p-4 lg:border lg:border-gray-200 lg:dark:border-slate-700">
          <h4 className="font-semibold text-sm text-gray-900 dark:text-white mb-3 flex items-center gap-2">
            <List className="w-4 h-4" />
            目录
          </h4>
          
          <ul className="space-y-1 text-sm">
            {headings.map(({ id, text, level }) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  className={`
                    block py-1 px-2 rounded transition-colors cursor-pointer
                    ${activeId === id
                      ? 'bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300'
                      : 'text-gray-600 hover:text-gray-900 dark:text-slate-400 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-slate-700'
                    }
                  `}
                  style={{ paddingLeft: `${(level - 1) * 0.75 + 0.5}rem` }}
                  onClick={() => {
                    setIsVisible(false)
                    // 平滑滚动到目标
                    const target = document.getElementById(id)
                    if (target) {
                      target.scrollIntoView({ behavior: 'smooth', block: 'start' })
                    }
                  }}
                >
                  {text}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </>
  )
}