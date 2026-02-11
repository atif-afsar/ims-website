
import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { FaTrash, FaEdit } from 'react-icons/fa';

const ManageGovernance = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({ name: '', role: '', qualification: '', profession: '', image_url: '', sort_order: 0 });
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('governance')
        .select('*')
        .order('sort_order', { ascending: true });
      
      if (error) throw error;
      setMembers(data || []);
    } catch (error) {
      console.error('Error fetching members:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        const { error } = await supabase
          .from('governance')
          .update(formData)
          .eq('id', editingId);
        if (error) throw error;
        setMessage('Member updated successfully!');
      } else {
        const { error } = await supabase
          .from('governance')
          .insert([formData]);
        if (error) throw error;
        setMessage('Member added successfully!');
      }
      
      setFormData({ name: '', role: '', qualification: '', profession: '', image_url: '', sort_order: 0 });
      setEditingId(null);
      fetchMembers();
    } catch (error) {
      setMessage('Error: ' + error.message);
    }
  };

  const handleEdit = (member) => {
    setFormData({
      name: member.name,
      role: member.role,
      qualification: member.qualification || '',
      profession: member.profession || '',
      image_url: member.image_url || '',
      sort_order: member.sort_order
    });
    setEditingId(member.id);
  };

  const handleDelete = async (id) => {
    if(!window.confirm("Are you sure?")) return;
    try {
      const { error } = await supabase.from('governance').delete().eq('id', id);
      if (error) throw error;
      fetchMembers();
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="admin-section">
      <h3>Manage Governance (Faculty/Office Bearers)</h3>
      {message && <div className="admin-msg">{message}</div>}

      {/* Form */}
      <div className="admin-form-card">
        <h4>{editingId ? 'Edit Member' : 'Add New Member'}</h4>
        <form onSubmit={handleSubmit}>
          <div className="form-group-row">
            <div className="form-group half">
              <label>Name</label>
              <input 
                type="text" 
                value={formData.name} 
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                required 
              />
            </div>
            <div className="form-group half">
              <label>Role</label>
              <input 
                type="text" 
                value={formData.role} 
                onChange={(e) => setFormData({...formData, role: e.target.value})}
                placeholder="e.g. President"
                required 
              />
            </div>
          </div>

          <div className="form-group-row">
            <div className="form-group half">
              <label>Qualification</label>
              <input 
                type="text" 
                value={formData.qualification} 
                onChange={(e) => setFormData({...formData, qualification: e.target.value})}
                placeholder="e.g. MBBS, MD"
              />
            </div>
            <div className="form-group half">
              <label>Profession/Detail</label>
              <input 
                type="text" 
                value={formData.profession} 
                onChange={(e) => setFormData({...formData, profession: e.target.value})}
                placeholder="Optional description"
              />
            </div>
          </div>

           <div className="form-group-row">
            <div className="form-group half">
              <label>Image URL</label>
               <input 
                type="text" 
                value={formData.image_url} 
                onChange={(e) => setFormData({...formData, image_url: e.target.value})}
                placeholder="Paste image link"
              />
            </div>
            <div className="form-group half">
              <label>Sort Order</label>
              <input 
                type="number" 
                value={formData.sort_order} 
                onChange={(e) => setFormData({...formData, sort_order: parseInt(e.target.value)})}
              />
            </div>
          </div>
          
          <button type="submit" className="save-btn">
            {editingId ? 'Update Member' : 'Add Member'}
          </button>
          
          {editingId && (
            <button 
              type="button" 
              className="cancel-btn"
              onClick={() => {
                setEditingId(null);
                setFormData({ name: '', role: '', qualification: '', profession: '', image_url: '', sort_order: 0 });
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
                <th>Order</th>
                <th>Name</th>
                <th>Role</th>
                <th>Qualification</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {members.map(m => (
                <tr key={m.id}>
                  <td>{m.sort_order}</td>
                  <td>{m.name}</td>
                  <td>{m.role}</td>
                  <td>{m.qualification}</td>
                  <td>
                    <button onClick={() => handleEdit(m)} className="icon-btn edit"><FaEdit /></button>
                    <button onClick={() => handleDelete(m.id)} className="icon-btn delete"><FaTrash /></button>
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

export default ManageGovernance;
