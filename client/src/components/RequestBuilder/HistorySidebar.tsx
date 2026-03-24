import { type RequestHistory } from '../../types/request';

type HistorySidebarProps = {
  history: RequestHistory[];
  selectedIndex: number | null;
  onSelect: (item: RequestHistory, index: number) => void;
};

export function HistorySidebar({
  history,
  selectedIndex, 
  onSelect,
}: HistorySidebarProps) {
  return (
    <div
      style={{
        width: '250px',
        borderRight: '1px solid #30363d',
        padding: 10,
        background: '#0d1117',
        color: '#c9d1d9',
        overflowY: 'auto',
        height: '100vh',
      }}
    >
      <h3>History</h3>

      {history.map((item, index) => (
        <div
          key={index}
          onClick={() => onSelect(item, index)}
          style={{
            cursor: 'pointer',
            padding: 10,
            marginBottom: 10,
            borderRadius: 8,
            background:
              selectedIndex === index ? '#1f2937' : '#161b22',
            border:
              selectedIndex === index
                ? '1px solid #3b82f6'
                : '1px solid transparent',
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={(e) => {
            if (selectedIndex !== index) {
              e.currentTarget.style.background = '#1f2937';
            }
          }}
          onMouseLeave={(e) => {
            if (selectedIndex !== index) {
              e.currentTarget.style.background = '#161b22';
            }
          }}
        >
          <strong
            style={{
              color:
                item.method === 'GET'
                  ? '#22c55e'
                  : item.method === 'POST'
                  ? '#3b82f6'
                  : item.method === 'PUT'
                  ? '#eab308'
                  : item.method === 'DELETE'
                  ? '#ef4444'
                  : '#c9d1d9',
            }}
          >
            {item.method}
          </strong>

          <div
            title={item.url}
            style={{
              fontSize: 12,
              opacity: 0.7,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              cursor: 'pointer',
            }}
          >
            {item.url}
          </div>
        </div>
      ))}
    </div>
  );
}