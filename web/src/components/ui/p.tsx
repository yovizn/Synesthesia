import { cn } from '@/lib/utils'
import { HTMLAttributes } from 'react'

export default function Paragraph({ className, children, ...props }: HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      {...props}
      className={cn('leading-7 [&:not(:first-child)]:mt-6', className)}
    >
      {children}
    </p>
  )
}
