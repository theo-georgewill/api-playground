import { type HttpMethod } from './api';

export type RequestHistory = {
  name?: string;
  url: string;
  method: HttpMethod;
  body?: string;
};