'use client'

import { TableOfContents } from './table-of-contents'

interface TableOfContentsWrapperProps {
  content: string
}

export function TableOfContentsWrapper({ content }: TableOfContentsWrapperProps) {
  return <TableOfContents content={content} />
}