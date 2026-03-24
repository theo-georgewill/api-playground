import { useState } from 'react';
import ReactJson from '@microlink/react-json-view';
import { type ApiResponse } from '../../types/response';

export function ResponseViewer({ response }: { response: ApiResponse }) {
  const [activeTab, setActiveTab] = useState<'response' | 'headers'>('response');
  const getTabStyle = (tab: 'response' | 'headers') => ({
    background: activeTab === tab ? '#30363d' : '#161b22',
    color: '#c9d1d9',
    border: '1px solid #30363d',
    padding: '6px 12px',
    borderRadius: 6,
    cursor: 'pointer',
  });
  
  return (
    <div style={{ marginTop: 20 }}>
      <h3>Status: {response.status}</h3>
      <p>Time: {response.time}</p>

      <div style={{ display: 'flex', gap: 10, marginBottom: 10 }}>  
        <button 
          onClick={() => setActiveTab('response')} 
          style={getTabStyle('response')}
        >
          Response
        </button>

        <button 
          onClick={() => setActiveTab('headers')} 
          style={getTabStyle('headers')}
        >
          Headers
        </button>
      </div>

      <ReactJson
        src={activeTab === 'response' ? response.data : response.headers}
        theme="monokai"
        collapsed={1}
        style={{textAlign: 'left'}}
        displayDataTypes={false}
        enableClipboard
      />
    </div>
  );
}