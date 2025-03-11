import React, { useState } from 'react';
import { FaStar, FaClock, FaLeaf, FaShoppingCart, FaMoon, FaSun, FaArrowLeft, FaTrash } from 'react-icons/fa';
import { restaurants } from './data/restaurants';
import { menuItems } from './data/menu';
import { motion } from 'framer-motion';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  const filteredRestaurants = restaurants.filter(restaurant => 
    restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    restaurant.cuisine.some(c => c.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  const addToCart = (menuItem) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === menuItem.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === menuItem.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...menuItem, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const updateQuantity = (id, amount) => {
    setCart(prevCart =>
      prevCart
        .map(item => (item.id === id ? { ...item, quantity: Math.max(1, item.quantity + amount) } : item))
        .filter(item => item.quantity > 0)
    );
  };

  const renderSpiceLevel = (level) => {
    const spiceIcons = {
      Mild: '🌶️',
      Medium: '🌶️🌶️',
      Hot: '🌶️🌶️🌶️',
      'Extra Hot': '🌶️🌶️🌶️🌶️'
    };
    return spiceIcons[level] || '';
  };

  return (
    <div className={`${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'} min-h-screen pb-20`}>
      {/* Header */}
      <header className="bg-orange-600 text-white p-4 shadow-lg flex justify-between items-center">
        <h1 className="text-2xl font-bold">Indian Food Delivery</h1>
        <button onClick={() => setDarkMode(!darkMode)} className="text-white text-lg">
          {darkMode ? <FaSun /> : <FaMoon />}
        </button>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search restaurants..."
            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:border-orange-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Restaurant List */}
        {!selectedRestaurant ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredRestaurants.map(restaurant => (
              <motion.div
                key={restaurant.id}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden cursor-pointer transform hover:scale-105 transition-transform"
                onClick={() => setSelectedRestaurant(restaurant)}
                whileHover={{ scale: 1.05 }}
              >
                <img src={restaurant.image} alt={restaurant.name} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h2 className="text-xl font-bold text-orange-600">{restaurant.name}</h2>
                  <p className="text-gray-600 dark:text-gray-300">{restaurant.cuisine.join(', ')}</p>
                  <div className="flex items-center mt-2 space-x-4">
                    <span className="flex items-center text-yellow-500">
                      <FaStar className="mr-1" />
                      {restaurant.rating}
                    </span>
                    <span className="flex items-center text-gray-500">
                      <FaClock className="mr-1" />
                      {restaurant.deliveryTime} min
                    </span>
                    {restaurant.isVegetarian && (
                      <span className="flex items-center text-green-600">
                        <FaLeaf className="mr-1" />
                        Pure Veg
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div>
            <button onClick={() => setSelectedRestaurant(null)} className="mb-4 text-orange-600 hover:text-orange-700 flex items-center">
              <FaArrowLeft className="mr-2" /> Back to Restaurants
            </button>
            
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-2xl font-bold text-orange-600 mb-2">{selectedRestaurant.name}</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">{selectedRestaurant.cuisine.join(', ')}</p>

              <div className="grid gap-6">
                {['Starters', 'Main Course', 'Desserts', 'Beverages'].map(category => {
                  const categoryItems = menuItems.filter(item => item.category === category);
                  if (categoryItems.length === 0) return null;

                  return (
                    <div key={category}>
                      <h3 className="text-xl font-semibold mb-4">{category}</h3>
                      <div className="grid gap-4">
                        {categoryItems.map(item => (
                          <div key={item.id} className="border-b border-gray-200 dark:border-gray-700 pb-4 flex justify-between items-start">
                            <div>
                              <h4 className="font-medium">{item.name}</h4>
                              <p className="text-gray-600 text-sm dark:text-gray-400">{item.description}</p>
                              <span className="text-gray-500 text-sm">{renderSpiceLevel(item.spiceLevel)}</span>
                            </div>
                            <div className="text-right">
                              <div className="font-medium">₹{item.price}</div>
                              <button
                                onClick={() => addToCart(item)}
                                className="mt-2 bg-orange-600 text-white px-4 py-1 rounded-full text-sm hover:bg-orange-700"
                              >
                                Add to Cart
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Cart Footer */}
      <footer className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <span className="font-bold text-lg">Cart Total: ₹{cartTotal.toFixed(2)}</span>
          <button className="bg-orange-600 text-white px-6 py-2 rounded-lg flex items-center">
            <FaShoppingCart className="mr-2" />
            View Cart ({cart.reduce((total, item) => total + item.quantity, 0)})
          </button>
        </div>
      </footer>
    </div>
  );
}
