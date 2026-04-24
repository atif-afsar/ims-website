import React, { useEffect, useMemo, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { supabase } from "../supabaseClient";

const initialForm = {
  title: "",
  event_date: "",
  description: "",
  event_type: "general",
  color: "#1eb2a6",
  is_active: true,
};

const eventTypeOptions = [
  { value: "general", label: "General" },
  { value: "holiday", label: "Holiday" },
  { value: "exam", label: "Exam" },
  { value: "activity", label: "Activity" },
  { value: "announcement", label: "Announcement" },
];

const formatDate = (value) => {
  if (!value) return "-";
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return value;
  return parsed.toLocaleDateString();
};

const presetEvents2026To2027 = [
  { event_date: "2026-04-01", title: "Investiture Ceremony (Roots of Wisdom)", event_type: "activity", color: "#7c3aed", is_active: true },
  { event_date: "2026-04-03", title: "Good Friday", event_type: "holiday", color: "#ef4444", is_active: true },
  { event_date: "2026-04-04", title: "JPEG Circular Regarding Timing (7:00 AM)", event_type: "announcement", color: "#2563eb", is_active: true },
  { event_date: "2026-04-06", title: "Submission Whole Session Syllabus to V.P", event_type: "announcement", color: "#2563eb", is_active: true },
  { event_date: "2026-04-07", title: "1st Academic Board Meeting", event_type: "activity", color: "#7c3aed", is_active: true },
  { event_date: "2026-04-10", title: "Grade II-X Speech Competition and English Intro (KG-I)", event_type: "activity", color: "#7c3aed", is_active: true },
  { event_date: "2026-04-14", title: "Teachers Trip (Vaisakhi and Dr B R Ambedkar Jayanti)", event_type: "activity", color: "#7c3aed", is_active: true },
  { event_date: "2026-04-22", title: "Last Date: 1st Assessment Paper Submission and UN Meeting", event_type: "announcement", color: "#2563eb", is_active: true },
  { event_date: "2026-04-24", title: "IMS UN Meeting (KG-X)", event_type: "activity", color: "#7c3aed", is_active: true },
  { event_date: "2026-04-27", title: "2nd Academic Board Meeting", event_type: "activity", color: "#7c3aed", is_active: true },
  { event_date: "2026-04-30", title: "Last Date: CA Submission", event_type: "announcement", color: "#2563eb", is_active: true },

  { event_date: "2026-05-01", title: "Buddha Purnima", event_type: "holiday", color: "#ef4444", is_active: true },
  { event_date: "2026-05-08", title: "1st Mother Meet", event_type: "activity", color: "#7c3aed", is_active: true },
  { event_date: "2026-05-13", title: "Submission of PBL Topic", event_type: "announcement", color: "#2563eb", is_active: true },
  { event_date: "2026-05-14", title: "Last Date: 1st CA", event_type: "exam", color: "#f59e0b", is_active: true },
  { event_date: "2026-05-15", title: "PTM Result Day (1st CA)", event_type: "activity", color: "#7c3aed", is_active: true },
  { event_date: "2026-05-21", title: "Summer Vacation Starts, AICU Extra Class", event_type: "announcement", color: "#2563eb", is_active: true },
  { event_date: "2026-05-22", title: "Teachers Training, Summer Break IX-X", event_type: "activity", color: "#0ea5a4", is_active: true },
  { event_date: "2026-05-27", title: "Eid-ul-Adha", event_type: "holiday", color: "#ef4444", is_active: true },
  { event_date: "2026-05-28", title: "Eid-ul-Adha (Extended)", event_type: "holiday", color: "#ef4444", is_active: true },
  { event_date: "2026-05-29", title: "Eid-ul-Adha (Extended)", event_type: "holiday", color: "#ef4444", is_active: true },
  { event_date: "2026-05-31", title: "Mahavir Jayanti", event_type: "holiday", color: "#ef4444", is_active: true },

  { event_date: "2026-06-11", title: "X & XII Resume; AICU Classes Mandatory", event_type: "announcement", color: "#2563eb", is_active: true },
  { event_date: "2026-06-22", title: "All Classes Resume", event_type: "announcement", color: "#2563eb", is_active: true },
  { event_date: "2026-06-26", title: "Yaum-e-Ashura", event_type: "holiday", color: "#ef4444", is_active: true },

  { event_date: "2026-07-03", title: "Competition Day (Quiz, Arts, Qirat, Speech, Vegetable Day)", event_type: "activity", color: "#7c3aed", is_active: true },
  { event_date: "2026-07-06", title: "1st Assessment Exam Starts", event_type: "exam", color: "#f59e0b", is_active: true },
  { event_date: "2026-07-07", title: "Deadline: Submit PBL I", event_type: "announcement", color: "#2563eb", is_active: true },
  { event_date: "2026-07-10", title: "Teachers Training", event_type: "activity", color: "#0ea5a4", is_active: true },
  { event_date: "2026-07-17", title: "Preparation for 9 Aug and 15 Aug Competition Circular", event_type: "announcement", color: "#2563eb", is_active: true },
  { event_date: "2026-07-24", title: "PTM (1st Assessment)", event_type: "activity", color: "#7c3aed", is_active: true },
  { event_date: "2026-07-27", title: "Deadline: PBL Mark List", event_type: "announcement", color: "#2563eb", is_active: true },
  { event_date: "2026-07-30", title: "Submission (Supplementary + 3rd Assessment)", event_type: "announcement", color: "#2563eb", is_active: true },
  { event_date: "2026-07-31", title: "Teachers Training", event_type: "activity", color: "#0ea5a4", is_active: true },

  { event_date: "2026-08-07", title: "Preparation for 15 Aug Programs", event_type: "activity", color: "#7c3aed", is_active: true },
  { event_date: "2026-08-14", title: "Teachers Training", event_type: "activity", color: "#0ea5a4", is_active: true },
  { event_date: "2026-08-15", title: "Independence Day Celebration", event_type: "activity", color: "#7c3aed", is_active: true },
  { event_date: "2026-08-21", title: "Last Date: NB Submission and Project Marks", event_type: "announcement", color: "#2563eb", is_active: true },
  { event_date: "2026-08-25", title: "Eid Milad Un Nabi", event_type: "holiday", color: "#ef4444", is_active: true },
  { event_date: "2026-08-28", title: "Raksha Bandhan", event_type: "holiday", color: "#ef4444", is_active: true },

  { event_date: "2026-09-01", title: "1st Term Oral Exam Starts", event_type: "exam", color: "#f59e0b", is_active: true },
  { event_date: "2026-09-04", title: "Janmashtami and JPEG Circular (Timing 8:00 AM)", event_type: "announcement", color: "#2563eb", is_active: true },
  { event_date: "2026-09-12", title: "1st Term Written Exam Starts (Pre-Nur to VIII)", event_type: "exam", color: "#f59e0b", is_active: true },

  { event_date: "2026-10-01", title: "School Timing 8:00 AM; Girls Sports Day/Boys Trip", event_type: "announcement", color: "#2563eb", is_active: true },
  { event_date: "2026-10-02", title: "Dussehra and Gandhi Jayanti", event_type: "holiday", color: "#ef4444", is_active: true },
  { event_date: "2026-10-03", title: "Last Day for 1st Term Result Submission", event_type: "announcement", color: "#2563eb", is_active: true },
  { event_date: "2026-10-08", title: "PTM Result (1st Term)", event_type: "activity", color: "#7c3aed", is_active: true },
  { event_date: "2026-10-10", title: "Boys Sport Day / Girls Trip", event_type: "activity", color: "#7c3aed", is_active: true },
  { event_date: "2026-10-12", title: "2nd CA Test Starts", event_type: "exam", color: "#f59e0b", is_active: true },
  { event_date: "2026-10-16", title: "5th Mother Meet (VI A/B/C/D and VII A/B)", event_type: "activity", color: "#7c3aed", is_active: true },
  { event_date: "2026-10-17", title: "Sir Syed Day Celebration", event_type: "activity", color: "#7c3aed", is_active: true },
  { event_date: "2026-10-19", title: "4th Academic Board Meeting", event_type: "activity", color: "#7c3aed", is_active: true },
  { event_date: "2026-10-20", title: "Mahanavmi", event_type: "holiday", color: "#ef4444", is_active: true },
  { event_date: "2026-10-21", title: "Dussehra", event_type: "holiday", color: "#ef4444", is_active: true },
  { event_date: "2026-10-22", title: "3rd Assessment Datesheet", event_type: "exam", color: "#f59e0b", is_active: true },
  { event_date: "2026-10-23", title: "Teachers Training", event_type: "activity", color: "#0ea5a4", is_active: true },
  { event_date: "2026-10-23", title: "6th Mother Meet (VII A/B and IX A/B)", event_type: "activity", color: "#7c3aed", is_active: true },
  { event_date: "2026-10-30", title: "6th Mother Meet (VII A/B and IX A/B)", event_type: "activity", color: "#7c3aed", is_active: true },

  { event_date: "2026-11-08", title: "Diwali", event_type: "holiday", color: "#ef4444", is_active: true },
  { event_date: "2026-11-09", title: "Govardhan Pooja", event_type: "holiday", color: "#ef4444", is_active: true },
  { event_date: "2026-11-11", title: "Bhai Dooj", event_type: "holiday", color: "#ef4444", is_active: true },
  { event_date: "2026-11-14", title: "3rd Assessment Exam Starts", event_type: "exam", color: "#f59e0b", is_active: true },
  { event_date: "2026-11-20", title: "Teachers Training", event_type: "activity", color: "#0ea5a4", is_active: true },
  { event_date: "2026-11-24", title: "Guru Nanak Jayanti", event_type: "holiday", color: "#ef4444", is_active: true },
  { event_date: "2026-11-25", title: "Last Date for 3rd Assessment Result", event_type: "exam", color: "#f59e0b", is_active: true },
  { event_date: "2026-11-27", title: "PTM Result Day (3rd Assessment)", event_type: "activity", color: "#7c3aed", is_active: true },

  { event_date: "2026-12-01", title: "Preparation for Annual Function", event_type: "activity", color: "#7c3aed", is_active: true },
  { event_date: "2026-12-04", title: "IMS KIDex Talk (Grade V-X)", event_type: "activity", color: "#7c3aed", is_active: true },
  { event_date: "2026-12-10", title: "Intra PBL Evaluation and Science Fair Preparation", event_type: "activity", color: "#7c3aed", is_active: true },
  { event_date: "2026-12-11", title: "Teachers Training", event_type: "activity", color: "#0ea5a4", is_active: true },
  { event_date: "2026-12-18", title: "Halfday for Students; Science Fair Preparation", event_type: "announcement", color: "#2563eb", is_active: true },
  { event_date: "2026-12-20", title: "Science Fair (Sciberation)", event_type: "activity", color: "#7c3aed", is_active: true },
  { event_date: "2026-12-21", title: "Science Fair (Sciberation)", event_type: "activity", color: "#7c3aed", is_active: true },
  { event_date: "2026-12-24", title: "Submission of Winter Break Homework by Teachers (Pre-Nur to IV)", event_type: "announcement", color: "#2563eb", is_active: true },
  { event_date: "2026-12-25", title: "Christmas Day", event_type: "holiday", color: "#ef4444", is_active: true },
  { event_date: "2026-12-26", title: "Teachers Training and PTM 4th (2nd CA)", event_type: "activity", color: "#0ea5a4", is_active: true },
  { event_date: "2026-12-28", title: "Holiday Homework to Students (Pre-Nur to VIII)", event_type: "announcement", color: "#2563eb", is_active: true },

  { event_date: "2027-01-01", title: "Winter Break for P.Nur to Grade VIII", event_type: "holiday", color: "#ef4444", is_active: true },
  { event_date: "2027-01-02", title: "Teachers Training (2 Jan to 5 Jan)", event_type: "activity", color: "#0ea5a4", is_active: true },
  { event_date: "2027-01-08", title: "Winter Break for X to XII (8 Jan to 14 Jan)", event_type: "holiday", color: "#ef4444", is_active: true },
  { event_date: "2027-01-15", title: "Makar Sankranti", event_type: "holiday", color: "#ef4444", is_active: true },
  { event_date: "2027-01-23", title: "Preparation for 26th Jan", event_type: "activity", color: "#7c3aed", is_active: true },
  { event_date: "2027-01-25", title: "Annual Function and PO Program", event_type: "activity", color: "#7c3aed", is_active: true },
  { event_date: "2027-01-26", title: "Republic Day", event_type: "holiday", color: "#ef4444", is_active: true },

  { event_date: "2027-02-01", title: "2nd Term Oral Exams Start", event_type: "exam", color: "#f59e0b", is_active: true },
  { event_date: "2027-02-05", title: "School Timings (08:30 AM)", event_type: "announcement", color: "#2563eb", is_active: true },
  { event_date: "2027-02-10", title: "2nd Term Written Exam Starts and Ramadan Starts (Tentative)", event_type: "exam", color: "#f59e0b", is_active: true },
];

const ManageCalendar = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [formData, setFormData] = useState(initialForm);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("calendar_events")
        .select("*")
        .order("event_date", { ascending: true });

      if (error) throw error;
      setEvents(data || []);
    } catch (error) {
      const missingTable =
        error.message &&
        error.message.toLowerCase().includes("could not find the table");
      setMessage(
        missingTable
          ? "Calendar table is missing in Supabase. Run SQL from 'calendar_events.sql' in your project root, then refresh."
          : `Error loading calendar events: ${error.message}`
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      if (!event.event_date) return false;
      const date = new Date(event.event_date);
      const monthMatch = selectedMonth === "" || date.getMonth() === Number(selectedMonth);
      const yearMatch = selectedYear === "" || date.getFullYear() === Number(selectedYear);
      return monthMatch && yearMatch;
    });
  }, [events, selectedMonth, selectedYear]);

  const availableYears = useMemo(() => {
    const years = new Set(
      events
        .filter((event) => event.event_date)
        .map((event) => new Date(event.event_date).getFullYear())
    );
    return Array.from(years).sort((a, b) => b - a);
  }, [events]);

  const resetForm = () => {
    setFormData(initialForm);
    setEditingId(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");

    try {
      if (editingId) {
        const { error } = await supabase
          .from("calendar_events")
          .update(formData)
          .eq("id", editingId);
        if (error) throw error;
        setMessage("Calendar event updated successfully.");
      } else {
        const { error } = await supabase.from("calendar_events").insert([formData]);
        if (error) throw error;
        setMessage("Calendar event created successfully.");
      }

      resetForm();
      fetchEvents();
    } catch (error) {
      setMessage(`Error saving event: ${error.message}`);
    }
  };

  const handleEdit = (eventItem) => {
    setFormData({
      title: eventItem.title || "",
      event_date: eventItem.event_date || "",
      description: eventItem.description || "",
      event_type: eventItem.event_type || "general",
      color: eventItem.color || "#1eb2a6",
      is_active: eventItem.is_active ?? true,
    });
    setEditingId(eventItem.id);
  };

  const handleDelete = async (id) => {
    const isConfirmed = window.confirm("Delete this event?");
    if (!isConfirmed) return;

    try {
      const { error } = await supabase.from("calendar_events").delete().eq("id", id);
      if (error) throw error;
      setMessage("Calendar event deleted.");
      fetchEvents();
    } catch (error) {
      setMessage(`Error deleting event: ${error.message}`);
    }
  };

  const handleImportPreset = async () => {
    const isConfirmed = window.confirm(
      "Import 2026-2027 preset events from the uploaded calendar screenshots?"
    );
    if (!isConfirmed) return;

    setMessage("");
    try {
      const { error } = await supabase.from("calendar_events").insert(presetEvents2026To2027);
      if (error) throw error;
      setMessage(`Imported ${presetEvents2026To2027.length} events successfully.`);
      fetchEvents();
    } catch (error) {
      setMessage(`Error importing preset events: ${error.message}`);
    }
  };

  return (
    <div className="admin-section">
      <h3>Manage Calendar Events</h3>
      <p>Add or edit events and holidays shown in the website calendar.</p>
      {message && <div className="admin-msg">{message}</div>}

      <div className="admin-form-card">
        <h4>{editingId ? "Edit Calendar Event" : "Add Calendar Event"}</h4>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Event Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g. Mid-Term Exam Starts"
              required
            />
          </div>

          <div className="form-group-row">
            <div className="form-group half">
              <label>Date</label>
              <input
                type="date"
                value={formData.event_date}
                onChange={(e) => setFormData({ ...formData, event_date: e.target.value })}
                required
              />
            </div>

            <div className="form-group half">
              <label>Event Type</label>
              <select
                value={formData.event_type}
                onChange={(e) => setFormData({ ...formData, event_type: e.target.value })}
              >
                {eventTypeOptions.map((typeOption) => (
                  <option key={typeOption.value} value={typeOption.value}>
                    {typeOption.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>Description (Optional)</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Event details shown in calendar card."
            />
          </div>

          <div className="form-group-row">
            <div className="form-group half">
              <label>Event Color</label>
              <input
                type="color"
                value={formData.color}
                onChange={(e) => setFormData({ ...formData, color: e.target.value })}
              />
            </div>

            <div className="form-group checkbox half">
              <label>
                <input
                  type="checkbox"
                  checked={formData.is_active}
                  onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                />
                Active
              </label>
            </div>
          </div>

          <button type="submit" className="save-btn">
            {editingId ? "Update Event" : "Add Event"}
          </button>

          {editingId && (
            <button type="button" className="cancel-btn" onClick={resetForm}>
              Cancel
            </button>
          )}
        </form>
      </div>

      <div className="admin-form-card">
        <h4>Filter Events</h4>
        <button
          type="button"
          className="save-btn"
          style={{ marginBottom: "14px" }}
          onClick={handleImportPreset}
        >
          Import 2026-2027 Preset Events
        </button>
        <div className="form-group-row">
          <div className="form-group half">
            <label>Month</label>
            <select value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)}>
              <option value="">All Months</option>
              {Array.from({ length: 12 }).map((_, index) => (
                <option key={index} value={index}>
                  {new Date(2000, index, 1).toLocaleString("default", { month: "long" })}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group half">
            <label>Year</label>
            <select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)}>
              <option value="">All Years</option>
              {availableYears.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="admin-list">
        {loading ? (
          <p style={{ padding: "14px 18px" }}>Loading events...</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Title</th>
                <th>Type</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredEvents.map((eventItem) => (
                <tr key={eventItem.id}>
                  <td>{formatDate(eventItem.event_date)}</td>
                  <td>
                    <strong>{eventItem.title}</strong>
                    {eventItem.description ? (
                      <div style={{ marginTop: 4, color: "#777", fontSize: "12px" }}>
                        {eventItem.description}
                      </div>
                    ) : null}
                  </td>
                  <td>
                    <span
                      className="status-badge active"
                      style={{ background: `${eventItem.color || "#1eb2a6"}22`, color: "#1f2937" }}
                    >
                      {eventItem.event_type || "general"}
                    </span>
                  </td>
                  <td>
                    <span className={`status-badge ${eventItem.is_active ? "active" : "inactive"}`}>
                      {eventItem.is_active ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td>
                    <button onClick={() => handleEdit(eventItem)} className="icon-btn edit">
                      <FaEdit />
                    </button>
                    <button onClick={() => handleDelete(eventItem.id)} className="icon-btn delete">
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
              {!filteredEvents.length && (
                <tr>
                  <td colSpan="5" style={{ textAlign: "center", padding: "16px" }}>
                    No events found for this filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ManageCalendar;
