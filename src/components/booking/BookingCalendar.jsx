import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const DAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
const MONTHS = [
  'January','February','March','April','May','June',
  'July','August','September','October','November','December',
];

const BookingCalendar = ({ selectedDate, onSelect, minDate }) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const initView = selectedDate
    ? new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1)
    : new Date(today.getFullYear(), today.getMonth(), 1);

  const [viewDate, setViewDate] = useState(initView);

  const min = minDate || today;

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const prevMonth = () => setViewDate(new Date(year, month - 1, 1));
  const nextMonth = () => setViewDate(new Date(year, month + 1, 1));

  const isDisabled = (day) => {
    const d = new Date(year, month, day);
    d.setHours(0, 0, 0, 0);
    return d < min;
  };

  const isSelected = (day) => {
    if (!selectedDate) return false;
    return (
      selectedDate.getFullYear() === year &&
      selectedDate.getMonth() === month &&
      selectedDate.getDate() === day
    );
  };

  const isToday = (day) => {
    const now = new Date();
    return (
      now.getFullYear() === year &&
      now.getMonth() === month &&
      now.getDate() === day
    );
  };

  const cells = [];
  for (let i = 0; i < firstDayOfMonth; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  return (
    <div
      style={{
        backgroundColor: '#0a1122',
        borderRadius: '8px',
        padding: '1rem',
        border: '1px solid rgba(212,175,55,0.2)',
        userSelect: 'none',
        minWidth: '280px',
      }}
    >
      {/* Header */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '1rem',
        }}
      >
        <button
          type="button"
          onClick={prevMonth}
          style={{
            color: '#9ca3af',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '4px',
            borderRadius: '4px',
            display: 'flex',
          }}
        >
          <ChevronLeft size={18} />
        </button>
        <span style={{ color: '#fff', fontWeight: 600, fontSize: '15px' }}>
          {MONTHS[month]} {year}
        </span>
        <button
          type="button"
          onClick={nextMonth}
          style={{
            color: '#9ca3af',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '4px',
            borderRadius: '4px',
            display: 'flex',
          }}
        >
          <ChevronRight size={18} />
        </button>
      </div>

      {/* Day headers */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(7, 1fr)',
          gap: '2px',
          marginBottom: '6px',
        }}
      >
        {DAYS.map((d) => (
          <div
            key={d}
            style={{
              textAlign: 'center',
              color: '#6b7280',
              fontSize: '11px',
              fontWeight: 600,
              padding: '2px 0',
            }}
          >
            {d}
          </div>
        ))}
      </div>

      {/* Day cells */}
      <div
        style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '2px' }}
      >
        {cells.map((day, idx) => (
          <div key={idx} style={{ textAlign: 'center' }}>
            {day ? (
              <button
                type="button"
                disabled={isDisabled(day)}
                onClick={() => !isDisabled(day) && onSelect(new Date(year, month, day))}
                style={{
                  width: '34px',
                  height: '34px',
                  borderRadius: '50%',
                  border: isToday(day) && !isSelected(day)
                    ? '1px solid rgba(212,175,55,0.5)'
                    : 'none',
                  backgroundColor: isSelected(day) ? '#D4AF37' : 'transparent',
                  color: isDisabled(day)
                    ? '#374151'
                    : isSelected(day)
                    ? '#080d1a'
                    : isToday(day)
                    ? '#D4AF37'
                    : '#e5e7eb',
                  cursor: isDisabled(day) ? 'not-allowed' : 'pointer',
                  fontSize: '13px',
                  fontWeight: isSelected(day) ? 700 : 400,
                  transition: 'background 0.15s',
                }}
              >
                {day}
              </button>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookingCalendar;
