import React from 'react'
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '../ui/pagination';

export interface IBookTablePaginationProps {
  currentPage: number;
  totalPages: number;
}

export const BookTablePagination = ({
  currentPage,
  totalPages,
}: IBookTablePaginationProps) => {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href={`?page=${currentPage > 1 ? currentPage - 1 : currentPage}`} />
        </PaginationItem>

        {currentPage > 1 && (
          <PaginationItem>
            <PaginationLink href={`?page=${1}`} > 1 </PaginationLink>
          </PaginationItem>
        )}

        {currentPage > 2 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        <PaginationItem>
          <PaginationLink href={`?page=${currentPage}`} isActive >
            {currentPage}
          </PaginationLink>
        </PaginationItem>

        {Array.from({ length: 3 }, (_, i) => {
          const pageNumber = currentPage + i + 1;
          console.log('pageNumber', pageNumber);
          return pageNumber <= totalPages && pageNumber !== 1 ? (
            <PaginationItem key={pageNumber} >
              <PaginationLink href={`?page=${pageNumber}`} > {pageNumber} </PaginationLink>
            </PaginationItem>
          ) : null;
        })}

        {currentPage < totalPages - 1 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        {currentPage < totalPages && (
          <PaginationItem>
            <PaginationLink href={`?page=${totalPages}`} >
              {totalPages}
            </PaginationLink>
          </PaginationItem>
        )}

        <PaginationItem>
          <PaginationNext href={`?page=${currentPage < totalPages ? currentPage + 1 : currentPage}`} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
