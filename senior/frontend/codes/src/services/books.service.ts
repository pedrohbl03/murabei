import { IBook } from "@/types/IBooks";

export const getBooksAllBooks = async (): Promise<IBook[]> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/books`);
    if (!response.ok) throw new Error('Network response was not ok');
    return await response.json();
  } catch (error) {
    console.error('Failed to fetch books:', error);
    throw error;
  }
};