import { useState, useEffect } from 'react';
import { sendRequest } from '../services/api';
import { type ApiResponse } from '../types/response';
import { type RequestHistory } from '../types/request';
import { type HttpMethod } from '../types/api';

export const useRequest = () => {
  const [response, setResponse] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<RequestHistory[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('api-history');
    if (saved) {
      try {
        setHistory(JSON.parse(saved));
      } catch {
        setHistory([]);
      }
    }
  }, []);

  const send = async (
    url: string,
    method: HttpMethod,
    body?: string,
    token?: string
  ) => {
    if (!url) {
      setError('URL is required');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      let parsedBody: unknown;
      let parsedHeaders: Record<string, string> = {};

      if (body) {
        try {
          parsedBody = JSON.parse(body);
        } catch {
          setError('Invalid JSON format');
          setLoading(false);
          return;
        }
      }

      if (token?.trim()) {
        parsedHeaders['Authorization'] = `Bearer ${token.trim()}`;
      }

      const res = await sendRequest({
        url,
        method,
        body: parsedBody,
        headers:
          Object.keys(parsedHeaders).length > 0 ? parsedHeaders : undefined,
      });

      setResponse(res);

      const newEntry: RequestHistory = {
        url,
        method,
        body: body || undefined,
      };

      setHistory((prev) => {
        const updated = [newEntry, ...prev].slice(0, 10);
        localStorage.setItem('api-history', JSON.stringify(updated));
        return updated;
      });
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : 'Unknown error';

      setError(message);

      setResponse({
        status: 500,
        data: message,
        headers: {},
        time: '0ms',
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    response,
    loading,
    error,
    history,
    send,
  };
};