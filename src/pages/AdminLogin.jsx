import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ADMIN_CREDENTIALS = {
  username: 'Chaoscrew',
  password: 'surprisedude',
  email: 'chaoscrew@enantra.com' // Firebase uses email, so we'll use this format
};

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Check hardcoded credentials first
    if (username.toLowerCase() !== ADMIN_CREDENTIALS.username.toLowerCase() || 
        password !== ADMIN_CREDENTIALS.password) {
      setError('Invalid username or password');
      setLoading(false);
      return;
    }

    try {
      // Try to login with Firebase using the email format
      // Note: You need to create this user in Firebase Console first
      await login(ADMIN_CREDENTIALS.email, ADMIN_CREDENTIALS.password);
      navigate('/admin');
    } catch (err) {
      // If Firebase auth fails, show helpful message
      if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password') {
        setError('Admin account not found. Please create the admin user in Firebase Console with email: ' + ADMIN_CREDENTIALS.email);
      } else {
        setError(err.message || 'Failed to login. Please check your credentials.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#f9fafb',
      padding: '20px'
    }}>
      <div style={{
        backgroundColor: 'white',
        padding: '40px',
        borderRadius: '12px',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        maxWidth: '400px',
        width: '100%'
      }}>
        <h1 style={{
          fontSize: '2rem',
          fontWeight: 'bold',
          color: '#f97316',
          marginBottom: '8px',
          textAlign: 'center'
        }}>
          🔐 Admin Login
        </h1>
        <p style={{
          color: '#666',
          marginBottom: '24px',
          textAlign: 'center'
        }}>
          Cook Dashboard Access
        </p>

        {error && (
          <div style={{
            backgroundColor: '#fee2e2',
            color: '#dc2626',
            padding: '12px',
            borderRadius: '8px',
            marginBottom: '20px',
            fontSize: '14px'
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              fontWeight: '600',
              color: '#374151'
            }}>
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '8px',
                border: '1px solid #d1d5db',
                fontSize: '16px',
                boxSizing: 'border-box'
              }}
              placeholder="Enter username"
            />
          </div>

          <div style={{ marginBottom: '24px' }}>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              fontWeight: '600',
              color: '#374151'
            }}>
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '8px',
                border: '1px solid #d1d5db',
                fontSize: '16px',
                boxSizing: 'border-box'
              }}
              placeholder="Enter password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              backgroundColor: loading ? '#9ca3af' : '#f97316',
              color: 'white',
              padding: '14px',
              borderRadius: '8px',
              border: 'none',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'background-color 0.2s'
            }}
            onMouseEnter={(e) => {
              if (!loading) e.target.style.backgroundColor = '#ea580c';
            }}
            onMouseLeave={(e) => {
              if (!loading) e.target.style.backgroundColor = '#f97316';
            }}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div style={{
          marginTop: '24px',
          paddingTop: '24px',
          borderTop: '1px solid #e5e7eb',
          textAlign: 'center'
        }}>
          <p style={{ color: '#6b7280', fontSize: '12px', marginBottom: '8px' }}>
            
          </p>
          <p style={{ color: '#9ca3af', fontSize: '11px' }}>
            
          </p>
          <p style={{ color: '#9ca3af', fontSize: '11px' }}>
            
          </p>
        </div>
      </div>
    </div>
  );
}
