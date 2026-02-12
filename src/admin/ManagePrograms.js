
import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { uploadFile } from '../utils/uploadFile';
import { FaTrash, FaEdit, FaPlus } from 'react-icons/fa';

const ManagePrograms = () => {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({ 
    name: '', 
    description: '', 
    cover_image: '', 
    hover_image: '',
    sort_order: 0 
  });
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchPrograms();
  }, []);

  const fetchPrograms = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('programs')
        .select('*')
        .order('sort_order', { ascending: true });
      
      if (error) throw error;
      setPrograms(data || []);
    } catch (error) {
      console.error('Error fetching programs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        const { error } = await supabase
          .from('programs')
          .update(formData)
          .eq('id', editingId);
        if (error) throw error;
        setMessage('Program updated successfully!');
      } else {
        const { error } = await supabase
          .from('programs')
          .insert([formData]);
        if (error) throw error;
        setMessage('Program added successfully!');
      }
      
      setFormData({ name: '', description: '', cover_image: '', hover_image: '', sort_order: 0 });
      setEditingId(null);
      fetchPrograms();
    } catch (error) {
      setMessage('Error: ' + error.message);
    }
  };

  const handleEdit = (program) => {
    setFormData({
      name: program.name,
      description: program.description || '',
      cover_image: program.cover_image || '',
      hover_image: program.hover_image || '',
      sort_order: program.sort_order
    });
    setEditingId(program.id);
  };

  const handleDelete = async (id) => {
    if(!window.confirm("Are you sure?")) return;
    try {
      const { error } = await supabase.from('programs').delete().eq('id', id);
      if (error) throw error;
      fetchPrograms();
    } catch (error) {
      alert(error.message);
    }
  };

  const handleCoverImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    try {
      const url = await uploadFile(file, 'programs');
      if (url) {
        setFormData({ ...formData, cover_image: url });
        setMessage('Image uploaded successfully!');
      } else {
        setMessage('Error uploading image');
      }
    } catch (error) {
      setMessage('Error: ' + error.message);
    } finally {
      setUploading(false);
    }
  };

  const handleHoverImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    try {
      const url = await uploadFile(file, 'programs');
      if (url) {
        setFormData({ ...formData, hover_image: url });
        setMessage('Image uploaded successfully!');
      } else {
        setMessage('Error uploading image');
      }
    } catch (error) {
      setMessage('Error: ' + error.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="admin-section">
      <h3>Manage Programs (Beyond Academics)</h3>
      {message && <div className="admin-msg">{message}</div>}

      <div className="admin-form-card">
        <h4>{editingId ? 'Edit Program' : 'Add New Program'}</h4>
        <form onSubmit={handleSubmit}>
          <div className="form-group-row">
            <div className="form-group half">
              <label>Program Name</label>
              <input 
                type="text" 
                value={formData.name} 
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                required 
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

          <div className="form-group">
            <label>Description</label>
            <textarea 
               value={formData.description} 
               onChange={(e) => setFormData({...formData, description: e.target.value})}
               rows="3"
            />
          </div>

          <div className="form-group-row">
             <div className="form-group half">
              <label>Cover Image</label>
              <input 
                type="file" 
                accept="image/*"
                onChange={handleCoverImageUpload}
                disabled={uploading}
              />
              {formData.cover_image && <p style={{fontSize: '12px', color: '#666', marginTop: '5px'}}>✓ Image selected</p>}
            </div>
          </div>

          <button type="submit" className="save-btn" disabled={uploading}>
            {uploading ? 'Uploading...' : (editingId ? 'Update Program' : 'Add Program')}
          </button>
          
          {editingId && (
            <button 
              type="button" 
              className="cancel-btn"
              onClick={() => {
                setEditingId(null);
                setFormData({ name: '', description: '', cover_image: '', hover_image: '', sort_order: 0 });
              }}
            >
              Cancel
            </button>
          )}
        </form>
      </div>

      <div className="admin-list">
        {loading ? <p>Loading...</p> : (
          <table>
            <thead>
              <tr>
                <th>Order</th>
                <th>Name</th>
                <th>Image</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {programs.map(p => (
                <tr key={p.id}>
                  <td>{p.sort_order}</td>
                  <td>{p.name}</td>
                  <td>
                    {p.cover_image && <img src={p.cover_image} alt={p.name} style={{height: '40px'}} />}
                  </td>
                  <td>
                    <button onClick={() => handleEdit(p)} className="icon-btn edit"><FaEdit /></button>
                    <button onClick={() => handleDelete(p.id)} className="icon-btn delete"><FaTrash /></button>
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

export default ManagePrograms;
