import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useOrders } from '../hooks/useOrders';
import { useNavigate } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';
import StockManagement from './StockManagement';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../ui/Button';
import { LogOut, Trash, Clock, CheckCircle, Package, RefreshCw, Smartphone, ChefHat } from 'lucide-react';
import { cn } from '../utils/cn';

export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const { orders, loading, completeOrder, deleteCompletedOrders } = useOrders();
  const navigate = useNavigate();
  const [isDeleting, setIsDeleting] = useState(false);

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

  const handleResetCompleted = async () => {
    if (!window.confirm(`Are you sure you want to delete all ${completedOrders.length} completed orders? This action cannot be undone.`)) {
      return;
    }

    setIsDeleting(true);
    try {
      await deleteCompletedOrders();
    } catch (error) {
      console.error('Error deleting orders:', error);
      alert('Failed to delete completed orders. Please try again.');
    } finally {
      setIsDeleting(false);
    }
  };

  const OrderCard = ({ order }) => {
    const createdAt = order.createdAt instanceof Date
      ? order.createdAt
      : new Date(order.orderNumber || Date.now());

    const timeAgo = Math.floor((new Date() - createdAt) / 1000 / 60);

    return (
      <motion.div
        layout
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className={cn(
          "bg-zinc-900/40 backdrop-blur-md rounded-2xl p-5 border shadow-lg transition-all hover:border-opacity-50",
          order.status === 'pending'
            ? "border-orange-500/20 hover:border-orange-500/50"
            : "border-white/5 hover:border-white/10"
        )}
      >
        <div className="flex justify-between items-start mb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-xl font-bold text-white">#{order.orderNumber}</h3>
              {order.status === 'pending' && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-orange-500/20 text-orange-400 text-xs font-medium animate-pulse">
                  <Clock className="w-3 h-3" /> New
                </span>
              )}
            </div>

            <p className="text-sm text-zinc-500">
              {timeAgo < 1 ? 'Just now' : `${timeAgo}m ago`}
            </p>
          </div>
          <div className="text-xl font-bold text-orange-400">
            ₹{order.total}
          </div>
        </div>

        <div className="border-t border-white/5 pt-4 space-y-4">
          <div>
            <p className="text-xs font-medium text-zinc-500 uppercase tracking-wider mb-2">Items</p>
            <div className="space-y-1">
              {order.items.map((item, idx) => (
                <div key={idx} className="flex justify-between text-sm">
                  <span className="text-zinc-300">{item.name} <span className="text-zinc-500">× {item.quantity}</span></span>
                  <span className="text-zinc-500">₹{item.price * item.quantity}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-between items-center text-sm bg-zinc-800/50 rounded-lg p-2 px-3">
            <span className="text-zinc-500">Method</span>
            <span className="text-zinc-300 capitalize font-medium">{order.paymentMethod || 'Cash'}</span>
          </div>

          {order.status === 'pending' && (
            <Button
              className="w-full"
              variant="primary"
              onClick={() => completeOrder(order.id)}
              icon={CheckCircle}
            >
              Mark Completed
            </Button>
          )}
        </div>
      </motion.div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin text-orange-500">
          <RefreshCw className="w-8 h-8" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-zinc-950/80 backdrop-blur-xl border-b border-white/5 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/20">
              <ChefHat className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Kitchen Dashboard</h1>
              <p className="text-xs text-zinc-500">Good Job, {user?.email?.split('@')[0] || 'Chef'}!</p>
            </div>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={handleLogout}
            className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
            icon={LogOut}
          >
            Logout
          </Button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          {/* Stats Card */}
          <div className="bg-zinc-900/50 backdrop-blur-md rounded-2xl p-6 border border-white/5">
            <h3 className="text-lg font-bold text-white mb-4">Snapshot</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-zinc-800/50 rounded-xl border border-white/5">
                <span className="text-zinc-400 text-sm">Pending</span>
                <span className="text-xl font-bold text-orange-500">{pendingOrders.length}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-zinc-800/50 rounded-xl border border-white/5">
                <span className="text-zinc-400 text-sm">Today's Total</span>
                <span className="text-xl font-bold text-white">{orders.length}</span>
              </div>
            </div>
          </div>

          {/* QR Code */}
          <div className="bg-zinc-900/50 backdrop-blur-md rounded-2xl p-6 border border-white/5 text-center">
            <h3 className="text-lg font-bold text-white mb-2 flex items-center justify-center gap-2">
              <Smartphone className="w-5 h-5 text-orange-500" />
              Live Menu
            </h3>
            <p className="text-xs text-zinc-500 mb-4">Scan for customer view</p>
            <div className="bg-white p-2 rounded-xl inline-block">
              <QRCodeSVG value={window.location.origin} size={150} />
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3 space-y-8">
          {/* Stock Management Component (Should be refactored too) */}
          <div className="bg-zinc-900/30 rounded-2xl p-1 border border-white/5 overflow-hidden">
            <StockManagement />
          </div>

          {/* Pending Orders */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Clock className="w-5 h-5 text-orange-500" />
              Pending Queue
              <span className="bg-zinc-800 text-zinc-400 px-2 py-0.5 rounded-full text-xs">{pendingOrders.length}</span>
            </h2>

            {pendingOrders.length === 0 ? (
              <div className="bg-zinc-900/20 rounded-2xl p-12 text-center border border-white/5 border-dashed">
                <div className="w-16 h-16 bg-zinc-800/50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Package className="w-8 h-8 text-zinc-600" />
                </div>
                <p className="text-zinc-500 text-lg">All caught up! No pending orders.</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-4">
                <AnimatePresence mode='popLayout'>
                  {pendingOrders.map((order) => (
                    <OrderCard key={order.id} order={order} />
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>

          {/* Completed Orders */}
          {completedOrders.length > 0 && (
            <div className="space-y-4 pt-8 border-t border-white/5">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-zinc-400 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  Completed
                </h2>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={handleResetCompleted}
                  disabled={isDeleting}
                  className="text-zinc-500 hover:text-red-400"
                  icon={Trash}
                >
                  Clear History
                </Button>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 opacity-75">
                {completedOrders.slice(-6).reverse().map((order) => (
                  <OrderCard key={order.id} order={order} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
