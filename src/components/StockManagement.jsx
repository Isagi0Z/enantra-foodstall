import { useMenuItems } from '../hooks/useMenuItems';

export default function StockManagement() {
  const { menuItems, loading, updateAvailability } = useMenuItems();

  const toggleAvailability = async (itemId, currentStatus) => {
    try {
      await updateAvailability(itemId, !currentStatus);
    } catch (error) {
      console.error('Error toggling availability:', error);
      alert('Failed to update availability. Please try again.');
    }
  };

  if (loading) {
    return (
      <div style={{
        backgroundColor: 'white',
        borderRadius: '12px',
        padding: '20px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        textAlign: 'center'
      }}>
        <p style={{ color: '#6b7280' }}>Loading menu items...</p>
      </div>
    );
  }

  return (
    <div style={{
      backgroundColor: 'white',
      borderRadius: '12px',
      padding: '20px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      marginBottom: '20px'
    }}>
      <h3 style={{
        fontSize: '1.125rem',
        fontWeight: 'bold',
        color: '#111827',
        marginBottom: '16px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
      }}>
        📦 Stock Management
      </h3>

      <div style={{
        maxHeight: '400px',
        overflowY: 'auto'
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {menuItems.map((item) => (
            <div
              key={item.id}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '12px',
                backgroundColor: item.available ? '#f0fdf4' : '#fef2f2',
                borderRadius: '8px',
                border: `1px solid ${item.available ? '#bbf7d0' : '#fecaca'}`
              }}
            >
              <div style={{ flex: 1 }}>
                <p style={{
                  fontWeight: '600',
                  color: '#111827',
                  marginBottom: '4px',
                  fontSize: '0.875rem'
                }}>
                  {item.name}
                </p>
                <p style={{
                  color: '#6b7280',
                  fontSize: '0.75rem'
                }}>
                  ₹{item.price}
                </p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{
                  backgroundColor: item.available ? '#10b981' : '#ef4444',
                  color: 'white',
                  padding: '4px 12px',
                  borderRadius: '20px',
                  fontSize: '0.75rem',
                  fontWeight: '600'
                }}>
                  {item.available ? '✓ Available' : '✗ Not Available'}
                </span>
                <button
                  onClick={() => toggleAvailability(item.id, item.available)}
                  style={{
                    backgroundColor: item.available ? '#ef4444' : '#10b981',
                    color: 'white',
                    border: 'none',
                    padding: '6px 16px',
                    borderRadius: '6px',
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'background-color 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = item.available ? '#dc2626' : '#059669';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = item.available ? '#ef4444' : '#10b981';
                  }}
                >
                  {item.available ? 'Mark Unavailable' : 'Mark Available'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {menuItems.length === 0 && (
        <p style={{
          color: '#6b7280',
          textAlign: 'center',
          padding: '20px'
        }}>
          No menu items found
        </p>
      )}
    </div>
  );
}

