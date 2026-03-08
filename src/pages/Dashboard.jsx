import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getUserBookings, getUserOrders, cancelBooking } from '../lib/api';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import StatusBadge from '../components/ui/StatusBadge';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import { CalendarDays, Clock, Users, MapPin, Package, ShoppingBag } from 'lucide-react';
import { formatDate, formatDateTime, formatPrice } from '../utils/formatters';

const TABS = ['Bookings', 'Orders'];

const Dashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('Bookings');
  const [bookings, setBookings] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [b, o] = await Promise.all([getUserBookings(), getUserOrders()]);
        setBookings(b);
        setOrders(o);
      } catch (err) {
        toast.error(err.message || 'Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  const handleCancelBooking = async (id) => {
    if (!window.confirm('Cancel this booking?')) return;
    try {
      await cancelBooking(id);
      toast.success('Booking cancelled');
      setBookings((prev) => prev.filter((b) => b._id !== id));
    } catch (err) {
      toast.error(err.message || 'Failed to cancel booking');
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div style={{ maxWidth: '860px', margin: '0 auto', padding: 'clamp(2rem, 5vw, 3rem) 1.5rem' }}>
      {/* Header */}
      <div style={{ marginBottom: '2rem' }}>
        <h1
          style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: 'clamp(2rem, 5vw, 3rem)',
            fontWeight: 700,
            color: '#ffffff',
            marginBottom: '0.25rem',
          }}
        >
          My Dashboard
        </h1>
        <p style={{ color: '#9ca3af', fontSize: '14px' }}>
          Welcome back, {user?.name?.split(' ')[0]}!
        </p>
      </div>

      {/* Summary Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2" style={{ gap: '1rem', marginBottom: '2rem' }}>
        {[
          { icon: <CalendarDays size={22} color="#D4AF37" />, label: 'Bookings', count: bookings.length },
          { icon: <ShoppingBag size={22} color="#D4AF37" />, label: 'Orders', count: orders.length },
        ].map((s) => (
          <div
            key={s.label}
            style={{
              backgroundColor: '#0f1628',
              border: '1px solid rgba(212,175,55,0.15)',
              borderRadius: '6px',
              padding: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
            }}
          >
            {s.icon}
            <div>
              <p style={{ fontSize: '24px', fontWeight: 700, color: '#fff' }}>{s.count}</p>
              <p style={{ fontSize: '13px', color: '#9ca3af' }}>{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div
        style={{
          display: 'flex',
          gap: '0',
          marginBottom: '1.5rem',
          borderBottom: '1px solid rgba(212,175,55,0.12)',
        }}
      >
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              padding: '10px 24px',
              fontSize: '14px',
              fontWeight: 600,
              fontFamily: 'inherit',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: activeTab === tab ? '#D4AF37' : '#9ca3af',
              borderBottom: activeTab === tab ? '2px solid #D4AF37' : '2px solid transparent',
              transition: 'color 0.15s',
              marginBottom: '-1px',
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Bookings Tab */}
      {activeTab === 'Bookings' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {bookings.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '4rem 0', color: '#6b7280' }}>
              <CalendarDays size={40} color="#374151" style={{ margin: '0 auto 1rem' }} />
              <p style={{ marginBottom: '0.5rem' }}>No bookings yet.</p>
              <Link to="/booking" style={{ color: '#D4AF37', fontSize: '13px', textDecoration: 'none', fontWeight: 600 }}>
                Book a table →
              </Link>
            </div>
          ) : (
            bookings.map((b) => (
              <div
                key={b._id}
                style={{
                  backgroundColor: '#0f1628',
                  border: '1px solid rgba(212,175,55,0.15)',
                  borderRadius: '6px',
                  padding: '1.5rem',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.75rem' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.25rem', marginBottom: '0.75rem' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#e5e7eb', fontSize: '14px' }}>
                        <CalendarDays size={14} color="#D4AF37" /> {b.date}
                      </span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#e5e7eb', fontSize: '14px' }}>
                        <Clock size={14} color="#D4AF37" /> {b.time}
                      </span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#e5e7eb', fontSize: '14px' }}>
                        <Users size={14} color="#D4AF37" /> {b.guests} {b.guests === 1 ? 'guest' : 'guests'}
                      </span>
                      {b.table?.tableNumber && (
                        <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#e5e7eb', fontSize: '14px' }}>
                          <MapPin size={14} color="#D4AF37" /> Table {b.table.tableNumber}
                        </span>
                      )}
                    </div>
                    {b.specialRequest && (
                      <p style={{ color: '#9ca3af', fontSize: '13px', marginBottom: '0.5rem' }}>
                        <span style={{ fontWeight: 600 }}>Note:</span> {b.specialRequest}
                      </p>
                    )}
                    <p style={{ color: '#6b7280', fontSize: '11px' }}>
                      Booked on {formatDateTime(b.createdAt)}
                    </p>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.5rem' }}>
                    <StatusBadge status={b.status} />
                    {b.status !== 'cancelled' && b.status !== 'completed' && (
                      <button
                        onClick={() => handleCancelBooking(b._id)}
                        style={{ color: '#ef4444', background: 'none', border: 'none', cursor: 'pointer', fontSize: '12px', fontFamily: 'inherit' }}
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Orders Tab */}
      {activeTab === 'Orders' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {orders.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '4rem 0', color: '#6b7280' }}>
              <Package size={40} color="#374151" style={{ margin: '0 auto 1rem' }} />
              <p>No orders yet.</p>
            </div>
          ) : (
            orders.map((order) => (
              <div
                key={order._id}
                style={{
                  backgroundColor: '#0f1628',
                  border: '1px solid rgba(212,175,55,0.15)',
                  borderRadius: '6px',
                  padding: '1.5rem',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.75rem' }}>
                  <div style={{ flex: 1 }}>
                    <p style={{ color: '#fff', fontWeight: 700, marginBottom: '0.4rem', fontSize: '15px' }}>
                      Order #{order._id?.substring(0, 8)}
                    </p>
                    <p style={{ color: '#9ca3af', fontSize: '12px', marginBottom: '0.75rem' }}>
                      {formatDateTime(order.createdAt)}
                    </p>
                    {order.items?.map((item, i) => (
                      <p key={i} style={{ color: '#e5e7eb', fontSize: '13px' }}>
                        {item.quantity}× {item.menuItem?.name || 'Item'} — {formatPrice(item.price)}
                      </p>
                    ))}
                    <p style={{ color: '#D4AF37', fontWeight: 700, marginTop: '0.75rem', fontSize: '15px' }}>
                      Total: {formatPrice(order.totalAmount ?? order.total)}
                    </p>
                  </div>
                  <StatusBadge status={order.status} />
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
