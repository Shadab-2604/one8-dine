import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const CATEGORIES = ['appetizers', 'mains', 'desserts', 'beverages'];

const CATEGORY_LABELS = {
  appetizers: 'Appetizers',
  mains: 'Mains',
  desserts: 'Desserts',
  beverages: 'Beverages',
};

const MenuItemModal = ({ item, onSave, onClose }) => {
  const [form, setForm] = useState({
    name: '',
    category: 'appetizers',
    description: '',
    price: '',
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (item) {
      setForm({
        name: item.name || '',
        category: item.category || 'appetizers',
        description: item.description || '',
        price: item.price || '',
      });
    }
  }, [item]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.price) return;
    setSaving(true);
    await onSave({ ...form, price: Number(form.price) });
    setSaving(false);
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0,0,0,0.7)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
        zIndex: 100,
      }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        style={{
          backgroundColor: '#0f1628',
          border: '1px solid rgba(212,175,55,0.2)',
          borderRadius: '8px',
          padding: '2rem',
          width: '100%',
          maxWidth: '480px',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#fff', fontSize: '20px', fontWeight: 700 }}>
            {item ? 'Edit Menu Item' : 'Add Menu Item'}
          </h2>
          <button
            onClick={onClose}
            style={{ color: '#9ca3af', background: 'none', border: 'none', cursor: 'pointer', display: 'flex' }}
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', color: '#9ca3af', fontSize: '12px', fontWeight: 500, marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Name *
            </label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              placeholder="e.g. Wagyu Beef Steak"
              className="input-dark"
            />
          </div>

          <div>
            <label style={{ display: 'block', color: '#9ca3af', fontSize: '12px', fontWeight: 500, marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Category *
            </label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="input-dark"
              style={{ cursor: 'pointer' }}
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c} style={{ backgroundColor: '#0f1628' }}>
                  {CATEGORY_LABELS[c]}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label style={{ display: 'block', color: '#9ca3af', fontSize: '12px', fontWeight: 500, marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Description
            </label>
            <input
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Brief description of the dish"
              className="input-dark"
            />
          </div>

          <div>
            <label style={{ display: 'block', color: '#9ca3af', fontSize: '12px', fontWeight: 500, marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Price (USD) *
            </label>
            <input
              name="price"
              type="number"
              step="0.01"
              min="0"
              value={form.price}
              onChange={handleChange}
              required
              placeholder="e.g. 65.99"
              className="input-dark"
            />
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
            <button
              type="submit"
              disabled={saving}
              className="btn-gold"
              style={{ flex: 1 }}
            >
              {saving ? 'Saving…' : item ? 'Save Changes' : 'Add Item'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="btn-outline-gold"
              style={{ flex: 1 }}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MenuItemModal;
