import { Outlet } from 'react-router-dom';

const AdminLayout = () => (
  <div className="App">
    <main>
      <Outlet />
    </main>
  </div>
);

export default AdminLayout;
