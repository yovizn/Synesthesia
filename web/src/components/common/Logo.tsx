import { cn } from '@/lib/utils'

export default function Logo({ className }: { className?: string }) {
  return (
    <p className={cn('font-medium', className)}>
      Synesthesia<span className="font-extralight">&copy;</span>
    </p>
  )
}
