import { useAuth } from '../context/AuthContext';
import { useOrders } from '../hooks/useOrders';
import { useNavigate } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';

export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const { orders, loading, completeOrder } = useOrders();
  const navigate = useNavigate();

  const pendingOrders = orders.filter(o => o.status === 'pending');
  const completedOrders = orders.filter(o => o.status === 'completed');

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/admin/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const OrderCard = ({ order }) => {
    const createdAt = order.createdAt instanceof Date 
      ? order.createdAt 
      : new Date(order.orderNumber || Date.now());
    
    const timeAgo = Math.floor((new Date() - createdAt) / 1000 / 60);

    return (
      <div style={{
        backgroundColor: 'white',
        borderRadius: '12px',
        padding: '20px',
        marginBottom: '16px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        borderLeft: `4px solid ${order.status === 'pending' ? '#f59e0b' : '#6b7280'}`
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginBottom: '16px'
        }}>
          <div>
            <h3 style={{
              fontSize: '1.25rem',
              fontWeight: 'bold',
              color: '#111827',
              marginBottom: '4px'
            }}>
              Order #{order.orderNumber}
            </h3>
            <p style={{
              color: '#6b7280',
              fontSize: '0.875rem',
              marginBottom: '8px'
            }}>
              {timeAgo} minutes ago
            </p>
            <span style={{
              backgroundColor: order.status === 'pending' ? '#fef3c7' : '#e5e7eb',
              color: order.status === 'pending' ? '#d97706' : '#6b7280',
              padding: '4px 12px',
              borderRadius: '20px',
              fontSize: '0.875rem',
              fontWeight: '600'
            }}>
              {order.status === 'pending' ? '⏳ Pending' : '✓ Completed'}
            </span>
          </div>
          <div style={{
            fontSize: '1.5rem',
            fontWeight: 'bold',
            color: '#f97316'
          }}>
            ₹{order.total}
          </div>
        </div>

        <div style={{
          borderTop: '1px solid #e5e7eb',
          paddingTop: '16px',
          marginTop: '16px'
        }}>
          <p style={{
            fontWeight: '600',
            color: '#374151',
            marginBottom: '12px',
            fontSize: '0.875rem'
          }}>
            💳 Payment: <span style={{ textTransform: 'capitalize' }}>{order.paymentMethod || 'Cash'}</span>
          </p>

          <div style={{
            backgroundColor: '#f9fafb',
            borderRadius: '8px',
            padding: '12px',
            marginBottom: '12px'
          }}>
            <p style={{
              fontWeight: '600',
              color: '#374151',
              marginBottom: '8px',
              fontSize: '0.875rem'
            }}>
              Items:
            </p>
            {order.items.map((item, idx) => (
              <div key={idx} style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '0.875rem',
                color: '#6b7280',
                marginBottom: '4px'
              }}>
                <span>{item.name} × {item.quantity}</span>
                <span>₹{item.price * item.quantity}</span>
              </div>
            ))}
          </div>

          {order.status === 'pending' && (
            <button
              onClick={() => completeOrder(order.id)}
              style={{
                width: '100%',
                backgroundColor: '#10b981',
                color: 'white',
                border: 'none',
                padding: '12px',
                borderRadius: '8px',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'background-color 0.2s'
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#059669'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#10b981'}
            >
              ✅ Mark as Completed
            </button>
          )}
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f9fafb'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>⏳</div>
          <p>Loading orders...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb' }}>
      {/* Header */}
      <header style={{
        backgroundColor: 'white',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        padding: '16px 0',
        marginBottom: '24px'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <h1 style={{
            fontSize: '1.5rem',
            fontWeight: 'bold',
            color: '#f97316'
          }}>
            👨‍🍳 Cook Dashboard
          </h1>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <span style={{ color: '#6b7280', fontSize: '0.875rem' }}>
              {user?.email || 'Chaoscrew'}
            </span>
            <button
              onClick={handleLogout}
              style={{
                backgroundColor: '#ef4444',
                color: 'white',
                border: 'none',
                padding: '8px 16px',
                borderRadius: '6px',
                fontSize: '0.875rem',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 20px',
        display: 'grid',
        gridTemplateColumns: '1fr 300px',
        gap: '24px'
      }}>
        {/* Main Content */}
        <div>
          {/* Pending Orders - First Priority */}
          {pendingOrders.length > 0 && (
            <div style={{ marginBottom: '32px' }}>
              <h2 style={{
                fontSize: '1.25rem',
                fontWeight: 'bold',
                color: '#111827',
                marginBottom: '16px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                ⏳ Pending Orders ({pendingOrders.length})
              </h2>
              {pendingOrders.map((order) => (
                <OrderCard key={order.id} order={order} />
              ))}
            </div>
          )}

          {/* Completed Orders (Last 20) */}
          {completedOrders.slice(-20).length > 0 && (
            <div>
              <h2 style={{
                fontSize: '1.25rem',
                fontWeight: 'bold',
                color: '#111827',
                marginBottom: '16px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                ✓ Completed Orders (Recent)
              </h2>
              {completedOrders.slice(-20).reverse().map((order) => (
                <OrderCard key={order.id} order={order} />
              ))}
            </div>
          )}

          {orders.length === 0 && (
            <div style={{
              backgroundColor: 'white',
              borderRadius: '12px',
              padding: '40px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '3rem', marginBottom: '16px' }}>📭</div>
              <p style={{ color: '#6b7280', fontSize: '1.125rem' }}>
                No orders yet. Waiting for customers...
              </p>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '20px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            marginBottom: '20px',
            position: 'sticky',
            top: '20px'
          }}>
            <h3 style={{
              fontSize: '1.125rem',
              fontWeight: 'bold',
              color: '#111827',
              marginBottom: '16px'
            }}>
              📊 Statistics
            </h3>
            <div style={{ space: '12px' }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '12px 0',
                borderBottom: '1px solid #e5e7eb'
              }}>
                <span style={{ color: '#6b7280' }}>Pending</span>
                <span style={{ fontWeight: 'bold', color: '#f59e0b' }}>
                  {pendingOrders.length}
                </span>
              </div>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '12px 0'
              }}>
                <span style={{ color: '#6b7280' }}>Total Today</span>
                <span style={{ fontWeight: 'bold', color: '#111827' }}>
                  {orders.length}
                </span>
              </div>
            </div>
          </div>

          {/* QR Code */}
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '20px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            textAlign: 'center'
          }}>
            <h3 style={{
              fontSize: '1.125rem',
              fontWeight: 'bold',
              color: '#111827',
              marginBottom: '12px'
            }}>
              📱 QR Code
            </h3>
            <p style={{
              color: '#6b7280',
              fontSize: '0.875rem',
              marginBottom: '16px'
            }}>
              Scan to open menu
            </p>
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              padding: '16px',
              backgroundColor: '#f9fafb',
              borderRadius: '8px'
            }}>
              <QRCodeSVG
                value={window.location.origin}
                size={200}
                level="H"
                includeMargin={true}
              />
            </div>
            <p style={{
              color: '#6b7280',
              fontSize: '0.75rem',
              marginTop: '12px'
            }}>
              {window.location.origin}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
