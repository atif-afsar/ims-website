
import { Link } from 'react-router';
import { FaBullhorn, FaUserTie, FaShareAlt, FaBook, FaChalkboardTeacher, FaCalendarAlt, FaFlask, FaHome, FaImages, FaWindowRestore, FaQuoteLeft, FaInbox, FaPhotoVideo } from 'react-icons/fa';

const Dashboard = () => {
  return (
    <div className="admin-section">
      <h3>Dashboard Overview</h3>
      <p>Select a section to manage content.</p>
      
      <div className="dashboard-grid">
        <Link to="/admin/enquiries" className="dash-card">
          <div className="dash-icon"><FaInbox /></div>
          <h3>Enquiries</h3>
          <p>Messages from the website’s contact form.</p>
        </Link>

        <Link to="/admin/gallery" className="dash-card">
          <div className="dash-icon"><FaPhotoVideo /></div>
          <h3>Gallery</h3>
          <p>Albums and photos from school events.</p>
        </Link>

        <Link to="/admin/homepage" className="dash-card">
          <div className="dash-icon"><FaHome /></div>
          <h3>Homepage</h3>
          <p>Order, show/hide and edit homepage sections.</p>
        </Link>

        <Link to="/admin/hero-slides" className="dash-card">
          <div className="dash-icon"><FaImages /></div>
          <h3>Hero Slides</h3>
          <p>Photos and headlines at the top of the homepage.</p>
        </Link>

        <Link to="/admin/popup" className="dash-card">
          <div className="dash-icon"><FaWindowRestore /></div>
          <h3>Announcements</h3>
          <p>News shown in the bell panel on every page.</p>
        </Link>

        <Link to="/admin/testimonials" className="dash-card">
          <div className="dash-icon"><FaQuoteLeft /></div>
          <h3>Testimonials</h3>
          <p>Quotes from parents, students and alumni.</p>
        </Link>

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

        <Link to="/admin/neet-jee" className="dash-card">
          <div className="dash-icon"><FaFlask /></div>
          <h3>NEET / JEE</h3>
          <p>Manage hero, results, faculty, answer keys.</p>
        </Link>
        
         <Link to="/admin/classes" className="dash-card">
          <div className="dash-icon"><FaChalkboardTeacher /></div>
          <h3>Classes</h3>
          <p>Manage Admission classes.</p>
        </Link>

        <Link to="/admin/calendar" className="dash-card">
          <div className="dash-icon"><FaCalendarAlt /></div>
          <h3>Calendar</h3>
          <p>Manage public events and holidays.</p>
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
