import { useState, useRef, useEffect } from 'react';
import { createBooking, checkAvailability } from '../lib/api';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { CalendarDays, Clock, ChevronDown, Users, MessageSquare, CheckCircle } from 'lucide-react';
import BookingCalendar from '../components/booking/BookingCalendar';
import TimePicker from '../components/booking/TimePicker';
import { toApiDate, toDisplayDate } from '../utils/formatters';
import { motion } from 'framer-motion';

const BOOKING_BG =
  'https://images.pexels.com/photos/4992827/pexels-photo-4992827.jpeg?auto=compress&cs=tinysrgb&w=1920';

const SIDE_IMAGE =
  'https://images.pexels.com/photos/2452281/pexels-photo-2452281.jpeg?auto=compress&cs=tinysrgb&w=900';

const InputLabel = ({ children }) => (
  <label
    style={{
      display: 'block',
      color: '#9ca3af',
      fontSize: '11px',
      fontWeight: 600,
      marginBottom: '7px',
      textTransform: 'uppercase',
      letterSpacing: '0.06em',
    }}
  >
    {children}
  </label>
);

const Booking = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState('');
  const [guests, setGuests] = useState(2);
  const [specialRequest, setSpecialRequest] = useState('');
  const [selectedTable, setSelectedTable] = useState(null);
  const [availableTables, setAvailableTables] = useState([]);
  const [showCalendar, setShowCalendar] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [checking, setChecking] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [booked, setBooked] = useState(false);
  const calendarRef = useRef(null);
  const timeRef = useRef(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handler = (e) => {
      if (calendarRef.current && !calendarRef.current.contains(e.target)) setShowCalendar(false);
      if (timeRef.current && !timeRef.current.contains(e.target)) setShowTimePicker(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // Reset tables when inputs change
  useEffect(() => {
    setAvailableTables([]);
    setSelectedTable(null);
  }, [selectedDate, selectedTime, guests]);

  const getMinTime = () => {
    if (!selectedDate) return '';
    const today = new Date(); today.setHours(0, 0, 0, 0);
    const sel = new Date(selectedDate); sel.setHours(0, 0, 0, 0);
    if (sel.getTime() === today.getTime()) {
      const now = new Date();
      const h = String(now.getHours()).padStart(2, '0');
      const m = now.getMinutes() < 30 ? '30' : '00';
      const nextH = now.getMinutes() < 30 ? h : String(now.getHours() + 1).padStart(2, '0');
      return now.getMinutes() < 30 ? `${h}:${m}` : `${nextH}:00`;
    }
    return '';
  };

  const handleCheckAvailability = async () => {
    if (!selectedDate || !selectedTime) {
      toast.error('Please select a date and time');
      return;
    }
    setChecking(true);
    try {
      const data = await checkAvailability(toApiDate(selectedDate), selectedTime, guests);
      const tables = data.availableTables || [];
      setAvailableTables(tables);
      if (tables.length === 0) toast.error('No tables available for that slot');
      else toast.success(`${tables.length} table${tables.length > 1 ? 's' : ''} available`);
    } catch (err) {
      toast.error(err.message || 'Failed to check availability');
    } finally {
      setChecking(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedDate || !selectedTime) { toast.error('Please select a date and time'); return; }
    if (!selectedTable) { toast.error('Please check availability and select a table'); return; }
    setSubmitting(true);
    try {
      await createBooking({
        tableId: selectedTable._id,
        date: toApiDate(selectedDate),
        time: selectedTime,
        guests: Number(guests),
        specialRequest: specialRequest.trim(),
      });
      setBooked(true);
    } catch (err) {
      toast.error(err.message || 'Booking failed');
    } finally {
      setSubmitting(false);
    }
  };

  // ── Success state ──────────────────────────────────────
  if (booked) {
    return (
      <div
        style={{
          minHeight: 'calc(100vh - 64px)',
          backgroundColor: '#080d1a',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem 1.5rem',
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          style={{
            textAlign: 'center',
            maxWidth: '440px',
            width: '100%',
            backgroundColor: '#0f1628',
            border: '1px solid rgba(212,175,55,0.25)',
            borderRadius: '10px',
            padding: '3rem 2rem',
          }}
        >
          <CheckCircle size={52} color="#D4AF37" style={{ margin: '0 auto 1.5rem' }} />
          <h2
            style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: '2rem',
              fontWeight: 700,
              color: '#fff',
              marginBottom: '0.75rem',
            }}
          >
            Reservation Confirmed!
          </h2>
          <p style={{ color: '#9ca3af', fontSize: '14px', lineHeight: 1.75, marginBottom: '2rem' }}>
            Your table has been reserved for{' '}
            <span style={{ color: '#D4AF37', fontWeight: 600 }}>
              {toDisplayDate(selectedDate)} at {selectedTime}
            </span>{' '}
            for {guests} guest{guests !== 1 ? 's' : ''}. We look forward to welcoming you!
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              onClick={() => navigate('/dashboard')}
              className="btn-gold"
              style={{ fontSize: '13px' }}
            >
              View My Bookings
            </button>
            <button
              onClick={() => { setBooked(false); setSelectedDate(null); setSelectedTime(''); setSelectedTable(null); setAvailableTables([]); setSpecialRequest(''); setGuests(2); }}
              className="btn-outline-gold"
              style={{ fontSize: '13px' }}
            >
              Book Another
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  const dropdownBtnStyle = {
    width: '100%',
    backgroundColor: '#080d1a',
    border: '1px solid rgba(212,175,55,0.2)',
    borderRadius: '2px',
    padding: '12px 16px',
    color: '#ffffff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    cursor: 'pointer',
    fontFamily: 'inherit',
    fontSize: '14px',
    transition: 'border-color 0.2s',
  };

  return (
    <div style={{ backgroundColor: '#080d1a', minHeight: '100vh' }}>
      {/* ── Banner ──────────────────────────────────────────── */}
      <div
        style={{
          position: 'relative',
          height: 'clamp(200px, 32vh, 320px)',
          overflow: 'hidden',
        }}
      >
        <img
          src={BOOKING_BG}
          alt="Elegant dining table setting — Rachel Claire on Pexels"
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 35%' }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to bottom, rgba(8,13,26,0.5) 0%, rgba(8,13,26,0.85) 100%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            padding: '1.5rem',
          }}
        >
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{
              color: '#D4AF37',
              fontSize: '11px',
              fontWeight: 600,
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              marginBottom: '0.6rem',
              display: 'block',
            }}
          >
            Reservations
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: 'clamp(2rem, 6vw, 3.75rem)',
              fontWeight: 700,
              color: '#ffffff',
            }}
          >
            Book a Table
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25 }}
            style={{ color: '#d1d5db', fontSize: '14px', marginTop: '0.4rem' }}
          >
            Reserve your exclusive dining experience
          </motion.p>
        </div>
      </div>

      {/* ── Main content ─────────────────────────────────────── */}
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '3rem 1.5rem 5rem' }}>
        <div className="booking-grid">
          {/* ── Form card ─────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{
              backgroundColor: '#0f1628',
              border: '1px solid rgba(212,175,55,0.18)',
              borderRadius: '8px',
              padding: 'clamp(1.5rem, 4vw, 2.5rem)',
            }}
          >
            <h2
              style={{
                fontFamily: 'Cormorant Garamond, serif',
                fontSize: '1.75rem',
                fontWeight: 700,
                color: '#ffffff',
                marginBottom: '0.25rem',
              }}
            >
              Make a Reservation
            </h2>
            <p style={{ color: '#9ca3af', fontSize: '13px', marginBottom: '2rem' }}>
              Welcome, {user?.name?.split(' ')[0]}. Fill in the details below.
            </p>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {/* Date */}
              <div ref={calendarRef} style={{ position: 'relative' }}>
                <InputLabel>Date</InputLabel>
                <button
                  type="button"
                  onClick={() => { setShowCalendar(!showCalendar); setShowTimePicker(false); }}
                  style={dropdownBtnStyle}
                  onMouseEnter={(e) => (e.currentTarget.style.borderColor = '#D4AF37')}
                  onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'rgba(212,175,55,0.2)')}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <CalendarDays size={15} color="#D4AF37" />
                    <span style={{ color: selectedDate ? '#fff' : '#6b7280' }}>
                      {selectedDate ? toDisplayDate(selectedDate) : 'Select a date'}
                    </span>
                  </span>
                  <ChevronDown size={15} color="#6b7280" />
                </button>
                {showCalendar && (
                  <div style={{ position: 'absolute', top: 'calc(100% + 4px)', left: 0, zIndex: 30 }}>
                    <BookingCalendar
                      selectedDate={selectedDate}
                      onSelect={(d) => { setSelectedDate(d); setShowCalendar(false); }}
                      minDate={new Date()}
                    />
                  </div>
                )}
              </div>

              {/* Time */}
              <div ref={timeRef} style={{ position: 'relative' }}>
                <InputLabel>Time</InputLabel>
                <button
                  type="button"
                  onClick={() => { setShowTimePicker(!showTimePicker); setShowCalendar(false); }}
                  style={dropdownBtnStyle}
                  onMouseEnter={(e) => (e.currentTarget.style.borderColor = '#D4AF37')}
                  onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'rgba(212,175,55,0.2)')}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Clock size={15} color="#D4AF37" />
                    <span style={{ color: selectedTime ? '#fff' : '#6b7280' }}>
                      {selectedTime || 'Select a time'}
                    </span>
                  </span>
                  <ChevronDown size={15} color="#6b7280" />
                </button>
                {showTimePicker && (
                  <div style={{ position: 'absolute', top: 'calc(100% + 4px)', left: 0, zIndex: 30 }}>
                    <TimePicker
                      selectedTime={selectedTime}
                      onSelect={(t) => { setSelectedTime(t); setShowTimePicker(false); }}
                      minTime={getMinTime()}
                    />
                  </div>
                )}
              </div>

              {/* Guests */}
              <div>
                <InputLabel>Number of Guests</InputLabel>
                <div style={{ position: 'relative' }}>
                  <Users
                    size={15}
                    color="#D4AF37"
                    style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}
                  />
                  <input
                    type="number"
                    min="1"
                    max="20"
                    value={guests}
                    onChange={(e) => setGuests(parseInt(e.target.value) || 1)}
                    className="input-dark"
                    style={{ paddingLeft: '40px' }}
                  />
                </div>
              </div>

              {/* Check Availability */}
              <button
                type="button"
                onClick={handleCheckAvailability}
                disabled={checking || !selectedDate || !selectedTime}
                className="btn-outline-gold"
                style={{ fontSize: '13px', letterSpacing: '0.04em' }}
              >
                {checking ? 'Checking…' : 'Check Availability'}
              </button>

              {/* Table Selection */}
              {availableTables.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <InputLabel>Select Table</InputLabel>
                  <select
                    value={selectedTable?._id || ''}
                    onChange={(e) =>
                      setSelectedTable(availableTables.find((t) => t._id === e.target.value) || null)
                    }
                    className="input-dark"
                    style={{ cursor: 'pointer' }}
                  >
                    <option value="">Choose a table…</option>
                    {availableTables.map((t) => (
                      <option key={t._id} value={t._id}>
                        Table {t.tableNumber} — Seats {t.capacity}
                      </option>
                    ))}
                  </select>
                </motion.div>
              )}

              {/* Special Requests */}
              <div>
                <InputLabel>Special Requests (optional)</InputLabel>
                <div style={{ position: 'relative' }}>
                  <MessageSquare
                    size={15}
                    color="#D4AF37"
                    style={{ position: 'absolute', left: '14px', top: '14px', pointerEvents: 'none' }}
                  />
                  <textarea
                    value={specialRequest}
                    onChange={(e) => setSpecialRequest(e.target.value)}
                    placeholder="Dietary requirements, allergies, occasions…"
                    rows={3}
                    className="input-dark"
                    style={{ paddingLeft: '40px', resize: 'vertical' }}
                  />
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={submitting || !selectedTable}
                className="btn-gold"
                style={{ marginTop: '0.5rem', fontSize: '13px', letterSpacing: '0.06em', textTransform: 'uppercase' }}
              >
                {submitting ? 'Confirming Reservation…' : 'Confirm Reservation'}
              </button>
            </form>
          </motion.div>

          {/* ── Side image & info ─────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="booking-side"
          >
            {/* Side image */}
            <div
              style={{
                position: 'relative',
                borderRadius: '8px',
                overflow: 'hidden',
                height: '280px',
                marginBottom: '1.5rem',
              }}
            >
              <img
                src={SIDE_IMAGE}
                alt="Fine wine dining experience — Gül Işık on Pexels"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(8,13,26,0.7) 0%, transparent 60%)',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  bottom: '1.25rem',
                  left: '1.5rem',
                  right: '1.5rem',
                }}
              >
                <p
                  style={{
                    fontFamily: 'Cormorant Garamond, serif',
                    fontSize: '19px',
                    fontStyle: 'italic',
                    color: '#ffffff',
                    lineHeight: 1.5,
                  }}
                >
                  "An evening at One8 Dine is an experience to cherish forever."
                </p>
              </div>
            </div>

            {/* Info cards */}
            {[
              { icon: '🕕', title: 'Opening Hours', lines: ['Mon–Thu: 6 pm – 11 pm', 'Fri–Sat: 6 pm – 12 am', 'Sunday: 5 pm – 10 pm'] },
              { icon: '📍', title: 'Location', lines: ['123 Gourmet Street', 'Fine Dining District'] },
              { icon: '📞', title: 'Reservations', lines: ['+1 (555) 123-4567', 'reservations@one8dine.com'] },
            ].map((card) => (
              <div
                key={card.title}
                style={{
                  backgroundColor: '#0f1628',
                  border: '1px solid rgba(212,175,55,0.15)',
                  borderRadius: '6px',
                  padding: '1.25rem',
                  marginBottom: '1rem',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.6rem' }}>
                  <span style={{ fontSize: '16px' }}>{card.icon}</span>
                  <h4
                    style={{
                      color: '#D4AF37',
                      fontSize: '12px',
                      fontWeight: 700,
                      letterSpacing: '0.07em',
                      textTransform: 'uppercase',
                    }}
                  >
                    {card.title}
                  </h4>
                </div>
                {card.lines.map((line) => (
                  <p key={line} style={{ color: '#9ca3af', fontSize: '13px', lineHeight: 1.7 }}>{line}</p>
                ))}
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      <style>{`
        .booking-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2rem;
        }
        @media (min-width: 900px) {
          .booking-grid {
            grid-template-columns: 1fr 380px;
            align-items: start;
          }
        }
        @media (max-width: 899px) {
          .booking-side {
            display: none;
          }
        }
      `}</style>
    </div>
  );
};

export default Booking;
