import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const TESTIMONIALS = [
  {
    name: 'Alexandra M.',
    title: 'Food Critic',
    avatar: 'https://i.pravatar.cc/80?u=alexandra_m',
    text: 'An absolutely transcendent dining experience. The wagyu steak was perfection — seared to a flawless medium rare, with accompaniments that sang in pure harmony.',
  },
  {
    name: 'James Chen',
    title: 'Regular Guest',
    avatar: 'https://i.pravatar.cc/80?u=james_chen_dine',
    text: "One8 Dine has become our family's special occasion restaurant. The attentive service and breathtaking dishes make every visit feel truly exclusive and memorable.",
  },
  {
    name: 'Sophie Laurent',
    title: 'Travel Blogger',
    avatar: 'https://i.pravatar.cc/80?u=sophie_laurentblog',
    text: 'Having dined across Michelin-starred restaurants in Europe, I can confidently say One8 Dine rivals the very best. The lobster thermidor is simply unmissable.',
  },
];

const StarRating = () => (
  <div style={{ display: 'flex', gap: '3px', marginBottom: '1.25rem' }}>
    {[...Array(5)].map((_, i) => (
      <Star key={i} size={13} fill="#D4AF37" color="#D4AF37" />
    ))}
  </div>
);

const TestimonialsSection = () => (
  <section
    style={{
      padding: '5rem 1.5rem',
      backgroundColor: '#0f1628',
      borderTop: '1px solid rgba(212,175,55,0.1)',
      borderBottom: '1px solid rgba(212,175,55,0.1)',
    }}
  >
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        style={{ textAlign: 'center', marginBottom: '3rem' }}
      >
        <span
          style={{
            color: '#D4AF37',
            fontSize: '11px',
            fontWeight: 600,
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            display: 'block',
            marginBottom: '0.75rem',
          }}
        >
          Testimonials
        </span>
        <h2
          style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: 700,
            color: '#ffffff',
          }}
        >
          What Our Guests Say
        </h2>
      </motion.div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {TESTIMONIALS.map((t, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.12, duration: 0.5 }}
            style={{
              backgroundColor: '#080d1a',
              border: '1px solid rgba(212,175,55,0.12)',
              borderRadius: '6px',
              padding: '2rem',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Decorative quote mark */}
            <div
              style={{
                position: 'absolute',
                top: '1rem',
                right: '1.5rem',
                fontFamily: 'Cormorant Garamond, serif',
                fontSize: '80px',
                color: 'rgba(212,175,55,0.07)',
                lineHeight: 1,
                fontWeight: 700,
                pointerEvents: 'none',
                userSelect: 'none',
              }}
            >
              "
            </div>

            <StarRating />

            <p
              style={{
                color: '#d1d5db',
                fontSize: '14px',
                lineHeight: 1.88,
                marginBottom: '1.75rem',
                fontStyle: 'italic',
              }}
            >
              &ldquo;{t.text}&rdquo;
            </p>

            {/* Author */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <img
                src={t.avatar}
                alt={t.name}
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '50%',
                  border: '2px solid rgba(212,175,55,0.3)',
                  objectFit: 'cover',
                  flexShrink: 0,
                }}
              />
              <div>
                <p style={{ color: '#ffffff', fontWeight: 700, fontSize: '14px' }}>
                  {t.name}
                </p>
                <p style={{ color: '#D4AF37', fontSize: '12px' }}>{t.title}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default TestimonialsSection;
