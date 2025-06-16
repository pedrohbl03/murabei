export interface IBook {
  id: string;
  author: string;
  title: string;
  biography: string;
}

export interface IPaginationMetadata {
  current_page: number;
  page_size: number;
  total_books: number;
  total_pages: number;
};

export interface IBooksResponse {
  books: IBook[];
  pagination_metadata: IPaginationMetadata;
}
