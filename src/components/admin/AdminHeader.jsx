import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { ArrowLeft, LogOut } from 'lucide-react';

const AdminHeader = ({ title, backPath = '/admin', showBack = true }) => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <header
      style={{
        backgroundColor: '#080d1a',
        borderBottom: '1px solid rgba(212,175,55,0.15)',
        padding: '0 1.5rem',
        height: '56px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'sticky',
        top: 0,
        zIndex: 50,
      }}
    >
      {/* Back */}
      <button
        onClick={() => navigate(backPath)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          color: '#9ca3af',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          fontSize: '14px',
          fontFamily: 'inherit',
          padding: '4px 8px',
          borderRadius: '4px',
          transition: 'color 0.15s',
          minWidth: '80px',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.color = '#fff')}
        onMouseLeave={(e) => (e.currentTarget.style.color = '#9ca3af')}
      >
        {showBack && (
          <>
            <ArrowLeft size={16} />
            <span>Back</span>
          </>
        )}
      </button>

      {/* Title */}
      <h1
        style={{
          color: '#ffffff',
          fontSize: '20px',
          fontWeight: 700,
          fontFamily: 'Montserrat, sans-serif',
          letterSpacing: '-0.01em',
        }}
      >
        {title}
      </h1>

      {/* Logout */}
      <button
        onClick={handleLogout}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          color: '#9ca3af',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          fontSize: '14px',
          fontFamily: 'inherit',
          padding: '4px 8px',
          borderRadius: '4px',
          transition: 'color 0.15s',
          minWidth: '80px',
          justifyContent: 'flex-end',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.color = '#ef4444')}
        onMouseLeave={(e) => (e.currentTarget.style.color = '#9ca3af')}
      >
        <LogOut size={16} />
        <span>Logout</span>
      </button>
    </header>
  );
};

export default AdminHeader;
