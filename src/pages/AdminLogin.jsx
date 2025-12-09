import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ADMIN_CREDENTIALS = [
  {
    username: 'Chaoscrew',
    password: 'surprisedude',
    email: 'chaoscrew@enantra.com'
  },
  {
    username: 'naveen',
    password: '12345678',
    email: 'naveen@enantra.com'
  }
];

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Match hardcoded credentials
    const matchedAdmin = ADMIN_CREDENTIALS.find(
      (admin) =>
        admin.username.toLowerCase() === username.toLowerCase() &&
        admin.password === password
    );

    if (!matchedAdmin) {
      setError('Invalid username or password');
      setLoading(false);
      return;
    }

    try {
      // Login using Firebase email + password
      await login(matchedAdmin.email, matchedAdmin.password);
      navigate('/admin');
    } catch (err) {
      if (
        err.code === 'auth/user-not-found' ||
        err.code === 'auth/wrong-password'
      ) {
        setError(
          `Admin account not found. Create Firebase user with email: ${matchedAdmin.email}`
        );
      } else {
        setError(err.message || 'Failed to login.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f9fafb',
        padding: '20px'
      }}
    >
      <div
        style={{
          backgroundColor: 'white',
          padding: '40px',
          borderRadius: '12px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          maxWidth: '400px',
          width: '100%'
        }}
      >
        <h1
          style={{
            fontSize: '2rem',
            fontWeight: 'bold',
            color: '#f97316',
            marginBottom: '8px',
            textAlign: 'center'
          }}
        >
          🔐 Admin Login
        </h1>

        <p
          style={{
            color: '#666',
            marginBottom: '24px',
            textAlign: 'center'
          }}
        >
          Cook Dashboard Access
        </p>

        {error && (
          <div
            style={{
              backgroundColor: '#fee2e2',
              color: '#dc2626',
              padding: '12px',
              borderRadius: '8px',
              marginBottom: '20px',
              fontSize: '14px'
            }}
          >
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* USERNAME */}
          <div style={{ marginBottom: '20px' }}>
            <label
              style={{
                display: 'block',
                marginBottom: '8px',
                fontWeight: '600',
                color: '#374151'
              }}
            >
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
                fontSize: '16px'
              }}
              placeholder="Enter username"
            />
          </div>

          {/* PASSWORD + TOGGLE */}
          <div style={{ marginBottom: '24px', position: 'relative' }}>
            <label
              style={{
                display: 'block',
                marginBottom: '8px',
                fontWeight: '600',
                color: '#374151'
              }}
            >
              Password
            </label>

            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '8px',
                border: '1px solid #d1d5db',
                fontSize: '16px'
              }}
              placeholder="Enter password"
            />

            {/* 👁 Show/Hide Button */}
            <span
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: 'absolute',
                right: '12px',
                top: '45px',
                cursor: 'pointer',
                fontSize: '18px',
                color: '#6b7280'
              }}
            >
              {showPassword ? '🙈' : '👁️'}
            </span>
          </div>

          {/* LOGIN BUTTON */}
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
              cursor: loading ? 'not-allowed' : 'pointer'
            }}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
}
