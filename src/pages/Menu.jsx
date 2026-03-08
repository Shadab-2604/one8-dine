import { useState, useEffect } from 'react';
import { getMenuItems } from '../lib/api';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import { formatPrice, capitalize } from '../utils/formatters';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const CATEGORY_ORDER = ['All', 'Mains', 'Appetizers', 'Desserts', 'Beverages'];

const MENU_BANNER =
  'https://images.pexels.com/photos/5713740/pexels-photo-5713740.jpeg?auto=compress&cs=tinysrgb&w=1920';

const CATEGORY_IMAGES = {
  mains: 'https://images.pexels.com/photos/8743944/pexels-photo-8743944.jpeg?auto=compress&cs=tinysrgb&w=600',
  appetizers:
    'https://images.pexels.com/photos/5713739/pexels-photo-5713739.jpeg?auto=compress&cs=tinysrgb&w=600',
  desserts:
    'https://images.pexels.com/photos/7381533/pexels-photo-7381533.jpeg?auto=compress&cs=tinysrgb&w=600',
  beverages:
    'https://images.pexels.com/photos/2452281/pexels-photo-2452281.jpeg?auto=compress&cs=tinysrgb&w=600',
};

const FALLBACK_IMAGE =
  'https://images.pexels.com/photos/8743944/pexels-photo-8743944.jpeg?auto=compress&cs=tinysrgb&w=600';

const getCategoryImage = (category) =>
  CATEGORY_IMAGES[category?.toLowerCase()] || FALLBACK_IMAGE;

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.06, duration: 0.45, ease: 'easeOut' },
  }),
};

const CategoryBadge = ({ category }) => (
  <span
    style={{
      display: 'inline-block',
      backgroundColor: 'rgba(212,175,55,0.1)',
      color: '#D4AF37',
      fontSize: '10px',
      fontWeight: 700,
      padding: '3px 10px',
      borderRadius: '9999px',
      letterSpacing: '0.06em',
      textTransform: 'uppercase',
      border: '1px solid rgba(212,175,55,0.2)',
    }}
  >
    {capitalize(category)}
  </span>
);

