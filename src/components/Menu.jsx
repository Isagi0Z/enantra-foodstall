import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { menuItems, categories } from '../data/menuItems';

export default function Menu() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const { addToCart, getTotalItems } = useCart();
  const navigate = useNavigate();

  const filteredItems =
    selectedCategory === 'All'
      ? menuItems
      : menuItems.filter((item) => item.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="container-mobile py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate('/')}
              className="text-orange-500 font-bold text-xl"
            >
              ← Enantra
            </button>
            <button
              onClick={() => navigate('/cart')}
              className="relative bg-orange-500 text-white px-4 py-2 rounded-full font-semibold hover:bg-orange-600 transition"
            >
              Cart ({getTotalItems()})
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white py-12">
        <div className="container-mobile text-center">
          <h1 className="text-4xl font-bold mb-2">Our Menu</h1>
          <p className="text-orange-100">Delicious food, made fresh daily</p>
        </div>
      </div>

      {/* Category Filter */}
      <div className="container-mobile py-6">
        <div className="flex gap-2 overflow-x-auto pb-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full font-semibold whitespace-nowrap transition ${
                selectedCategory === category
                  ? 'bg-orange-500 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Menu Items */}
      <div className="container-mobile">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow"
            >
              <div className="h-48 bg-gradient-to-br from-orange-100 to-orange-200 flex items-center justify-center">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              </div>
              <div className="p-5">
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {item.name}
                </h3>
                <p className="text-gray-600 text-sm mb-4">{item.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-orange-500">
                    ₹{item.price}
                  </span>
                  <button
                    onClick={() => addToCart(item)}
                    className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-full font-semibold transition"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
