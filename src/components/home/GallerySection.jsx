import { motion } from 'framer-motion';

const GALLERY = [
  {
    url: 'https://images.pexels.com/photos/941861/pexels-photo-941861.jpeg?auto=compress&cs=tinysrgb&w=900',
    label: 'The Dining Room',
    credit: 'Chan Walrus on Pexels',
    span: 'row',
  },
  {
    url: 'https://images.pexels.com/photos/8743944/pexels-photo-8743944.jpeg?auto=compress&cs=tinysrgb&w=700',
    label: 'Prime Rib Eye',
    credit: 'Farhad Ibrahimzade on Pexels',
    span: '',
  },
  {
    url: 'https://images.pexels.com/photos/7381533/pexels-photo-7381533.jpeg?auto=compress&cs=tinysrgb&w=700',
    label: 'Artisan Desserts',
    credit: 'Pranjall Kumar on Pexels',
    span: '',
  },
  {
    url: 'https://images.pexels.com/photos/5713740/pexels-photo-5713740.jpeg?auto=compress&cs=tinysrgb&w=700',
    label: 'Seafood Platter',
    credit: 'Farhad Ibrahimzade on Pexels',
    span: 'col',
  },
  {
    url: 'https://images.pexels.com/photos/2452281/pexels-photo-2452281.jpeg?auto=compress&cs=tinysrgb&w=700',
    label: 'Fine Wine Selection',
    credit: 'Gül Işık on Pexels',
    span: '',
  },
  {
    url: 'https://images.pexels.com/photos/12181750/pexels-photo-12181750.jpeg?auto=compress&cs=tinysrgb&w=700',
    label: 'Our Kitchen',
    credit: 'Cihan Yüce on Pexels',
    span: 'col',
  },
];

const GallerySection = () => (
  <section style={{ padding: '5rem 1.5rem', backgroundColor: '#080d1a' }}>
    <div style={{ maxWidth: '1300px', margin: '0 auto' }}>
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
          Gallery
        </span>
        <h2
          style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: 700,
            color: '#ffffff',
            marginBottom: '0.5rem',
          }}
        >
          A Feast for the Eyes
        </h2>
        <p style={{ color: '#9ca3af', fontSize: '14px' }}>
          Every dish, a work of art
        </p>
      </motion.div>

      {/* Bento Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gridTemplateRows: 'auto',
          gap: '10px',
        }}
        className="gallery-bento"
      >
        {GALLERY.map((img, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.5 }}
            whileHover="hovered"
            style={{
              position: 'relative',
              overflow: 'hidden',
              borderRadius: '6px',
              cursor: 'pointer',
              gridRow: img.span === 'row' ? 'span 2' : 'span 1',
              gridColumn: img.span === 'col' ? 'span 2' : 'span 1',
              minHeight: img.span === 'col' ? '220px' : img.span === 'row' ? '460px' : '220px',
            }}
          >
            <motion.img
              src={img.url}
              alt={`${img.label} — ${img.credit}`}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
              }}
              variants={{ hovered: { scale: 1.08 } }}
              transition={{ duration: 0.5 }}
            />
            {/* Base gradient */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background:
                  'linear-gradient(to top, rgba(8,13,26,0.75) 0%, transparent 55%)',
                pointerEvents: 'none',
              }}
            />
            {/* Hover overlay */}
            <motion.div
              variants={{ hovered: { opacity: 1 } }}
              initial={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              style={{
                position: 'absolute',
                inset: 0,
                backgroundColor: 'rgba(8,13,26,0.25)',
              }}
            />
            {/* Label */}
            <div
              style={{
                position: 'absolute',
                bottom: '1rem',
                left: '1.25rem',
                right: '1.25rem',
              }}
            >
              <div
                style={{
                  width: '20px',
                  height: '1px',
                  backgroundColor: '#D4AF37',
                  marginBottom: '0.4rem',
                }}
              />
              <span
                style={{
                  color: '#ffffff',
                  fontFamily: 'Cormorant Garamond, serif',
                  fontSize: img.span === 'row' ? '22px' : '17px',
                  fontWeight: 700,
                  display: 'block',
                }}
              >
                {img.label}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      <style>{`
        @media (max-width: 640px) {
          .gallery-bento {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .gallery-bento > *[style*="span 2"] {
            grid-column: span 2 !important;
            grid-row: span 1 !important;
            min-height: 180px !important;
          }
          .gallery-bento > *[style*="row-span"] {
            grid-row: span 1 !important;
            min-height: 180px !important;
          }
        }
      `}</style>
    </div>
  </section>
);

export default GallerySection;
