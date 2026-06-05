import React, { useEffect, useState } from "react";
import {
  getServicesPage,
  upsertServicesPage,
  addServicesCard,
  updateServicesCard,
  deleteServicesCard,
  toAssetUrl,
} from "../api/api";
import "../styles/admin.css";

export default function Services() {
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [ok, setOk] = useState("");

  const [form, setForm] = useState({
    heading: "",
    description: "",
  });
  const [imageFile, setImageFile] = useState(null);

  const [cards, setCards] = useState([]);
  const [cardForm, setCardForm] = useState({
    title: "",
    tags: "",
  });
  const [cardImageFile, setCardImageFile] = useState(null);
  const [editingCardId, setEditingCardId] = useState(null);

  const load = async () => {
    setError("");
    setOk("");
    setLoading(true);
    try {
      const res = await getServicesPage();
      const data = res?.data?.data;
      if (data) {
        setForm({
          heading: data.heading || "",
          description: data.description || "",
        });
        setCards(Array.isArray(data.cards) ? data.cards : []);
      }
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const saveServicesMain = async (e) => {
    e.preventDefault();
    setError("");
    setOk("");
    setSaving(true);
    try {
      const fd = new FormData();
      fd.append("heading", form.heading);
      fd.append("description", form.description);
      if (imageFile) fd.append("image", imageFile);

      await upsertServicesPage(fd);
      setOk("Services banner content saved successfully");
      load();
    } catch (e2) {
      setError(e2.message);
    } finally {
      setSaving(false);
    }
  };

  const handleCardSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setOk("");
    try {
      const fd = new FormData();
      fd.append("title", cardForm.title);
      fd.append("tags", cardForm.tags);
      if (cardImageFile) fd.append("image", cardImageFile);

      if (editingCardId) {
        await updateServicesCard(editingCardId, fd);
        setOk("Service card updated");
      } else {
        if (!cardImageFile) {
          setError("Card image is required for new cards");
          return;
        }
        await addServicesCard(fd);
        setOk("Service card added");
      }

      setCardForm({ title: "", tags: "" });
      setCardImageFile(null);
      setEditingCardId(null);
      load();
    } catch (e2) {
      setError(e2.message);
    }
  };

  const deleteCard = async (cardId) => {
    if (!window.confirm("Are you sure you want to delete this service card?")) return;
    setError("");
    setOk("");
    try {
      await deleteServicesCard(cardId);
      setOk("Service card deleted");
      load();
    } catch (e2) {
      setError(e2.message);
    }
  };

  const editCard = (card) => {
    setEditingCardId(card._id);
    setCardForm({
      title: card.title,
      tags: Array.isArray(card.tags) ? card.tags.join(", ") : "",
    });
    setOk("Editing card: " + card.title);
  };

  return (
    <div>
      <div className="admin-pagehead">
        <div>
          <h1 className="admin-title">Main Services</h1>
          <p className="admin-subtitle">Update Main Services page banner content and cards.</p>
        </div>
        <button className="admin-btn admin-btn--ghost" type="button" onClick={load} disabled={loading}>
          Refresh
        </button>
      </div>

      {error ? <div className="admin-alert admin-alert--error">{error}</div> : null}
      {ok ? <div className="admin-alert admin-alert--ok">{ok}</div> : null}

      <form className="admin-card" onSubmit={saveServicesMain}>
        <div className="admin-card__title">Main Banner Content</div>

        <label className="admin-field">
          <div className="admin-field__label">Heading</div>
          <input
            className="admin-input"
            value={form.heading}
            onChange={(e) => setForm((p) => ({ ...p, heading: e.target.value }))}
            placeholder="Tailored IT Solutions for Your Success"
            required
          />
        </label>

        <label className="admin-field">
          <div className="admin-field__label">Paragraph (Description)</div>
          <textarea
            className="admin-input"
            rows={4}
            value={form.description}
            onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
            placeholder="we understand that every business is unique, with its own set of challenges, goals, and aspirations..."
            required
          />
        </label>

        <label className="admin-field">
          <div className="admin-field__label">Right-side Banner Image</div>
          <input className="admin-input" type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files?.[0] || null)} />
          <div className="admin-hint">Leave blank to keep existing image.</div>
        </label>

        <button className="admin-btn admin-btn--primary" type="submit" disabled={saving} style={{ width: 'fit-content' }}>
          {saving ? "Saving..." : "Save Main Content"}
        </button>
      </form>

      <div className="admin-card">
        <div className="admin-card__title">{editingCardId ? "Edit Service Card" : "Add New Service Card"}</div>

        <form className="admin-grid admin-grid--2" onSubmit={handleCardSubmit}>
          <div className="admin-field">
            <div className="admin-field__label">Card Heading (Title)</div>
            <input
              className="admin-input"
              value={cardForm.title}
              onChange={(e) => setCardForm((p) => ({ ...p, title: e.target.value }))}
              placeholder="IT Management Services"
              required
            />
          </div>
          <div className="admin-field">
            <div className="admin-field__label">Card Tags (Comma-separated)</div>
            <input
              className="admin-input"
              value={cardForm.tags}
              onChange={(e) => setCardForm((p) => ({ ...p, tags: e.target.value }))}
              placeholder="Strategy, Consultation"
            />
          </div>
          <div className="admin-field">
            <div className="admin-field__label">Card Image</div>
            <input className="admin-input" type="file" accept="image/*" onChange={(e) => setCardImageFile(e.target.files?.[0] || null)} />
            {editingCardId && <div className="admin-hint">Leave blank to keep existing image.</div>}
          </div>
          <div className="admin-field" style={{ justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
            <button className="admin-btn admin-btn--primary" type="submit" style={{ padding: '12px 40px', width: 'fit-content', fontSize: '16px' }}>
              {editingCardId ? "Update Card" : "Add Card"}
            </button>
            {editingCardId && (
              <button className="admin-btn admin-btn--ghost" type="button" onClick={() => {
                setEditingCardId(null);
                setCardForm({ title: "", tags: "" });
                setCardImageFile(null);
              }} style={{ marginLeft: '10px' }}>
                Cancel
              </button>
            )}
          </div>
        </form>

        <div className="admin-table">
          <div className="admin-table__head">
            <div>Heading</div>
            <div>Tags</div>
            <div>Image</div>
            <div />
          </div>
          {cards.map((c) => (
            <div className="admin-table__row" key={c._id}>
              <div style={{ fontWeight: 600 }}>{c.title}</div>
              <div className="admin-muted" style={{ fontSize: '0.9rem' }}>
                {Array.isArray(c.tags) ? c.tags.join(", ") : ""}
              </div>
              <div style={{textAlign:'center'}}>
                <img src={toAssetUrl(c.image)} alt="" style={{ height: 40, borderRadius: 4 }} />
              </div>
              <div className="admin-actions">
                <button className="admin-btn admin-btn--ghost" type="button" onClick={() => editCard(c)}>
                  Edit
                </button>
                <button className="admin-btn admin-btn--danger" type="button" onClick={() => deleteCard(c._id)}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
