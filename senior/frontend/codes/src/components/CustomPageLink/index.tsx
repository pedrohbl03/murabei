import React from 'react'
import { PaginationLink, PaginationNext, PaginationPrevious } from '../ui/pagination';

export interface ICustomPageLinkProps {
  page: string | number;
  previous?: boolean;
  next?: boolean;
  isActive?: boolean;
  filterParams?: Record<string, string>;
  children?: React.ReactNode;
}

const CustomPageLink = ({
  page,
  isActive,
  previous,
  next,
  children,
  filterParams,
}: ICustomPageLinkProps) => {

  const queryParams = new URLSearchParams(filterParams).toString();
  const href = `?page=${page}${queryParams ? `&${queryParams}` : ''}`;

  if (next) {
    return (
      <PaginationNext
        href={href}
      />
    )
  }

  if (previous) {
    return (
      <PaginationPrevious
        href={href}
      />
    )
  }

  return (
    <PaginationLink
      href={href}
      isActive={isActive}
    >
      {children || page}
    </PaginationLink>
  )
}

export default CustomPageLink