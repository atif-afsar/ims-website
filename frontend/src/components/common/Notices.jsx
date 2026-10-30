
import React, { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient';
import './notices.css';

const Notices = () => {
  const [notices, setNotices] = useState([]);

  useEffect(() => {
    const fetchNotices = async () => {
      const { data } = await supabase
        .from('notices')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });
      setNotices(data || []);
    };

    fetchNotices();
  }, []);

  // if (notices.length === 0) return null; // Removed to ensure visibility


  return (
    <div className="notices-ticker">
      <div className="ticker-label">LATEST NEWS</div>
      <div className="ticker-content">
        <div className="ticker-track">
          {notices.length > 0 ? (
            notices.map((notice, index) => (
              <span key={notice.id} className="ticker-item">
                {notice.link ? (
                  <a href={notice.link} target="_blank" rel="noreferrer">
                    {notice.title}
                  </a>
                ) : (
                  <span>{notice.title}</span>
                )}
                {index < notices.length - 1 && <span className="ticker-sep">✦</span>}
              </span>
            ))
          ) : (
             <span className="ticker-item">Welcome to Islamic Mission School — Shaping Hearts, Building Minds.</span>
          )}
           {/* Duplicate for smooth infinite scroll if needed, or just CSS animation */}
        </div>
      </div>
    </div>
  );
};

export default Notices;
