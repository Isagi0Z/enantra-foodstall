import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../ui/Button';
import { Minus, Plus, Trash2, ArrowRight, ShoppingCart } from 'lucide-react';

export default function Cart() {
  const { cart, updateQuantity, removeFromCart, getTotalPrice } = useCart();
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="w-24 h-24 bg-zinc-800/50 rounded-full flex items-center justify-center mx-auto mb-6 border border-zinc-700">
            <ShoppingCart className="w-10 h-10 text-zinc-500" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">
            Your cart is empty
          </h2>
          <p className="text-zinc-500 mb-8 max-w-sm mx-auto">
            Looks like you haven't added any delicious food yet. Start digging in!
          </p>
          <Button
            size="lg"
            variant="primary"
            onClick={() => navigate('/menu')}
          >
            Browse Menu
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="container-mobile py-8 pb-32">
      <h1 className="text-3xl font-bold text-white mb-8 border-b border-white/5 pb-4">
        Your Cart <span className="text-zinc-500 text-lg font-medium ml-2">({cart.length} items)</span>
      </h1>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Cart Items List */}
        <div className="lg:col-span-2 space-y-4">
          <AnimatePresence mode='popLayout'>
            {cart.map((item) => (
              <motion.div
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                key={item.id}
                className="bg-zinc-900/50 backdrop-blur-sm border border-white/5 rounded-2xl p-4 sm:p-5 flex gap-4 sm:gap-6 items-center group transition-all hover:border-orange-500/20"
              >
                <div className="w-20 h-20 sm:w-24 sm:h-24 bg-zinc-800 rounded-xl flex-shrink-0 overflow-hidden relative">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                    onError={(e) => { e.target.style.display = 'none'; }}
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-lg text-white truncate pr-4">{item.name}</h3>
                    <p className="font-bold text-orange-400">₹{item.price * item.quantity}</p>
                  </div>
                  <p className="text-sm text-zinc-500 mb-4">₹{item.price} each</p>

                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1 bg-zinc-800 rounded-lg p-1 border border-zinc-700">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-7 h-7 flex items-center justify-center rounded-md bg-zinc-700 text-white hover:bg-zinc-600 transition-colors disabled:opacity-50"
                        disabled={item.quantity <= 1}
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-8 text-center font-semibold text-white text-sm">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-7 h-7 flex items-center justify-center rounded-md bg-zinc-700 text-white hover:bg-zinc-600 transition-colors"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-zinc-500 hover:text-red-400 p-2 rounded-lg hover:bg-red-400/10 transition-colors ml-auto group-hover:opacity-100 sm:opacity-0 w-8 h-8 flex items-center justify-center"
                      title="Remove Item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="sticky top-28 bg-zinc-900/80 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-xl">
            <h3 className="text-xl font-bold text-white mb-6">Order Summary</h3>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-zinc-400">
                <span>Subtotal</span>
                <span>₹{getTotalPrice()}</span>
              </div>
              <div className="flex justify-between text-zinc-400">
                <span>Tax (5%)</span>
                <span>₹{Math.round(getTotalPrice() * 0.05)}</span>
              </div>
              <div className="flex justify-between text-zinc-400">
                <span>Platform Fee</span>
                <span>₹5</span>
              </div>
              <div className="border-t border-white/10 my-4 pt-4 flex justify-between text-lg font-bold text-white">
                <span>Total</span>
                <span>₹{Math.round(getTotalPrice() * 1.05) + 5}</span>
              </div>
            </div>

            <Button
              className="w-full"
              size="lg"
              variant="primary"
              onClick={() => navigate('/checkout')}
              icon={ArrowRight}
            >
              Proceed to Checkout
            </Button>

            <p className="text-xs text-zinc-500 text-center mt-4">
              Secure Checkout • Fast Delivery
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
