import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Utensils, CalendarDays, LayoutDashboard, User, LogOut, Menu, X } from 'lucide-react';
import { useState } from 'react';

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setOpen(false);
  };

  const isAdmin = user?.role === 'admin';

  const navLink = (to, icon, label) => (
    <Link
      key={to}
      to={to}
      onClick={() => setOpen(false)}
      style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#9ca3af', fontSize: '14px', textDecoration: 'none', transition: 'color 0.15s' }}
      onMouseEnter={(e) => (e.currentTarget.style.color = '#D4AF37')}
      onMouseLeave={(e) => (e.currentTarget.style.color = '#9ca3af')}
    >
      {icon}
      <span>{label}</span>
    </Link>
  );

  return (
    <header
      style={{
        backgroundColor: '#080d1a',
        borderBottom: '1px solid rgba(212,175,55,0.15)',
        position: 'sticky',
        top: 0,
        zIndex: 50,
      }}
    >
      <nav
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 1.5rem',
          height: '60px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Logo */}
        <Link to="/" style={{ textDecoration: 'none' }}>
          <span
            style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: '22px',
              fontWeight: 700,
              color: '#ffffff',
              letterSpacing: '0.02em',
            }}
          >
            One8 Dine
          </span>
        </Link>

        {/* Desktop nav */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }} className="hidden md:flex">
          {isAuthenticated && !isAdmin && (
            <>
              {navLink('/menu', <Utensils size={15} />, 'Menu')}
              {navLink('/booking', <CalendarDays size={15} />, 'Book Table')}
              {navLink('/dashboard', <LayoutDashboard size={15} />, 'Dashboard')}
              <div
                style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#9ca3af', fontSize: '14px', cursor: 'pointer' }}
              >
                <User size={15} />
                <span style={{ color: '#D4AF37' }}>{user?.name?.split(' ')[0]}</span>
              </div>
              <button
                onClick={handleLogout}
                style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#9ca3af', background: 'none', border: 'none', cursor: 'pointer', fontSize: '14px', fontFamily: 'inherit' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#ef4444')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#9ca3af')}
              >
                <LogOut size={15} />
              </button>
            </>
          )}

          {isAuthenticated && isAdmin && (
            <>
              {navLink('/admin', <LayoutDashboard size={15} />, 'Admin Panel')}
              <button
                onClick={handleLogout}
                style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#9ca3af', background: 'none', border: 'none', cursor: 'pointer', fontSize: '14px', fontFamily: 'inherit' }}
              >
                <LogOut size={15} />
                <span>Logout</span>
              </button>
            </>
          )}

          {!isAuthenticated && (
            <>
              <Link
                to="/login"
                style={{ color: '#9ca3af', fontSize: '14px', textDecoration: 'none', transition: 'color 0.15s' }}
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
                  fontWeight: 600,
                  padding: '8px 20px',
                  borderRadius: '2px',
                  textDecoration: 'none',
                  transition: 'opacity 0.15s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.85')}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
              >
                Create Account
              </Link>
            </>
          )}
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden"
          onClick={() => setOpen((o) => !o)}
          style={{ color: '#D4AF37', background: 'none', border: 'none', cursor: 'pointer' }}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div
          className="md:hidden"
          style={{
            backgroundColor: '#080d1a',
            borderTop: '1px solid rgba(212,175,55,0.1)',
            padding: '1rem 1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
          }}
        >
          {isAuthenticated && !isAdmin && (
            <>
              {navLink('/menu', <Utensils size={15} />, 'Menu')}
              {navLink('/booking', <CalendarDays size={15} />, 'Book Table')}
              {navLink('/dashboard', <LayoutDashboard size={15} />, 'Dashboard')}
            </>
          )}
          {isAuthenticated ? (
            <button
              onClick={handleLogout}
              style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#ef4444', background: 'none', border: 'none', cursor: 'pointer', fontSize: '14px', fontFamily: 'inherit', padding: 0 }}
            >
              <LogOut size={15} />
              <span>Logout</span>
            </button>
          ) : (
            <>
              <Link to="/login" onClick={() => setOpen(false)} style={{ color: '#9ca3af', textDecoration: 'none', fontSize: '14px' }}>Sign In</Link>
              <Link to="/signup" onClick={() => setOpen(false)} style={{ color: '#D4AF37', textDecoration: 'none', fontSize: '14px', fontWeight: 600 }}>Create Account</Link>
            </>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;
