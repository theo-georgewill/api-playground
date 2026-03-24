import { useState } from 'react';
import { useRequest } from '../../hooks/useRequest';
import { useRequestValidation } from '../../hooks/useRequestValidation';

import { HistorySidebar } from './HistorySidebar';
import { RequestForm } from './RequestForm';
import { ResponseViewer } from './ResponseViewer';
import { type HttpMethod } from '../../types/api';

export default function RequestBuilder() {
  const { response, loading, error, history, send } = useRequest();
  const { validate } = useRequestValidation();

  const [url, setUrl] = useState('');
  const [method, setMethod] = useState<HttpMethod>('GET');
  const [body, setBody] = useState('');
  const [token, setToken] = useState('');
  const validationError = validate(method, url, body);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handleSend = () => {
    if (validationError) return;
    send(url, method, body, token);
  };

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <HistorySidebar
        history={history}
        selectedIndex={selectedIndex}
        onSelect={(item, index) => {
          setSelectedIndex(index);
          setUrl(item.url);
          setMethod(item.method);
          setBody(item.body || '');
        }}
      />

      <div style={{ flex: 1, padding: 20 }}>
        <h2>API Playground</h2>

        <RequestForm
          method={method}
          url={url}
          body={body}
          token={token}
          loading={loading}
          error={error}
          validationError={validationError}
          onMethodChange={setMethod}
          onUrlChange={setUrl}
          onBodyChange={setBody}
          onTokenChange={setToken}
          onSend={handleSend}
        />

        {response && <ResponseViewer response={response} />}
      </div>
    </div>
  );
}