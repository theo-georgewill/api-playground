import axios from 'axios';
import { type SendRequestPayload } from '../types/api';
import { type ApiResponse } from '../types/response';

export const sendRequest = async (
  payload: SendRequestPayload
): Promise<ApiResponse> => {
  const response = await axios.post(
    'http://localhost:5050/api/request',
    payload
  );

  return response.data;
};