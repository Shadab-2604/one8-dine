const generateSlots = () => {
  const slots = [];
  for (let h = 10; h <= 22; h++) {
    slots.push(`${String(h).padStart(2, '0')}:00`);
    if (h < 22) slots.push(`${String(h).padStart(2, '0')}:30`);
  }
  slots.push('22:30');
  return slots;
};

const TIME_SLOTS = generateSlots();

const TimePicker = ({ selectedTime, onSelect, minTime }) => {
  const isDisabled = (slot) => {
    if (!minTime) return false;
    return slot < minTime;
  };

  return (
    <div
      style={{
        backgroundColor: '#0a1122',
        borderRadius: '8px',
        padding: '1rem',
        border: '1px solid rgba(212,175,55,0.2)',
        maxHeight: '240px',
        overflowY: 'auto',
      }}
    >
      <p style={{ color: '#9ca3af', fontSize: '11px', marginBottom: '10px', fontWeight: 500 }}>
        SELECT TIME (Restaurant Hours: 10:00 – 22:30)
      </p>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '6px',
        }}
      >
        {TIME_SLOTS.map((slot) => {
          const disabled = isDisabled(slot);
          const active = selectedTime === slot;
          return (
            <button
              key={slot}
              type="button"
              disabled={disabled}
              onClick={() => !disabled && onSelect(slot)}
              style={{
                padding: '7px 4px',
                borderRadius: '4px',
                fontSize: '12px',
                fontWeight: active ? 700 : 400,
                backgroundColor: active ? '#D4AF37' : 'transparent',
                color: disabled ? '#374151' : active ? '#080d1a' : '#e5e7eb',
                border: active ? 'none' : '1px solid rgba(212,175,55,0.2)',
                cursor: disabled ? 'not-allowed' : 'pointer',
                transition: 'all 0.15s',
              }}
            >
              {slot}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default TimePicker;
