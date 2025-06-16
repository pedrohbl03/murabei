import React from 'react'
import { cn } from '@/lib/utils'

export interface IFilterRootProps {
  children: React.ReactNode
  className?: string
}

const Root = ({
  children,
  className,
}: IFilterRootProps) => {
  return (
    <div className={cn(
      'p-4 rounded-lg shadow-sm w-full border border-gray-200 flex flex-col',
      className,
    )}>
      <div className="mb-4">
        <h2 className='text-xl font-bold'>Filtro de livros</h2>
      </div>
      <div className='flex flex-wrap gap-2'>
        {children}
      </div>
    </div>
  )
}

export default Root