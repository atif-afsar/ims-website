import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import { uploadFile } from '../utils/uploadFile';
import { FaTrash, FaEdit, FaEye, FaEyeSlash } from 'react-icons/fa';

const EMPTY = {
  eyebrow: '', title: '', message: '', image_url: '',
  cta_text: '', cta_link: '', show_on: 'home', delay_seconds: 3,
  is_active: true, starts_on: '', ends_on: '',
};

const today = () => new Date().toLocaleDateString('en-CA');
const statusLabel = (p) => {
  if (!p.is_active) return 'Hidden';
  if (p.starts_on && p.starts_on > today()) return `Starts ${p.starts_on}`;
  if (p.ends_on && p.ends_on < today()) return `Ended ${p.ends_on}`;
  return 'Live';
};

/* Miniature of the popup visitors will see */
const Preview = ({ popup }) => (
  <div style={{ maxWidth: 380, margin: '0 auto', borderRadius: 20, overflow: 'hidden', background: '#FFFAF2', boxShadow: '0 20px 40px -20px rgba(0,32,20,.35)' }}>
    {popup.image_url
      ? <img src={popup.image_url} alt="" style={{ width: '100%', maxHeight: 220, objectFit: 'contain', background: '#002E1C', display: 'block' }} />
      : <div style={{ height: 56, background: '#003C24' }} />}
    <div style={{ borderTop: '4px solid #E4C062', padding: 20 }}>
      {popup.eyebrow && <div style={{ fontSize: 11, letterSpacing: '.2em', textTransform: 'uppercase', color: '#A8884A', fontWeight: 600 }}>{popup.eyebrow}</div>}
      <div style={{ fontFamily: '"Playfair Display", Georgia, serif', fontWeight: 700, fontSize: 22, color: '#0A0A20', marginTop: 4 }}>{popup.title || 'Popup title'}</div>
      {popup.message && <div style={{ fontSize: 14, color: '#555', marginTop: 8, whiteSpace: 'pre-line' }}>{popup.message}</div>}
      {popup.cta_text && <span style={{ display: 'inline-block', marginTop: 14, background: '#003C24', color: '#FFFAF2', borderRadius: 999, padding: '8px 16px', fontSize: 13, fontWeight: 600 }}>{popup.cta_text}</span>}
    </div>
  </div>
);

