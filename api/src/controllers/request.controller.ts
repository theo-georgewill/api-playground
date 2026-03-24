import { Request, Response } from 'express';
import { type HttpMethod, makeApiRequest } from '../services/request.service';

export const handleRequest = async (req: Request, res: Response) => {
  console.log('Incoming request:', req.body);

  const { url, method, body, headers } = req.body;

  if (!url || !method) {
    return res.status(400).json({
      error: 'URL and method are required',
    });
  }

  try {
    const result = await makeApiRequest({
      url,
      method: method as HttpMethod,
      body,
      headers,
    });

    res.status(result.status).json(result); 

  } catch (error: unknown) {
    console.error('Error:', error);

    const message =
      error instanceof Error ? error.message : 'Unknown error';

    res.status(500).json({
      error: message,
    });
  }
};