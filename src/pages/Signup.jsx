import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { Eye, EyeOff } from 'lucide-react';
import { motion } from 'framer-motion';

const SIDE_IMAGE =
  'https://images.pexels.com/photos/28059307/pexels-photo-28059307.jpeg?auto=compress&cs=tinysrgb&w=1200';

const QUOTE = {
  text: 'Every exceptional evening begins with a reservation. Join us for a dining experience like no other.',
  author: 'One8 Dine',
};

const Signup = () => {
  const { signup: signupAuth } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    setLoading(true);
    try {
      await signupAuth(form.name, form.email, form.password, form.phone);
      toast.success('Account created! Please sign in.');
      navigate('/login');
    } catch (err) {
      toast.error(err.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const fieldStyle = {
    display: 'block',
    color: '#9ca3af',
    fontSize: '11px',
    fontWeight: 600,
    marginBottom: '7px',
    textTransform: 'uppercase',
    letterSpacing: '0.06em',
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', backgroundColor: '#080d1a' }}>
      {/* ── Left decorative panel ─────────────────────────── */}
      <div
        className="hidden lg:flex"
        style={{
          width: '42%',
          flexShrink: 0,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <img
          src={SIDE_IMAGE}
          alt="Elegant dining table setup - Jonathan Borba on Pexels"
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(135deg, rgba(8,13,26,0.78) 0%, rgba(8,13,26,0.5) 100%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            padding: '3rem',
          }}
        >
          <Link to="/" style={{ position: 'absolute', top: '2rem', left: '2rem', textDecoration: 'none' }}>
            <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '22px', fontWeight: 700, color: '#ffffff' }}>
              One8 <span style={{ color: '#D4AF37' }}>Dine</span>
            </span>
          </Link>
          <div style={{ borderLeft: '3px solid #D4AF37', paddingLeft: '1.25rem', marginBottom: '1.5rem' }}>
            <p
              style={{
                fontFamily: 'Cormorant Garamond, serif',
                fontSize: '20px',
                fontStyle: 'italic',
                color: '#ffffff',
                lineHeight: 1.7,
                marginBottom: '0.75rem',
              }}
            >
              &ldquo;{QUOTE.text}&rdquo;
            </p>
            <p style={{ color: '#D4AF37', fontSize: '13px', fontWeight: 600 }}>— {QUOTE.author}</p>
          </div>
        </div>
      </div>

      {/* ── Right form panel ─────────────────────────────── */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2.5rem 1.5rem',
          overflowY: 'auto',
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          style={{ width: '100%', maxWidth: '420px', paddingTop: '1rem', paddingBottom: '1rem' }}
        >
          {/* Mobile logo */}
          <div className="lg:hidden" style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <Link to="/" style={{ textDecoration: 'none' }}>
              <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '28px', fontWeight: 700, color: '#ffffff' }}>
                One8 <span style={{ color: '#D4AF37' }}>Dine</span>
              </span>
            </Link>
          </div>

          <div style={{ marginBottom: '2.25rem' }}>
            <h1
              style={{
                fontFamily: 'Cormorant Garamond, serif',
                fontSize: '32px',
                fontWeight: 700,
                color: '#ffffff',
                marginBottom: '0.4rem',
              }}
            >
              Create Account
            </h1>
            <p style={{ color: '#9ca3af', fontSize: '14px' }}>
              Join the One8 Dine community today
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
          >
            {/* Full Name */}
            <div>
              <label style={fieldStyle}>Full Name</label>
              <input
                name="name"
                type="text"
                value={form.name}
                onChange={handleChange}
                required
                placeholder="John Doe"
                className="input-dark"
              />
            </div>

            {/* Email */}
            <div>
              <label style={fieldStyle}>Email Address</label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                required
                placeholder="you@example.com"
                className="input-dark"
              />
            </div>

            {/* Phone */}
            <div>
              <label style={fieldStyle}>Phone (Optional)</label>
              <input
                name="phone"
                type="tel"
                value={form.phone}
                onChange={handleChange}
                placeholder="+1 (555) 123-4567"
                className="input-dark"
              />
            </div>

            {/* Password */}
            <div style={{ position: 'relative' }}>
              <label style={fieldStyle}>Password</label>
              <input
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={form.password}
                onChange={handleChange}
                required
                placeholder="Create a strong password"
                className="input-dark"
                style={{ paddingRight: '44px' }}
              />
              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                style={{
                  position: 'absolute',
                  right: '14px',
                  bottom: '13px',
                  color: '#6b7280',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                }}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>

            {/* Confirm Password */}
            <div>
              <label style={fieldStyle}>Confirm Password</label>
              <input
                name="confirmPassword"
                type="password"
                value={form.confirmPassword}
                onChange={handleChange}
                required
                placeholder="Confirm your password"
                className="input-dark"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-gold"
              style={{ marginTop: '0.5rem' }}
            >
              {loading ? 'Creating account…' : 'Create Account'}
            </button>
          </form>

          {/* Divider */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', margin: '1.5rem 0' }}>
            <div style={{ flex: 1, height: '1px', backgroundColor: 'rgba(212,175,55,0.15)' }} />
            <span style={{ color: '#4b5563', fontSize: '12px' }}>or</span>
            <div style={{ flex: 1, height: '1px', backgroundColor: 'rgba(212,175,55,0.15)' }} />
          </div>

          <p style={{ textAlign: 'center', color: '#9ca3af', fontSize: '13px', marginBottom: '0.75rem' }}>
            Already have an account?{' '}
            <Link to="/login" style={{ color: '#D4AF37', textDecoration: 'none', fontWeight: 700 }}>
              Sign in
            </Link>
          </p>
          <p style={{ textAlign: 'center' }}>
            <Link to="/" style={{ color: '#6b7280', fontSize: '12px', textDecoration: 'none' }}>
              ← Back to home
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Signup;
