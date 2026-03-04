import { useState, useEffect } from 'react';
import { getAllBookings, updateBookingStatus } from '../../lib/api';
import toast from 'react-hot-toast';
import AdminHeader from '../../components/admin/AdminHeader';
import StatusBadge from '../../components/ui/StatusBadge';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import { Mail, Phone, CalendarDays, Clock, Users, MapPin } from 'lucide-react';
import { formatDateTime } from '../../utils/formatters';

const FILTER_TABS = ['All', 'Pending', 'Confirmed', 'Completed', 'Cancelled'];
const STATUSES = ['pending', 'confirmed', 'completed', 'cancelled'];

const AdminBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [filter, setFilter] = useState('All');
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    try {
      const data = await getAllBookings();
      setBookings(data);
    } catch (err) {
      toast.error(err.message || 'Failed to load bookings');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchBookings(); }, []);

  const updateStatus = async (id, status) => {
    try {
      await updateBookingStatus(id, status);
      toast.success('Status updated');
      setBookings((prev) => prev.map((b) => b._id === id ? { ...b, status } : b));
    } catch (err) {
      toast.error(err.message || 'Failed to update status');
    }
  };

  const filtered =
    filter === 'All' ? bookings : bookings.filter((b) => b.status === filter.toLowerCase());

  if (loading) return (
    <>
      <AdminHeader title="Booking Management" />
      <LoadingSpinner />
    </>
  );

  return (
    <>
      <AdminHeader title="Booking Management" />
      <div style={{ maxWidth: '960px', margin: '0 auto', padding: '2rem 1.5rem' }}>

        {/* Filter Tabs */}
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.75rem' }}>
          {FILTER_TABS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={{
                padding: '6px 16px',
                borderRadius: '9999px',
                fontSize: '13px',
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

        {/* Booking Cards */}
        {filtered.length === 0 ? (
          <div style={{ textAlign: 'center', color: '#6b7280', padding: '4rem 0' }}>
            No bookings for this filter.
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {filtered.map((b) => (
              <div
                key={b._id}
                style={{
                  backgroundColor: '#0f1628',
                  border: '1px solid rgba(212,175,55,0.12)',
                  borderRadius: '6px',
                  padding: '1.5rem',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem', flexWrap: 'wrap' }}>
                  {/* Customer Info */}
                  <div style={{ flex: 1 }}>
                    <p style={{ color: '#fff', fontWeight: 700, fontSize: '17px', marginBottom: '0.4rem' }}>
                      {b.user?.name || 'Unknown'}
                    </p>
                    <p style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#9ca3af', fontSize: '13px', marginBottom: '3px' }}>
                      <Mail size={13} /> {b.user?.email}
                    </p>
                    <p style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#9ca3af', fontSize: '13px', marginBottom: '1rem' }}>
                      <Phone size={13} /> {b.user?.phone || 'N/A'}
                    </p>

                    {/* Booking Details */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.25rem', marginBottom: '0.75rem' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#e5e7eb', fontSize: '13px' }}>
                        <CalendarDays size={13} color="#D4AF37" /> {b.date}
                      </span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#e5e7eb', fontSize: '13px' }}>
                        <Clock size={13} color="#D4AF37" /> {b.time}
                      </span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#e5e7eb', fontSize: '13px' }}>
                        <Users size={13} color="#D4AF37" /> {b.guests} guests
                      </span>
                      {b.table?.tableNumber && (
                        <span style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#e5e7eb', fontSize: '13px' }}>
                          <MapPin size={13} color="#D4AF37" /> Table {b.table.tableNumber}
                        </span>
                      )}
                    </div>

                    {/* Special Requests */}
                    {b.specialRequest && (
                      <div
                        style={{
                          backgroundColor: '#080d1a',
                          border: '1px solid rgba(255,255,255,0.06)',
                          borderRadius: '4px',
                          padding: '0.75rem 1rem',
                          marginBottom: '0.75rem',
                        }}
                      >
                        <p style={{ color: '#9ca3af', fontSize: '12px', fontWeight: 600, marginBottom: '4px' }}>
                          Special Requests:
                        </p>
                        <p style={{ color: '#e5e7eb', fontSize: '13px' }}>{b.specialRequest}</p>
                      </div>
                    )}

                    <p style={{ color: '#6b7280', fontSize: '11px' }}>
                      Booked on {formatDateTime(b.createdAt)}
                    </p>
                  </div>

                  {/* Status Column */}
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.75rem', minWidth: '140px' }}>
                    <StatusBadge status={b.status} />
                    <select
                      value={b.status}
                      onChange={(e) => updateStatus(b._id, e.target.value)}
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
                      {STATUSES.map((s) => (
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

export default AdminBookings;
