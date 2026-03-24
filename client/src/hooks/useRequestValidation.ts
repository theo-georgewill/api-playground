export const useRequestValidation = () => {
  const validate = (method: string, url: string, body?: string) => {
    if (
      ['DELETE', 'PUT', 'PATCH'].includes(method) &&
      !url.match(/\/\d+$/)
    ) {
      return 'Endpoint must include a resource ID (e.g. /posts/1)';
    }

    if (
      ['POST', 'PUT', 'PATCH'].includes(method) &&
      !body
    ) {
      return 'Request body is required';
    }

    if (
      ['GET', 'DELETE'].includes(method) &&
      body
    ) {
      return 'Body is not allowed for this method';
    }

    if (body) {
      try {
        JSON.parse(body);
      } catch {
        return 'Invalid JSON format';
      }
    }

    return null;
  };

  return { validate };
};