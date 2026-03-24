import { type HttpMethod } from '../../types/api';

type RequestFormProps = {
  method: HttpMethod;
  url: string;
  body: string;
  token: string;
  loading: boolean;
  error: string | null;
  validationError: string | null;
  onMethodChange: (val: HttpMethod) => void;
  onUrlChange: (val: string) => void;
  onBodyChange: (val: string) => void;
  onTokenChange: (val: string) => void;
  onSend: () => void;
};

export function RequestForm({
  method,
  url,
  body,
  token,
  loading,
  error,
  validationError,
  onMethodChange,
  onUrlChange,
  onBodyChange,
  onTokenChange,
  onSend,
}: RequestFormProps) {
  return (
    <>
      <div >
        <select value={method} onChange={(e) => onMethodChange(e.target.value as HttpMethod)}>
          <option>GET</option>
          <option>POST</option>
          <option>PUT</option>
          <option>DELETE</option>
        </select>

        <input
          type="text"
          value={url}
          placeholder="https://api.example.com"
          onChange={(e) => onUrlChange(e.target.value)}
          style={{ width: 400, marginLeft: 10 }}
        />

        <button onClick={onSend} disabled={loading || !!validationError}>
          {loading ? 'Sending...' : 'Send'}
        </button>
      </div>
      
      {(error || validationError) && (
        <p style={{ color: 'red', marginTop: 10 }}>
          {error || validationError}
        </p>
      )}

      <input
        type="text"
        placeholder="Bearer Token (optional)"
        value={token}
        onChange={(e) => onTokenChange(e.target.value)}
        style={{ width: '100%', marginTop: 10 }}
      />
      
      <textarea
        placeholder="Request Body (JSON)"
        value={body}
        onChange={(e) => onBodyChange(e.target.value)}
        style={{ width: '100%', height: 100, marginTop: 10 }}
      />
    </>
  );
}