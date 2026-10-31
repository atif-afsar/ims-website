
import React, { useEffect, useState, Suspense } from 'react';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router';
import { api } from '../lib/api';
import { useApiAuth } from './ApiAuth';
import './admin.css';
import { FaTachometerAlt, FaBullhorn, FaUserTie, FaShareAlt, FaBook, FaChalkboardTeacher, FaCalendarAlt, FaBars, FaTimes, FaFlask, FaImages, FaWindowRestore, FaHome, FaQuoteLeft, FaKey, FaInbox, FaPhotoVideo } from 'react-icons/fa';

const AdminLayout = () => {
  const { logout, user } = useApiAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [newEnquiries, setNewEnquiries] = useState(0);
  const { pathname } = useLocation();

  // Count of unanswered enquiries for the menu badge
  useEffect(() => {
    const refresh = () => api.get('/admin/enquiries').then((rows) => setNewEnquiries(rows.filter((r) => r.status === 'new').length)).catch(() => {});
    refresh();
    window.addEventListener('ims-enquiries-changed', refresh);
    return () => window.removeEventListener('ims-enquiries-changed', refresh);
  }, [pathname]);

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login', { replace: true });
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
          <NavLink to="/admin/enquiries" className={({ isActive }) => isActive ? "active" : ""} onClick={closeSidebar}>
            <FaInbox /> Enquiries
            {newEnquiries > 0 && <span style={{ marginLeft: 'auto', background: '#E4C062', color: '#002014', borderRadius: 999, padding: '1px 9px', fontSize: 12, fontWeight: 700 }}>{newEnquiries}</span>}
          </NavLink>
          <NavLink to="/admin/homepage" className={({ isActive }) => isActive ? "active" : ""} onClick={closeSidebar}>
            <FaHome /> Homepage
          </NavLink>
          <NavLink to="/admin/testimonials" className={({ isActive }) => isActive ? "active" : ""} onClick={closeSidebar}>
            <FaQuoteLeft /> Testimonials
          </NavLink>
          <NavLink to="/admin/hero-slides" className={({ isActive }) => isActive ? "active" : ""} onClick={closeSidebar}>
            <FaImages /> Hero Slides
          </NavLink>
          <NavLink to="/admin/gallery" className={({ isActive }) => isActive ? "active" : ""} onClick={closeSidebar}>
            <FaPhotoVideo /> Gallery
          </NavLink>
          <NavLink to="/admin/popup" className={({ isActive }) => isActive ? "active" : ""} onClick={closeSidebar}>
            <FaWindowRestore /> Announcements
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
          <NavLink to="/admin/neet-jee" className={({ isActive }) => isActive ? "active" : ""} onClick={closeSidebar}>
            <FaFlask /> NEET / JEE
          </NavLink>
          <NavLink to="/admin/classes" className={({ isActive }) => isActive ? "active" : ""} onClick={closeSidebar}>
            <FaChalkboardTeacher /> Classes
          </NavLink>
          <NavLink to="/admin/calendar" className={({ isActive }) => isActive ? "active" : ""} onClick={closeSidebar}>
            <FaCalendarAlt /> Calendar
          </NavLink>
          <NavLink to="/admin/footer" className={({ isActive }) => isActive ? "active" : ""} onClick={closeSidebar}>
            <FaShareAlt /> Footer / Contact
          </NavLink>
          <NavLink to="/admin/account" className={({ isActive }) => isActive ? "active" : ""} onClick={closeSidebar}>
            <FaKey /> Change Password
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
          <h2>Welcome, {user?.name || user?.email}</h2>
        </header>
        
        <div className="admin-content">
          <Suspense fallback={<div>Loading...</div>}>
            <Outlet />
          </Suspense>
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
