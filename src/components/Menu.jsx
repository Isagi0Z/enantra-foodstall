import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useMenuItems } from '../hooks/useMenuItems';
import { categories } from '../data/menuItems';
import Button from '../ui/Button';
import { Plus, Minus, ShoppingBag } from 'lucide-react';

export default function Menu() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const { addToCart, cart, updateQuantity } = useCart();
  const { menuItems, loading } = useMenuItems();
  const navigate = useNavigate();

  const filteredItems = selectedCategory === 'All'
    ? menuItems
    : menuItems.filter((item) => item.category === selectedCategory);

  const availableItems = filteredItems.filter(item => item.available !== false);
  const unavailableItems = filteredItems.filter(item => item.available === false);

  return (
    <div className="min-h-screen pb-20 px-4">
      {/* Page Header */}
      <div className="text-center py-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">
          Curated Menu
        </h1>
        <p className="text-zinc-400 text-lg">Delicious food, crafted with passion.</p>
      </div>

      {/* Category Filter */}
      <div className="flex justify-center mb-12">
        <div className="flex gap-2 overflow-x-auto pb-4 max-w-full no-scrollbar">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`
                px-6 py-2 rounded-full font-medium transition-all duration-300 whitespace-nowrap
                ${selectedCategory === category
                  ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/25 scale-105'
                  : 'bg-zinc-800/50 text-zinc-400 hover:bg-zinc-800 hover:text-white border border-white/5'
                }
              `}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Menu Grid */}
      <div className="container-mobile">
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-10 h-10 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <>
            {/* Available Items */}
            <motion.div
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
            >
              <AnimatePresence>
                {availableItems.map((item) => (
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    key={item.id}
                    className="group relative bg-zinc-900/40 backdrop-blur-sm border border-white/5 rounded-2xl overflow-hidden hover:border-orange-500/30 transition-all duration-300 hover:shadow-glow hover:-translate-y-1"
                  >
                    <div className="h-48 overflow-hidden relative">
                      <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent z-10 opacity-60" />
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                        onError={(e) => { e.target.style.display = 'none'; }}
                      />
                      <div className="absolute top-3 right-3 z-20 bg-zinc-900/80 backdrop-blur px-3 py-1 rounded-full border border-white/10">
                        <span className="text-orange-400 font-bold">₹{item.price}</span>
                      </div>
                    </div>

                    <div className="p-5 relative z-20">
                      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-orange-400 transition-colors">
                        {item.name}
                      </h3>
                      <p className="text-zinc-400 text-sm mb-4 line-clamp-2">{item.description}</p>

                      <div className="flex items-center justify-between mt-4">
                        <div className="text-xs text-zinc-500 font-medium uppercase tracking-wider">
                          {item.category}
                        </div>

                        {
                          (() => {
                            const cartItem = cart.find(c => c.id === item.id);
                            const quantity = cartItem ? cartItem.quantity : 0;

                            if (quantity > 0) {
                              return (
                                <div className="flex items-center gap-3 bg-zinc-800 rounded-lg p-1 border border-zinc-700">
                                  <button
                                    onClick={() => updateQuantity(item.id, quantity - 1)}
                                    className="w-6 h-6 flex items-center justify-center rounded-md hover:bg-zinc-700 text-zinc-400 hover:text-white transition-colors"
                                  >
                                    <Minus className="w-3 h-3" />
                                  </button>
                                  <span className="text-sm font-bold text-white w-4 text-center">{quantity}</span>
                                  <button
                                    onClick={() => addToCart(item)}
                                    className="w-6 h-6 flex items-center justify-center rounded-md bg-orange-500 hover:bg-orange-600 text-white transition-colors"
                                  >
                                    <Plus className="w-3 h-3" />
                                  </button>
                                </div>
                              );
                            }

                            return (
                              <Button
                                size="sm"
                                variant="primary"
                                onClick={() => addToCart(item)}
                                icon={Plus}
                              >
                                Add
                              </Button>
                            );
                          })()
                        }
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

            {/* Unavailable Items */}
            {unavailableItems.length > 0 && (
              <div className="mt-12 opacity-50 grayscale transition-all duration-300 hover:grayscale-0 hover:opacity-100">
                <h3 className="text-2xl font-bold text-zinc-500 mb-6 border-b border-zinc-800 pb-2">Currently Unavailable</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {unavailableItems.map((item) => (
                    <div key={item.id} className="bg-zinc-900/20 border border-zinc-800 rounded-2xl p-4 flex gap-4 items-center">
                      <div className="w-16 h-16 rounded-lg bg-zinc-800 overflow-hidden">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-zinc-400">{item.name}</h4>
                        <p className="text-sm text-zinc-600">₹{item.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {filteredItems.length === 0 && (
              <div className="text-center py-20 bg-zinc-900/30 rounded-3xl border border-white/5">
                <p className="text-zinc-500 text-lg">No items found in this category.</p>
                <Button variant="ghost" className="mt-4" onClick={() => setSelectedCategory('All')}>
                  View All Items
                </Button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Mobile Floating Cart Bar */}
      <AnimatePresence>
        {cart.length > 0 && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-4 left-4 right-4 z-50 md:hidden"
            onClick={() => navigate('/checkout')}
          >
            <div className="bg-orange-500/90 backdrop-blur-md rounded-xl p-4 shadow-lg shadow-orange-500/20 flex items-center justify-between border border-white/10 active:scale-95 transition-transform">
              <div className="flex flex-col">
                <span className="font-bold text-white">
                  {cart.reduce((sum, item) => sum + item.quantity, 0)} Items
                </span>
                <span className="text-xs text-orange-100">
                  ₹{cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)}
                </span>
              </div>
              <div className="flex items-center gap-2 font-semibold text-white">
                View Cart <ShoppingBag className="w-4 h-4" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
