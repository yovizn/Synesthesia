import { LoaderCircle } from 'lucide-react'
import { Button } from './button'

type ButtonSubmitType = {
  label: string
  isSubmitting: boolean
}

export default function ButtonSubmit({ isSubmitting, label }: ButtonSubmitType) {
  return (
    <Button
      type="submit"
      className="flex w-full items-center justify-center"
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
