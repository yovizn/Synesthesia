import { cn } from '@/lib/utils'
import ReactMarkdown from 'react-markdown'

interface MarkdownProps {
  children: string
  className?: string
}

export function Markdown({ children, className }: MarkdownProps) {
  return (
    <ReactMarkdown
      className={cn('space-y-2.5', className)}
      components={{
        ul: (props) => (
          <ul
            {...props}
            className="list-inside list-disc"
          />
        ),
        a: (props) => (
          <a
            {...props}
            target="_blank"
          />
        ),
        p: (props) => (
          <p
            {...props}
            className="leading-relaxed tracking-normal"
          />
        ),
      }}
    >
      {children}
    </ReactMarkdown>
  )
}
