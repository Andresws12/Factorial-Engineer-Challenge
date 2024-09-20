import { AxiosHeaders, AxiosRequestConfig } from 'axios';

export const BASE_URL = import.meta.env.VITE_API_URL ?? '';

/**
 * This function takes a string and returns a concatenated string with a base URL.
 * @param {string} url - The `url` parameter is a string representing the endpoint or path of an API.
 * It is used as a parameter for the `apiPrefix` function to concatenate it with the `BASE_URL`
 * constant and return the complete URL for making API requests.
 */
export const apiPrefix = (url: string): string => BASE_URL + url;

/**
 * The function `getRequestConfig` returns an object with headers for JSON content and an option to throw
 * global errors.
 *
 * @returns An object of type JsonHeaders is being returned
 */
export const getRequestConfig: () => AxiosRequestConfig = () => {
  const headers: AxiosHeaders = new AxiosHeaders({
    'Content-Type': 'application/json',
    Accept: 'application/json',
  });

  const requestConfig: AxiosRequestConfig = {
    headers: headers,
  };
  return requestConfig;
};
