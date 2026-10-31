
import React, { useState, useEffect, useCallback } from 'react';
import { adminDb as db } from "../lib/db";
import { uploadFile } from '../utils/uploadFile';
import { FaTrash, FaEdit } from 'react-icons/fa';
import { DEFAULT_SETTINGS, DEFAULT_TRACKS, DEFAULT_FEATURES, DEFAULT_COMPARISON, DEFAULT_ROADMAP, DEFAULT_RESULTS, DEFAULT_FACULTY } from '../hooks/useNeetJeeData';

// What the public page shows while a list is empty; loading it makes each item editable
const STARTER = {
  neet_tracks: DEFAULT_TRACKS,
  neet_features: DEFAULT_FEATURES,
  neet_comparison: DEFAULT_COMPARISON,
  neet_roadmap: DEFAULT_ROADMAP,
  neet_results: DEFAULT_RESULTS,
  neet_faculty: DEFAULT_FACULTY,
};

const TABS = [
  { id: 'settings', label: 'Hero & Settings' },
  { id: 'tracks', label: 'Program Tracks' },
  { id: 'features', label: 'Features' },
  { id: 'comparison', label: 'Comparison' },
  { id: 'roadmap', label: 'Roadmap' },
  { id: 'results', label: 'Results' },
  { id: 'faculty', label: 'Faculty' },
  { id: 'answer_keys', label: 'Answer Keys' },
];

const emptyItem = () => ({ sort_order: 0 });

