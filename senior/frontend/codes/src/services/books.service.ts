import { IBook } from "@/types/IBooks";

export interface BooksResponse {
  data: IBook[];
  error?: string | null;
  success: boolean;
}

export const getBooksAllBooks = async (): Promise<BooksResponse> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/books`);
    if (!response.ok) {
      console.error('Network response was not ok');
      return {
        data: [],
        error: null,
        success: false
      };
    }
    const data = await response.json();
    if (!data || data.length === 0) {
      return {
        data: [],
        error: 'No books found',
        success: true
      };
    }
    return {
      data,
      success: true
    };
  } catch (error) {
    console.error('Failed to fetch books:', error);
    return {
      data: [],
      error: error instanceof Error ? error.message : 'Unknown error occurred',
      success: false
    };
  }
};