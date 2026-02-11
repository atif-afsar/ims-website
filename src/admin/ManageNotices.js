
import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { FaTrash, FaEdit } from 'react-icons/fa';

const ManageNotices = () => {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({ title: '', link: '', is_active: true });
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    fetchNotices();
  }, []);

  const fetchNotices = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('notices')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setNotices(data || []);
    } catch (error) {
      console.error('Error fetching notices:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        const { error } = await supabase
          .from('notices')
          .update(formData)
          .eq('id', editingId);
        if (error) throw error;
        setMessage('Notice updated successfully!');
      } else {
        const { error } = await supabase
          .from('notices')
          .insert([formData]);
        if (error) throw error;
        setMessage('Notice added successfully!');
      }
      
      setFormData({ title: '', link: '', is_active: true });
      setEditingId(null);
      fetchNotices();
    } catch (error) {
      setMessage('Error: ' + error.message);
    }
  };

  const handleEdit = (notice) => {
    setFormData({
      title: notice.title,
      link: notice.link || '',
      is_active: notice.is_active
    });
    setEditingId(notice.id);
  };

  const handleDelete = async (id) => {
    if(!window.confirm("Are you sure?")) return;
    try {
      const { error } = await supabase.from('notices').delete().eq('id', id);
      if (error) throw error;
      fetchNotices();
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="admin-section">
      <h3>Manage Notices</h3>
      {message && <div className="admin-msg">{message}</div>}

      {/* Form */}
      <div className="admin-form-card">
        <h4>{editingId ? 'Edit Notice' : 'Add New Notice'}</h4>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Title</label>
            <input 
              type="text" 
              value={formData.title} 
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              required 
            />
          </div>
          <div className="form-group">
            <label>Link (Optional)</label>
            <input 
              type="text" 
              value={formData.link} 
              onChange={(e) => setFormData({...formData, link: e.target.value})}
              placeholder="e.g. /files/circular.pdf"
            />
          </div>
          <div className="form-group checkbox">
            <label>
              <input 
                type="checkbox" 
                checked={formData.is_active}
                onChange={(e) => setFormData({...formData, is_active: e.target.checked})}
              /> Active
            </label>
          </div>
          
          <button type="submit" className="save-btn">
            {editingId ? 'Update Notice' : 'Add Notice'}
          </button>
          
          {editingId && (
            <button 
              type="button" 
              className="cancel-btn"
              onClick={() => {
                setEditingId(null);
                setFormData({ title: '', link: '', is_active: true });
              }}
            >
              Cancel
            </button>
          )}
        </form>
      </div>

      {/* List */}
      <div className="admin-list">
        {loading ? <p>Loading...</p> : (
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Title</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {notices.map(n => (
                <tr key={n.id}>
                  <td>{new Date(n.created_at).toLocaleDateString()}</td>
                  <td>{n.title}</td>
                  <td>
                    <span className={`status-badge ${n.is_active ? 'active' : 'inactive'}`}>
                      {n.is_active ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td>
                    <button onClick={() => handleEdit(n)} className="icon-btn edit"><FaEdit /></button>
                    <button onClick={() => handleDelete(n.id)} className="icon-btn delete"><FaTrash /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ManageNotices;
