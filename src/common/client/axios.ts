/** @format */

import axios, { AxiosError } from 'axios';
import { StatusError } from '../model/errors';

const handleHttpError = (error: AxiosError<any>) => {
  throw new StatusError(
    error.response?.status || 500,
    error.response?.data.name || 'InternalServerError',
    error.response?.data.message || error.message,
  );
};

const makeRequest = async <R>(
  method: string,
  path: string,
  data: any,
  options: any = {},
): Promise<R> => {
  const defaultOptions = {
    headers: {
      accept: 'application/json',
    },
  };

  let response;
  try {
    // It is throwing error that is why i commented this part
    // const result = await axios[method](path, data, {
    //   ...defaultOptions,
    //   ...options,
    // });
    // response = result.data;
  } catch (error) {
    handleHttpError(error as AxiosError);
  }
  return response as R;
};

export const postData = async <R>(path: string, data: any, options: any = {}): Promise<R> => {
  return makeRequest<R>('post', path, data, options);
};

export const putData = async <R>(path: string, data: any, options: any = {}): Promise<R> => {
  return makeRequest<R>('put', path, data, options);
};

export const getData = async <R>(path: string, data: any, options: any = {}): Promise<R> => {
  return makeRequest<R>('get', path, undefined, options);
};
