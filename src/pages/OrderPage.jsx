import { useState, useEffect, useRef } from 'react';
import { createOrder, getMenuItems, checkAvailability } from '../lib/api';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { CalendarDays, Clock, ChevronDown, Plus, Minus, Search, ShoppingCart, X } from 'lucide-react';
import BookingCalendar from '../components/booking/BookingCalendar';
import TimePicker from '../components/booking/TimePicker';
import { toApiDate, toDisplayDate, formatPrice } from '../utils/formatters';
import { motion, AnimatePresence } from 'framer-motion';

const ORDER_BANNER =
  'https://images.pexels.com/photos/8743944/pexels-photo-8743944.jpeg?auto=compress&cs=tinysrgb&w=1920';

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

const OrderPage = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [menuItems, setMenuItems] = useState([]);
  const [cart, setCart] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortOption, setSortOption] = useState('name-asc');
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState('');
  const [guests, setGuests] = useState(2);
  const [selectedTable, setSelectedTable] = useState(null);
  const [availableTables, setAvailableTables] = useState([]);
  const [showCalendar, setShowCalendar] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [checking, setChecking] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [showCartMobile, setShowCartMobile] = useState(false);
  const calendarRef = useRef(null);
  const timeRef = useRef(null);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const items = await getMenuItems();
        setMenuItems(items);
      } catch {
        toast.error('Failed to load menu');
      }
    };
    fetchMenu();
  }, []);

  useEffect(() => {
    const handler = (e) => {
      if (calendarRef.current && !calendarRef.current.contains(e.target)) setShowCalendar(false);
      if (timeRef.current && !timeRef.current.contains(e.target)) setShowTimePicker(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  useEffect(() => {
    setAvailableTables([]);
    setSelectedTable(null);
  }, [selectedDate, selectedTime, guests]);

  const addToCart = (item) => {
    setCart((prev) => {
      const existing = prev.find((c) => c._id === item._id);
      if (existing) return prev.map((c) => c._id === item._id ? { ...c, quantity: c.quantity + 1 } : c);
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const updateQuantity = (id, qty) => {
    if (qty <= 0) setCart((prev) => prev.filter((c) => c._id !== id));
    else setCart((prev) => prev.map((c) => c._id === id ? { ...c, quantity: qty } : c));
  };

  const getMinTime = () => {
    if (!selectedDate) return '';
    const today = new Date(); today.setHours(0, 0, 0, 0);
    const sel = new Date(selectedDate); sel.setHours(0, 0, 0, 0);
    if (sel.getTime() === today.getTime()) {
      const now = new Date();
      const h = String(now.getHours()).padStart(2, '0');
      const nextH = String(now.getHours() + 1).padStart(2, '0');
      return now.getMinutes() < 30 ? `${h}:30` : `${nextH}:00`;
    }
    return '';
  };

  const handleCheckAvailability = async () => {
    if (!selectedDate || !selectedTime) { toast.error('Please select a date and time'); return; }
    setChecking(true);
    try {
      const data = await checkAvailability(toApiDate(selectedDate), selectedTime, guests);
      const tables = data.availableTables || [];
      setAvailableTables(tables);
      if (!tables.length) toast.error('No tables available for that slot');
      else toast.success(`${tables.length} table${tables.length > 1 ? 's' : ''} available`);
    } catch (err) {
      toast.error(err.message || 'Failed to check availability');
    } finally {
      setChecking(false);
    }
  };

  const placeOrder = async () => {
    if (!isAuthenticated) { toast.error('Please login'); navigate('/login'); return; }
    if (!cart.length) { toast.error('Your cart is empty'); return; }
    if (!selectedTable) { toast.error('Please select a table'); return; }
    setSubmitting(true);
    try {
      await createOrder({
        tableId: selectedTable._id,
        date: toApiDate(selectedDate),
        time: selectedTime,
        guests: Number(guests),
        items: cart.map((item) => ({ menuItemId: item._id, quantity: item.quantity })),
      });
      toast.success('Order placed successfully!');
      navigate('/dashboard');
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to place order');
    } finally {
      setSubmitting(false);
    }
  };

  const categories = ['All', ...new Set(menuItems.map((i) => i.category))];
  const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const filteredItems = menuItems
    .filter((item) => {
      const q = searchQuery.toLowerCase();
      const matchSearch = item.name.toLowerCase().includes(q) || item.description.toLowerCase().includes(q);
      const matchCat = selectedCategory === 'All' || item.category === selectedCategory;
      return matchSearch && matchCat;
    })
    .sort((a, b) => {
      switch (sortOption) {
        case 'name-asc': return a.name.localeCompare(b.name);
        case 'name-desc': return b.name.localeCompare(a.name);
        case 'price-asc': return a.price - b.price;
        case 'price-desc': return b.price - a.price;
        default: return 0;
      }
    });

  const dropdownBtnStyle = {
    width: '100%',
    backgroundColor: '#080d1a',
    border: '1px solid rgba(212,175,55,0.2)',
    borderRadius: '2px',
    padding: '11px 14px',
    color: '#ffffff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    cursor: 'pointer',
    fontFamily: 'inherit',
    fontSize: '14px',
    transition: 'border-color 0.2s',
  };

  const getCartQty = (id) => cart.find((c) => c._id === id)?.quantity || 0;

  return (
    <div style={{ backgroundColor: '#080d1a', minHeight: '100vh' }}>
      {/* ── Banner ──────────────────────────────────────────── */}
      <div style={{ position: 'relative', height: 'clamp(180px, 28vh, 280px)', overflow: 'hidden' }}>
        <img
          src={ORDER_BANNER}
          alt="Gourmet steak — Farhad Ibrahimzade on Pexels"
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 40%' }}
        />
        <div
          style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to bottom, rgba(8,13,26,0.5), rgba(8,13,26,0.88))',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '1.5rem',
          }}
        >
          <motion.span
            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            style={{ color: '#D4AF37', fontSize: '11px', fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase', marginBottom: '0.5rem', display: 'block' }}
          >
            Dine In
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
            style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2rem, 6vw, 3.5rem)', fontWeight: 700, color: '#fff' }}
          >
            Place Your Order
          </motion.h1>
        </div>
      </div>

      {/* ── Mobile cart button ──────────────────────────────── */}
      {totalItems > 0 && (
        <div className="order-mobile-cart-btn">
          <button
            onClick={() => setShowCartMobile(true)}
            style={{
              position: 'fixed', bottom: '1.5rem', right: '1.5rem', zIndex: 40,
              backgroundColor: '#D4AF37', color: '#080d1a', border: 'none', borderRadius: '50px',
              padding: '12px 22px', fontWeight: 700, fontSize: '14px', cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: '8px',
              boxShadow: '0 8px 32px rgba(212,175,55,0.35)',
            }}
          >
            <ShoppingCart size={18} /> {totalItems} item{totalItems > 1 ? 's' : ''} · {formatPrice(totalAmount)}
          </button>
        </div>
      )}

      {/* ── Mobile Cart Drawer ──────────────────────────────── */}
      <AnimatePresence>
        {showCartMobile && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.7)', zIndex: 50 }}
            onClick={() => setShowCartMobile(false)}
          >
            <motion.div
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.28 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                position: 'absolute', top: 0, right: 0, bottom: 0, width: 'min(90vw, 400px)',
                backgroundColor: '#0f1628', borderLeft: '1px solid rgba(212,175,55,0.2)',
                padding: '1.5rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.5rem', fontWeight: 700, color: '#fff' }}>Your Order</h3>
                <button onClick={() => setShowCartMobile(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9ca3af' }}>
                  <X size={20} />
                </button>
              </div>
              {cart.map((item) => (
                <div key={item._id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{ flex: 1 }}>
                    <p style={{ color: '#fff', fontSize: '14px', fontWeight: 600 }}>{item.name}</p>
                    <p style={{ color: '#D4AF37', fontSize: '13px' }}>{formatPrice(item.price)} × {item.quantity}</p>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <button onClick={() => updateQuantity(item._id, item.quantity - 1)} style={{ width: 28, height: 28, borderRadius: '50%', backgroundColor: 'rgba(212,175,55,0.12)', border: '1px solid rgba(212,175,55,0.25)', color: '#D4AF37', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Minus size={12} /></button>
                    <span style={{ color: '#fff', width: '20px', textAlign: 'center', fontSize: '14px' }}>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item._id, item.quantity + 1)} style={{ width: 28, height: 28, borderRadius: '50%', backgroundColor: 'rgba(212,175,55,0.12)', border: '1px solid rgba(212,175,55,0.25)', color: '#D4AF37', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Plus size={12} /></button>
                  </div>
                </div>
              ))}
              <div style={{ borderTop: '1px solid rgba(212,175,55,0.15)', paddingTop: '1rem', marginTop: 'auto' }}>
                <p style={{ color: '#D4AF37', fontWeight: 700, fontSize: '18px', marginBottom: '1rem' }}>Total: {formatPrice(totalAmount)}</p>
                <button onClick={() => setShowCartMobile(false)} className="btn-gold" style={{ width: '100%', fontSize: '13px' }}>
                  Continue to Table Selection
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Main content ─────────────────────────────────────── */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2.5rem 1.5rem 5rem' }}>
        <div className="order-grid">
          {/* ── Left: Menu ──────────────────────────────────── */}
          <div>
            <h2
              style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.75rem', fontWeight: 700, color: '#D4AF37', marginBottom: '1.5rem' }}
            >
              Select Items
            </h2>

            {/* Search + Filters */}
            <div style={{ marginBottom: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div style={{ position: 'relative' }}>
                <Search size={15} color="#6b7280" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
                <input
                  type="text"
                  placeholder="Search menu items…"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="input-dark"
                  style={{ paddingLeft: '40px' }}
                />
              </div>
              <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    style={{
                      padding: '6px 14px', borderRadius: '9999px', fontSize: '12px', fontWeight: 700,
                      fontFamily: 'inherit', cursor: 'pointer', letterSpacing: '0.04em',
                      border: selectedCategory === cat ? 'none' : '1px solid rgba(212,175,55,0.25)',
                      backgroundColor: selectedCategory === cat ? '#D4AF37' : 'transparent',
                      color: selectedCategory === cat ? '#080d1a' : '#9ca3af',
                      transition: 'all 0.15s',
                    }}
                  >
                    {cat}
                  </button>
                ))}
                <select
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                  style={{
                    backgroundColor: '#0f1628', border: '1px solid rgba(212,175,55,0.2)',
                    borderRadius: '9999px', padding: '6px 12px', color: '#9ca3af', fontSize: '12px',
                    fontFamily: 'inherit', cursor: 'pointer', marginLeft: 'auto',
                  }}
                >
                  <option value="name-asc">A – Z</option>
                  <option value="name-desc">Z – A</option>
                  <option value="price-asc">Price ↑</option>
                  <option value="price-desc">Price ↓</option>
                </select>
              </div>
            </div>

            {/* Menu items */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {filteredItems.length === 0 ? (
                <p style={{ color: '#6b7280', textAlign: 'center', padding: '3rem 0' }}>No items match your search.</p>
              ) : (
                filteredItems.map((item) => {
                  const qty = getCartQty(item._id);
                  return (
                    <div
                      key={item._id}
                      style={{
                        backgroundColor: '#0f1628',
                        border: `1px solid ${qty > 0 ? 'rgba(212,175,55,0.4)' : 'rgba(212,175,55,0.15)'}`,
                        borderRadius: '6px',
                        padding: '1rem 1.25rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem',
                        transition: 'border-color 0.2s',
                      }}
                    >
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '0.2rem' }}>
                          <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '18px', fontWeight: 700, color: '#fff' }}>{item.name}</h3>
                          <span style={{ fontSize: '10px', backgroundColor: 'rgba(212,175,55,0.1)', color: '#D4AF37', border: '1px solid rgba(212,175,55,0.2)', borderRadius: '9999px', padding: '2px 8px', fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase' }}>{item.category}</span>
                        </div>
                        <p style={{ color: '#9ca3af', fontSize: '12.5px', lineHeight: 1.6, marginBottom: '0.4rem' }}>{item.description}</p>
                        <p style={{ color: '#D4AF37', fontWeight: 700, fontSize: '17px' }}>{formatPrice(item.price)}</p>
                      </div>
                      {qty === 0 ? (
                        <button
                          onClick={() => addToCart(item)}
                          style={{
                            flexShrink: 0, backgroundColor: '#D4AF37', color: '#080d1a',
                            border: 'none', borderRadius: '2px', padding: '8px 16px',
                            fontWeight: 700, fontSize: '12px', cursor: 'pointer', fontFamily: 'inherit',
                            letterSpacing: '0.04em', whiteSpace: 'nowrap',
                          }}
                        >
                          Add
                        </button>
                      ) : (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
                          <button
                            onClick={() => updateQuantity(item._id, qty - 1)}
                            style={{ width: 30, height: 30, borderRadius: '50%', backgroundColor: 'rgba(212,175,55,0.1)', border: '1px solid rgba(212,175,55,0.3)', color: '#D4AF37', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                          ><Minus size={13} /></button>
                          <span style={{ color: '#fff', fontWeight: 700, fontSize: '15px', minWidth: '20px', textAlign: 'center' }}>{qty}</span>
                          <button
                            onClick={() => updateQuantity(item._id, qty + 1)}
                            style={{ width: 30, height: 30, borderRadius: '50%', backgroundColor: 'rgba(212,175,55,0.1)', border: '1px solid rgba(212,175,55,0.3)', color: '#D4AF37', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                          ><Plus size={13} /></button>
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* ── Right: Cart + Table Selection ────────────────── */}
          <div className="order-right-col" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {/* Cart */}
            <div
              style={{
                backgroundColor: '#0f1628', border: '1px solid rgba(212,175,55,0.18)',
                borderRadius: '8px', padding: '1.5rem', position: 'sticky', top: '84px',
              }}
            >
              <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.5rem', fontWeight: 700, color: '#D4AF37', marginBottom: '1.25rem' }}>
                Your Order
              </h2>

              {/* Cart items */}
              <div style={{ marginBottom: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {cart.length === 0 ? (
                  <p style={{ color: '#6b7280', fontSize: '13px', textAlign: 'center', padding: '1.5rem 0' }}>No items selected yet</p>
                ) : (
                  cart.map((item) => (
                    <div key={item._id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.5rem' }}>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p style={{ color: '#fff', fontSize: '13px', fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.name}</p>
                        <p style={{ color: '#D4AF37', fontSize: '12px' }}>{formatPrice(item.price)} × {item.quantity}</p>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '5px', flexShrink: 0 }}>
                        <button onClick={() => updateQuantity(item._id, item.quantity - 1)} style={{ width: 26, height: 26, borderRadius: '50%', backgroundColor: 'rgba(212,175,55,0.1)', border: '1px solid rgba(212,175,55,0.25)', color: '#D4AF37', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Minus size={11} /></button>
                        <span style={{ color: '#fff', fontSize: '13px', width: '18px', textAlign: 'center' }}>{item.quantity}</span>
                        <button onClick={() => updateQuantity(item._id, item.quantity + 1)} style={{ width: 26, height: 26, borderRadius: '50%', backgroundColor: 'rgba(212,175,55,0.1)', border: '1px solid rgba(212,175,55,0.25)', color: '#D4AF37', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Plus size={11} /></button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {cart.length > 0 && (
                <div style={{ borderTop: '1px solid rgba(212,175,55,0.15)', paddingTop: '0.75rem', marginBottom: '1.5rem' }}>
                  <p style={{ color: '#D4AF37', fontWeight: 700, fontSize: '18px' }}>Total: {formatPrice(totalAmount)}</p>
                </div>
              )}

              {/* Divider */}
              <div style={{ borderTop: '1px solid rgba(212,175,55,0.1)', paddingTop: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <h3 style={{ color: '#fff', fontWeight: 700, fontSize: '15px', marginBottom: '0.25rem' }}>Table & Time</h3>

                {/* Date */}
                <div ref={calendarRef} style={{ position: 'relative' }}>
                  <InputLabel>Date</InputLabel>
                  <button
                    type="button"
                    onClick={() => { setShowCalendar(!showCalendar); setShowTimePicker(false); }}
                    style={dropdownBtnStyle}
                  >
                    <span style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
                      <CalendarDays size={14} color="#D4AF37" />
                      <span style={{ color: selectedDate ? '#fff' : '#6b7280', fontSize: '13px' }}>
                        {selectedDate ? toDisplayDate(selectedDate) : 'Select date'}
                      </span>
                    </span>
                    <ChevronDown size={13} color="#6b7280" />
                  </button>
                  {showCalendar && (
                    <div style={{ position: 'absolute', top: 'calc(100% + 4px)', left: 0, zIndex: 30 }}>
                      <BookingCalendar selectedDate={selectedDate} onSelect={(d) => { setSelectedDate(d); setShowCalendar(false); }} minDate={new Date()} />
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
                  >
                    <span style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
                      <Clock size={14} color="#D4AF37" />
                      <span style={{ color: selectedTime ? '#fff' : '#6b7280', fontSize: '13px' }}>
                        {selectedTime || 'Select time'}
                      </span>
                    </span>
                    <ChevronDown size={13} color="#6b7280" />
                  </button>
                  {showTimePicker && (
                    <div style={{ position: 'absolute', top: 'calc(100% + 4px)', left: 0, zIndex: 30 }}>
                      <TimePicker selectedTime={selectedTime} onSelect={(t) => { setSelectedTime(t); setShowTimePicker(false); }} minTime={getMinTime()} />
                    </div>
                  )}
                </div>

                {/* Guests */}
                <div>
                  <InputLabel>Guests</InputLabel>
                  <input
                    type="number" min="1" max="20" value={guests}
                    onChange={(e) => setGuests(parseInt(e.target.value) || 1)}
                    className="input-dark"
                    style={{ fontSize: '13px', padding: '10px 14px' }}
                  />
                </div>

                {/* Check Availability */}
                <button
                  onClick={handleCheckAvailability}
                  disabled={checking || !selectedDate || !selectedTime}
                  className="btn-outline-gold"
                  style={{ fontSize: '12px', padding: '10px 16px', letterSpacing: '0.04em' }}
                >
                  {checking ? 'Checking…' : 'Check Availability'}
                </button>

                {/* Table select */}
                {availableTables.length > 0 && (
                  <div>
                    <InputLabel>Select Table</InputLabel>
                    <select
                      value={selectedTable?._id || ''}
                      onChange={(e) => setSelectedTable(availableTables.find((t) => t._id === e.target.value) || null)}
                      className="input-dark"
                      style={{ fontSize: '13px', padding: '10px 14px', cursor: 'pointer' }}
                    >
                      <option value="">Choose a table…</option>
                      {availableTables.map((t) => (
                        <option key={t._id} value={t._id}>Table {t.tableNumber} (Seats {t.capacity})</option>
                      ))}
                    </select>
                  </div>
                )}

                {/* Place Order */}
                <button
                  onClick={placeOrder}
                  disabled={submitting || !cart.length || !selectedTable}
                  className="btn-gold"
                  style={{ marginTop: '0.5rem', fontSize: '13px', letterSpacing: '0.05em', textTransform: 'uppercase' }}
                >
                  {submitting ? 'Placing Order…' : `Place Order${cart.length ? ` · ${formatPrice(totalAmount)}` : ''}`}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .order-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2rem;
          align-items: start;
        }
        .order-right-col {
          display: flex;
        }
        .order-mobile-cart-btn {
          display: none;
        }
        @media (min-width: 860px) {
          .order-grid {
            grid-template-columns: 1fr 360px;
          }
        }
        @media (max-width: 859px) {
          .order-right-col {
            display: none;
          }
          .order-mobile-cart-btn {
            display: block;
          }
        }
      `}</style>
    </div>
  );
};

export default OrderPage;
