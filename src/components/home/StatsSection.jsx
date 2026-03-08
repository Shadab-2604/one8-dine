import { motion } from 'framer-motion';

const STATS = [
  { value: '12+', label: 'Years of Excellence' },
  { value: '50K+', label: 'Guests Served' },
  { value: '4.9★', label: 'Average Rating' },
  { value: '5', label: 'Awards Won' },
];

const StatsSection = () => (
  <section
    style={{
      backgroundColor: '#0f1628',
      borderTop: '1px solid rgba(212,175,55,0.12)',
      borderBottom: '1px solid rgba(212,175,55,0.12)',
      padding: '2.5rem 1.5rem',
    }}
  >
    <div
      className="grid grid-cols-2 md:grid-cols-4"
      style={{ maxWidth: '960px', margin: '0 auto', gap: '0' }}
    >
      {STATS.map((s, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1, duration: 0.5 }}
          style={{
            textAlign: 'center',
            padding: '1.5rem 1rem',
            position: 'relative',
          }}
        >
          {/* Vertical divider (skip first on mobile 2-col, skip at col breaks) */}
          {i > 0 && (
            <div
              style={{
                position: 'absolute',
                left: 0,
                top: '20%',
                height: '60%',
                width: '1px',
                backgroundColor: 'rgba(212,175,55,0.15)',
              }}
            />
          )}
          <div
            style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: 'clamp(2rem, 4.5vw, 3rem)',
              fontWeight: 700,
              color: '#D4AF37',
              marginBottom: '0.3rem',
              lineHeight: 1,
            }}
          >
            {s.value}
          </div>
          <div
            style={{
              color: '#9ca3af',
              fontSize: '11px',
              fontWeight: 600,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
            }}
          >
            {s.label}
          </div>
        </motion.div>
      ))}
    </div>
  </section>
);

export default StatsSection;
