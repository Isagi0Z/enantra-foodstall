import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../config/firebase';

export default function OrderSuccess() {
  const navigate = useNavigate();
  const location = useLocation();
  const orderId = location.state?.orderId;
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!orderId) {
      navigate('/');
      return;
    }

    // Listen to order updates in real-time
    const orderRef = doc(db, 'orders', orderId);
    const unsubscribe = onSnapshot(
      orderRef,
      (snapshot) => {
        if (snapshot.exists()) {
          setOrder({
            id: snapshot.id,
            ...snapshot.data(),
            createdAt: snapshot.data().createdAt?.toDate?.() || new Date(),
          });
        }
        setLoading(false);
      },
      (error) => {
        console.error('Error fetching order:', error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [orderId, navigate]);

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
          <p>Loading order...</p>
        </div>
      </div>
    );
  }

  if (!order) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="container-mobile">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="text-6xl mb-4">✅</div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Order Placed Successfully!
          </h1>
          <p className="text-gray-600 mb-6">
            Thank you for your order. We'll prepare it fresh for you.
          </p>

            <div className="bg-gray-50 rounded-lg p-6 mb-6 text-left">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Order Number:</span>
                  <span className="font-semibold">#{order.orderNumber || order.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Status:</span>
                  <span className={`font-semibold ${
                    order.status === 'pending' ? 'text-yellow-600' :
                    order.status === 'preparing' ? 'text-blue-600' :
                    order.status === 'ready' ? 'text-green-600' :
                    'text-gray-600'
                  }`}>
                    {order.status === 'pending' ? '⏳ Pending' :
                     order.status === 'preparing' ? '👨‍🍳 Preparing' :
                     order.status === 'ready' ? '✅ Ready' :
                     '✓ Completed'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Amount:</span>
                  <span className="font-bold text-orange-500">₹{order.total}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Payment Method:</span>
                  <span className="font-semibold capitalize">
                    {order.paymentMethod}
                  </span>
                </div>
              </div>
            </div>

            {order.status !== 'completed' && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <p className="text-blue-800 text-sm">
                  📱 Your order is being prepared! You'll see real-time updates here.
                </p>
              </div>
            )}

          <div className="space-y-3">
            <button
              onClick={() => navigate('/menu')}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-full font-semibold transition"
            >
              Order More
            </button>
            <button
              onClick={() => navigate('/')}
              className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 rounded-full font-semibold transition"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
