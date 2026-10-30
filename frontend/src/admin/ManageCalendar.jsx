import React, { useEffect, useMemo, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { supabase } from "../supabaseClient";
import { presetEvents2026To2027 } from "../content/calendarPresets";

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
