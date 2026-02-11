
import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { FaTrash, FaEdit } from 'react-icons/fa';

const ManageClasses = () => {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({ 
    name: '', 
    age_criteria: '', 
    group_category: 'pre-primary',
    sort_order: 0 
  });
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState(null);

  const groupOptions = [
    { key: "pre-primary", title: "Pre-Primary" },
    { key: "primary", title: "Primary" },
    { key: "middle", title: "Middle" },
    { key: "secondary", title: "Secondary" },
    { key: "senior-secondary", title: "Senior Secondary" },
  ];

  useEffect(() => {
    fetchClasses();
  }, []);

  const fetchClasses = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('classes')
        .select('*')
        .order('sort_order', { ascending: true });
      
      if (error) throw error;
      setClasses(data || []);
    } catch (error) {
      console.error('Error fetching classes:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        const { error } = await supabase
          .from('classes')
          .update(formData)
          .eq('id', editingId);
        if (error) throw error;
        setMessage('Class updated successfully!');
      } else {
        const { error } = await supabase
          .from('classes')
          .insert([formData]);
        if (error) throw error;
        setMessage('Class added successfully!');
      }
      
      setFormData({ name: '', age_criteria: '', group_category: 'pre-primary', sort_order: 0 });
      setEditingId(null);
      fetchClasses();
    } catch (error) {
      setMessage('Error: ' + error.message);
    }
  };

  const handleEdit = (cls) => {
    setFormData({
      name: cls.name,
      age_criteria: cls.age_criteria || '',
      group_category: cls.group_category || 'pre-primary',
      sort_order: cls.sort_order || 0
    });
    setEditingId(cls.id);
  };

  const handleDelete = async (id) => {
    if(!window.confirm("Are you sure?")) return;
    try {
      const { error } = await supabase.from('classes').delete().eq('id', id);
      if (error) throw error;
      fetchClasses();
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="admin-section">
      <h3>Manage Classes & Admissions</h3>
      {message && <div className="admin-msg">{message}</div>}

      <div className="admin-form-card">
        <h4>{editingId ? 'Edit Class' : 'Add New Class'}</h4>
        <form onSubmit={handleSubmit}>
          <div className="form-group-row">
            <div className="form-group half">
              <label>Class Name</label>
              <input 
                type="text" 
                value={formData.name} 
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                placeholder="e.g. Nursery"
                required 
              />
            </div>
             <div className="form-group half">
              <label>Age Criteria</label>
              <input 
                type="text" 
                value={formData.age_criteria} 
                onChange={(e) => setFormData({...formData, age_criteria: e.target.value})}
                placeholder="e.g. 4+ years"
              />
            </div>
          </div>

          <div className="form-group-row">
            <div className="form-group half">
              <label>Group Category</label>
              <select 
                value={formData.group_category} 
                onChange={(e) => setFormData({...formData, group_category: e.target.value})}
              >
                {groupOptions.map(opt => (
                  <option key={opt.key} value={opt.key}>{opt.title}</option>
                ))}
              </select>
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
            {editingId ? 'Update Class' : 'Add Class'}
          </button>
          
          {editingId && (
            <button 
              type="button" 
              className="cancel-btn"
              onClick={() => {
                setEditingId(null);
                setFormData({ name: '', age_criteria: '', group_category: 'pre-primary', sort_order: 0 });
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
                <th>Group</th>
                <th>Name</th>
                <th>Age</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {classes.map(c => (
                <tr key={c.id}>
                  <td>{c.sort_order}</td>
                  <td>{c.group_category}</td>
                  <td>{c.name}</td>
                  <td>{c.age_criteria}</td>
                  <td>
                    <button onClick={() => handleEdit(c)} className="icon-btn edit"><FaEdit /></button>
                    <button onClick={() => handleDelete(c.id)} className="icon-btn delete"><FaTrash /></button>
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

export default ManageClasses;
