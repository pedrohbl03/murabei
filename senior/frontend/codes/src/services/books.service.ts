import { instance } from "./instance";
import { IBooksResponse } from "@/types/IBooks";



export const getAllBooks = async (
  page?: number,
  limit?: number
) => {
  const response = await instance.get<IBooksResponse>("/books", {
    params: {
      page: page || 1,
      limit: limit || 10,
    },
  });
  return response;
};
