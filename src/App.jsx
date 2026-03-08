import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import AdminLayout from './components/AdminLayout';
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';

// Public pages
import Home from './pages/Home';
import Menu from './pages/Menu';
import Login from './pages/Login';
import Signup from './pages/Signup';

// User pages
import Booking from './pages/Booking';
import Dashboard from './pages/Dashboard';
import OrderPage from './pages/OrderPage';

// Admin pages
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminMenu from './pages/admin/AdminMenu';
import AdminBookings from './pages/admin/AdminBookings';
import AdminOrders from './pages/admin/AdminOrders';
import AdminUsers from './pages/admin/AdminUsers';
import AdminLogin from './pages/admin/AdminLogin';

function App() {
  return (
    <Routes>
      {/* ─── Main site (with Navbar + Footer) ────────────────────────── */}
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="menu" element={<Menu />} />
        <Route path="login" element={<Login />} />
        <Route path="auth/login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="auth/register" element={<Signup />} />

        {/* Protected user routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="booking" element={<Booking />} />
          <Route path="bookings" element={<Booking />} />
          <Route path="order" element={<OrderPage />} />
          <Route path="dashboard" element={<Dashboard />} />
        </Route>
      </Route>

      {/* ─── Admin login (standalone, no layout) ─────────────────────── */}
      <Route path="/admin/login" element={<AdminLogin />} />

      {/* ─── Admin panel (separate AdminLayout) ──────────────────────── */}
      <Route element={<AdminRoute />}>
        <Route element={<AdminLayout />}>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/menu" element={<AdminMenu />} />
          <Route path="/admin/bookings" element={<AdminBookings />} />
          <Route path="/admin/orders" element={<AdminOrders />} />
          <Route path="/admin/users" element={<AdminUsers />} />
        </Route>
      </Route>

      {/* Catch-all */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
