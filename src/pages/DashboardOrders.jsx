import { useState, useEffect } from 'react';
import { getUserOrders } from '../lib/api';
import toast from 'react-hot-toast';

const DashboardOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const data = await getUserOrders();
      setOrders(data || []);
    } catch (err) {
      console.error(err);
      toast.error('Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="text-center py-20">Loading...</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-serif text-gold mb-8">My Orders</h1>
      {orders.length === 0 ? (
        <p className="text-gray-400">You have no orders yet.</p>
      ) : (
        <div className="space-y-4">
          {orders.map(order => (
            <div key={order._id} className="bg-charcoal border border-gold/20 rounded-lg p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-lg font-semibold text-gold">Order #{order._id.substring(0, 8)}</p>
                  <p className="text-sm text-gray-400">{new Date(order.createdAt).toLocaleDateString()}</p>
                  <ul className="mt-2 space-y-1">
                    {order.items && order.items.map((item, idx) => (
                      <li key={idx} className="text-gray-300">{item.quantity}x Item - ${item.price}</li>
                    ))}
                  </ul>
                  <p className="mt-2 font-bold text-gold">Total: ${(order.totalAmount ?? order.total)?.toFixed(2)}</p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span className={`px-3 py-1 rounded text-sm font-medium ${
                    order.status === 'completed' ? 'bg-green-900 text-green-300' : 
                    order.status === 'ready' ? 'bg-blue-900 text-blue-300' : 
                    order.status === 'preparing' ? 'bg-yellow-900 text-yellow-300' : 
                    'bg-gray-800 text-gray-300'
                  }`}>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </span>
                  {/* Order cancellation is not supported by the backend API */}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DashboardOrders;