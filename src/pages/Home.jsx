import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { CalendarDays, LayoutDashboard, Utensils, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import HeroSection from '../components/home/HeroSection';
import StatsSection from '../components/home/StatsSection';
import GallerySection from '../components/home/GallerySection';
import FeaturesSection from '../components/home/FeaturesSection';
import TestimonialsSection from '../components/home/TestimonialsSection';

const CTA_BG =
  'https://images.pexels.com/photos/2899737/pexels-photo-2899737.jpeg?auto=compress&cs=tinysrgb&w=1920';

/* ── Authenticated user home ─────────────────────────────── */
const AuthHome = ({ user }) => {
  const isAdmin = user.role === 'admin';
  const cards = isAdmin
    ? [
        {
          to: '/admin',
          icon: <LayoutDashboard size={22} color="#D4AF37" />,
          title: 'Dashboard',
          desc: 'View restaurant statistics & analytics',
        },
        {
          to: '/admin/bookings',
          icon: <CalendarDays size={22} color="#D4AF37" />,
          title: 'Bookings',
          desc: 'Manage table reservations',
        },
        {
          to: '/admin/menu',
          icon: <Utensils size={22} color="#D4AF37" />,
          title: 'Menu',
          desc: 'Manage menu items',
        },
      ]
    : [
        {
          to: '/menu',
          icon: <Utensils size={22} color="#D4AF37" />,
          title: 'Browse Menu',
          desc: 'Explore our exquisite dishes',
        },
        {
          to: '/booking',
          icon: <CalendarDays size={22} color="#D4AF37" />,
          title: 'Book a Table',
          desc: 'Reserve your dining experience',
        },
        {
          to: '/dashboard',
          icon: <LayoutDashboard size={22} color="#D4AF37" />,
          title: 'My Dashboard',
          desc: 'View your bookings & orders',
        },
      ];

  return (
    <div
      style={{
        minHeight: 'calc(100vh - 60px)',
        backgroundColor: '#080d1a',
        padding: '4rem 1.5rem',
      }}
    >
      <div style={{ maxWidth: '960px', margin: '0 auto' }}>
        {/* Welcome header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: '3.5rem' }}
        >
          <span
            style={{
              color: '#D4AF37',
              fontSize: '11px',
              fontWeight: 600,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              display: 'block',
              marginBottom: '0.75rem',
            }}
          >
            Welcome Back
          </span>
          <h1
            style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: 'clamp(2rem, 5vw, 3.25rem)',
              fontWeight: 700,
              color: '#D4AF37',
              marginBottom: '0.5rem',
            }}
          >
            {user.name?.split(' ')[0]}!
          </h1>
          <p style={{ color: '#9ca3af', fontSize: '15px' }}>
            Ready for an exceptional dining experience?
          </p>
        </motion.div>

        {/* Quick-action cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {cards.map((c, i) => (
            <motion.div
              key={c.to}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ y: -4 }}
            >
              <Link
                to={c.to}
                style={{
                  backgroundColor: '#0f1628',
                  border: '1px solid rgba(212,175,55,0.18)',
                  borderRadius: '6px',
                  padding: '2.25rem 1.75rem',
                  textDecoration: 'none',
                  display: 'block',
                  transition: 'border-color 0.2s',
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.borderColor = '#D4AF37')
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.borderColor = 'rgba(212,175,55,0.18)')
                }
              >
                <div
                  style={{
                    width: '52px',
                    height: '52px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(212,175,55,0.08)',
                    border: '1px solid rgba(212,175,55,0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '1.25rem',
                  }}
                >
                  {c.icon}
                </div>
                <h3
                  style={{
                    fontFamily: 'Cormorant Garamond, serif',
                    fontSize: '20px',
                    fontWeight: 700,
                    color: '#fff',
                    marginBottom: '0.4rem',
                  }}
                >
                  {c.title}
                </h3>
                <p style={{ color: '#9ca3af', fontSize: '13px', lineHeight: 1.6 }}>
                  {c.desc}
                </p>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    marginTop: '1.25rem',
                    color: '#D4AF37',
                    fontSize: '12px',
                    fontWeight: 600,
                  }}
                >
                  Go <ArrowRight size={13} />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

/* ── Public landing page ─────────────────────────────────── */
const Home = () => {
  const { isAuthenticated, user } = useAuth();

  if (isAuthenticated && user) {
    return <AuthHome user={user} />;
  }

  return (
    <div style={{ backgroundColor: '#080d1a' }}>
      {/* 1. Hero */}
      <HeroSection />

      {/* 2. Stats bar */}
      <StatsSection />

      {/* 3. Gallery */}
      <GallerySection />

      {/* 4. Features */}
      <FeaturesSection />

      {/* 5. Testimonials */}
      <TestimonialsSection />

      {/* 6. CTA Section */}
      <section
        style={{
          position: 'relative',
          padding: '8rem 1.5rem',
          textAlign: 'center',
          overflow: 'hidden',
        }}
      >
        {/* BG image */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `url(${CTA_BG})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'brightness(0.22)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: 'rgba(8,13,26,0.65)',
          }}
        />

        {/* Content */}
        <div style={{ position: 'relative', zIndex: 1 }}>
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            style={{
              color: '#D4AF37',
              fontSize: '11px',
              fontWeight: 600,
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              display: 'block',
              marginBottom: '1rem',
            }}
          >
            Reserve Your Experience
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              fontWeight: 700,
              color: '#ffffff',
              marginBottom: '1rem',
              maxWidth: '640px',
              margin: '0 auto 1rem',
            }}
          >
            Ready to Experience Excellence?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            style={{
              color: '#9ca3af',
              fontSize: '15px',
              marginBottom: '2.5rem',
              lineHeight: 1.8,
            }}
          >
            Join us for an unforgettable dining experience. Book your table today.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Link
              to="/signup"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                backgroundColor: '#D4AF37',
                color: '#080d1a',
                padding: '15px 44px',
                fontWeight: 700,
                fontSize: '13px',
                borderRadius: '2px',
                textDecoration: 'none',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                transition: 'opacity 0.2s, transform 0.15s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.opacity = '0.88';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity = '1';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              Get Started <ArrowRight size={15} />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
