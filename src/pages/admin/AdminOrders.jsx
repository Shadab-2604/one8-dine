import { useState, useEffect } from 'react';
import { getAllOrders, updateOrderStatus } from '../../lib/api';
import toast from 'react-hot-toast';
import AdminHeader from '../../components/admin/AdminHeader';
import StatusBadge from '../../components/ui/StatusBadge';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import { formatDateTime, formatPrice } from '../../utils/formatters';

const ORDER_STATUSES = ['pending', 'confirmed', 'preparing', 'served', 'cancelled'];
const FILTER_TABS = ['All', 'Pending', 'Confirmed', 'Preparing', 'Served', 'Cancelled'];

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState('All');
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const data = await getAllOrders();
      setOrders(data);
    } catch (err) {
      toast.error(err.message || 'Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchOrders(); }, []);

  const updateStatus = async (id, status) => {
    try {
      await updateOrderStatus(id, status);
      toast.success('Order status updated');
      setOrders((prev) => prev.map((o) => o._id === id ? { ...o, status } : o));
    } catch (err) {
      toast.error(err.message || 'Failed to update status');
    }
  };

  const filtered =
    filter === 'All' ? orders : orders.filter((o) => o.status === filter.toLowerCase());

  if (loading) return (
    <>
      <AdminHeader title="Order Management" />
      <LoadingSpinner />
    </>
  );

  return (
    <>
      <AdminHeader title="Order Management" />
      <div style={{ maxWidth: '960px', margin: '0 auto', padding: '2rem 1.5rem' }}>

        {/* Filter Tabs */}
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.75rem' }}>
          {FILTER_TABS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={{
                padding: '6px 14px',
                borderRadius: '9999px',
                fontSize: '12px',
                fontWeight: 600,
                fontFamily: 'inherit',
                cursor: 'pointer',
                backgroundColor: filter === f ? '#fff' : 'transparent',
                color: filter === f ? '#080d1a' : '#9ca3af',
                border: filter === f ? 'none' : '1px solid rgba(255,255,255,0.15)',
                transition: 'all 0.15s',
              }}
            >
              {f}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div style={{ textAlign: 'center', color: '#6b7280', padding: '4rem 0' }}>
            No orders for this filter.
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {filtered.map((order) => (
              <div
                key={order._id}
                style={{
                  backgroundColor: '#0f1628',
                  border: '1px solid rgba(212,175,55,0.12)',
                  borderRadius: '6px',
                  padding: '1.5rem',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem', flexWrap: 'wrap' }}>
                  <div style={{ flex: 1 }}>
                    <p style={{ color: '#fff', fontWeight: 700, fontSize: '16px', marginBottom: '0.3rem' }}>
                      {order.user?.name || 'Unknown'}
                    </p>
                    <p style={{ color: '#9ca3af', fontSize: '12px', marginBottom: '1rem' }}>
                      Order #{order._id?.substring(0, 10)} · {formatDateTime(order.createdAt)}
                    </p>
                    <div style={{ marginBottom: '0.75rem' }}>
                      {order.items?.map((item, i) => (
                        <div key={i} style={{ display: 'flex', justifyContent: 'space-between', color: '#e5e7eb', fontSize: '13px', marginBottom: '3px' }}>
                          <span>{item.quantity}× {item.menuItem?.name || 'Item'}</span>
                          <span>{formatPrice(item.price * item.quantity)}</span>
                        </div>
                      ))}
                    </div>
                    <p style={{ color: '#D4AF37', fontWeight: 700, fontSize: '16px' }}>
                      Total: {formatPrice(order.totalAmount ?? order.total)}
                    </p>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.75rem', minWidth: '140px' }}>
                    <StatusBadge status={order.status} />
                    <select
                      value={order.status}
                      onChange={(e) => updateStatus(order._id, e.target.value)}
                      style={{
                        backgroundColor: '#080d1a',
                        border: '1px solid rgba(212,175,55,0.2)',
                        borderRadius: '4px',
                        color: '#fff',
                        padding: '7px 10px',
                        fontSize: '13px',
                        cursor: 'pointer',
                        fontFamily: 'inherit',
                        width: '140px',
                      }}
                    >
                      {ORDER_STATUSES.map((s) => (
                        <option key={s} value={s} style={{ backgroundColor: '#0f1628' }}>
                          {s.charAt(0).toUpperCase() + s.slice(1)}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default AdminOrders;
