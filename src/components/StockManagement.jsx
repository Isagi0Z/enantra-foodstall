import { useMenuItems } from '../hooks/useMenuItems';
import { motion, AnimatePresence } from 'framer-motion';
import { Package, Check, X } from 'lucide-react';

export default function StockManagement() {
  const { menuItems, loading, updateAvailability } = useMenuItems();

  const toggleAvailability = async (itemId, currentStatus) => {
    try {
      await updateAvailability(itemId, !currentStatus);
    } catch (error) {
      console.error('Error toggling availability:', error);
      alert('Failed to update availability. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="p-8 text-center text-zinc-500">
        <div className="w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
        Loading inventory...
      </div>
    );
  }

  return (
    <div className="p-6">
      <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
        <Package className="w-5 h-5 text-orange-500" />
        Stock Management
      </h3>

      <div className="max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
        <div className="grid gap-3">
          <AnimatePresence>
            {menuItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={`
                  flex justify-between items-center p-3 rounded-xl border transition-all
                  ${item.available
                    ? 'bg-zinc-800/40 border-green-500/20'
                    : 'bg-red-500/5 border-red-500/20 opacity-75'
                  }
                `}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-zinc-800 overflow-hidden">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover opacity-80" onError={(e) => e.target.style.display = 'none'} />
                  </div>
                  <div>
                    <p className={`font-semibold text-sm ${item.available ? 'text-zinc-200' : 'text-zinc-400'}`}>
                      {item.name}
                    </p>
                    <p className="text-xs text-zinc-600">₹{item.price}</p>
                  </div>
                </div>

                <button
                  onClick={() => toggleAvailability(item.id, item.available)}
                  className={`
                    w-9 h-9 flex items-center justify-center rounded-lg transition-colors
                    ${item.available
                      ? 'bg-green-500/10 text-green-500 hover:bg-red-500/20 hover:text-red-500'
                      : 'bg-red-500/10 text-red-500 hover:bg-green-500/20 hover:text-green-500'
                    }
                  `}
                  title={item.available ? "Mark as Out of Stock" : "Mark as In Stock"}
                >
                  {item.available ? <Check className="w-5 h-5" /> : <X className="w-5 h-5" />}
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {menuItems.length === 0 && (
        <p className="text-zinc-500 text-center py-8">
          No items in catalog.
        </p>
      )}
    </div>
  );
}

