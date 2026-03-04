import { useState, useEffect } from 'react';
import { getUserBookings, cancelBooking as cancelBookingAPI } from '../lib/api';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const DashboardBookings = () => {
  const { token } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const data = await getUserBookings();
      setBookings(data || []);
    } catch (err) {
      console.error(err);
      toast.error('Failed to load bookings');
    } finally {
      setLoading(false);
    }
  };

  const cancelBooking = async (id) => {
    if (!confirm('Are you sure you want to cancel this booking?')) return;
    try {
      await cancelBookingAPI(id);
      toast.success('Booking cancelled');
      fetchBookings();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to cancel booking');
    }
  };

  if (loading) return <div className="text-center py-20">Loading...</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-serif text-gold mb-8">My Bookings</h1>
      {bookings.length === 0 ? (
        <p className="text-gray-400">You have no bookings. <Link to="/booking" className="text-gold hover:underline">Book a table</Link></p>
      ) : (
        <div className="space-y-4">
          {bookings.map(b => (
            <div key={b._id} className="bg-charcoal border border-gold/20 rounded-lg p-6">
              <div className="flex flex-wrap justify-between items-start">
                <div>
                  <p className="text-xl font-semibold text-gold">{b.date} at {b.time}</p>
                  <p className="text-gray-400">{b.guests} {b.guests === 1 ? 'guest' : 'guests'}</p>
                  {b.specialRequest && <p className="text-sm text-gray-500 mt-2">Special requests: {b.specialRequest}</p>}
                  <p className="text-xs text-gray-600 mt-2">Booked on {new Date(b.createdAt).toLocaleDateString()}</p>
                </div>
                <div className="flex gap-2 items-center">
                  <span className={`px-3 py-1 rounded text-sm font-medium ${
                    b.status === 'confirmed' ? 'bg-green-900 text-green-300' : 
                    b.status === 'pending' ? 'bg-yellow-900 text-yellow-300' : 
                    'bg-gray-800 text-gray-300'
                  }`}>
                    {b.status.charAt(0).toUpperCase() + b.status.slice(1)}
                  </span>
                  {b.status !== 'cancelled' && b.status !== 'completed' && (
                    <button onClick={() => cancelBooking(b._id)} className="text-red-500 hover:text-red-400 text-sm">Cancel</button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DashboardBookings;