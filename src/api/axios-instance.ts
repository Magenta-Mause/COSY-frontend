import axios, { AxiosRequestConfig } from 'axios';

// 1. Define the shape of your Backend Wrapper
// (This matches your Java ApiResponse.java builder)
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  error?: string;
  path?: string;
  statusCode?: number;
}

export const AXIOS_INSTANCE = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || '', // Your API Base URL
});

// 2. Add an interceptor to unwrap the response
AXIOS_INSTANCE.interceptors.response.use(
  (response) => {
    // Check if the response matches your wrapper structure
    // If 'data' and 'success' exist, return the inner 'data'
    if (response.data && response.data.data !== undefined && 'success' in response.data) {
      return response.data.data;
    }

    return response.data;
  },
  (error) => {
    // Handle errors globally if you wish
    return Promise.reject(error);
  }
);

// 3. Define the custom mutator function for Orval
export const customInstance = <T>(
  config: AxiosRequestConfig,
  options?: AxiosRequestConfig,
): Promise<T> => {
  const source = axios.CancelToken.source();
  const promise = AXIOS_INSTANCE({
    ...config,
    ...options,
    cancelToken: source.token,
  }).then(({ data }) => data);

  // @ts-ignore
  promise.cancel = () => {
    source.cancel('Query was cancelled');
  };

  return promise;
};