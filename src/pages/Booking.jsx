import { useState, useRef, useEffect } from 'react';
import { createBooking, checkAvailability } from '../lib/api';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { CalendarDays, Clock, ChevronDown } from 'lucide-react';
import BookingCalendar from '../components/booking/BookingCalendar';
import TimePicker from '../components/booking/TimePicker';
import { toApiDate, toDisplayDate } from '../utils/formatters';

const Booking = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState('');
  const [guests, setGuests] = useState(2);
  const [specialRequest, setSpecialRequest] = useState('');

  const [showCalendar, setShowCalendar] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const [availability, setAvailability] = useState(null);
  const [checking, setChecking] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const calendarRef = useRef(null);
  const timeRef = useRef(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handler = (e) => {
      if (calendarRef.current && !calendarRef.current.contains(e.target)) {
        setShowCalendar(false);
      }
      if (timeRef.current && !timeRef.current.contains(e.target)) {
        setShowTimePicker(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // Reset availability when date/time/guests change
  useEffect(() => {
    setAvailability(null);
  }, [selectedDate, selectedTime, guests]);

  const getMinTime = () => {
    if (!selectedDate) return '';
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const sel = new Date(selectedDate);
    sel.setHours(0, 0, 0, 0);
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
      toast.error('Please select a date and time first');
      return;
    }
    setChecking(true);
    setAvailability(null);
    try {
      const data = await checkAvailability(toApiDate(selectedDate), selectedTime, guests);
      const tables = data.availableTables || [];
      if (tables.length > 0) {
        setAvailability({ ok: true, message: `${tables.length} table(s) available — you're all set!` });
      } else {
        setAvailability({ ok: false, message: 'No tables available for the selected date, time and party size.' });
      }
    } catch (err) {
      setAvailability({ ok: false, message: err.message || 'No tables available for the selected time.' });
    } finally {
      setChecking(false);
    }
  };

  const handleConfirmBooking = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      toast.error('Please login to make a booking');
      navigate('/login');
      return;
    }
    if (!selectedDate || !selectedTime) {
      toast.error('Please select date and time');
      return;
    }
    setSubmitting(true);
    try {
      await createBooking({
        date: toApiDate(selectedDate),
        time: selectedTime,
        guests: Number(guests),
        specialRequest: specialRequest || '',
      });
      toast.success('Booking confirmed!');
      navigate('/dashboard');
    } catch (err) {
      toast.error(err.message || 'Failed to create booking');
    } finally {
      setSubmitting(false);
    }
  };

  const inputBase = {
    width: '100%',
    backgroundColor: '#080d1a',
    border: '1px solid rgba(212,175,55,0.25)',
    borderRadius: '4px',
    padding: '12px 16px',
    color: '#fff',
    fontSize: '14px',
    fontFamily: 'Montserrat, sans-serif',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    transition: 'border-color 0.15s',
    outline: 'none',
  };

  return (
    <div
      style={{
        minHeight: '90vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '3rem 1.5rem',
        backgroundColor: '#080d1a',
      }}
    >
      {/* Heading */}
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h1
          style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: 'clamp(2.5rem, 6vw, 4rem)',
            fontWeight: 700,
            color: '#ffffff',
            marginBottom: '0.5rem',
          }}
        >
          Book a Table
        </h1>
        <p style={{ color: '#9ca3af', fontSize: '15px' }}>Reserve your dining experience</p>
      </div>

      {/* Form Card */}
      <div
        style={{
          width: '100%',
          maxWidth: '580px',
          backgroundColor: '#0f1628',
          border: '1px solid rgba(212,175,55,0.2)',
          borderRadius: '8px',
          padding: '2rem',
        }}
      >
        <h2
          style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: '22px',
            fontWeight: 700,
            color: '#fff',
            marginBottom: '1.75rem',
          }}
        >
          Reservation Details
        </h2>

        <form onSubmit={handleConfirmBooking} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {/* Date + Time row */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            {/* Date */}
            <div ref={calendarRef} style={{ position: 'relative' }}>
              <label style={{ display: 'block', color: '#9ca3af', fontSize: '12px', fontWeight: 500, marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Date
              </label>
              <button
                type="button"
                onClick={() => { setShowCalendar((v) => !v); setShowTimePicker(false); }}
                style={inputBase}
              >
                <span style={{ display: 'flex', alignItems: 'center', gap: '8px', color: selectedDate ? '#fff' : '#6b7280' }}>
                  <CalendarDays size={15} color="#D4AF37" />
                  {selectedDate ? toDisplayDate(selectedDate) : 'dd/mm/yyyy'}
                </span>
                <ChevronDown size={14} color="#6b7280" />
              </button>
              {showCalendar && (
                <div style={{ position: 'absolute', top: 'calc(100% + 6px)', left: 0, zIndex: 60 }}>
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
              <label style={{ display: 'block', color: '#9ca3af', fontSize: '12px', fontWeight: 500, marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Time
              </label>
              <button
                type="button"
                onClick={() => { setShowTimePicker((v) => !v); setShowCalendar(false); }}
                style={inputBase}
              >
                <span style={{ display: 'flex', alignItems: 'center', gap: '8px', color: selectedTime ? '#fff' : '#6b7280' }}>
                  <Clock size={15} color="#D4AF37" />
                  {selectedTime || '--:--'}
                </span>
                <ChevronDown size={14} color="#6b7280" />
              </button>
              {showTimePicker && (
                <div style={{ position: 'absolute', top: 'calc(100% + 6px)', left: 0, zIndex: 60, minWidth: '260px' }}>
                  <TimePicker
                    selectedTime={selectedTime}
                    onSelect={(t) => { setSelectedTime(t); setShowTimePicker(false); }}
                    minTime={getMinTime()}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Guests */}
          <div>
            <label style={{ display: 'block', color: '#9ca3af', fontSize: '12px', fontWeight: 500, marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Number of Guests
            </label>
            <select
              value={guests}
              onChange={(e) => setGuests(Number(e.target.value))}
              className="input-dark"
              style={{ cursor: 'pointer' }}
            >
              {[1,2,3,4,5,6,7,8,9,10].map((n) => (
                <option key={n} value={n} style={{ backgroundColor: '#0f1628' }}>
                  {n} {n === 1 ? 'guest' : 'guests'}
                </option>
              ))}
            </select>
          </div>

          {/* Check Availability */}
          <button
            type="button"
            onClick={handleCheckAvailability}
            disabled={checking}
            style={{
              width: '100%',
              padding: '12px',
              border: '1px solid rgba(255,255,255,0.15)',
              borderRadius: '4px',
              backgroundColor: 'transparent',
              color: '#e5e7eb',
              fontSize: '14px',
              fontWeight: 600,
              fontFamily: 'inherit',
              cursor: checking ? 'wait' : 'pointer',
              transition: 'border-color 0.15s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = '#D4AF37')}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)')}
          >
            {checking ? 'Checking…' : 'Check Availability'}
          </button>

          {/* Availability result */}
          {availability && (
            <div
              style={{
                padding: '12px 16px',
                borderRadius: '4px',
                backgroundColor: availability.ok ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.1)',
                border: `1px solid ${availability.ok ? 'rgba(16,185,129,0.3)' : 'rgba(239,68,68,0.3)'}`,
                color: availability.ok ? '#10b981' : '#ef4444',
                fontSize: '13px',
                fontWeight: 500,
              }}
            >
              {availability.message}
            </div>
          )}

          {/* Special Requests */}
          <div>
            <label style={{ display: 'block', color: '#9ca3af', fontSize: '12px', fontWeight: 500, marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Special Requests <span style={{ textTransform: 'none', fontWeight: 400 }}>(Optional)</span>
            </label>
            <textarea
              value={specialRequest}
              onChange={(e) => setSpecialRequest(e.target.value)}
              rows={4}
              placeholder="Any dietary restrictions or special occasions?"
              className="input-dark"
              style={{ resize: 'vertical', minHeight: '90px' }}
            />
          </div>

          {/* Confirm */}
          <button
            type="submit"
            disabled={submitting}
            style={{
              width: '100%',
              padding: '14px',
              backgroundColor: '#D4AF37',
              color: '#080d1a',
              border: 'none',
              borderRadius: '4px',
              fontSize: '14px',
              fontWeight: 700,
              fontFamily: 'inherit',
              cursor: submitting ? 'wait' : 'pointer',
              letterSpacing: '0.05em',
              transition: 'opacity 0.15s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.88')}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
          >
            {submitting ? 'Confirming…' : 'Confirm Booking'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Booking;
