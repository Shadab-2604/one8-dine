import { useState, useEffect } from 'react';
import { getMenuItems, createMenuItem, updateMenuItem, deleteMenuItem } from '../../lib/api';
import toast from 'react-hot-toast';
import AdminHeader from '../../components/admin/AdminHeader';
import MenuItemModal from '../../components/admin/MenuItemModal';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { formatPrice, capitalize } from '../../utils/formatters';

const AdminMenu = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const fetchItems = async () => {
    try {
      const data = await getMenuItems();
      setItems(data);
    } catch (err) {
      toast.error(err.message || 'Failed to load menu items');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchItems(); }, []);

  const handleSave = async (form) => {
    try {
      if (editingItem) {
        await updateMenuItem(editingItem._id, form);
        toast.success('Item updated');
      } else {
        await createMenuItem(form);
        toast.success('Item added');
      }
      setModalOpen(false);
      setEditingItem(null);
      fetchItems();
    } catch (err) {
      toast.error(err.message || 'Failed to save item');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this menu item?')) return;
    try {
      await deleteMenuItem(id);
      toast.success('Item deleted');
      setItems((prev) => prev.filter((i) => i._id !== id));
    } catch (err) {
      toast.error(err.message || 'Failed to delete item');
    }
  };

  const openEdit = (item) => {
    setEditingItem(item);
    setModalOpen(true);
  };

  const openAdd = () => {
    setEditingItem(null);
    setModalOpen(true);
  };

  if (loading) return (
    <>
      <AdminHeader title="Menu Management" />
      <LoadingSpinner />
    </>
  );

  return (
    <>
      <AdminHeader title="Menu Management" />
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '2rem 1.5rem' }}>

        {/* Top Row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.75rem', flexWrap: 'wrap', gap: '1rem' }}>
          <h2 style={{ color: '#fff', fontSize: '22px', fontWeight: 700 }}>
            Menu Items ({items.length})
          </h2>
          <button
            onClick={openAdd}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              backgroundColor: '#D4AF37',
              color: '#080d1a',
              border: 'none',
              borderRadius: '4px',
              padding: '9px 18px',
              fontSize: '13px',
              fontWeight: 700,
              fontFamily: 'inherit',
              cursor: 'pointer',
              letterSpacing: '0.03em',
              transition: 'opacity 0.15s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.88')}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
          >
            <Plus size={16} /> Add Item
          </button>
        </div>

        {/* Card Grid */}
        {items.length === 0 ? (
          <div style={{ textAlign: 'center', color: '#6b7280', padding: '4rem 0' }}>
            No menu items yet.
          </div>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '1.25rem',
            }}
          >
            {items.map((item) => (
              <div
                key={item._id}
                style={{
                  backgroundColor: '#0f1628',
                  border: '1px solid rgba(212,175,55,0.12)',
                  borderRadius: '6px',
                  overflow: 'hidden',
                }}
              >
                <div style={{ padding: '1.25rem' }}>
                  <p style={{ color: '#fff', fontWeight: 700, fontSize: '16px', marginBottom: '0.4rem' }}>
                    {item.name}
                  </p>
                  <span
                    style={{
                      display: 'inline-block',
                      backgroundColor: 'rgba(255,255,255,0.06)',
                      color: '#9ca3af',
                      fontSize: '11px',
                      fontWeight: 600,
                      padding: '2px 10px',
                      borderRadius: '9999px',
                      marginBottom: '0.6rem',
                      letterSpacing: '0.04em',
                    }}
                  >
                    {capitalize(item.category)}
                  </span>
                  <p style={{ color: '#9ca3af', fontSize: '13px', lineHeight: 1.5, marginBottom: '0.75rem', minHeight: '40px' }}>
                    {item.description}
                  </p>
                  <p style={{ color: '#D4AF37', fontWeight: 700, fontSize: '18px' }}>
                    {formatPrice(item.price)}
                  </p>
                </div>

                {/* Action buttons */}
                <div
                  style={{
                    borderTop: '1px solid rgba(255,255,255,0.06)',
                    display: 'flex',
                  }}
                >
                  <button
                    onClick={() => openEdit(item)}
                    style={{
                      flex: 1,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px',
                      padding: '10px',
                      backgroundColor: 'transparent',
                      border: 'none',
                      color: '#9ca3af',
                      fontSize: '13px',
                      fontWeight: 500,
                      fontFamily: 'inherit',
                      cursor: 'pointer',
                      borderRight: '1px solid rgba(255,255,255,0.06)',
                      transition: 'color 0.15s, background 0.15s',
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = '#D4AF37'; e.currentTarget.style.backgroundColor = 'rgba(212,175,55,0.05)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = '#9ca3af'; e.currentTarget.style.backgroundColor = 'transparent'; }}
                  >
                    <Pencil size={14} /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item._id)}
                    style={{
                      width: '48px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: '10px',
                      backgroundColor: 'transparent',
                      border: 'none',
                      color: '#ef4444',
                      cursor: 'pointer',
                      transition: 'background 0.15s',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(239,68,68,0.08)')}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      {modalOpen && (
        <MenuItemModal
          item={editingItem}
          onSave={handleSave}
          onClose={() => { setModalOpen(false); setEditingItem(null); }}
        />
      )}
    </>
  );
};

export default AdminMenu;
