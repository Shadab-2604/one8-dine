import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Star } from 'lucide-react';

const HERO_BG =
  'https://images.pexels.com/photos/941861/pexels-photo-941861.jpeg?auto=compress&cs=tinysrgb&w=1920';

const HeroSection = () => (
  <section
    style={{
      position: 'relative',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
    }}
  >
    {/* Background image */}
    <div
      style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `url(${HERO_BG})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center 40%',
        transform: 'scale(1.04)',
      }}
    />
    {/* Overlay */}
    <div
      style={{
        position: 'absolute',
        inset: 0,
        background:
          'linear-gradient(135deg, rgba(8,13,26,0.88) 0%, rgba(8,13,26,0.6) 55%, rgba(8,13,26,0.92) 100%)',
      }}
    />
    {/* Bottom fade */}
    <div
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '200px',
        background: 'linear-gradient(to top, #080d1a, transparent)',
      }}
    />

    {/* Content */}
    <div
      style={{
        position: 'relative',
        zIndex: 1,
        textAlign: 'center',
        padding: '6rem 1.5rem 5rem',
        maxWidth: '960px',
        margin: '0 auto',
        width: '100%',
      }}
    >
      {/* Premium badge */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55 }}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          border: '1px solid rgba(212,175,55,0.45)',
          color: '#D4AF37',
          padding: '7px 22px',
          borderRadius: '999px',
          fontSize: '11px',
          fontWeight: 600,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          marginBottom: '2.25rem',
          backgroundColor: 'rgba(212,175,55,0.06)',
          backdropFilter: 'blur(6px)',
        }}
      >
        <Star size={10} fill="#D4AF37" color="#D4AF37" />
        Premium Fine Dining Since 2012
        <Star size={10} fill="#D4AF37" color="#D4AF37" />
      </motion.div>

      {/* Headline line 1 */}
      <motion.h1
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.12 }}
        style={{
          fontFamily: 'Cormorant Garamond, serif',
          fontSize: 'clamp(3rem, 9vw, 7.5rem)',
          fontWeight: 700,
          lineHeight: 1.03,
          color: '#ffffff',
          letterSpacing: '-0.02em',
          marginBottom: '0.05em',
        }}
      >
        Experience Fine Dining
      </motion.h1>

      {/* Headline line 2 (gold italic) */}
      <motion.h1
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.22 }}
        style={{
          fontFamily: 'Cormorant Garamond, serif',
          fontSize: 'clamp(3rem, 9vw, 7.5rem)',
          fontWeight: 700,
          lineHeight: 1.03,
          color: '#D4AF37',
          fontStyle: 'italic',
          letterSpacing: '-0.02em',
          marginBottom: '1.5rem',
        }}
      >
        At Its Best
      </motion.h1>

      {/* Gold divider */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: 1, delay: 0.38, ease: 'easeOut' }}
        style={{
          width: '64px',
          height: '1px',
          backgroundColor: '#D4AF37',
          margin: '0 auto 2.25rem',
          transformOrigin: 'center',
        }}
      />

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.48, duration: 0.6 }}
        style={{
          color: '#d1d5db',
          fontSize: 'clamp(15px, 2.2vw, 18px)',
          lineHeight: 1.9,
          maxWidth: '520px',
          margin: '0 auto 3rem',
        }}
      >
        Indulge in an unforgettable culinary journey with our expertly crafted
        dishes, premium ingredients, and exceptional service.
      </motion.p>

      {/* CTA buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.58, duration: 0.6 }}
        style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}
      >
        <Link
          to="/signup"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            backgroundColor: '#D4AF37',
            color: '#080d1a',
            padding: '14px 36px',
            borderRadius: '2px',
            fontWeight: 700,
            fontSize: '13px',
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
          Book a Table <ArrowRight size={15} />
        </Link>
        <Link
          to="/menu"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            border: '1px solid rgba(255,255,255,0.45)',
            color: '#ffffff',
            padding: '14px 36px',
            borderRadius: '2px',
            fontWeight: 600,
            fontSize: '13px',
            textDecoration: 'none',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            transition: 'border-color 0.2s, color 0.2s, transform 0.15s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = '#D4AF37';
            e.currentTarget.style.color = '#D4AF37';
            e.currentTarget.style.transform = 'translateY(-2px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.45)';
            e.currentTarget.style.color = '#ffffff';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          View Menu
        </Link>
      </motion.div>
    </div>

    {/* Scroll indicator */}
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.6 }}
      style={{
        position: 'absolute',
        bottom: '2rem',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '8px',
        zIndex: 1,
      }}
    >
      <span
        style={{
          color: 'rgba(212,175,55,0.55)',
          fontSize: '10px',
          fontWeight: 600,
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
        }}
      >
        Scroll
      </span>
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        style={{ width: '1px', height: '44px', backgroundColor: 'rgba(212,175,55,0.45)' }}
      />
    </motion.div>
  </section>
);

export default HeroSection;
