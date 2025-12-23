import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../config/firebase';
import { motion } from 'framer-motion';
import Button from '../ui/Button';
import { CheckCircle, Clock, ChefHat, ShoppingBag, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';

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

    // Fire confetti once on load
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#f97316', '#ea580c', '#fbbf24']
    });

    return () => unsubscribe();
  }, [orderId, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background">
        <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-zinc-500">Retrieving your order...</p>
      </div>
    );
  }

  if (!order) return null;

  const steps = [
    { status: 'pending', icon: Clock, label: 'Pending' },
    { status: 'preparing', icon: ChefHat, label: 'Preparing' },
    { status: 'ready', icon: CheckCircle, label: 'Ready' },
  ];

  const currentStepIndex = steps.findIndex(s => s.status === order.status);
  const isCompleted = order.status === 'completed';

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <div className="container-mobile max-w-lg">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-panel p-8 text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', bounce: 0.5 }}
            className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-green-500/20"
          >
            <CheckCircle className="w-10 h-10 text-green-500" />
          </motion.div>

          <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
            Order Successfully Placed!
          </h1>
          <p className="text-zinc-400 mb-8">
            Your order <span className="text-orange-400 font-mono">#{order.orderNumber}</span> has been received.
          </p>

          {/* Status Tracker */}
          <div className="bg-zinc-900/50 rounded-xl p-6 mb-8 border border-white/5">
            <div className="flex justify-between relative">
              {/* Progress Line */}
              <div className="absolute top-1/2 left-0 w-full h-0.5 bg-zinc-800 -z-10 -translate-y-1/2" />
              <div
                className="absolute top-1/2 left-0 h-0.5 bg-orange-500 -z-10 -translate-y-1/2 transition-all duration-500"
                style={{ width: `${(Math.max(0, currentStepIndex) / (steps.length - 1)) * 100}%` }}
              />

              {steps.map((step, index) => {
                const isActive = index <= currentStepIndex || isCompleted;
                const isCurrent = index === currentStepIndex && !isCompleted;
                const Icon = step.icon;

                return (
                  <div key={step.status} className="flex flex-col items-center gap-2 bg-zinc-900/50 px-2 rounded-lg">
                    <div className={`
                      w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300
                      ${isActive ? 'bg-orange-500 border-orange-500 text-white' : 'bg-zinc-800 border-zinc-700 text-zinc-500'}
                      ${isCurrent ? 'animate-pulse ring-4 ring-orange-500/20' : ''}
                    `}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className={`text-xs font-medium ${isActive ? 'text-white' : 'text-zinc-500'}`}>
                      {step.label}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="mt-6 p-3 bg-orange-500/10 rounded-lg border border-orange-500/10">
              <p className="text-sm text-orange-200">
                {order.status === 'pending' && "We've received your order. The kitchen will start soon!"}
                {order.status === 'preparing' && "Your food is being prepared with love! 👨‍🍳"}
                {order.status === 'ready' && "Your order is ready for pickup! Enoy your meal! 🍽️"}
                {order.status === 'completed' && "Order completed. Hope you enjoyed the food!"}
              </p>
            </div>
          </div>

          <div className="border-t border-white/5 pt-6 text-left space-y-3 mb-8">
            <div className="flex justify-between text-zinc-400 text-sm">
              <span>Total Amount</span>
              <span className="text-white font-bold text-lg">₹{order.total}</span>
            </div>
            <div className="flex justify-between text-zinc-400 text-sm">
              <span>Payment Method</span>
              <span className="text-white capitalize">{order.paymentMethod}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Button
              variant="secondary"
              onClick={() => navigate('/')}
            >
              Home
            </Button>
            <Button
              variant="primary"
              onClick={() => navigate('/menu')}
              icon={ArrowRight}
            >
              Order More
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
