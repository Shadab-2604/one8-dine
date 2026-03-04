import { useState, useEffect } from 'react';
import { getMenuItems } from '../lib/api';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import { formatPrice, capitalize } from '../utils/formatters';

const CATEGORY_ORDER = ['All', 'Mains', 'Appetizers', 'Desserts', 'Beverages'];

const CategoryBadge = ({ category }) => (
  <span
    style={{
      display: 'inline-block',
      backgroundColor: 'rgba(255,255,255,0.07)',
      color: '#9ca3af',
      fontSize: '11px',
      fontWeight: 600,
      padding: '3px 10px',
      borderRadius: '9999px',
      letterSpacing: '0.04em',
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
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '3rem 1.5rem' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <h1
          style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: 'clamp(2.25rem, 5vw, 3.5rem)',
            fontWeight: 700,
            color: '#ffffff',
            marginBottom: '0.5rem',
          }}
        >
          Our Menu
        </h1>
        <p style={{ color: '#9ca3af', fontSize: '15px' }}>
          Discover our exquisite culinary offerings
        </p>
      </div>

      {/* Category Tabs */}
      <div
        style={{
          display: 'flex',
          gap: '0.5rem',
          flexWrap: 'wrap',
          justifyContent: 'center',
          marginBottom: '2.5rem',
          borderBottom: '1px solid rgba(212,175,55,0.12)',
          paddingBottom: '1.25rem',
        }}
      >
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            style={{
              padding: '7px 18px',
              borderRadius: '9999px',
              fontSize: '13px',
              fontWeight: 600,
              fontFamily: 'inherit',
              cursor: 'pointer',
              border: activeCategory === cat ? 'none' : '1px solid rgba(212,175,55,0.25)',
              backgroundColor: activeCategory === cat ? '#D4AF37' : 'transparent',
              color: activeCategory === cat ? '#080d1a' : '#9ca3af',
              transition: 'all 0.15s',
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div style={{ textAlign: 'center', color: '#6b7280', padding: '4rem 0' }}>
          <p>No items in this category.</p>
        </div>
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '1.5rem',
          }}
        >
          {filtered.map((item) => (
            <div
              key={item._id}
              style={{
                backgroundColor: '#0f1628',
                border: '1px solid rgba(212,175,55,0.15)',
                borderRadius: '6px',
                overflow: 'hidden',
                transition: 'border-color 0.2s, transform 0.2s, box-shadow 0.2s',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(212,175,55,0.45)';
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(212,175,55,0.15)';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {/* Color accent top bar */}
              <div style={{ height: '3px', backgroundColor: '#D4AF37', opacity: 0.6 }} />

              <div style={{ padding: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                  <h3
                    style={{
                      fontFamily: 'Cormorant Garamond, serif',
                      fontSize: '20px',
                      fontWeight: 700,
                      color: '#fff',
                      flex: 1,
                      paddingRight: '0.5rem',
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
                    lineHeight: 1.6,
                    marginTop: '0.75rem',
                    marginBottom: '1rem',
                    minHeight: '40px',
                  }}
                >
                  {item.description}
                </p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
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
                        backgroundColor: 'rgba(212,175,55,0.1)',
                        border: '1px solid rgba(212,175,55,0.3)',
                        color: '#D4AF37',
                        padding: '6px 14px',
                        borderRadius: '2px',
                        fontSize: '12px',
                        fontWeight: 600,
                        cursor: 'pointer',
                        fontFamily: 'inherit',
                        transition: 'background 0.15s',
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(212,175,55,0.2)')}
                      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'rgba(212,175,55,0.1)')}
                    >
                      Book Table
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Menu;
