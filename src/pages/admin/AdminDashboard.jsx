import { useState, useEffect } from 'react';
import { getAdminStats } from '../../lib/api';
import { Link } from 'react-router-dom';
import { Users, CalendarDays, ShoppingBag, DollarSign } from 'lucide-react';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import AdminHeader from '../../components/admin/AdminHeader';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import { formatPrice } from '../../utils/formatters';

const STAT_CARDS = (stats) => [
  { label: 'Total Users',    value: stats?.totalUsers ?? 0,            icon: Users,       color: '#3b82f6' },
  { label: 'Total Bookings', value: stats?.totalBookings ?? 0,         icon: CalendarDays,color: '#10b981' },
  { label: 'Total Orders',   value: stats?.totalOrders ?? 0,           icon: ShoppingBag, color: '#f59e0b' },
  { label: 'Total Revenue',  value: formatPrice(stats?.totalRevenue),  icon: DollarSign,  color: '#D4AF37' },
];

const QUICK_LINKS = [
  { to: '/admin/users',    label: 'Manage Users' },
  { to: '/admin/bookings', label: 'Manage Bookings' },
  { to: '/admin/menu',     label: 'Manage Menu' },
  { to: '/admin/orders',   label: 'Manage Orders' },
];

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAdminStats()
      .then(setStats)
      .catch(() => toast.error('Failed to load stats'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return (
    <>
      <AdminHeader title="Admin Dashboard" showBack={false} backPath="/" />
      <LoadingSpinner />
    </>
  );

  return (
    <>
      <AdminHeader title="Admin Dashboard" showBack={false} backPath="/" />
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '2.5rem 1.5rem' }}>

        {/* Stat Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.25rem', marginBottom: '3rem' }}>
          {STAT_CARDS(stats).map((card, i) => (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.45 }}
              style={{
                backgroundColor: '#0f1628',
                border: '1px solid rgba(212,175,55,0.15)',
                borderRadius: '6px',
                padding: '1.75rem 1.5rem',
                transition: 'border-color 0.2s',
              }}
              whileHover={{ scale: 1.03 }}
            >
              <card.icon size={28} color={card.color} style={{ marginBottom: '1rem' }} />
              <p style={{ fontSize: '28px', fontWeight: 700, color: '#fff', marginBottom: '0.3rem' }}>
                {card.value}
              </p>
              <p style={{ color: '#9ca3af', fontSize: '13px' }}>{card.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Quick Links */}
        <h2
          style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: '22px',
            fontWeight: 700,
            color: '#D4AF37',
            marginBottom: '1rem',
          }}
        >
          Quick Actions
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem' }}>
          {QUICK_LINKS.map((ql) => (
            <Link
              key={ql.to}
              to={ql.to}
              style={{
                display: 'block',
                backgroundColor: '#0f1628',
                border: '1px solid rgba(212,175,55,0.15)',
                borderRadius: '6px',
                padding: '1.25rem',
                textAlign: 'center',
                color: '#9ca3af',
                textDecoration: 'none',
                fontSize: '14px',
                fontWeight: 500,
                transition: 'border-color 0.15s, color 0.15s',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#D4AF37'; e.currentTarget.style.color = '#D4AF37'; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(212,175,55,0.15)'; e.currentTarget.style.color = '#9ca3af'; }}
            >
              {ql.label}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
