import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Instagram, Facebook, Twitter } from 'lucide-react';

const QUICK_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/menu', label: 'Our Menu' },
  { to: '/booking', label: 'Book a Table' },
  { to: '/login', label: 'Sign In' },
];

const EXPERIENCE_LINKS = [
  { to: '/menu', label: 'Fine Dining' },
  { to: '/menu', label: 'Seasonal Menu' },
  { to: '/booking', label: 'Private Events' },
  { to: '/booking', label: 'Reservations' },
];

const SOCIAL = [
  { icon: <Instagram size={17} />, href: '#', label: 'Instagram' },
  { icon: <Facebook size={17} />, href: '#', label: 'Facebook' },
  { icon: <Twitter size={17} />, href: '#', label: 'Twitter' },
];

const FooterLinkCol = ({ title, links }) => (
  <div>
    <h4
      style={{
        color: '#ffffff',
        fontWeight: 600,
        fontSize: '13px',
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        marginBottom: '1.25rem',
      }}
    >
      {title}
    </h4>
    <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
      {links.map((l) => (
        <li key={l.label}>
          <Link
            to={l.to}
            style={{
              color: '#9ca3af',
              textDecoration: 'none',
              fontSize: '13px',
              transition: 'color 0.15s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#D4AF37')}
            onMouseLeave={(e) => (e.currentTarget.style.color = '#9ca3af')}
          >
            {l.label}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

const Footer = () => (
  <footer
    style={{
      backgroundColor: '#080d1a',
      borderTop: '1px solid rgba(212,175,55,0.12)',
    }}
  >
    {/* Main footer content */}
    <div
      style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '4rem 1.5rem 2.5rem',
      }}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand column */}
        <div className="sm:col-span-2 lg:col-span-1">
          <Link to="/" style={{ textDecoration: 'none', display: 'inline-block', marginBottom: '1rem' }}>
            <span
              style={{
                fontFamily: 'Cormorant Garamond, serif',
                fontSize: '24px',
                fontWeight: 700,
                color: '#ffffff',
                letterSpacing: '0.02em',
              }}
            >
              One8 <span style={{ color: '#D4AF37' }}>Dine</span>
            </span>
          </Link>
          <p
            style={{
              color: '#6b7280',
              fontSize: '13px',
              lineHeight: 1.8,
              maxWidth: '240px',
              marginBottom: '1.5rem',
            }}
          >
            A premium fine dining destination dedicated to exceptional culinary
            artistry and unforgettable experiences.
          </p>
          {/* Social icons */}
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            {SOCIAL.map((s) => (
              <a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  border: '1px solid rgba(212,175,55,0.25)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#9ca3af',
                  textDecoration: 'none',
                  transition: 'border-color 0.15s, color 0.15s, background 0.15s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#D4AF37';
                  e.currentTarget.style.color = '#D4AF37';
                  e.currentTarget.style.backgroundColor = 'rgba(212,175,55,0.08)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(212,175,55,0.25)';
                  e.currentTarget.style.color = '#9ca3af';
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <FooterLinkCol title="Quick Links" links={QUICK_LINKS} />

        {/* Experience */}
        <FooterLinkCol title="Experience" links={EXPERIENCE_LINKS} />

        {/* Contact */}
        <div>
          <h4
            style={{
              color: '#ffffff',
              fontWeight: 600,
              fontSize: '13px',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              marginBottom: '1.25rem',
            }}
          >
            Contact Us
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
              <MapPin size={15} color="#D4AF37" style={{ flexShrink: 0, marginTop: '2px' }} />
              <span style={{ color: '#9ca3af', fontSize: '13px', lineHeight: 1.6 }}>
                123 Gourmet Street,<br />Fine Dining District
              </span>
            </div>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <Phone size={15} color="#D4AF37" style={{ flexShrink: 0 }} />
              <a
                href="tel:+15551234567"
                style={{ color: '#9ca3af', fontSize: '13px', textDecoration: 'none', transition: 'color 0.15s' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#D4AF37')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#9ca3af')}
              >
                +1 (555) 123-4567
              </a>
            </div>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <Mail size={15} color="#D4AF37" style={{ flexShrink: 0 }} />
              <a
                href="mailto:reservations@one8dine.com"
                style={{ color: '#9ca3af', fontSize: '13px', textDecoration: 'none', transition: 'color 0.15s' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#D4AF37')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#9ca3af')}
              >
                reservations@one8dine.com
              </a>
            </div>
          </div>

          {/* Opening hours */}
          <div style={{ marginTop: '1.5rem' }}>
            <p style={{ color: '#ffffff', fontSize: '12px', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
              Hours
            </p>
            <p style={{ color: '#6b7280', fontSize: '12px', lineHeight: 1.8 }}>
              Mon – Thu: 6pm – 11pm<br />
              Fri – Sat: 6pm – 12am<br />
              Sunday: 5pm – 10pm
            </p>
          </div>
        </div>
      </div>
    </div>

    {/* Bottom bar */}
    <div
      style={{
        borderTop: '1px solid rgba(212,175,55,0.08)',
        padding: '1.25rem 1.5rem',
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '0.5rem',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <p style={{ color: '#4b5563', fontSize: '12px' }}>
          © {new Date().getFullYear()} One8 Dine. All rights reserved.
        </p>
        <div style={{ display: 'flex', gap: '1.25rem' }}>
          {['Privacy Policy', 'Terms of Service'].map((t) => (
            <a
              key={t}
              href="#"
              style={{
                color: '#4b5563',
                fontSize: '12px',
                textDecoration: 'none',
                transition: 'color 0.15s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#D4AF37')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#4b5563')}
            >
              {t}
            </a>
          ))}
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
