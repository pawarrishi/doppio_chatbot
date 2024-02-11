import React from 'react'
import { Skeleton } from '../ui/skeleton'

const SkeletonLoader = () => {
  return (
    <div className="flex items-center space-x-2 my-3">
      <Skeleton className="w-[26px] h-[25px] rounded-full flex items-center justify-center self-start" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[200px]" />
        <Skeleton className="h-4 w-[150px]" />
      </div>
    </div>
  )
}

export default SkeletonLoader