const Menu = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [allItems, setAllItems] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [categories, setCategories] = useState(['All']);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const items = await getMenuItems();
        setAllItems(items);
        const cats = Array.from(new Set(items.map((i) => capitalize(i.category))));
        const ordered = CATEGORY_ORDER.filter((c) => c === 'All' || cats.includes(c));
        const rest = cats.filter((c) => !CATEGORY_ORDER.includes(c));
        setCategories([...ordered, ...rest]);
      } catch {
        toast.error('Failed to load menu');
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  const filtered =
    activeCategory === 'All'
      ? allItems
      : allItems.filter((i) => capitalize(i.category) === activeCategory);

  if (loading) return <LoadingSpinner />;

  return (
    <div style={{ backgroundColor: '#080d1a', minHeight: '100vh' }}>
      {/* ── Banner ──────────────────────────────────────────── */}
      <div
        style={{
          position: 'relative',
          height: 'clamp(220px, 35vh, 340px)',
          overflow: 'hidden',
        }}
      >
        <img
          src={MENU_BANNER}
          alt="Our fine dining menu - Nadin Sh on Pexels"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center 60%',
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(to bottom, rgba(8,13,26,0.55) 0%, rgba(8,13,26,0.8) 100%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            padding: '1.5rem',
          }}
        >
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{
              color: '#D4AF37',
              fontSize: '11px',
              fontWeight: 600,
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              marginBottom: '0.6rem',
              display: 'block',
            }}
          >
            Curated Selections
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: 'clamp(2.25rem, 6vw, 4rem)',
              fontWeight: 700,
              color: '#ffffff',
              marginBottom: '0.5rem',
            }}
          >
            Our Menu
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25 }}
            style={{ color: '#d1d5db', fontSize: '14px' }}
          >
            Discover our exquisite culinary offerings
          </motion.p>
        </div>
      </div>

      {/* ── Category Tabs ────────────────────────────────────── */}
      <div
        style={{
          backgroundColor: '#0f1628',
          borderBottom: '1px solid rgba(212,175,55,0.1)',
          padding: '1.25rem 1.5rem',
          position: 'sticky',
          top: '64px',
          zIndex: 10,
        }}
      >
        <div
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            display: 'flex',
            gap: '0.5rem',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                padding: '7px 20px',
                borderRadius: '9999px',
                fontSize: '12px',
                fontWeight: 700,
                fontFamily: 'inherit',
                cursor: 'pointer',
                border: activeCategory === cat ? 'none' : '1px solid rgba(212,175,55,0.22)',
                backgroundColor: activeCategory === cat ? '#D4AF37' : 'transparent',
                color: activeCategory === cat ? '#080d1a' : '#9ca3af',
                transition: 'all 0.15s',
                letterSpacing: '0.04em',
                textTransform: activeCategory === cat ? 'uppercase' : 'none',
              }}
              onMouseEnter={(e) => {
                if (activeCategory !== cat) {
                  e.currentTarget.style.borderColor = '#D4AF37';
                  e.currentTarget.style.color = '#D4AF37';
                }
              }}
              onMouseLeave={(e) => {
                if (activeCategory !== cat) {
                  e.currentTarget.style.borderColor = 'rgba(212,175,55,0.22)';
                  e.currentTarget.style.color = '#9ca3af';
                }
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* ── Grid ────────────────────────────────────────────── */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2.5rem 1.5rem 4rem' }}>
        {filtered.length === 0 ? (
          <div style={{ textAlign: 'center', color: '#6b7280', padding: '5rem 0' }}>
            <p>No items in this category.</p>
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
            >
              {filtered.map((item, i) => (
                <motion.div
                  key={item._id}
                  custom={i}
                  variants={cardVariants}
                  initial="hidden"
                  animate="show"
                  whileHover={{ y: -5 }}
                  style={{
                    backgroundColor: '#0f1628',
                    border: '1px solid rgba(212,175,55,0.14)',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    transition: 'border-color 0.2s, box-shadow 0.2s',
                    cursor: 'default',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(212,175,55,0.4)';
                    e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.35)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(212,175,55,0.14)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  {/* Card image */}
                  <div
                    style={{
                      height: '180px',
                      overflow: 'hidden',
                      position: 'relative',
                    }}
                  >
                    <motion.img
                      src={getCategoryImage(item.category)}
                      alt={item.name}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        display: 'block',
                      }}
                      whileHover={{ scale: 1.06 }}
                      transition={{ duration: 0.4 }}
                    />
                    {/* Gold accent bar */}
                    <div
                      style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: '3px',
                        background: 'linear-gradient(90deg, #D4AF37, rgba(212,175,55,0.3))',
                      }}
                    />
                  </div>

                  {/* Card body */}
                  <div style={{ padding: '1.25rem 1.5rem 1.5rem' }}>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                        marginBottom: '0.5rem',
                        gap: '0.5rem',
                      }}
                    >
                      <h3
                        style={{
                          fontFamily: 'Cormorant Garamond, serif',
                          fontSize: '20px',
                          fontWeight: 700,
                          color: '#fff',
                          lineHeight: 1.2,
                          flex: 1,
                        }}
                      >
                        {item.name}
                      </h3>
                    </div>

                    <CategoryBadge category={item.category} />

                    <p
                      style={{
                        color: '#9ca3af',
                        fontSize: '13px',
                        lineHeight: 1.65,
                        marginTop: '0.75rem',
                        marginBottom: '1.25rem',
                        minHeight: '38px',
                      }}
                    >
                      {item.description}
                    </p>

                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                    >
                      <span
                        style={{
                          color: '#D4AF37',
                          fontSize: '22px',
                          fontWeight: 700,
                          fontFamily: 'Montserrat, sans-serif',
                        }}
                      >
                        {formatPrice(item.price)}
                      </span>
                      {isAuthenticated && (
                        <button
                          onClick={() => navigate('/booking')}
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '5px',
                            backgroundColor: 'rgba(212,175,55,0.08)',
                            border: '1px solid rgba(212,175,55,0.3)',
                            color: '#D4AF37',
                            padding: '7px 14px',
                            borderRadius: '2px',
                            fontSize: '12px',
                            fontWeight: 700,
                            cursor: 'pointer',
                            fontFamily: 'inherit',
                            letterSpacing: '0.04em',
                            transition: 'background 0.15s, border-color 0.15s',
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = 'rgba(212,175,55,0.18)';
                            e.currentTarget.style.borderColor = '#D4AF37';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = 'rgba(212,175,55,0.08)';
                            e.currentTarget.style.borderColor = 'rgba(212,175,55,0.3)';
                          }}
                        >
                          Book <ArrowRight size={11} />
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        )}

        {/* Book table CTA */}
        {filtered.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ textAlign: 'center', marginTop: '3.5rem' }}
          >
            <p style={{ color: '#6b7280', fontSize: '14px', marginBottom: '1rem' }}>
              Ready to experience our menu in person?
            </p>
            <a
              href="/booking"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                border: '1px solid #D4AF37',
                color: '#D4AF37',
                padding: '12px 32px',
                borderRadius: '2px',
                fontWeight: 700,
                fontSize: '13px',
                textDecoration: 'none',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                transition: 'background 0.2s',
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = 'rgba(212,175,55,0.1)')
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = 'transparent')
              }
            >
              Book a Table <ArrowRight size={14} />
            </a>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Menu;
