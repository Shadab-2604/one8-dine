import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { Eye, EyeOff } from 'lucide-react';
import { motion } from 'framer-motion';

const SIDE_IMAGE =
  'https://images.pexels.com/photos/8856502/pexels-photo-8856502.jpeg?auto=compress&cs=tinysrgb&w=1200';

const QUOTES = [
  { text: 'Great dining is an art — and at One8, every meal is a masterpiece.', author: 'Alexandra M., Food Critic' },
  { text: 'Where every plate tells a story of passion, precision, and pure pleasure.', author: 'James Chen, Regular Guest' },
];

const Login = () => {
  const { login: setAuth } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const quote = QUOTES[0];

  const handleChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await setAuth(form.email, form.password);
      toast.success('Welcome back!');
      navigate(result?.user?.role === 'admin' ? '/admin' : '/dashboard');
    } catch (err) {
      toast.error(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        backgroundColor: '#080d1a',
      }}
    >
      {/* ── Left decorative panel ─────────────────────────── */}
      <div
        className="hidden lg:flex"
        style={{
          width: '45%',
          flexShrink: 0,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <img
          src={SIDE_IMAGE}
          alt="Luxurious dining ambiance - Alexandra Kollstrem on Pexels"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
          }}
        />
        {/* Dark overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(135deg, rgba(8,13,26,0.72) 0%, rgba(8,13,26,0.45) 100%)',
          }}
        />
        {/* Quote content */}
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
          <Link
            to="/"
            style={{
              position: 'absolute',
              top: '2rem',
              left: '2rem',
              textDecoration: 'none',
            }}
          >
            <span
              style={{
                fontFamily: 'Cormorant Garamond, serif',
                fontSize: '22px',
                fontWeight: 700,
                color: '#ffffff',
              }}
            >
              One8 <span style={{ color: '#D4AF37' }}>Dine</span>
            </span>
          </Link>
          <div
            style={{
              borderLeft: '3px solid #D4AF37',
              paddingLeft: '1.25rem',
              marginBottom: '1.5rem',
            }}
          >
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
              &ldquo;{quote.text}&rdquo;
            </p>
            <p style={{ color: '#D4AF37', fontSize: '13px', fontWeight: 600 }}>
              — {quote.author}
            </p>
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
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          style={{ width: '100%', maxWidth: '420px' }}
        >
          {/* Mobile logo */}
          <div className="lg:hidden" style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <Link to="/" style={{ textDecoration: 'none' }}>
              <span
                style={{
                  fontFamily: 'Cormorant Garamond, serif',
                  fontSize: '28px',
                  fontWeight: 700,
                  color: '#ffffff',
                }}
              >
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
              Welcome Back
            </h1>
            <p style={{ color: '#9ca3af', fontSize: '14px' }}>
              Sign in to your account to continue
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}
          >
            {/* Email */}
            <div>
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
                Email Address
              </label>
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

            {/* Password */}
            <div style={{ position: 'relative' }}>
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
                Password
              </label>
              <input
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={form.password}
                onChange={handleChange}
                required
                placeholder="Enter your password"
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

            <button
              type="submit"
              disabled={loading}
              className="btn-gold"
              style={{ marginTop: '0.5rem' }}
            >
              {loading ? 'Signing in…' : 'Sign In'}
            </button>
          </form>

          {/* Divider */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              margin: '1.75rem 0',
            }}
          >
            <div style={{ flex: 1, height: '1px', backgroundColor: 'rgba(212,175,55,0.15)' }} />
            <span style={{ color: '#4b5563', fontSize: '12px' }}>or</span>
            <div style={{ flex: 1, height: '1px', backgroundColor: 'rgba(212,175,55,0.15)' }} />
          </div>

          <p style={{ textAlign: 'center', color: '#9ca3af', fontSize: '13px', marginBottom: '0.75rem' }}>
            Don&apos;t have an account?{' '}
            <Link
              to="/signup"
              style={{ color: '#D4AF37', textDecoration: 'none', fontWeight: 700 }}
            >
              Create account
            </Link>
          </p>
          <p style={{ textAlign: 'center' }}>
            <Link
              to="/"
              style={{ color: '#6b7280', fontSize: '12px', textDecoration: 'none' }}
            >
              ← Back to home
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
