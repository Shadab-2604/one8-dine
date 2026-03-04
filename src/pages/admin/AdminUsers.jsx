import { useState, useEffect } from 'react';
import { getAllUsers, deleteUser } from '../../lib/api';
import toast from 'react-hot-toast';
import AdminHeader from '../../components/admin/AdminHeader';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import { Trash2, Search, User } from 'lucide-react';
import { formatDate } from '../../utils/formatters';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllUsers()
      .then(setUsers)
      .catch((err) => toast.error(err.message || 'Failed to load users'))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this user? This will also remove their bookings and orders.')) return;
    try {
      await deleteUser(id);
      toast.success('User deleted');
      setUsers((prev) => prev.filter((u) => u._id !== id));
    } catch (err) {
      toast.error(err.message || 'Failed to delete user');
    }
  };

  const filtered = users.filter((u) => {
    const q = search.toLowerCase();
    return (
      u.name?.toLowerCase().includes(q) ||
      u.email?.toLowerCase().includes(q) ||
      u.phone?.toLowerCase().includes(q)
    );
  });

  if (loading) return (
    <>
      <AdminHeader title="User Management" />
      <LoadingSpinner />
    </>
  );

  return (
    <>
      <AdminHeader title="User Management" />
      <div style={{ maxWidth: '960px', margin: '0 auto', padding: '2rem 1.5rem' }}>

        {/* Search */}
        <div style={{ position: 'relative', marginBottom: '1.75rem', maxWidth: '400px' }}>
          <Search size={15} color="#6b7280" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
          <input
            type="text"
            placeholder="Search by name, email or phone…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input-dark"
            style={{ paddingLeft: '38px' }}
          />
        </div>

        {/* Count */}
        <p style={{ color: '#9ca3af', fontSize: '13px', marginBottom: '1rem' }}>
          {filtered.length} user{filtered.length !== 1 ? 's' : ''} found
        </p>

        {filtered.length === 0 ? (
          <div style={{ textAlign: 'center', color: '#6b7280', padding: '4rem 0' }}>
            No users match your search.
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {filtered.map((user) => (
              <div
                key={user._id}
                style={{
                  backgroundColor: '#0f1628',
                  border: '1px solid rgba(212,175,55,0.12)',
                  borderRadius: '6px',
                  padding: '1.25rem 1.5rem',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: '1rem',
                  flexWrap: 'wrap',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: 1 }}>
                  <div
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      backgroundColor: 'rgba(212,175,55,0.1)',
                      border: '1px solid rgba(212,175,55,0.2)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <User size={18} color="#D4AF37" />
                  </div>
                  <div>
                    <p style={{ color: '#fff', fontWeight: 600, fontSize: '15px', marginBottom: '2px' }}>
                      {user.name}
                    </p>
                    <p style={{ color: '#9ca3af', fontSize: '13px' }}>
                      {user.email}
                      {user.phone && <span style={{ marginLeft: '1rem' }}>· {user.phone}</span>}
                    </p>
                    <p style={{ color: '#6b7280', fontSize: '11px', marginTop: '2px' }}>
                      {user.bookingsCount ?? 0} booking(s) · Joined {formatDate(user.createdAt)}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => handleDelete(user._id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px',
                    color: '#ef4444',
                    background: 'none',
                    border: '1px solid rgba(239,68,68,0.3)',
                    borderRadius: '4px',
                    padding: '7px 12px',
                    cursor: 'pointer',
                    fontSize: '12px',
                    fontFamily: 'inherit',
                    fontWeight: 500,
                    transition: 'background 0.15s',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(239,68,68,0.1)')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                >
                  <Trash2 size={13} /> Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default AdminUsers;
