import { cn } from '@/lib/utils'
import { HTMLAttributes } from 'react'

export default function H1({ className, children, ...props }: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h1
      {...props}
      className={cn('scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl', className)}
    >
      {children}
    </h1>
  )
}
