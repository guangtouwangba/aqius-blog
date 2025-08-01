import React from 'react'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { Code, ExternalLink } from 'lucide-react'

// 自定义代码块组件
function CodeBlock({ children, className, ...props }: any) {
  const language = className?.replace('language-', '') || 'text'
  
  return (
    <div className="relative group">
      <div className="flex items-center justify-between bg-gray-800 text-gray-200 px-4 py-2 rounded-t-lg text-sm">
        <span className="flex items-center gap-2">
          <Code className="w-4 h-4" />
          {language}
        </span>
      </div>
      <pre
        className="bg-gray-900 text-gray-100 p-4 rounded-b-lg overflow-x-auto text-sm leading-relaxed"
        {...props}
      >
        <code className={className}>
          {children}
        </code>
      </pre>
    </div>
  )
}

// 自定义链接组件
function CustomLink({ href, children, ...props }: any) {
  const isExternal = href?.startsWith('http')
  
  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors"
        {...props}
      >
        {children}
        <ExternalLink className="w-3 h-3" />
      </a>
    )
  }
  
  return (
    <a
      href={href}
      className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors"
      {...props}
    >
      {children}
    </a>
  )
}

// 自定义引用组件
function Blockquote({ children, ...props }: any) {
  return (
    <blockquote
      className="border-l-4 border-primary-500 pl-6 py-2 my-6 bg-primary-50 dark:bg-primary-900/20 rounded-r-lg"
      {...props}
    >
      <div className="text-gray-700 dark:text-gray-300 italic">
        {children}
      </div>
    </blockquote>
  )
}

// 自定义表格组件
function Table({ children, ...props }: any) {
  return (
    <div className="overflow-x-auto my-6">
      <table
        className="min-w-full border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden"
        {...props}
      >
        {children}
      </table>
    </div>
  )
}

function TableHead({ children, ...props }: any) {
  return (
    <thead className="bg-gray-50 dark:bg-gray-800" {...props}>
      {children}
    </thead>
  )
}

function TableRow({ children, ...props }: any) {
  return (
    <tr className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors" {...props}>
      {children}
    </tr>
  )
}

function TableCell({ children, ...props }: any) {
  return (
    <td className="px-4 py-3 text-sm" {...props}>
      {children}
    </td>
  )
}

function TableHeaderCell({ children, ...props }: any) {
  return (
    <th className="px-4 py-3 text-left text-sm font-medium text-gray-900 dark:text-gray-100" {...props}>
      {children}
    </th>
  )
}

// MDX 组件映射
const components = {
  pre: ({ children, ...props }: any) => {
    // 提取代码内容和语言
    const child = React.Children.only(children)
    if (React.isValidElement(child) && (child.props as any)?.className) {
      return <CodeBlock {...(child.props as any)} />
    }
    return <pre {...props}>{children}</pre>
  },
  code: ({ className, children, ...props }: any) => {
    // 内联代码
    if (!className) {
      return (
        <code
          className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 px-1.5 py-0.5 rounded text-sm font-mono"
          {...props}
        >
          {children}
        </code>
      )
    }
    // 代码块由 pre 组件处理
    return <code className={className} {...props}>{children}</code>
  },
  a: CustomLink,
  blockquote: Blockquote,
  table: Table,
  thead: TableHead,
  tr: TableRow,
  td: TableCell,
  th: TableHeaderCell,
  h1: ({ children, ...props }: any) => {
    const id = typeof children === 'string' 
      ? children.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-').trim()
      : ''
    return (
      <h1 id={id} className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6 mt-8 first:mt-0 scroll-mt-24" {...props}>
        {children}
      </h1>
    )
  },
  h2: ({ children, ...props }: any) => {
    const id = typeof children === 'string' 
      ? children.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-').trim()
      : ''
    return (
      <h2 id={id} className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white mb-5 mt-8 scroll-mt-24" {...props}>
        {children}
      </h2>
    )
  },
  h3: ({ children, ...props }: any) => {
    const id = typeof children === 'string' 
      ? children.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-').trim()
      : ''
    return (
      <h3 id={id} className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-white mb-4 mt-6 scroll-mt-24" {...props}>
        {children}
      </h3>
    )
  },
  p: ({ children, ...props }: any) => (
    <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6" {...props}>
      {children}
    </p>
  ),
  ul: ({ children, ...props }: any) => (
    <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 mb-6 space-y-2" {...props}>
      {children}
    </ul>
  ),
  ol: ({ children, ...props }: any) => (
    <ol className="list-decimal list-inside text-gray-700 dark:text-gray-300 mb-6 space-y-2" {...props}>
      {children}
    </ol>
  ),
  li: ({ children, ...props }: any) => (
    <li className="mb-1" {...props}>
      {children}
    </li>
  ),
}

interface MDXContentProps {
  source: string
}

export function MDXContent({ source }: MDXContentProps) {
  return (
    <div className="prose prose-lg max-w-none dark:prose-invert">
      <MDXRemote source={source} components={components} />
    </div>
  )
}