const ManageNeetJee = () => {
  const [activeTab, setActiveTab] = useState('settings');
  const [message, setMessage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true);

  const [settings, setSettings] = useState({ ...DEFAULT_SETTINGS });
  const [tracks, setTracks] = useState([]);
  const [features, setFeatures] = useState([]);
  const [comparison, setComparison] = useState([]);
  const [roadmap, setRoadmap] = useState([]);
  const [results, setResults] = useState([]);
  const [faculty, setFaculty] = useState([]);
  const [answerKeys, setAnswerKeys] = useState([]);

  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState(emptyItem());

  const showMsg = (msg) => {
    setMessage(msg);
    setTimeout(() => setMessage(null), 4000);
  };

  const fetchAll = useCallback(async () => {
    setLoading(true);
    try {
      const [s, t, f, c, r, res, fac, ak] = await Promise.all([
        db.from('neet_settings').select('*').eq('id', 1).maybeSingle(),
        db.from('neet_tracks').select('*').order('sort_order'),
        db.from('neet_features').select('*').order('sort_order'),
        db.from('neet_comparison').select('*').order('sort_order'),
        db.from('neet_roadmap').select('*').order('sort_order'),
        db.from('neet_results').select('*').order('sort_order'),
        db.from('neet_faculty').select('*').order('sort_order'),
        db.from('neet_answer_keys').select('*').order('sort_order'),
      ]);
      if (s.data) setSettings({ ...DEFAULT_SETTINGS, ...s.data });
      setTracks(t.data || []);
      setFeatures(f.data || []);
      setComparison(c.data || []);
      setRoadmap(r.data || []);
      setResults(res.data || []);
      setFaculty(fac.data || []);
      setAnswerKeys(ak.data || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchAll(); }, [fetchAll]);

  const handleImageUpload = async (e, field, isSettings = true) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const url = await uploadFile(file, 'neet');
      if (!url) throw new Error('Upload failed');
      if (isSettings) setSettings((s) => ({ ...s, [field]: url }));
      else setFormData((d) => ({ ...d, [field]: url }));
      showMsg('Image uploaded!');
    } catch (err) {
      showMsg('Error: ' + err.message);
    } finally {
      setUploading(false);
    }
  };

  const handlePdfUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const url = await uploadFile(file, 'neet/pdfs');
      if (!url) throw new Error('Upload failed');
      setFormData((d) => ({ ...d, pdf_url: url }));
      showMsg('PDF uploaded!');
    } catch (err) {
      showMsg('Error: ' + err.message);
    } finally {
      setUploading(false);
    }
  };

  const saveSettings = async (e) => {
    e.preventDefault();
    try {
      const { error } = await db.from('neet_settings').upsert({ id: 1, ...settings });
      if (error) throw error;
      showMsg('Settings saved!');
    } catch (err) {
      showMsg('Error: ' + err.message);
    }
  };

  // Lists that are empty in the database (the website shows built-in content for them)
  const listsByTable = { neet_tracks: tracks, neet_features: features, neet_comparison: comparison, neet_roadmap: roadmap, neet_results: results, neet_faculty: faculty };
  const emptyLists = loading ? [] : Object.keys(STARTER).filter((t) => !listsByTable[t]?.length && STARTER[t]?.length);

  const loadStarter = async () => {
    if (!window.confirm('Copy the built-in NEET/JEE content into the editor? The website will look the same; you can then edit or delete each item.')) return;
    for (const table of emptyLists) {
      const rows = STARTER[table].map((r, i) => ({ ...r, is_active: true, sort_order: r.sort_order ?? i }));
      const { error } = await db.from(table).insert(rows);
      if (error) return showMsg('Error: ' + error.message);
    }
    showMsg('Built-in content loaded. You can now edit each item.');
    fetchAll();
  };

  const tableMap = {
    tracks: 'neet_tracks',
    features: 'neet_features',
    comparison: 'neet_comparison',
    roadmap: 'neet_roadmap',
    results: 'neet_results',
    faculty: 'neet_faculty',
    answer_keys: 'neet_answer_keys',
  };

  const listMap = {
    tracks, features, comparison, roadmap, results, faculty, answer_keys: answerKeys,
  };

  const getDefaultForm = (tab) => {
    const defaults = {
      tracks: { name: '', subtitle: '', for_class: '', description: '', highlight: '', track_type: 'foundation', sort_order: 0, is_active: true },
      features: { text: '', sort_order: 0, is_active: true },
      comparison: { point: '', integrated: '', conventional: '', sort_order: 0, is_active: true },
      roadmap: { phase: '', description: '', sort_order: 0, is_active: true },
      results: { name: '', arabic_name: '', score: '', exam_year: '', photo_url: '', sort_order: 0, is_active: true },
      faculty: { name: '', subject: '', qualification: '', bio: '', photo_url: '', sort_order: 0, is_active: true },
      answer_keys: { title: '', exam_name: '', exam_date: '', pdf_url: '', sort_order: 0, is_published: true },
    };
    return defaults[tab] || emptyItem();
  };

  const handleItemSubmit = async (e) => {
    e.preventDefault();
    const table = tableMap[activeTab];
    if (!table) return;
    try {
      if (editingId) {
        const { error } = await db.from(table).update(formData).eq('id', editingId);
        if (error) throw error;
        showMsg('Updated successfully!');
      } else {
        const { error } = await db.from(table).insert([formData]);
        if (error) throw error;
        showMsg('Added successfully!');
      }
      setEditingId(null);
      setFormData(getDefaultForm(activeTab));
      fetchAll();
    } catch (err) {
      showMsg('Error: ' + err.message);
    }
  };

  const handleEdit = (item) => {
    setFormData({ ...item });
    setEditingId(item.id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure?')) return;
    const table = tableMap[activeTab];
    try {
      const { error } = await db.from(table).delete().eq('id', id);
      if (error) throw error;
      fetchAll();
    } catch (err) {
      alert(err.message);
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setFormData(getDefaultForm(activeTab));
  };

  const renderSettingsForm = () => (
    <form onSubmit={saveSettings}>
      <h4>Hero Section</h4>
      <div className="form-group-row">
        <div className="form-group half">
          <label>Badge Text</label>
          <input value={settings.hero_badge || ''} onChange={(e) => setSettings({ ...settings, hero_badge: e.target.value })} />
        </div>
        <div className="form-group half">
          <label>Hero Title</label>
          <input value={settings.hero_title || ''} onChange={(e) => setSettings({ ...settings, hero_title: e.target.value })} />
        </div>
      </div>
      <div className="form-group">
        <label>Hero Subtitle</label>
        <textarea value={settings.hero_subtitle || ''} onChange={(e) => setSettings({ ...settings, hero_subtitle: e.target.value })} rows="2" />
      </div>
      <div className="form-group">
        <label>Hero Image</label>
        <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, 'hero_image_url')} disabled={uploading} />
        {settings.hero_image_url && <img src={settings.hero_image_url} alt="Hero" style={{ height: 60, marginTop: 8 }} />}
      </div>

      <h4 style={{ marginTop: 24 }}>Banner (Page Top)</h4>
      <div className="form-group-row">
        <div className="form-group half">
          <label>Banner Title</label>
          <input value={settings.banner_title || ''} onChange={(e) => setSettings({ ...settings, banner_title: e.target.value })} />
        </div>
        <div className="form-group half">
          <label>Banner Subtitle</label>
          <input value={settings.banner_subtitle || ''} onChange={(e) => setSettings({ ...settings, banner_subtitle: e.target.value })} />
        </div>
      </div>

      <h4 style={{ marginTop: 24 }}>Intro & Vision</h4>
      <div className="form-group">
        <label>Intro Paragraph 1</label>
        <textarea value={settings.intro_paragraph_1 || ''} onChange={(e) => setSettings({ ...settings, intro_paragraph_1: e.target.value })} rows="3" />
      </div>
      <div className="form-group">
        <label>Intro Paragraph 2</label>
        <textarea value={settings.intro_paragraph_2 || ''} onChange={(e) => setSettings({ ...settings, intro_paragraph_2: e.target.value })} rows="3" />
      </div>
      <div className="form-group-row">
        <div className="form-group half">
          <label>Vision Title</label>
          <input value={settings.vision_title || ''} onChange={(e) => setSettings({ ...settings, vision_title: e.target.value })} />
        </div>
        <div className="form-group half">
          <label>Features Section Title</label>
          <input value={settings.features_title || ''} onChange={(e) => setSettings({ ...settings, features_title: e.target.value })} />
        </div>
      </div>
      <div className="form-group">
        <label>Vision Description</label>
        <textarea value={settings.vision_description || ''} onChange={(e) => setSettings({ ...settings, vision_description: e.target.value })} rows="3" />
      </div>
      <div className="form-group">
        <label>Features Side Image</label>
        <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, 'features_image_url')} disabled={uploading} />
        {settings.features_image_url && <img src={settings.features_image_url} alt="Features" style={{ height: 60, marginTop: 8 }} />}
      </div>

      <h4 style={{ marginTop: 24 }}>Section Titles</h4>
      <div className="form-group-row">
        <div className="form-group half">
          <label>Results Title</label>
          <input value={settings.results_title || ''} onChange={(e) => setSettings({ ...settings, results_title: e.target.value })} />
        </div>
        <div className="form-group half">
          <label>Faculty Title</label>
          <input value={settings.faculty_title || ''} onChange={(e) => setSettings({ ...settings, faculty_title: e.target.value })} />
        </div>
      </div>
      <div className="form-group">
        <label>Answer Keys Title</label>
        <input value={settings.answer_keys_title || ''} onChange={(e) => setSettings({ ...settings, answer_keys_title: e.target.value })} />
      </div>
      <div className="form-group">
        <label>Comparison Title</label>
        <input value={settings.comparison_title || ''} onChange={(e) => setSettings({ ...settings, comparison_title: e.target.value })} />
      </div>

      <h4 style={{ marginTop: 24 }}>CTA Buttons</h4>
      <div className="form-group-row">
        <div className="form-group half">
          <label>Primary Button Text</label>
          <input value={settings.cta_button_text || ''} onChange={(e) => setSettings({ ...settings, cta_button_text: e.target.value })} />
        </div>
        <div className="form-group half">
          <label>Primary Button Link</label>
          <input value={settings.cta_button_link || ''} onChange={(e) => setSettings({ ...settings, cta_button_link: e.target.value })} />
        </div>
      </div>
      <div className="form-group-row">
        <div className="form-group half">
          <label>Secondary Button Text</label>
          <input value={settings.secondary_button_text || ''} onChange={(e) => setSettings({ ...settings, secondary_button_text: e.target.value })} />
        </div>
        <div className="form-group half">
          <label>Secondary Button Link</label>
          <input value={settings.secondary_button_link || ''} onChange={(e) => setSettings({ ...settings, secondary_button_link: e.target.value })} />
        </div>
      </div>
      <div className="form-group">
        <label>Homepage CTA Title</label>
        <input value={settings.cta_title || ''} onChange={(e) => setSettings({ ...settings, cta_title: e.target.value })} />
      </div>

      <h4 style={{ marginTop: 24 }}>Bottom CTA</h4>
      <div className="form-group">
        <label>Bottom CTA Title</label>
        <input value={settings.bottom_cta_title || ''} onChange={(e) => setSettings({ ...settings, bottom_cta_title: e.target.value })} />
      </div>
      <div className="form-group">
        <label>Bottom CTA Subtitle</label>
        <textarea value={settings.bottom_cta_subtitle || ''} onChange={(e) => setSettings({ ...settings, bottom_cta_subtitle: e.target.value })} rows="2" />
      </div>
      <div className="form-group-row">
        <div className="form-group half">
          <label>Bottom Primary Text</label>
          <input value={settings.bottom_cta_primary_text || ''} onChange={(e) => setSettings({ ...settings, bottom_cta_primary_text: e.target.value })} />
        </div>
        <div className="form-group half">
          <label>Bottom Primary Link</label>
          <input value={settings.bottom_cta_primary_link || ''} onChange={(e) => setSettings({ ...settings, bottom_cta_primary_link: e.target.value })} />
        </div>
      </div>
      <div className="form-group-row">
        <div className="form-group half">
          <label>Bottom Secondary Text</label>
          <input value={settings.bottom_cta_secondary_text || ''} onChange={(e) => setSettings({ ...settings, bottom_cta_secondary_text: e.target.value })} />
        </div>
        <div className="form-group half">
          <label>Bottom Secondary Link</label>
          <input value={settings.bottom_cta_secondary_link || ''} onChange={(e) => setSettings({ ...settings, bottom_cta_secondary_link: e.target.value })} />
        </div>
      </div>

      <button type="submit" className="save-btn" disabled={uploading}>Save Settings</button>
    </form>
  );

  const renderItemForm = () => {
    const fd = formData;
    const set = (patch) => setFormData({ ...fd, ...patch });

    const forms = {
      tracks: (
        <>
          <div className="form-group-row">
            <div className="form-group half"><label>Name</label><input value={fd.name || ''} onChange={(e) => set({ name: e.target.value })} required /></div>
            <div className="form-group half"><label>For Class</label><input value={fd.for_class || ''} onChange={(e) => set({ for_class: e.target.value })} /></div>
          </div>
          <div className="form-group"><label>Subtitle</label><input value={fd.subtitle || ''} onChange={(e) => set({ subtitle: e.target.value })} /></div>
          <div className="form-group"><label>Description</label><textarea value={fd.description || ''} onChange={(e) => set({ description: e.target.value })} rows="3" /></div>
          <div className="form-group-row">
            <div className="form-group half"><label>Highlight</label><input value={fd.highlight || ''} onChange={(e) => set({ highlight: e.target.value })} /></div>
            <div className="form-group half">
              <label>Track Type</label>
              <select value={fd.track_type || 'foundation'} onChange={(e) => set({ track_type: e.target.value })}>
                <option value="foundation">Foundation</option>
                <option value="accelerator">Accelerator</option>
              </select>
            </div>
          </div>
        </>
      ),
      features: (
        <div className="form-group"><label>Feature Text</label><input value={fd.text || ''} onChange={(e) => set({ text: e.target.value })} required /></div>
      ),
      comparison: (
        <>
          <div className="form-group"><label>Comparison Point</label><input value={fd.point || ''} onChange={(e) => set({ point: e.target.value })} required /></div>
          <div className="form-group"><label>IMS Integrated</label><textarea value={fd.integrated || ''} onChange={(e) => set({ integrated: e.target.value })} rows="2" required /></div>
          <div className="form-group"><label>Conventional</label><textarea value={fd.conventional || ''} onChange={(e) => set({ conventional: e.target.value })} rows="2" required /></div>
        </>
      ),
      roadmap: (
        <>
          <div className="form-group half"><label>Phase</label><input value={fd.phase || ''} onChange={(e) => set({ phase: e.target.value })} required /></div>
          <div className="form-group"><label>Description</label><textarea value={fd.description || ''} onChange={(e) => set({ description: e.target.value })} rows="2" required /></div>
        </>
      ),
      results: (
        <>
          <div className="form-group-row">
            <div className="form-group half"><label>Name</label><input value={fd.name || ''} onChange={(e) => set({ name: e.target.value })} required /></div>
            <div className="form-group half"><label>Arabic Name</label><input value={fd.arabic_name || ''} onChange={(e) => set({ arabic_name: e.target.value })} /></div>
          </div>
          <div className="form-group-row">
            <div className="form-group half"><label>Score</label><input value={fd.score || ''} onChange={(e) => set({ score: e.target.value })} required /></div>
            <div className="form-group half"><label>Exam Year</label><input value={fd.exam_year || ''} onChange={(e) => set({ exam_year: e.target.value })} required /></div>
          </div>
          <div className="form-group">
            <label>Student Photo</label>
            <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, 'photo_url', false)} disabled={uploading} />
            {fd.photo_url && <img src={fd.photo_url} alt="Student" style={{ height: 60, marginTop: 8 }} />}
          </div>
        </>
      ),
      faculty: (
        <>
          <div className="form-group-row">
            <div className="form-group half"><label>Name</label><input value={fd.name || ''} onChange={(e) => set({ name: e.target.value })} required /></div>
            <div className="form-group half"><label>Subject</label><input value={fd.subject || ''} onChange={(e) => set({ subject: e.target.value })} /></div>
          </div>
          <div className="form-group"><label>Qualification</label><input value={fd.qualification || ''} onChange={(e) => set({ qualification: e.target.value })} /></div>
          <div className="form-group"><label>Bio</label><textarea value={fd.bio || ''} onChange={(e) => set({ bio: e.target.value })} rows="2" /></div>
          <div className="form-group">
            <label>Photo</label>
            <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, 'photo_url', false)} disabled={uploading} />
            {fd.photo_url && <img src={fd.photo_url} alt="Faculty" style={{ height: 60, marginTop: 8 }} />}
          </div>
        </>
      ),
      answer_keys: (
        <>
          <div className="form-group"><label>Title</label><input value={fd.title || ''} onChange={(e) => set({ title: e.target.value })} required /></div>
          <div className="form-group-row">
            <div className="form-group half"><label>Exam Name</label><input value={fd.exam_name || ''} onChange={(e) => set({ exam_name: e.target.value })} /></div>
            <div className="form-group half"><label>Exam Date</label><input value={fd.exam_date || ''} onChange={(e) => set({ exam_date: e.target.value })} /></div>
          </div>
          <div className="form-group">
            <label>PDF File</label>
            <input type="file" accept=".pdf" onChange={handlePdfUpload} disabled={uploading} />
            {fd.pdf_url && <p style={{ fontSize: 12, color: '#666' }}>✓ PDF uploaded</p>}
          </div>
        </>
      ),
    };

    return (
      <form onSubmit={handleItemSubmit}>
        {forms[activeTab]}
        <div className="form-group half">
          <label>Sort Order</label>
          <input type="number" value={fd.sort_order || 0} onChange={(e) => set({ sort_order: parseInt(e.target.value, 10) })} />
        </div>
        <button type="submit" className="save-btn" disabled={uploading}>
          {uploading ? 'Uploading...' : editingId ? 'Update' : 'Add'}
        </button>
        {editingId && <button type="button" className="cancel-btn" onClick={cancelEdit}>Cancel</button>}
      </form>
    );
  };

  const renderList = () => {
    const items = listMap[activeTab] || [];
    if (!items.length) return <p>No items yet. Add one above.</p>;

    const cols = {
      tracks: ['sort_order', 'name', 'for_class', 'track_type'],
      features: ['sort_order', 'text'],
      comparison: ['sort_order', 'point'],
      roadmap: ['sort_order', 'phase', 'description'],
      results: ['sort_order', 'name', 'score', 'exam_year'],
      faculty: ['sort_order', 'name', 'subject'],
      answer_keys: ['sort_order', 'title', 'exam_name'],
    };

    const keys = cols[activeTab] || ['sort_order'];

    return (
      <table>
        <thead>
          <tr>
            {keys.map((k) => <th key={k}>{k.replace('_', ' ')}</th>)}
            <th>Preview</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              {keys.map((k) => <td key={k}>{item[k]}</td>)}
              <td>
                {item.photo_url && <img src={item.photo_url} alt="" style={{ height: 36 }} />}
                {item.pdf_url && <a href={item.pdf_url} target="_blank" rel="noreferrer">PDF</a>}
              </td>
              <td>
                <button onClick={() => handleEdit(item)} className="icon-btn edit"><FaEdit /></button>
                <button onClick={() => handleDelete(item.id)} className="icon-btn delete"><FaTrash /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div className="admin-section">
      <h3>Manage NEET / JEE Program</h3>
      <p style={{ color: '#666', marginBottom: 16 }}>
        Control hero, tracks, features, results, faculty, answer keys, and all section content.
        While a list here is empty, the website shows its built-in content for it.
      </p>
      {emptyLists.length > 0 && (
        <div className="admin-form-card" style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 12 }}>
          <span style={{ flex: 1, minWidth: 240 }}>
            {emptyLists.length} list{emptyLists.length === 1 ? ' is' : 's are'} still showing the built-in content. Load it here to edit each item.
          </span>
          <button type="button" className="save-btn" onClick={loadStarter}>Load the built-in content</button>
        </div>
      )}
      {message && <div className="admin-msg">{message}</div>}

      <div className="neet-admin-tabs" style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 20 }}>
        {TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            className={activeTab === tab.id ? 'save-btn' : 'cancel-btn'}
            onClick={() => { setActiveTab(tab.id); setEditingId(null); setFormData(getDefaultForm(tab.id)); }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {loading ? <p>Loading...</p> : (
        <>
          <div className="admin-form-card">
            <h4>{activeTab === 'settings' ? 'Page Settings' : (editingId ? 'Edit Item' : 'Add New Item')}</h4>
            {activeTab === 'settings' ? renderSettingsForm() : renderItemForm()}
          </div>

          {activeTab !== 'settings' && (
            <div className="admin-list">
              <h4>Current Items</h4>
              {renderList()}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ManageNeetJee;
