import { Skeleton } from '@/components/ui/skeleton'

export default function SkeletonProfile() {
  return (
    <div className="flex items-center gap-6">
      <div className="flex gap-4">
        <Skeleton className="block size-9 rounded-[50%]" />
        <div className="flex flex-col gap-2 md:w-[119px]">
          <Skeleton className="block w-full h-4" />
          <Skeleton className="block w-full h-4" />
        </div>
      </div>
    </div>
  )
}
