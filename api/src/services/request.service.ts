import axios, { type AxiosRequestConfig, isAxiosError } from 'axios';

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

interface ApiRequestInput {
  url: string;
  method: HttpMethod;
  headers?: Record<string, string>;
  body?: unknown;
}

export const makeApiRequest = async (input: ApiRequestInput) => {
  const start = Date.now();

  const config: AxiosRequestConfig = {
    url: input.url,
    method: input.method,
    headers: input.headers,
  };

  // Only attach body when valid
  if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(input.method)) {
    config.data = input.body;
  }

  try {
    const response = await axios(config);
    const end = Date.now();

    return {
      status: response.status,
      data: response.data,
      headers: response.headers,
      time: `${end - start}ms`,
    };

  } catch (error: unknown) {
    const end = Date.now();

    if (isAxiosError(error)) {
      return {
        status: error.response?.status ?? 500,
        data: error.response?.data ?? error.message,
        headers: error.response?.headers ?? {},
        time: `${end - start}ms`,
      };
    }

    return {
      status: 500,
      data: 'Unknown error',
      headers: {},
      time: `${end - start}ms`,
    };
  }
};