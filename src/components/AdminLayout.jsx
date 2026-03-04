import { Outlet } from 'react-router-dom';

const AdminLayout = () => {
  return (
    <div className="min-h-screen bg-dark text-white flex flex-col">
      <main className="grow">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
