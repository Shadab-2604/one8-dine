import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  Utensils,
  CalendarDays,
  LayoutDashboard,
  User,
  LogOut,
  Menu,
  X,
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const NAV_LINK_STYLE = {
  display: 'flex',
  alignItems: 'center',
  gap: '6px',
  color: '#9ca3af',
  fontSize: '14px',
  textDecoration: 'none',
  transition: 'color 0.15s',
  fontWeight: 500,
};

const NavLink = ({ to, icon, label, onClick }) => (
  <Link
    to={to}
    onClick={onClick}
    style={NAV_LINK_STYLE}
    onMouseEnter={(e) => (e.currentTarget.style.color = '#D4AF37')}
    onMouseLeave={(e) => (e.currentTarget.style.color = '#9ca3af')}
  >
    {icon}
    <span>{label}</span>
  </Link>
);

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setOpen(false); };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
    setOpen(false);
  };

  const isAdmin = user?.role === 'admin';

  const mobileLinks = isAuthenticated && !isAdmin
    ? [
        { to: '/menu', icon: <Utensils size={15} />, label: 'Menu' },
        { to: '/booking', icon: <CalendarDays size={15} />, label: 'Book Table' },
        { to: '/order', icon: <Utensils size={15} />, label: 'Order' },
        { to: '/dashboard', icon: <LayoutDashboard size={15} />, label: 'Dashboard' },
      ]
    : isAdmin
    ? [{ to: '/admin', icon: <LayoutDashboard size={15} />, label: 'Admin Panel' }]
    : [];

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        transition: 'background-color 0.3s, backdrop-filter 0.3s, box-shadow 0.3s',
        backgroundColor: scrolled ? 'rgba(8,13,26,0.96)' : '#080d1a',
        backdropFilter: scrolled ? 'blur(14px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(14px)' : 'none',
        borderBottom: '1px solid rgba(212,175,55,0.14)',
        boxShadow: scrolled ? '0 4px 30px rgba(0,0,0,0.3)' : 'none',
      }}
    >
      <nav
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 1.5rem',
          height: '64px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Logo */}
        <Link to="/" style={{ textDecoration: 'none', flexShrink: 0 }}>
          <span
            style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: '22px',
              fontWeight: 700,
              color: '#ffffff',
              letterSpacing: '0.02em',
              transition: 'color 0.15s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#D4AF37')}
            onMouseLeave={(e) => (e.currentTarget.style.color = '#ffffff')}
          >
            One8 <span style={{ color: '#D4AF37' }}>Dine</span>
          </span>
        </Link>

        {/* ── Desktop nav ─────────────────────────────────── */}
        <div
          className="hidden md:flex"
          style={{ alignItems: 'center', gap: '2rem' }}
        >
          {isAuthenticated && !isAdmin && (
            <>
              <NavLink to="/menu" icon={<Utensils size={15} />} label="Menu" />
              <NavLink to="/booking" icon={<CalendarDays size={15} />} label="Book Table" />
              <NavLink to="/order" icon={<Utensils size={15} />} label="Order" />
              <NavLink to="/dashboard" icon={<LayoutDashboard size={15} />} label="Dashboard" />
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  color: '#9ca3af',
                  fontSize: '14px',
                }}
              >
                <User size={15} />
                <span style={{ color: '#D4AF37', fontWeight: 600 }}>
                  {user?.name?.split(' ')[0]}
                </span>
              </div>
              <button
                onClick={handleLogout}
                title="Logout"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  color: '#9ca3af',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontFamily: 'inherit',
                  transition: 'color 0.15s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#ef4444')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#9ca3af')}
              >
                <LogOut size={15} />
              </button>
            </>
          )}

          {isAuthenticated && isAdmin && (
            <>
              <NavLink to="/admin" icon={<LayoutDashboard size={15} />} label="Admin Panel" />
              <button
                onClick={handleLogout}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  color: '#9ca3af',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontFamily: 'inherit',
                  transition: 'color 0.15s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#ef4444')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#9ca3af')}
              >
                <LogOut size={15} />
                <span>Logout</span>
              </button>
            </>
          )}

          {!isAuthenticated && (
            <>
              <Link
                to="/menu"
                style={NAV_LINK_STYLE}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#D4AF37')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#9ca3af')}
              >
                Menu
              </Link>
              <Link
                to="/login"
                style={{
                  color: '#9ca3af',
                  fontSize: '14px',
                  textDecoration: 'none',
                  fontWeight: 500,
                  transition: 'color 0.15s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#fff')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#9ca3af')}
              >
                Sign In
              </Link>
              <Link
                to="/signup"
                style={{
                  color: '#080d1a',
                  backgroundColor: '#D4AF37',
                  fontSize: '13px',
                  fontWeight: 700,
                  padding: '9px 22px',
                  borderRadius: '2px',
                  textDecoration: 'none',
                  letterSpacing: '0.04em',
                  transition: 'opacity 0.15s, transform 0.15s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.opacity = '0.88';
                  e.currentTarget.style.transform = 'translateY(-1px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.opacity = '1';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                Reserve a Table
              </Link>
            </>
          )}
        </div>

        {/* ── Mobile toggle ───────────────────────────────── */}
        <button
          className="md:hidden"
          onClick={() => setOpen((o) => !o)}
          style={{
            color: '#D4AF37',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '4px',
            borderRadius: '4px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* ── Mobile menu (animated) ──────────────────────────── */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="md:hidden"
            style={{
              backgroundColor: 'rgba(8,13,26,0.98)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              borderTop: '1px solid rgba(212,175,55,0.1)',
              padding: '1.25rem 1.5rem 1.75rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.1rem',
            }}
          >
            {mobileLinks.map((link, i) => (
              <motion.div
                key={link.to}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06, duration: 0.2 }}
              >
                <NavLink
                  to={link.to}
                  icon={link.icon}
                  label={link.label}
                  onClick={() => setOpen(false)}
                />
              </motion.div>
            ))}

            {/* Divider */}
            <div
              style={{
                height: '1px',
                backgroundColor: 'rgba(212,175,55,0.1)',
                margin: '0.25rem 0',
              }}
            />

            {isAuthenticated ? (
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: mobileLinks.length * 0.06 }}
                onClick={handleLogout}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  color: '#ef4444',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontFamily: 'inherit',
                  fontWeight: 500,
                  padding: 0,
                  textAlign: 'left',
                }}
              >
                <LogOut size={15} />
                <span>Logout</span>
              </motion.button>
            ) : (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  <Link
                    to="/menu"
                    onClick={() => setOpen(false)}
                    style={{ color: '#9ca3af', textDecoration: 'none', fontSize: '14px', fontWeight: 500 }}
                  >
                    Menu
                  </Link>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.15 }}
                >
                  <Link
                    to="/login"
                    onClick={() => setOpen(false)}
                    style={{ color: '#9ca3af', textDecoration: 'none', fontSize: '14px', fontWeight: 500 }}
                  >
                    Sign In
                  </Link>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <Link
                    to="/signup"
                    onClick={() => setOpen(false)}
                    style={{
                      display: 'inline-block',
                      backgroundColor: '#D4AF37',
                      color: '#080d1a',
                      padding: '10px 24px',
                      borderRadius: '2px',
                      textDecoration: 'none',
                      fontSize: '13px',
                      fontWeight: 700,
                      letterSpacing: '0.04em',
                    }}
                  >
                    Reserve a Table
                  </Link>
                </motion.div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
