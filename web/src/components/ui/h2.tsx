import { cn } from '@/lib/utils'
import { HTMLAttributes } from 'react'

export default function H2({ className, children, ...props }: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h2
      {...props}
      className={cn('scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0', className)}
    >
      {children}
    </h2>
  )
}
