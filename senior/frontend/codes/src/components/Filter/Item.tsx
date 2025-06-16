import React from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui'

export interface IFilterItemProps {
  name: string
  label: string
  placeholder?: string
  type?: 'text' | 'number' | 'date'
  value?: string | number
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  className?: string
}

const Item = ({
  name,
  label,
  placeholder,
  type = 'text',
  value,
  onChange,
  className,
}: IFilterItemProps) => {
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
        onChange={onChange}
        className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  )
}

export default Item