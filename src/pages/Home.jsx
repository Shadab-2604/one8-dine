import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Sparkles, ChefHat, Utensils, ArrowRight, CalendarDays, LayoutDashboard } from 'lucide-react';
import { motion } from 'framer-motion';

const FEATURES = [
  {
    icon: <Sparkles size={28} color="#D4AF37" />,
    title: 'Fresh Products',
    desc: 'We source only the finest, locally-sourced ingredients to ensure exceptional quality and taste in every dish.',
  },
  {
    icon: <ChefHat size={28} color="#D4AF37" />,
    title: 'Skilled Chefs',
    desc: 'Our award-winning chefs bring decades of culinary expertise to create memorable dining experiences.',
  },
  {
    icon: <Utensils size={28} color="#D4AF37" />,
    title: 'Unique Recipes',
    desc: 'Experience innovative cuisine that blends traditional techniques with modern culinary artistry.',
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.12, duration: 0.5 } }),
};

const Home = () => {
  const { isAuthenticated, user } = useAuth();

  if (isAuthenticated && user) {
    const isAdmin = user.role === 'admin';
    const cards = isAdmin
      ? [
          { to: '/admin', icon: <LayoutDashboard size={22} color="#D4AF37" />, title: 'Dashboard', desc: 'View restaurant statistics' },
          { to: '/admin/bookings', icon: <CalendarDays size={22} color="#D4AF37" />, title: 'Bookings', desc: 'Manage table reservations' },
          { to: '/admin/menu', icon: <Utensils size={22} color="#D4AF37" />, title: 'Menu', desc: 'Manage menu items' },
        ]
      : [
          { to: '/menu', icon: <Utensils size={22} color="#D4AF37" />, title: 'Browse Menu', desc: 'Explore our exquisite dishes' },
          { to: '/booking', icon: <CalendarDays size={22} color="#D4AF37" />, title: 'Book a Table', desc: 'Reserve your dining experience' },
          { to: '/dashboard', icon: <LayoutDashboard size={22} color="#D4AF37" />, title: 'My Dashboard', desc: 'View your bookings & orders' },
        ];

    return (
      <div style={{ maxWidth: '960px', margin: '0 auto', padding: '4rem 1.5rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h1
            style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: 'clamp(2rem, 5vw, 3rem)',
              fontWeight: 700,
              color: '#D4AF37',
              marginBottom: '0.5rem',
            }}
          >
            Welcome back, {user.name?.split(' ')[0]}!
          </h1>
          <p style={{ color: '#9ca3af', fontSize: '16px' }}>Ready for an exceptional dining experience?</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem' }}>
          {cards.map((c) => (
            <Link
              key={c.to}
              to={c.to}
              style={{
                backgroundColor: '#0f1628',
                border: '1px solid rgba(212,175,55,0.2)',
                borderRadius: '6px',
                padding: '2rem 1.5rem',
                textDecoration: 'none',
                transition: 'border-color 0.2s, transform 0.2s',
                display: 'block',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#D4AF37'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(212,175,55,0.2)'; e.currentTarget.style.transform = 'translateY(0)'; }}
            >
              <div style={{ marginBottom: '1rem' }}>{c.icon}</div>
              <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '20px', fontWeight: 700, color: '#fff', marginBottom: '0.4rem' }}>{c.title}</h3>
              <p style={{ color: '#9ca3af', fontSize: '13px' }}>{c.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: '#080d1a' }}>
      {/* ── Hero ───────────────────────────────────────────────── */}
      <section
        style={{
          minHeight: '90vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: '5rem 1.5rem 4rem',
        }}
      >
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: 'clamp(3rem, 8vw, 6rem)',
            fontWeight: 700,
            lineHeight: 1.08,
            color: '#ffffff',
            letterSpacing: '-0.01em',
            maxWidth: '820px',
          }}
        >
          Experience Fine Dining
          <br />
          <span style={{ color: '#D4AF37', fontStyle: 'italic' }}>At Its Best</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          style={{
            color: '#9ca3af',
            fontSize: '16px',
            lineHeight: 1.8,
            maxWidth: '520px',
            margin: '1.5rem auto 2.5rem',
          }}
        >
          Indulge in an unforgettable culinary journey with our expertly crafted
          dishes, premium ingredients, and exceptional service.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.6 }}
          style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}
        >
          <Link
            to="/signup"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              border: '1px solid #D4AF37',
              color: '#D4AF37',
              padding: '12px 28px',
              borderRadius: '2px',
              fontWeight: 600,
              fontSize: '14px',
              textDecoration: 'none',
              transition: 'background 0.2s',
              letterSpacing: '0.03em',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(212,175,55,0.1)')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
          >
            Book a Table <ArrowRight size={16} />
          </Link>
          <Link
            to="/menu"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              border: '1px solid rgba(255,255,255,0.2)',
              color: '#e5e7eb',
              padding: '12px 28px',
              borderRadius: '2px',
              fontWeight: 600,
              fontSize: '14px',
              textDecoration: 'none',
              transition: 'border-color 0.2s, color 0.2s',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#D4AF37'; e.currentTarget.style.color = '#D4AF37'; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'; e.currentTarget.style.color = '#e5e7eb'; }}
          >
            View Menu
          </Link>
        </motion.div>
      </section>

      {/* ── Why Choose Us ───────────────────────────────────────── */}
      <section style={{ padding: '5rem 1.5rem', backgroundColor: '#080d1a' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <h2
            style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: 'clamp(2rem, 4vw, 2.75rem)',
              fontWeight: 700,
              color: '#ffffff',
              textAlign: 'center',
              marginBottom: '3.5rem',
            }}
          >
            Why Choose One8 Dine
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem' }}>
            {FEATURES.map((f, i) => (
              <motion.div
                key={i}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                style={{
                  backgroundColor: '#0f1628',
                  border: '1px solid rgba(212,175,55,0.15)',
                  borderRadius: '6px',
                  padding: '2.5rem 2rem',
                  textAlign: 'center',
                  transition: 'border-color 0.2s',
                }}
                whileHover={{ scale: 1.02 }}
              >
                <div
                  style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(212,175,55,0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 1.5rem',
                  }}
                >
                  {f.icon}
                </div>
                <h3
                  style={{
                    fontFamily: 'Cormorant Garamond, serif',
                    fontSize: '22px',
                    fontWeight: 700,
                    color: '#ffffff',
                    marginBottom: '0.75rem',
                  }}
                >
                  {f.title}
                </h3>
                <p style={{ color: '#9ca3af', fontSize: '14px', lineHeight: 1.7 }}>{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────────── */}
      <section style={{ padding: '5rem 1.5rem', backgroundColor: '#080d1a', textAlign: 'center' }}>
        <h2
          style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
            fontWeight: 700,
            color: '#ffffff',
            marginBottom: '1rem',
          }}
        >
          Ready to Experience Excellence?
        </h2>
        <p style={{ color: '#9ca3af', fontSize: '15px', marginBottom: '2rem' }}>
          Join us for an unforgettable dining experience. Book your table today.
        </p>
        <Link
          to="/signup"
          style={{
            display: 'inline-block',
            backgroundColor: '#D4AF37',
            color: '#080d1a',
            padding: '13px 36px',
            fontWeight: 700,
            fontSize: '14px',
            borderRadius: '2px',
            textDecoration: 'none',
            letterSpacing: '0.05em',
            transition: 'opacity 0.2s',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.88')}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
        >
          Get Started
        </Link>
      </section>
    </div>
  );
};

export default Home;
