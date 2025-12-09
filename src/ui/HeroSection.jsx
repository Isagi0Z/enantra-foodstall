import { useNavigate } from 'react-router-dom';
import { Suspense, lazy, useState } from 'react';

// Lazy load 3D components to prevent blocking - wrapped in try-catch
let Hero3DCanvas = null;
try {
  Hero3DCanvas = lazy(() => import('./Hero3DWrapper'));
} catch (error) {
  console.warn('3D components failed to load:', error);
}

export default function HeroSection() {
  const navigate = useNavigate();
  // Disable 3D for now to prevent crashes
  const [show3D] = useState(false);

  return (
    <div 
      className="relative w-full h-screen overflow-hidden bg-gradient-to-br from-orange-50 via-orange-100 to-white"
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        overflow: 'hidden',
        background: 'linear-gradient(to bottom right, #fff7ed, #ffedd5, #ffffff)'
      }}
    >
      {/* Simple animated background */}
      <div 
        className="absolute inset-0 overflow-hidden"
        style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, overflow: 'hidden' }}
      >
        <div 
          className="absolute top-20 left-10 w-72 h-72 bg-orange-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"
          style={{
            position: 'absolute',
            top: '80px',
            left: '40px',
            width: '288px',
            height: '288px',
            backgroundColor: '#fed7aa',
            borderRadius: '50%',
            opacity: 0.7,
            filter: 'blur(40px)'
          }}
        ></div>
        <div 
          className="absolute top-40 right-10 w-72 h-72 bg-yellow-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"
          style={{
            position: 'absolute',
            top: '160px',
            right: '40px',
            width: '288px',
            height: '288px',
            backgroundColor: '#fef08a',
            borderRadius: '50%',
            opacity: 0.7,
            filter: 'blur(40px)'
          }}
        ></div>
        <div 
          className="absolute -bottom-8 left-1/2 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"
          style={{
            position: 'absolute',
            bottom: '-32px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '288px',
            height: '288px',
            backgroundColor: '#fce7f3',
            borderRadius: '50%',
            opacity: 0.7,
            filter: 'blur(40px)'
          }}
        ></div>
      </div>

      {/* 3D Canvas - lazy loaded with error boundary - only if enabled */}
      {show3D && Hero3DCanvas && (
        <Suspense fallback={null}>
          <div 
            className="absolute inset-0 opacity-30" 
            style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, opacity: 0.3 }}
          >
            <ErrorBoundary3D>
              <Hero3DCanvas />
            </ErrorBoundary3D>
          </div>
        </Suspense>
      )}

      {/* UI Layer */}
      <div 
        className="relative z-20 flex flex-col items-center justify-center h-full text-center px-6"
        style={{
          position: 'relative',
          zIndex: 20,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          textAlign: 'center',
          padding: '0 24px'
        }}
      >
        <div style={{ marginBottom: '32px' }}>
          <h1 
            className="text-6xl md:text-7xl font-bold text-orange-500 drop-shadow-lg mb-4 animate-fade-in"
            style={{
              fontSize: 'clamp(3rem, 8vw, 4.5rem)',
              fontWeight: 'bold',
              color: '#f97316',
              marginBottom: '16px',
              textShadow: '2px 2px 4px rgba(0,0,0,0.1)'
            }}
          >
            Enantra Food Stall
          </h1>
          <p 
            className="text-2xl md:text-3xl text-gray-700 font-medium drop-shadow mb-2"
            style={{
              fontSize: 'clamp(1.5rem, 4vw, 1.875rem)',
              color: '#374151',
              fontWeight: '500',
              marginBottom: '8px',
              textShadow: '1px 1px 2px rgba(0,0,0,0.1)'
            }}
          >
            Fresh • Fast • Affordable
          </p>
          <p 
            className="text-lg text-gray-600 mt-4"
            style={{ fontSize: '1.125rem', color: '#4b5563', marginTop: '16px' }}
          >
            🍔 Delicious food delivered to your door
          </p>
        </div>

        <div 
          className="flex flex-col sm:flex-row gap-4 mt-8"
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            marginTop: '32px'
          }}
        >
          <button
            onClick={() => navigate('/menu')}
            className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-10 py-4 rounded-full shadow-xl hover:shadow-2xl active:scale-95 transition-all duration-200 text-xl transform hover:scale-105"
            style={{
              backgroundColor: '#f97316',
              color: 'white',
              fontWeight: 'bold',
              padding: '16px 40px',
              borderRadius: '9999px',
              fontSize: '1.25rem',
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#ea580c'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#f97316'}
          >
            🍕 Order Now
          </button>
          <button
            onClick={() => navigate('/cart')}
            className="bg-white hover:bg-gray-50 text-orange-500 font-bold px-10 py-4 rounded-full shadow-xl hover:shadow-2xl active:scale-95 transition-all duration-200 text-xl border-3 border-orange-500 transform hover:scale-105"
            style={{
              backgroundColor: 'white',
              color: '#f97316',
              fontWeight: 'bold',
              padding: '16px 40px',
              borderRadius: '9999px',
              fontSize: '1.25rem',
              border: '3px solid #f97316',
              cursor: 'pointer',
              boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#f9fafb'}
            onMouseLeave={(e) => e.target.style.backgroundColor = 'white'}
          >
            🛒 View Cart
          </button>
        </div>

        {/* Admin Button */}
        <button
          onClick={() => navigate('/admin/login')}
          className="mt-4 text-gray-500 hover:text-gray-700 text-sm font-medium transition"
          style={{
            marginTop: '16px',
            color: '#6b7280',
            fontSize: '0.875rem',
            fontWeight: '500',
            cursor: 'pointer',
            background: 'none',
            border: 'none',
            textDecoration: 'underline'
          }}
        >
          👨‍🍳 Admin Login
        </button>

        {/* Quick Menu Preview */}
        <div 
          className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl"
          style={{
            marginTop: '48px',
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '16px',
            maxWidth: '672px'
          }}
        >
          {[
            { emoji: '🍔', label: 'Burgers' },
            { emoji: '🍟', label: 'Sides' },
            { emoji: '🥤', label: 'Drinks' },
            { emoji: '🍕', label: 'More' }
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg hover:shadow-xl transition cursor-pointer"
              onClick={() => navigate('/menu')}
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                borderRadius: '12px',
                padding: '16px',
                boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => e.target.style.boxShadow = '0 20px 25px -5px rgba(0,0,0,0.1)'}
              onMouseLeave={(e) => e.target.style.boxShadow = '0 10px 15px -3px rgba(0,0,0,0.1)'}
            >
              <div style={{ fontSize: '2rem', marginBottom: '8px' }}>{item.emoji}</div>
              <p style={{ fontWeight: '600', fontSize: '0.875rem' }}>{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
// Simple wrapper for 3D component
function ErrorBoundary3D({ children }) {
  return <>{children}</>;
}

