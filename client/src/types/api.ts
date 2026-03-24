export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

export type SendRequestPayload = {
  url: string;
  method: HttpMethod;
  headers?: Record<string, string>;
  body?: unknown;
};