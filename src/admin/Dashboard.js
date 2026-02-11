
import { Link } from 'react-router-dom';
import { FaBullhorn, FaUserTie, FaShareAlt, FaBook, FaChalkboardTeacher } from 'react-icons/fa';

const Dashboard = () => {
  return (
    <div className="admin-section">
      <h3>Dashboard Overview</h3>
      <p>Select a section to manage content.</p>
      
      <div className="dashboard-grid">
        <Link to="/admin/notices" className="dash-card">
          <div className="dash-icon"><FaBullhorn /></div>
          <h3>Notices</h3>
          <p>Manage scrolling marquee and news.</p>
        </Link>
        
        <Link to="/admin/governance" className="dash-card">
          <div className="dash-icon"><FaUserTie /></div>
          <h3>Governance</h3>
          <p>Update President, Secretary, etc.</p>
        </Link>
        
        <Link to="/admin/programs" className="dash-card">
          <div className="dash-icon"><FaBook /></div>
          <h3>Programs</h3>
          <p>Manage 'Beyond Academics' courses.</p>
        </Link>
        
         <Link to="/admin/classes" className="dash-card">
          <div className="dash-icon"><FaChalkboardTeacher /></div>
          <h3>Classes</h3>
          <p>Manage Admission classes.</p>
        </Link>
        
        <Link to="/admin/footer" className="dash-card">
          <div className="dash-icon"><FaShareAlt /></div>
          <h3>Footer</h3>
          <p>Update contact info and links.</p>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
