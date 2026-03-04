const Footer = () => (
  <footer
    style={{
      backgroundColor: '#080d1a',
      borderTop: '1px solid rgba(212,175,55,0.12)',
      padding: '1.5rem',
      textAlign: 'center',
      color: '#6b7280',
      fontSize: '13px',
    }}
  >
    © {new Date().getFullYear()} One8 Dine. All rights reserved.
  </footer>
);

export default Footer;
