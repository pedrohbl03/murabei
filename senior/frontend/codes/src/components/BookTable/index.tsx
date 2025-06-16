import { getAllBooks } from '@/services/books.service';
import React, { use } from 'react'
import { Skeleton } from '../ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
  TableHead,
} from '../ui/table';
import { TbNotebookOff, TbError404 } from "react-icons/tb";
import { cn } from '@/lib/utils';
import { BookTablePagination } from '../BookTablePagination';

export interface BookListProps {
  page: string | number;
  title?: string;
  author?: string;
  subject?: string;
}

export const BookList = ({ page, title, author, subject }: BookListProps) => {
  const response = use(getAllBooks({
    page: Number(page) || 1,
    limit: 10,
    title: title || '',
    author: author?.replace(/ /g, "_") || '',
    subject: subject || ''
  }));

  if (!response.data) {
    Array.from({ length: 10 }).map((_, index) => (
      <Skeleton key={index} className="h-10 w-full mb-2"
        style={{ width: '100%', height: '50px', marginBottom: '10px' }}
      />
    ));
  }

  if (response.status !== 200) {
    console.log(response);
    return (
      <div className="text-center py-32 flex flex-col items-center">
        <TbError404 className="mx-auto mb-2" size={48} />
        <p>Erro ao carregar os livros. Por favor, tente novamente mais tarde.</p>
      </div>
    );
  }

  const { books, pagination_metadata } = response.data;

  if (books.length === 0) {
    return (
      <div>
        <div className="text-center text-gray-500 py-4">
          <TbNotebookOff className="mx-auto mb-2" size={48} />
          Nenhum livro encontrado
        </div>
      </div>
    );
  }

  return (
    <div>
      <Table className="mb-4">
        <TableHeader>
          <TableRow>
            <TableHead>Id</TableHead>
            <TableHead>Autor</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Biography</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {books?.map((book, index) => (
            <TableRow key={book.id}
              data-cy="book-item"
              className={cn(
                'hover:bg-gray-100 transition-colors duration-200',
                index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
              )}>
              <TableCell data-cy="book-id">{book.id}</TableCell>
              <TableCell data-cy="book-author">{book.author}</TableCell>
              <TableCell data-cy="book-title">{book.title}</TableCell>
              <TableCell data-cy="book-biography">{book.biography}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <BookTablePagination
        currentPage={pagination_metadata.current_page}
        totalPages={pagination_metadata.total_pages}
        filterParams={{
          title: title || '',
          author: author || '',
          subject: subject || '',
        }}
      />
    </div>
  )
}
