'use client'

import { cn } from '@/lib/utils'
import { Home } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface ILinkSideBar {
  title: string
  href: string
  className: string
  children: React.ReactNode
}

export default function LinkSideBar({ className, href, children, title }: ILinkSideBar) {
  const path = usePathname()
  return (
    <li className={cn('rounded-md p-2.5 md:p-0', path == href ? 'max-md:bg-muted-foreground/20' : '')}>
      <Link
        title={title}
        href={href}
        className={className}
      >
        <span className="hidden md:block">{title}</span>
        {children}
      </Link>
    </li>
  )
}
