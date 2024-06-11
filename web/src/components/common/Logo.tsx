import { cn } from '@/lib/utils'

export default function Logo({ className }: { className?: string }) {
  return (
    <div className="flex gap-4">
      <p className={cn('font-medium', className)}>
        Synesthesia<span className="font-extralight">&copy;</span>
      </p>
    </div>
  )
}
