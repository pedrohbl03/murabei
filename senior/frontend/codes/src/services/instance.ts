import axios from "axios";

export const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return  Promise.resolve({
      status: error.response?.status || 500,
      message: error.response?.data?.message || 'An unexpected error occurred',
      data: error.response?.data || null,
    });
  }
)