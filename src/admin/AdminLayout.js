
import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './admin.css';
import { FaTachometerAlt, FaBullhorn, FaUserTie, FaShareAlt, FaBook, FaChalkboardTeacher, FaBars, FaTimes } from 'react-icons/fa';

const AdminLayout = () => {
  const { signOut, user } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = async () => {
    await signOut();
    navigate('/admin/login');
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="admin-layout">
      <aside className={`admin-sidebar ${sidebarOpen ? 'open' : ''}`} aria-label="Admin Navigation">
        <div className="admin-sidebar-header">
          <span>IMS Admin</span>
          <button className="sidebar-close-btn" onClick={closeSidebar}>
            <FaTimes />
          </button>
        </div>
        
        <nav className="admin-nav">
          <NavLink to="/admin/dashboard" className={({ isActive }) => isActive ? "active" : ""} onClick={closeSidebar}>
            <FaTachometerAlt /> Dashboard
          </NavLink>
          <NavLink to="/admin/notices" className={({ isActive }) => isActive ? "active" : ""} onClick={closeSidebar}>
            <FaBullhorn /> Notices
          </NavLink>
          <NavLink to="/admin/governance" className={({ isActive }) => isActive ? "active" : ""} onClick={closeSidebar}>
            <FaUserTie /> Governance
          </NavLink>
          <NavLink to="/admin/programs" className={({ isActive }) => isActive ? "active" : ""} onClick={closeSidebar}>
            <FaBook /> Programs (Courses)
          </NavLink>
          <NavLink to="/admin/classes" className={({ isActive }) => isActive ? "active" : ""} onClick={closeSidebar}>
            <FaChalkboardTeacher /> Classes
          </NavLink>
          <NavLink to="/admin/footer" className={({ isActive }) => isActive ? "active" : ""} onClick={closeSidebar}>
            <FaShareAlt /> Footer / Contact
          </NavLink>
        </nav>

        <div className="admin-logout">
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </div>
      </aside>

      <main className="admin-main">
        <header className="admin-header">
          <button className="sidebar-toggle-btn" onClick={() => setSidebarOpen(!sidebarOpen)}>
            <FaBars />
          </button>
          <h2>Welcome, {user?.email}</h2>
        </header>
        
        <div className="admin-content">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
