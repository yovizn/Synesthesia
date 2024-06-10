import { cn } from '@/lib/utils'
import { HTMLAttributes } from 'react'

export default function H3({ className, children, ...props }: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      {...props}
      className={cn('scroll-m-20 text-2xl font-semibold tracking-tight', className)}
    >
      {children}
    </h3>
  )
}
