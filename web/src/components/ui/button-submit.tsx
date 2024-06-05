import { LoaderCircle } from 'lucide-react'
import { Button } from './button'
import { cn } from '@/lib/utils'
import { ButtonHTMLAttributes } from 'react'

type ButtonSubmitType = {
  label: string
  isSubmitting: boolean
  className?: string
  type?: ButtonHTMLAttributes<HTMLButtonElement>['type']
}

export default function ButtonSubmit({ isSubmitting, className, label, type = 'submit' }: ButtonSubmitType) {
  return (
    <Button
      type={type}
      className={(cn('"flex justify-center" w-full items-center'), className)}
      disabled={isSubmitting}
    >
      {isSubmitting ? (
        <span className="flex items-center justify-center gap-2">
          <LoaderCircle className="block size-4 motion-safe:animate-spin" />
          <span className="block">Loading</span>
        </span>
      ) : (
        <span>{label}</span>
      )}
    </Button>
  )
}
