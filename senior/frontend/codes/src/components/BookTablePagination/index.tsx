import React from 'react'
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '../ui/pagination';
import CustomPageLink from '../CustomPageLink';

export interface IBookTablePaginationProps {
  currentPage: number;
  totalPages: number;
  filterParams?: Record<string, string>;
}

export const BookTablePagination = ({
  currentPage,
  totalPages,
  filterParams,
}: IBookTablePaginationProps) => {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem data-cy="previous-page">
          <CustomPageLink previous page={currentPage > 1 ? currentPage - 1 : currentPage} filterParams={filterParams} />
        </PaginationItem>

        {currentPage > 1 && (
          <PaginationItem data-cy="first-page">
            <CustomPageLink page={1} filterParams={filterParams}>1</CustomPageLink>
          </PaginationItem>
        )}

        {currentPage > 2 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        <PaginationItem>
          <CustomPageLink page={currentPage} isActive filterParams={filterParams} >
            {currentPage}
          </CustomPageLink>
        </PaginationItem>

        {Array.from({ length: 3 }, (_, i) => {
          const pageNumber = currentPage + i + 1;
          return pageNumber <= totalPages && pageNumber !== 1 ? (
            <PaginationItem key={pageNumber} data-cy={`page-${pageNumber}`}>
              <CustomPageLink page={pageNumber} filterParams={filterParams}>{pageNumber}</CustomPageLink>
            </PaginationItem>
          ) : null;
        })}

        {currentPage < totalPages - 1 && totalPages > 5 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        {currentPage < totalPages && !(totalPages < 6) && (
          <PaginationItem data-cy="last-page">
            <CustomPageLink page={totalPages} filterParams={filterParams}>
              {totalPages}
            </CustomPageLink>
          </PaginationItem>
        )}

        <PaginationItem data-cy="next-page">
          <CustomPageLink next page={currentPage < totalPages ? currentPage + 1 : currentPage} filterParams={filterParams} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
