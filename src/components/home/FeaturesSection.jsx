import { motion } from 'framer-motion';
import { Sparkles, ChefHat, Utensils, Award } from 'lucide-react';

const CHEF_IMAGE =
  'https://images.pexels.com/photos/15323383/pexels-photo-15323383.png?auto=compress&cs=tinysrgb&w=900';

const FEATURES = [
  {
    icon: <Sparkles size={22} color="#D4AF37" />,
    title: 'Farm-Fresh Ingredients',
    desc: 'We source only the finest, locally-grown ingredients to ensure exceptional quality and taste in every plate.',
  },
  {
    icon: <ChefHat size={22} color="#D4AF37" />,
    title: 'Award-Winning Chefs',
    desc: 'Our culinary team brings decades of expertise from Michelin-starred kitchens around the world.',
  },
  {
    icon: <Utensils size={22} color="#D4AF37" />,
    title: 'Signature Recipes',
    desc: 'Innovative cuisine that blends classical French techniques with bold, contemporary flavours.',
  },
  {
    icon: <Award size={22} color="#D4AF37" />,
    title: 'Recognised Excellence',
    desc: 'Five industry awards that reflect our relentless commitment to the art of fine dining.',
  },
];

const FeaturesSection = () => (
  <section style={{ padding: '5rem 1.5rem', backgroundColor: '#080d1a' }}>
    <div
      style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr', gap: '4rem', alignItems: 'center' }}
      className="features-grid"
    >
      {/* ── Left: Image panel ────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.75 }}
        className="features-image-col"
        style={{ position: 'relative' }}
      >
        {/* Gold frame accent */}
        <div
          style={{
            position: 'absolute',
            top: '-18px',
            left: '-18px',
            right: '18px',
            bottom: '18px',
            border: '1px solid rgba(212,175,55,0.3)',
            borderRadius: '8px',
            pointerEvents: 'none',
            zIndex: 0,
          }}
        />
        <div
          style={{
            position: 'relative',
            borderRadius: '8px',
            overflow: 'hidden',
            zIndex: 1,
          }}
        >
          <img
            src={CHEF_IMAGE}
            alt="Our team of professional chefs — Gaurav Ranjitkar on Pexels"
            style={{ width: '100%', height: '520px', objectFit: 'cover', objectPosition: 'center', display: 'block' }}
          />
          {/* Bottom overlay */}
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              background: 'linear-gradient(to top, rgba(8,13,26,0.85) 0%, transparent 55%)',
              padding: '2rem 1.75rem',
            }}
          >
            <div style={{ display: 'flex', gap: '2rem' }}>
              {[{ v: '12+', l: 'Years' }, { v: '50K+', l: 'Guests' }, { v: '5', l: 'Awards' }].map((s) => (
                <div key={s.l}>
                  <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '28px', fontWeight: 700, color: '#D4AF37', lineHeight: 1 }}>
                    {s.v}
                  </p>
                  <p style={{ fontSize: '11px', color: '#9ca3af', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                    {s.l}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* ── Right: Features ──────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.75 }}
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
          Why Us
        </span>
        <h2
          style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: 700,
            color: '#ffffff',
            lineHeight: 1.15,
            marginBottom: '2.5rem',
          }}
        >
          Crafted With Passion,<br />Served With Pride
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {FEATURES.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              style={{
                display: 'flex',
                gap: '1.25rem',
                alignItems: 'flex-start',
                padding: '1.25rem',
                borderRadius: '6px',
                border: '1px solid rgba(212,175,55,0.1)',
                backgroundColor: '#0f1628',
                transition: 'border-color 0.2s, background-color 0.2s',
                cursor: 'default',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(212,175,55,0.4)';
                e.currentTarget.style.backgroundColor = '#111c35';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(212,175,55,0.1)';
                e.currentTarget.style.backgroundColor = '#0f1628';
              }}
            >
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(212,175,55,0.08)',
                  border: '1px solid rgba(212,175,55,0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                {f.icon}
              </div>
              <div>
                <h3
                  style={{
                    fontFamily: 'Cormorant Garamond, serif',
                    fontSize: '20px',
                    fontWeight: 700,
                    color: '#ffffff',
                    marginBottom: '0.3rem',
                  }}
                >
                  {f.title}
                </h3>
                <p style={{ color: '#9ca3af', fontSize: '13.5px', lineHeight: 1.72 }}>{f.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>

    <style>{`
      @media (min-width: 900px) {
        .features-grid {
          grid-template-columns: 1fr 1fr !important;
        }
      }
      @media (max-width: 899px) {
        .features-image-col {
          display: none;
        }
      }
    `}</style>
  </section>
);

export default FeaturesSection;
