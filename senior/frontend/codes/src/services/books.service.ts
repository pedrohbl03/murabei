import { instance } from "./instance";
import { IBooksResponse } from "@/types/IBooks";



export const getAllBooks = async ({
  page,
  limit,
  title,
  author,
  subject
}: {
  page?: number;
  limit?: number;
  title?: string;
  author?: string;
  subject?: string;
} = {}) => {
  const response = await instance.get<IBooksResponse>("/books", {
    params: {
      page: page || 1,
      limit: limit || 10,
      ...title && { title },
      ...author && { author },
      ...subject && { subject },
    },
  });
  return response;
};
