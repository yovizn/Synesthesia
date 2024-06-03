import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'

export default function SkeletonProfile() {
  return (
    <Button
      className="flex space-x-4 py-7"
      variant={'ghost'}
    >
      <div className="md:w-[119px] space-y-1.5">
        <Skeleton className="block h-3 w-full" />
        <Skeleton className="block h-3 w-full" />
      </div>
      <Skeleton className="size-[50px] rounded-[50%]" />
    </Button>
  )
}
