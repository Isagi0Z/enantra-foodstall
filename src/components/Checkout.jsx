import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { motion } from 'framer-motion';
import Button from '../ui/Button';
import { CreditCard, Wallet, Banknote, ArrowLeft, CheckCircle } from 'lucide-react';

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

  const PaymentOption = ({ id, label, icon: Icon, description }) => (
    <div
      onClick={() => setPaymentMethod(id)}
      className={`
        cursor-pointer p-4 rounded-xl border transition-all duration-300 relative overflow-hidden group
        ${paymentMethod === id
          ? 'bg-orange-500/10 border-orange-500 shadow-[0_0_15px_rgba(249,115,22,0.2)]'
          : 'bg-zinc-900/50 border-white/5 hover:bg-zinc-800 hover:border-white/10'
        }
      `}
    >
      <div className="flex items-center gap-4 relative z-10">
        <div className={`
          p-3 rounded-full transition-colors
          ${paymentMethod === id ? 'bg-orange-500 text-white' : 'bg-zinc-800 text-zinc-400 group-hover:bg-zinc-700 group-hover:text-zinc-200'}
        `}>
          <Icon className="w-6 h-6" />
        </div>
        <div>
          <h3 className={`font-semibold ${paymentMethod === id ? 'text-orange-500' : 'text-white'}`}>
            {label}
          </h3>
          <p className="text-sm text-zinc-500">{description}</p>
        </div>
        {paymentMethod === id && (
          <motion.div
            layoutId="check"
            className="ml-auto"
          >
            <CheckCircle className="w-6 h-6 text-orange-500" />
          </motion.div>
        )}
      </div>
    </div>
  );

  return (
    <div className="container-mobile py-8 pb-32">
      <Button
        variant="ghost"
        onClick={() => navigate('/cart')}
        className="mb-8 pl-0 hover:bg-transparent hover:text-orange-500 transition-colors"
        icon={ArrowLeft}
      >
        Back to Cart
      </Button>

      <div className="grid lg:grid-cols-2 gap-12">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <h1 className="text-3xl font-bold text-white mb-2">Checkout</h1>
          <p className="text-zinc-500 mb-8">Choose how you'd like to pay for your order.</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <label className="text-sm font-semibold uppercase tracking-wider text-zinc-500">Payment Method</label>
              <PaymentOption
                id="cash"
                label="Cash on Delivery"
                icon={Banknote}
                description="Pay cash when you pick up your order"
              />
              <PaymentOption
                id="upi"
                label="UPI / Scanner"
                icon={Wallet}
                description="Scan QR code at the counter"
              />
              <PaymentOption
                id="card"
                label="Card Payment"
                icon={CreditCard}
                description="Credit or Debit card"
              />
            </div>

            {error && (
              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-200 text-sm">
                {error}
              </div>
            )}

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full mt-8"
              size="lg"
              variant="primary"
              isLoading={isSubmitting}
            >
              {isSubmitting ? 'Processing...' : `Pay ₹${getTotalPrice()}`}
            </Button>
          </form>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-zinc-900/50 backdrop-blur-md border border-white/5 rounded-2xl p-6 h-fit"
        >
          <h2 className="text-xl font-bold text-white mb-6">Order Summary</h2>
          <div className="space-y-4 mb-6">
            {cart.map((item) => (
              <div key={item.id} className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-zinc-800 rounded-lg overflow-hidden">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <p className="text-white font-medium">{item.name}</p>
                    <p className="text-xs text-zinc-500">Qty: {item.quantity}</p>
                  </div>
                </div>
                <span className="text-zinc-300 font-medium">₹{item.price * item.quantity}</span>
              </div>
            ))}
          </div>

          <div className="border-t border-white/10 pt-4 space-y-2">
            <div className="flex justify-between text-zinc-400">
              <span>Subtotal</span>
              <span>₹{getTotalPrice()}</span>
            </div>
            <div className="flex justify-between text-zinc-400">
              <span>Fees</span>
              <span>₹5</span>
            </div>
            <div className="flex justify-between text-xl font-bold text-white mt-4">
              <span>Total</span>
              <span>₹{Number(getTotalPrice()) + 5}</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
