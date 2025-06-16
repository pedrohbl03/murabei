'use client'

import React, { useEffect } from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui'
import { useSearchParams } from 'next/navigation'
import { useDebounce } from '@/hooks/useDebounce'
import { useRouter } from 'next/navigation'

export interface IFilterItemProps {
  name: string
  label: string
  placeholder?: string
  type?: 'text' | 'number' | 'date'
  defaultValue?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  className?: string
}

const Item = ({
  name,
  label,
  placeholder,
  type = 'text',
}: IFilterItemProps) => {
  const searchParams = useSearchParams()
  const router = useRouter()

  const paramValue = searchParams.get(name) || ''
  const [value, setValue] = React.useState(paramValue)
  const debouncedValue = useDebounce(value, 400)

  // Sync input value if URL changes (like when pagination updates)
  useEffect(() => {
    setValue(paramValue)
  }, [paramValue])

  useEffect(() => {
    const params = new URLSearchParams(searchParams)

    if (debouncedValue) {
      params.set(name, debouncedValue)
    } else {
      params.delete(name)
    }

    // Reset page when filter changes
    if (params.get('page') && debouncedValue !== paramValue) {
      params.set('page', '1')
    }

    router.replace(`?${params.toString()}`)
  }, [debouncedValue, name])

  return (
    <div className="flex flex-col w-full space-y-2">
      <Label htmlFor={name} className="text-sm font-medium mb-1">
        {label}
      </Label>
      <Input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  )
}

export default Item