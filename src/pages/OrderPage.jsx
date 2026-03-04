import { useState, useEffect } from 'react';
import { createOrder } from '../lib/api';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const OrderPage = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);

  // For demo purposes, we'll populate with sample items
  useEffect(() => {
    setItems([
      { _id: '1', name: 'Margherita Pizza', description: 'Fresh mozzarella and basil', price: 12.99 },
      { _id: '2', name: 'Caesar Salad', description: 'Crispy romaine with parmesan', price: 9.99 },
      { _id: '3', name: 'Grilled Salmon', description: 'Atlantic salmon with lemon butter', price: 24.99 }
    ]);
  }, []);

  const placeOrder = async () => {
    if (items.length === 0) {
      toast.error('No items to order');
      return;
    }
    setLoading(true);
    try {
      // Backend expects: { items: [{ menuItemId, quantity }] }
      const orderData = {
        items: items.slice(0, 1).map(item => ({
          menuItemId: item._id,
          quantity,
        })),
      };
      await createOrder(orderData);
      toast.success('Order placed successfully!');
      navigate('/dashboard');
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to place order');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* banner */}
      <section className="relative h-56 flex items-center justify-center text-center bg-[url('https://source.unsplash.com/1600x900/?food,menu')] bg-cover bg-center">
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative z-10">
          <h1 className="text-4xl font-serif text-gold">Place Your Order</h1>
        </div>
      </section>

      <div className="max-w-md mx-auto px-4 py-12">
        <div className="bg-charcoal border border-gold/20 rounded-lg p-6">
          {items.length > 0 && (
            <>
              <h2 className="text-2xl font-serif text-gold mb-2">{items[0].name}</h2>
              <p className="text-gray-400 mb-4">{items[0].description}</p>
              <p className="text-3xl font-bold text-gold mb-6">${items[0].price}</p>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-300 mb-2">Quantity</label>
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                  className="w-full bg-dark border border-gold/20 rounded px-4 py-2 text-white focus:outline-none focus:border-gold"
                />
              </div>

              <p className="text-xl mb-4 text-gray-300">Total: <span className="text-gold font-bold">${(items[0].price * quantity).toFixed(2)}</span></p>

              <button
                onClick={placeOrder}
                disabled={loading}
                className="w-full bg-gold text-dark py-2 rounded font-semibold hover:bg-gold/80 transition disabled:opacity-50"
              >
                {loading ? 'Placing Order...' : 'Confirm Order'}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderPage;