import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Cart() {
  const { cart, updateQuantity, removeFromCart, getTotalPrice } =
    useCart();
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🛒</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Your cart is empty
          </h2>
          <p className="text-gray-600 mb-6">Add some delicious items!</p>
          <button
            onClick={() => navigate('/menu')}
            className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-full font-semibold transition"
          >
            Browse Menu
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-32">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="container-mobile py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate('/menu')}
              className="text-orange-500 font-bold text-xl"
            >
              ← Back to Menu
            </button>
            <h1 className="text-xl font-bold text-gray-800">Cart</h1>
            <div className="w-8"></div>
          </div>
        </div>
      </header>

      {/* Cart Items */}
      <div className="container-mobile py-6">
        <div className="space-y-4">
          {cart.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl shadow-md p-5 flex gap-4"
            >
              <div className="w-24 h-24 bg-gradient-to-br from-orange-100 to-orange-200 rounded-lg flex-shrink-0 flex items-center justify-center">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover rounded-lg"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-800 mb-1">{item.name}</h3>
                <p className="text-sm text-gray-600 mb-3">₹{item.price}</p>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center font-bold"
                  >
                    −
                  </button>
                  <span className="font-semibold text-gray-800 w-8 text-center">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="w-8 h-8 rounded-full bg-orange-500 hover:bg-orange-600 text-white flex items-center justify-center font-bold"
                  >
                    +
                  </button>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="ml-auto text-red-500 hover:text-red-700 font-semibold"
                  >
                    Remove
                  </button>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-orange-500 text-lg">
                  ₹{item.price * item.quantity}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Total and Checkout */}
      <div className="fixed bottom-0 left-0 right-0 bg-white shadow-2xl border-t border-gray-200">
        <div className="container-mobile py-4">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xl font-bold text-gray-800">Total:</span>
            <span className="text-2xl font-bold text-orange-500">
              ₹{getTotalPrice()}
            </span>
          </div>
          <button
            onClick={() => navigate('/checkout')}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-full font-bold text-lg transition"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
}
