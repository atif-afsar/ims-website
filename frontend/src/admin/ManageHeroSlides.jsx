import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import { uploadFile } from '../utils/uploadFile';
import media from '../content/media';
import defaultSlides from '../content/heroSlides';
import { FaTrash, FaEdit, FaArrowUp, FaArrowDown, FaEye, FaEyeSlash } from 'react-icons/fa';

const EMPTY = {
  eyebrow: '', title: '', highlight: '', subtitle: '',
  image_url: '', media_key: '', video_url: '',
  cta_text: '', cta_link: '', cta2_text: '', cta2_link: '',
  is_active: true, starts_on: '', ends_on: '',
};

// Built-in photos that work well as a wide hero background
const libraryOptions = Object.entries(media)
  .filter(([, m]) => m.group !== 'toppers' && m.width >= 1600)
  .map(([key, m]) => ({ key, label: `${key} — ${m.alt}` }));

const slideImage = (s) => (s.media_key && media[s.media_key] ? media[s.media_key].src : s.image_url);

const today = () => new Date().toLocaleDateString('en-CA');
const scheduleLabel = (s) => {
  if (!s.is_active) return 'Hidden';
  if (s.starts_on && s.starts_on > today()) return `Starts ${s.starts_on}`;
  if (s.ends_on && s.ends_on < today()) return `Ended ${s.ends_on}`;
  return 'Live';
};

/* Small replica of the homepage hero, so admins see what they are publishing */
const Preview = ({ slide }) => (
  <div style={{ position: 'relative', aspectRatio: '16 / 8', borderRadius: 14, overflow: 'hidden', background: '#002014' }}>
    {slideImage(slide) && <img src={slideImage(slide)} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />}
    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(30deg, rgba(0,32,20,.95), rgba(0,32,20,.45) 55%, transparent)' }} />
    <div style={{ position: 'absolute', left: 24, right: 24, bottom: 22, color: '#FFFAF2' }}>
      {slide.eyebrow && <div style={{ fontSize: 11, letterSpacing: '.2em', textTransform: 'uppercase', color: '#EAC678', fontWeight: 600 }}>{slide.eyebrow}</div>}
      <div style={{ fontFamily: '"Playfair Display", Georgia, serif', fontWeight: 700, fontSize: 30, lineHeight: 1.1, marginTop: 8 }}>
        {slide.title || 'Slide title'} {slide.highlight && <em style={{ color: '#E4C062' }}>{slide.highlight}</em>}
      </div>
      {slide.subtitle && <div style={{ fontSize: 14, opacity: 0.85, marginTop: 8, maxWidth: 520 }}>{slide.subtitle}</div>}
      <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
        {slide.cta_text && <span style={{ background: '#E4C062', color: '#002E1C', borderRadius: 999, padding: '6px 14px', fontSize: 12, fontWeight: 600 }}>{slide.cta_text}</span>}
        {slide.cta2_text && <span style={{ border: '1px solid rgba(255,250,242,.6)', borderRadius: 999, padding: '6px 14px', fontSize: 12, fontWeight: 600 }}>{slide.cta2_text}</span>}
      </div>
    </div>
  </div>
);

