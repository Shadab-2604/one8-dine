import api from './axios';

// ─── Auth ────────────────────────────────────────────────────────────────────
export const login = (email, password) =>
  api.post('/api/auth/login', { email, password });

export const register = (name, email, password, phone) =>
  api.post('/api/auth/signup', { name, email, password, phone });

export const getProfile = async () => {
  const data = await api.get('/api/auth/me');
  return data.user;
};

// ─── Menu ─────────────────────────────────────────────────────────────────────
export const getMenuItems = async () => {
  const data = await api.get('/api/menu');
  return data.items || [];
};

// ─── Tables / Availability ────────────────────────────────────────────────────
export const checkAvailability = (date, time, guests) =>
  api.get(`/api/tables/availability?date=${date}&time=${time}&guests=${guests}`);

// ─── Bookings ─────────────────────────────────────────────────────────────────
export const createBooking = async (bookingData) => {
  const data = await api.post('/api/bookings', bookingData);
  return data.booking;
};

export const getUserBookings = async () => {
  const data = await api.get('/api/bookings/my');
  return data.bookings || [];
};

export const cancelBooking = async (bookingId) => {
  await api.delete(`/api/bookings/${bookingId}`);
  return true;
};

// ─── Orders ───────────────────────────────────────────────────────────────────
export const createOrder = async (orderData) => {
  const data = await api.post('/api/orders', orderData);
  return data.order;
};

export const getUserOrders = async () => {
  const data = await api.get('/api/orders/my');
  return data.orders || [];
};

// NOTE: No DELETE /api/orders/:id endpoint exists in the backend.
// Order cancellation is not supported via the user-facing API.

// ─── Admin Stats ──────────────────────────────────────────────────────────────
export const getAdminStats = async () => {
  const data = await api.get('/api/admin/stats');
  return data.stats;
};

// ─── Admin Bookings ───────────────────────────────────────────────────────────
export const getAllBookings = async () => {
  const data = await api.get('/api/admin/bookings');
  return data.bookings || [];
};

export const updateBookingStatus = (bookingId, status) =>
  api.put(`/api/admin/bookings/${bookingId}/status`, { status });

// ─── Admin Orders ─────────────────────────────────────────────────────────────
export const getAllOrders = async () => {
  const data = await api.get('/api/admin/orders');
  return data.orders || [];
};

export const updateOrderStatus = (orderId, status) =>
  api.put(`/api/admin/orders/${orderId}/status`, { status });

// ─── Admin Users ──────────────────────────────────────────────────────────────
export const getAllUsers = async () => {
  const data = await api.get('/api/admin/users');
  return data.users || [];
};

export const deleteUser = (userId) =>
  api.delete(`/api/admin/users/${userId}`);

// ─── Admin Menu ───────────────────────────────────────────────────────────────
export const createMenuItem = (itemData) =>
  api.post('/api/admin/menu', itemData);

export const updateMenuItem = (itemId, itemData) =>
  api.put(`/api/admin/menu/${itemId}`, itemData);

export const deleteMenuItem = (itemId) =>
  api.delete(`/api/admin/menu/${itemId}`);

// ─── Admin Auth ───────────────────────────────────────────────────────────────
export const adminLoginAPI = (username, password) =>
  api.post('/api/admin/auth/login', { username, password });

export const adminMe = async () => {
  const data = await api.get('/api/admin/auth/me');
  return data.admin || { role: 'admin' };
};