const ManagePopup = () => {
  const [popups, setPopups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState(EMPTY);
  const [editingId, setEditingId] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    fetchPopups();
  }, []);

  const fetchPopups = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase.from('site_popups').select('*').order('created_at', { ascending: false });
      if (error) throw error;
      setPopups(data || []);
    } catch (error) {
      setMessage('Error loading popups: ' + error.message + ' (has popups-schema.sql been run in Supabase?)');
    } finally {
      setLoading(false);
    }
  };

  const set = (field) => (e) => setFormData({ ...formData, [field]: e.target.type === 'checkbox' ? e.target.checked : e.target.value });
  const clean = (data) => Object.fromEntries(Object.entries(data).map(([k, v]) => [k, v === '' ? null : v]));

  const handleSubmit = async (e) => {
    e.preventDefault();
    const row = { ...clean(formData), delay_seconds: Number(formData.delay_seconds) || 0 };
    try {
      const { error } = editingId
        ? await supabase.from('site_popups').update(row).eq('id', editingId)
        : await supabase.from('site_popups').insert([row]);
      if (error) throw error;
      setMessage(editingId ? 'Popup updated.' : 'Popup added. Visitors will see it on their next visit.');
      setFormData(EMPTY);
      setEditingId(null);
      fetchPopups();
    } catch (error) {
      setMessage('Error: ' + error.message);
    }
  };

  const handleUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      setMessage('That image is over 5 MB. Please use a smaller image.');
      return;
    }
    setUploading(true);
    const url = await uploadFile(file, 'popups');
    setUploading(false);
    if (url) setFormData((f) => ({ ...f, image_url: url }));
    else setMessage('Upload failed. Please try again.');
  };

  const handleEdit = (p) => {
    setFormData(Object.fromEntries(Object.keys(EMPTY).map((k) => [k, p[k] ?? EMPTY[k]])));
    setEditingId(p.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this popup?')) return;
    const { error } = await supabase.from('site_popups').delete().eq('id', id);
    if (error) alert(error.message);
    fetchPopups();
  };

  const toggleActive = async (p) => {
    const { error } = await supabase.from('site_popups').update({ is_active: !p.is_active }).eq('id', p.id);
    if (error) alert(error.message);
    fetchPopups();
  };

  return (
    <div className="admin-section">
      <h3>Announcement Popup</h3>
      <p style={{ color: '#555', marginTop: -6, marginBottom: 16 }}>
        The newest live popup appears to visitors once per visit. Use dates to schedule it, or hide it when it is no longer needed.
      </p>
      {message && <div className="admin-msg">{message}</div>}

      <div className="admin-form-card">
        <h4>{editingId ? 'Edit Popup' : 'Add New Popup'}</h4>
        <div style={{ marginBottom: 20 }}><Preview popup={formData} /></div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Small line above the title (optional)</label>
            <input type="text" value={formData.eyebrow} onChange={set('eyebrow')} placeholder="e.g. Admission Open 2027–28" />
          </div>
          <div className="form-group">
            <label>Title</label>
            <input type="text" value={formData.title} onChange={set('title')} required placeholder="e.g. Registrations are now open" />
          </div>
          <div className="form-group">
            <label>Message (optional)</label>
            <textarea rows="3" value={formData.message} onChange={set('message')} />
          </div>
          <div className="form-group">
            <label>Image or poster (optional)</label>
            <input type="file" accept="image/jpeg,image/png,image/webp" onChange={handleUpload} disabled={uploading} />
            <small style={{ color: '#666', display: 'block', marginTop: 5 }}>{uploading ? 'Uploading…' : 'An admission poster works well here.'}</small>
            {formData.image_url && (
              <button type="button" className="cancel-btn" style={{ marginTop: 8 }} onClick={() => setFormData({ ...formData, image_url: '' })}>Remove image</button>
            )}
          </div>
          <div className="form-group-row">
            <div className="form-group">
              <label>Button text (optional)</label>
              <input type="text" value={formData.cta_text} onChange={set('cta_text')} placeholder="e.g. Apply Now" />
            </div>
            <div className="form-group">
              <label>Button link</label>
              <input type="text" value={formData.cta_link} onChange={set('cta_link')} placeholder="/classes or https://…" />
            </div>
          </div>
          <div className="form-group-row">
            <div className="form-group">
              <label>Show on</label>
              <select value={formData.show_on} onChange={set('show_on')}>
                <option value="home">Homepage only</option>
                <option value="all">Every page</option>
              </select>
            </div>
            <div className="form-group">
              <label>Delay before showing (seconds)</label>
              <input type="number" min="0" max="60" value={formData.delay_seconds} onChange={set('delay_seconds')} />
            </div>
          </div>
          <div className="form-group-row">
            <div className="form-group">
              <label>Show from (optional)</label>
              <input type="date" value={formData.starts_on || ''} onChange={set('starts_on')} />
            </div>
            <div className="form-group">
              <label>Hide after (optional)</label>
              <input type="date" value={formData.ends_on || ''} onChange={set('ends_on')} />
            </div>
          </div>
          <div className="form-group checkbox">
            <label><input type="checkbox" checked={formData.is_active} onChange={set('is_active')} /> Show on website</label>
          </div>
          <button type="submit" className="save-btn" disabled={uploading}>{editingId ? 'Update Popup' : 'Add Popup'}</button>
          {editingId && <button type="button" className="cancel-btn" onClick={() => { setEditingId(null); setFormData(EMPTY); }}>Cancel</button>}
        </form>
      </div>

      <div className="admin-list">
        <h4>Popups ({popups.length})</h4>
        {loading ? <p>Loading…</p> : popups.length === 0 ? <p>No popups yet.</p> : (
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {popups.map((p) => (
              <li key={p.id} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '12px 0', borderBottom: '1px solid #eee', opacity: p.is_active ? 1 : 0.55 }}>
                {p.image_url ? <img src={p.image_url} alt="" style={{ width: 72, height: 56, objectFit: 'cover', borderRadius: 8 }} /> : <span style={{ width: 72, height: 56, background: '#003C24', borderRadius: 8 }} />}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <strong style={{ display: 'block' }}>{p.title}</strong>
                  <small style={{ color: '#666' }}>{p.show_on === 'all' ? 'Every page' : 'Homepage'} · after {p.delay_seconds ?? 0}s</small>
                </div>
                <span className="status-badge">{statusLabel(p)}</span>
                <button className="icon-btn" onClick={() => toggleActive(p)} title={p.is_active ? 'Hide' : 'Show'}>{p.is_active ? <FaEye /> : <FaEyeSlash />}</button>
                <button className="icon-btn" onClick={() => handleEdit(p)} title="Edit"><FaEdit /></button>
                <button className="icon-btn delete" onClick={() => handleDelete(p.id)} title="Delete"><FaTrash /></button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ManagePopup;
