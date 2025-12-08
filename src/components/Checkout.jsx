import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Checkout() {
  const { cart, getTotalPrice, placeOrder } = useCart();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const order = await placeOrder({
        paymentMethod,
      });
      navigate('/order-success', { state: { orderId: order.id, orderNumber: order.orderNumber } });
    } catch (err) {
      console.error('Order placement error:', err);
      setError('Failed to place order. Please try again.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-8">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="container-mobile py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate('/cart')}
              className="text-orange-500 font-bold text-xl"
            >
              ← Back
            </button>
            <h1 className="text-xl font-bold text-gray-800">Checkout</h1>
            <div className="w-8"></div>
          </div>
        </div>
      </header>

      <div className="container-mobile py-6">
        {/* Order Summary */}
        <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Order Summary
          </h2>
          <div className="space-y-3">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between text-gray-700"
              >
                <span>
                  {item.name} × {item.quantity}
                </span>
                <span className="font-semibold">
                  ₹{item.price * item.quantity}
                </span>
              </div>
            ))}
          </div>
          <div className="border-t border-gray-200 mt-4 pt-4 flex items-center justify-between">
            <span className="text-xl font-bold text-gray-800">Total:</span>
            <span className="text-2xl font-bold text-orange-500">
              ₹{getTotalPrice()}
            </span>
          </div>
        </div>

        {/* Checkout Form - Payment Method Only */}
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-2">
            Payment Method
          </h2>
          <p className="text-sm text-gray-600 mb-6">
            💳 Select your preferred payment method
          </p>

          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Payment Method *
              </label>
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 text-lg"
              >
                <option value="cash">💵 Cash</option>
                <option value="card">💳 Card Payment</option>
                <option value="upi">📱 UPI</option>
              </select>
            </div>
          </div>

          {error && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full mt-6 bg-orange-500 hover:bg-orange-600 disabled:bg-gray-400 text-white py-4 rounded-full font-bold text-lg transition"
          >
            {isSubmitting ? 'Placing Order...' : 'Place Order'}
          </button>
        </form>
      </div>
    </div>
  );
}
