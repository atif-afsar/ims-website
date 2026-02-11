
import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { FaSave, FaTrash } from 'react-icons/fa';

const ManageFooter = () => {
  const [contactInfo, setContactInfo] = useState({
    id: null,
    address: 'Islamic Mission School, H.No. 67, Gali No. 04, Zakir Colony, Meerut - 250002',
    phone: '+91 9876543210',
    email: 'info@imsmeerut.com'
  });
  
  const [socialLinks, setSocialLinks] = useState([]);
  const [newLink, setNewLink] = useState({ platform: '', url: '', icon_class: 'fab fa-facebook-f' });
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      // Fetch Contact Info
      const { data: contactData } = await supabase.from('contact_info').select('*').single();
      if (contactData) setContactInfo(contactData);

      // Fetch Social Links
      const { data: socialData } = await supabase.from('social_links').select('*');
      setSocialLinks(socialData || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveContact = async (e) => {
    e.preventDefault();
    try {
      if (contactInfo.id) {
        const { error } = await supabase
          .from('contact_info')
          .update({ 
            address: contactInfo.address, 
            phone: contactInfo.phone, 
            email: contactInfo.email 
          })
          .eq('id', contactInfo.id);
        if (error) throw error;
      } else {
        const { data, error } = await supabase
          .from('contact_info')
          .insert([{
            address: contactInfo.address,
            phone: contactInfo.phone,
            email: contactInfo.email
          }])
          .select()
          .single();

        if (error) throw error;
        if (data) setContactInfo(data);
      }
      setMessage('Contact info updated!');
    } catch (error) {
      setMessage('Error updating contact: ' + error.message);
    }
  };

  const handleAddLink = async (e) => {
    e.preventDefault();
    try {
      const { error } = await supabase.from('social_links').insert([newLink]);
      if (error) throw error;
      setNewLink({ platform: '', url: '', icon_class: 'fab fa-facebook-f' });
      fetchData();
      setMessage('Link added!');
    } catch (error) {
       setMessage('Error adding link: ' + error.message);
    }
  };

  const handleDeleteLink = async (id) => {
    if (!window.confirm('Delete this link?')) return;
    try {
      const { error } = await supabase.from('social_links').delete().eq('id', id);
      if (error) throw error;
      fetchData();
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="admin-section">
      <h3>Manage Footer & Contact</h3>
      {message && <div className="admin-msg">{message}</div>}

      <div className="admin-form-card">
        <h4>Contact Information</h4>
        <form onSubmit={handleSaveContact}>
          <div className="form-group">
            <label>Address</label>
            <textarea 
              value={contactInfo.address} 
              onChange={(e) => setContactInfo({...contactInfo, address: e.target.value})}
              rows="3"
            />
          </div>
          <div className="form-group-row">
            <div className="form-group half">
              <label>Phone</label>
              <input 
                type="text" 
                value={contactInfo.phone} 
                onChange={(e) => setContactInfo({...contactInfo, phone: e.target.value})}
              />
            </div>
            <div className="form-group half">
              <label>Email</label>
              <input 
                type="text" 
                value={contactInfo.email} 
                onChange={(e) => setContactInfo({...contactInfo, email: e.target.value})}
              />
            </div>
          </div>
          <button type="submit" className="save-btn"><FaSave /> Save Contact Info</button>
        </form>
      </div>

      <div className="admin-form-card">
        <h4>Social Media Links</h4>
        <div className="admin-list">
          <table>
            <thead>
              <tr>
                <th>Platform</th>
                <th>URL</th>
                <th>Icon Class</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {socialLinks.map(link => (
                <tr key={link.id}>
                  <td>{link.platform}</td>
                  <td>{link.url}</td>
                  <td>{link.icon_class}</td>
                  <td>
                    <button onClick={() => handleDeleteLink(link.id)} className="icon-btn delete"><FaTrash /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h5 style={{marginTop: '20px'}}>Add New Link</h5>
        <form onSubmit={handleAddLink} className="form-group-row" style={{alignItems: 'flex-end'}}>
          <div className="form-group">
            <label>Platform</label>
            <input 
              type="text" 
              placeholder="Facebook"
              value={newLink.platform} 
              onChange={(e) => setNewLink({...newLink, platform: e.target.value})}
              required
            />
          </div>
          <div className="form-group" style={{flex: 2}}>
            <label>URL</label>
            <input 
              type="text" 
              placeholder="https://facebook.com/..."
              value={newLink.url} 
              onChange={(e) => setNewLink({...newLink, url: e.target.value})}
              required
            />
          </div>
          <div className="form-group">
            <label>Icon Class (FontAwesome)</label>
            <input 
              type="text" 
              placeholder="fab fa-facebook-f"
              value={newLink.icon_class} 
              onChange={(e) => setNewLink({...newLink, icon_class: e.target.value})}
            />
          </div>
          <button type="submit" className="save-btn" style={{marginBottom: '16px'}}>Add</button>
        </form>
      </div>
    </div>
  );
};

export default ManageFooter;