const ManageHeroSlides = () => {
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState(EMPTY);
  const [editingId, setEditingId] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    fetchSlides();
  }, []);

  const fetchSlides = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase.from('hero_slides').select('*').order('sort_order');
      if (error) throw error;
      setSlides(data || []);
    } catch (error) {
      setMessage('Error loading slides: ' + error.message + ' (has hero-slides-schema.sql been run in Supabase?)');
    } finally {
      setLoading(false);
    }
  };

  const set = (field) => (e) => setFormData({ ...formData, [field]: e.target.type === 'checkbox' ? e.target.checked : e.target.value });

  // Empty strings become NULL so optional dates and links stay unset
  const clean = (data) => Object.fromEntries(Object.entries(data).map(([k, v]) => [k, v === '' ? null : v]));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.image_url && !formData.media_key) {
      setMessage('Please upload a photo or choose one from the photo library.');
      return;
    }
    try {
      if (editingId) {
        const { error } = await supabase.from('hero_slides').update(clean(formData)).eq('id', editingId);
        if (error) throw error;
        setMessage('Slide updated. It is live on the homepage now.');
      } else {
        const sort_order = slides.length ? Math.max(...slides.map((s) => s.sort_order || 0)) + 1 : 0;
        const { error } = await supabase.from('hero_slides').insert([{ ...clean(formData), sort_order }]);
        if (error) throw error;
        setMessage('Slide added. It is live on the homepage now.');
      }
      setFormData(EMPTY);
      setEditingId(null);
      fetchSlides();
    } catch (error) {
      setMessage('Error: ' + error.message);
    }
  };

  const handleUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      setMessage('That photo is over 5 MB. Please use a smaller photo (a landscape photo around 2000px wide is ideal).');
      return;
    }
    setUploading(true);
    const url = await uploadFile(file, 'hero');
    setUploading(false);
    if (url) setFormData((f) => ({ ...f, image_url: url, media_key: '' }));
    else setMessage('Upload failed. Please try again.');
  };

  const handleEdit = (s) => {
    setFormData(Object.fromEntries(Object.keys(EMPTY).map((k) => [k, s[k] ?? EMPTY[k]])));
    setEditingId(s.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this slide? This cannot be undone.')) return;
    const { error } = await supabase.from('hero_slides').delete().eq('id', id);
    if (error) alert(error.message);
    fetchSlides();
  };

  const toggleActive = async (s) => {
    const { error } = await supabase.from('hero_slides').update({ is_active: !s.is_active }).eq('id', s.id);
    if (error) alert(error.message);
    fetchSlides();
  };

  // Swap with the neighbouring slide, then renumber the whole list 0..n
  const move = async (i, step) => {
    if (!slides[i + step]) return;
    const order = [...slides];
    [order[i], order[i + step]] = [order[i + step], order[i]];
    const results = await Promise.all(
      order.map((s, pos) => supabase.from('hero_slides').update({ sort_order: pos }).eq('id', s.id))
    );
    const failed = results.find((r) => r.error);
    if (failed) alert(failed.error.message);
    fetchSlides();
  };

  const importDefaults = async () => {
    if (!window.confirm('Add the 5 default slides to the list so you can edit them?')) return;
    // Default slides carry string ids; the database generates real UUIDs
    const rows = defaultSlides.map((s, i) => {
      const { id, ...fields } = s;
      void id;
      return { ...clean({ ...EMPTY, ...fields }), sort_order: slides.length + i };
    });
    const { error } = await supabase.from('hero_slides').insert(rows);
    if (error) setMessage('Error: ' + error.message);
    else setMessage('Default slides imported.');
    fetchSlides();
  };

  return (
    <div className="admin-section">
      <h3>Homepage Hero Slides</h3>
      <p style={{ color: '#555', marginTop: -6, marginBottom: 16 }}>
        These slides rotate at the top of the homepage. Changes go live immediately.
        {slides.length === 0 && !loading && ' No slides yet — the website is showing its 5 built-in slides.'}
      </p>
      {message && <div className="admin-msg">{message}</div>}

      <div className="admin-form-card">
        <h4>{editingId ? 'Edit Slide' : 'Add New Slide'}</h4>
        <div style={{ marginBottom: 20 }}>
          <Preview slide={formData} />
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Small line above the title (optional)</label>
            <input type="text" value={formData.eyebrow} onChange={set('eyebrow')} placeholder="e.g. Admission Open 2027–28" />
          </div>
          <div className="form-group-row">
            <div className="form-group">
              <label>Title</label>
              <input type="text" value={formData.title} onChange={set('title')} placeholder="e.g. Shaping Hearts," required />
            </div>
            <div className="form-group">
              <label>Gold highlight (optional)</label>
              <input type="text" value={formData.highlight} onChange={set('highlight')} placeholder="e.g. Building Minds" />
            </div>
          </div>
          <div className="form-group">
            <label>Description (optional, one or two sentences)</label>
            <textarea rows="2" value={formData.subtitle} onChange={set('subtitle')} />
          </div>

          <div className="form-group">
            <label>Photo</label>
            <input type="file" accept="image/jpeg,image/png,image/webp" onChange={handleUpload} disabled={uploading} />
            <small style={{ color: '#666', display: 'block', marginTop: 5 }}>
              {uploading ? 'Uploading…' : 'Landscape photos work best (around 2000px wide, under 5 MB).'}
            </small>
          </div>
          <div className="form-group">
            <label>…or choose from the school photo library</label>
            <select value={formData.media_key} onChange={(e) => setFormData({ ...formData, media_key: e.target.value, image_url: e.target.value ? '' : formData.image_url })}>
              <option value="">— none —</option>
              {libraryOptions.map((o) => <option key={o.key} value={o.key}>{o.label}</option>)}
            </select>
          </div>

          <div className="form-group-row">
            <div className="form-group">
              <label>Main button text</label>
              <input type="text" value={formData.cta_text} onChange={set('cta_text')} placeholder="e.g. Apply Now" />
            </div>
            <div className="form-group">
              <label>Main button link</label>
              <input type="text" value={formData.cta_link} onChange={set('cta_link')} placeholder="/classes or https://…" />
            </div>
          </div>
          <div className="form-group-row">
            <div className="form-group">
              <label>Second button text (optional)</label>
              <input type="text" value={formData.cta2_text} onChange={set('cta2_text')} placeholder="e.g. Discover IMS" />
            </div>
            <div className="form-group">
              <label>Second button link</label>
              <input type="text" value={formData.cta2_link} onChange={set('cta2_link')} placeholder="/about or tel:+91…" />
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
            <label>
              <input type="checkbox" checked={formData.is_active} onChange={set('is_active')} /> Show on website
            </label>
          </div>

          <button type="submit" className="save-btn" disabled={uploading}>{editingId ? 'Update Slide' : 'Add Slide'}</button>
          {editingId && (
            <button type="button" className="cancel-btn" onClick={() => { setEditingId(null); setFormData(EMPTY); }}>Cancel</button>
          )}
        </form>
      </div>

      <div className="admin-list">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
          <h4>Slides ({slides.length})</h4>
          <button type="button" className="cancel-btn" onClick={importDefaults}>Import default slides</button>
        </div>
        {loading ? <p>Loading…</p> : slides.length === 0 ? (
          <p>No slides yet. Add one above, or import the defaults to start from them.</p>
        ) : (
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {slides.map((s, i) => (
              <li key={s.id} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '12px 0', borderBottom: '1px solid #eee', opacity: s.is_active ? 1 : 0.55 }}>
                <span style={{ width: 22, textAlign: 'center', fontWeight: 700, color: '#A8884A' }}>{i + 1}</span>
                {slideImage(s) ? (
                  <img src={slideImage(s)} alt="" style={{ width: 96, height: 56, objectFit: 'cover', borderRadius: 8, flexShrink: 0 }} />
                ) : <span style={{ width: 96, height: 56, background: '#eee', borderRadius: 8 }} />}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <strong style={{ display: 'block' }}>{s.title} {s.highlight}</strong>
                  <small style={{ color: '#666' }}>{s.eyebrow}</small>
                </div>
                <span className="status-badge">{scheduleLabel(s)}</span>
                <div style={{ display: 'flex', gap: 4 }}>
                  <button className="icon-btn" onClick={() => move(i, -1)} disabled={i === 0} title="Move up"><FaArrowUp /></button>
                  <button className="icon-btn" onClick={() => move(i, 1)} disabled={i === slides.length - 1} title="Move down"><FaArrowDown /></button>
                  <button className="icon-btn" onClick={() => toggleActive(s)} title={s.is_active ? 'Hide' : 'Show'}>{s.is_active ? <FaEye /> : <FaEyeSlash />}</button>
                  <button className="icon-btn" onClick={() => handleEdit(s)} title="Edit"><FaEdit /></button>
                  <button className="icon-btn delete" onClick={() => handleDelete(s.id)} title="Delete"><FaTrash /></button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ManageHeroSlides;
