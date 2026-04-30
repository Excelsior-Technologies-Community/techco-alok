import React, { useEffect, useState } from "react";
import {
  addAboutCard,
  deleteAboutCard,
  getAbout,
  upsertAbout,
  updateAboutCard,
  toAssetUrl,
} from "../api/api";
import "../styles/admin.css";

export default function AboutUs() {
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [ok, setOk] = useState("");

  const [form, setForm] = useState({
    heading: "",
    description: "",
    video: "",
  });
  const [imageFile, setImageFile] = useState(null);

  const [cards, setCards] = useState([]);
  const [cardForm, setCardForm] = useState({
    title: "",
    description: "",
  });
  const [cardImageFile, setCardImageFile] = useState(null);
  const [editingCardId, setEditingCardId] = useState(null);

  const load = async () => {
    setError("");
    setOk("");
    setLoading(true);
    try {
      const res = await getAbout();
      const data = res?.data?.data;
      if (data) {
        setForm({
          heading: data.heading || "",
          description: data.description || "",
          video: data.video || "",
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

  const saveAbout = async (e) => {
    e.preventDefault();
    setError("");
    setOk("");
    setSaving(true);
    try {
      const fd = new FormData();
      fd.append("heading", form.heading);
      fd.append("description", form.description);
      fd.append("video", form.video);
      if (imageFile) fd.append("image", imageFile);

      const res = await upsertAbout(fd);
      setOk("About content saved successfully");
      load(); // Reload to get updated data
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
      fd.append("description", cardForm.description);
      if (cardImageFile) fd.append("image", cardImageFile);

      if (editingCardId) {
        await updateAboutCard(editingCardId, fd);
        setOk("Card updated");
      } else {
        await addAboutCard(fd);
        setOk("Card added");
      }
      
      setCardForm({ title: "", description: "" });
      setCardImageFile(null);
      setEditingCardId(null);
      load();
    } catch (e2) {
      setError(e2.message);
    }
  };

  const deleteCard = async (cardId) => {
    if (!window.confirm("Are you sure you want to delete this card?")) return;
    setError("");
    setOk("");
    try {
      await deleteAboutCard(cardId);
      setOk("Card deleted");
      load();
    } catch (e2) {
      setError(e2.message);
    }
  };

  const editCard = (card) => {
    setEditingCardId(card._id);
    setCardForm({
      title: card.title,
      description: card.description,
    });
    setOk("Editing card: " + card.title);
  };

  return (
    <div>
      <div className="admin-pagehead">
        <div>
          <h1 className="admin-title">About Us</h1>
          <p className="admin-subtitle">Update About Us page content.</p>
        </div>
        <button className="admin-btn admin-btn--ghost" type="button" onClick={load} disabled={loading}>
          Refresh
        </button>
      </div>

      {error ? <div className="admin-alert admin-alert--error">{error}</div> : null}
      {ok ? <div className="admin-alert admin-alert--ok">{ok}</div> : null}

      <form className="admin-card" onSubmit={saveAbout}>
        <div className="admin-card__title">Main Content</div>

        <label className="admin-field">
          <div className="admin-field__label">Heading</div>
          <input
            className="admin-input"
            value={form.heading}
            onChange={(e) => setForm((p) => ({ ...p, heading: e.target.value }))}
            placeholder="Discover Techco"
            required
          />
        </label>

        <label className="admin-field">
          <div className="admin-field__label">Description</div>
          <textarea
            className="admin-input"
            rows={4}
            value={form.description}
            onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
            placeholder="About description..."
          />
        </label>

        <div className="admin-grid admin-grid--2">
          <label className="admin-field">
            <div className="admin-field__label">Video URL</div>
            <input
              className="admin-input"
              value={form.video}
              onChange={(e) => setForm((p) => ({ ...p, video: e.target.value }))}
              placeholder="https://..."
              required
            />
          </label>

          <label className="admin-field">
            <div className="admin-field__label">Main Image</div>
            <input className="admin-input" type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files?.[0] || null)} />
            <div className="admin-hint">Leave blank to keep existing image.</div>
          </label>
        </div>

        <button className="admin-btn admin-btn--primary" type="submit" disabled={saving} style={{ width: 'fit-content' }}>
          {saving ? "Saving..." : "Save Main Content"}
        </button>
      </form>

      <div className="admin-card">
        <div className="admin-card__title">{editingCardId ? "Edit Card" : "Add New Card"}</div>

        <form className="admin-grid admin-grid--2" onSubmit={handleCardSubmit}>
          <div className="admin-field">
            <div className="admin-field__label">Card Title</div>
            <input
              className="admin-input"
              value={cardForm.title}
              onChange={(e) => setCardForm((p) => ({ ...p, title: e.target.value }))}
              placeholder="Our Mission"
              required
            />
          </div>
          <div className="admin-field">
            <div className="admin-field__label">Card Image</div>
            <input className="admin-input" type="file" accept="image/*" onChange={(e) => setCardImageFile(e.target.files?.[0] || null)} />
          </div>
          <div className="admin-field">
            <div className="admin-field__label">Card Description</div>
            <textarea
              className="admin-input"
              rows={3}
              value={cardForm.description}
              onChange={(e) => setCardForm((p) => ({ ...p, description: e.target.value }))}
              placeholder="Card description..."
              required
            />
          </div>
          <div className="admin-field" style={{ justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
            <button className="admin-btn admin-btn--primary" type="submit" style={{ padding: '12px 40px', width: 'fit-content', fontSize: '16px' }}>
              {editingCardId ? "Update Card" : "Add Card"}
            </button>
            {editingCardId && (
              <button className="admin-btn admin-btn--ghost" type="button" onClick={() => {
                setEditingCardId(null);
                setCardForm({ title: "", description: "" });
              }} style={{ marginLeft: '10px' }}>
                Cancel
              </button>
            )}
          </div>
        </form>

        <div className="admin-table">
          <div className="admin-table__head">
            <div>Title</div>
            <div>Description</div>
            <div>Image</div>
            <div />
          </div>
          {cards.map((c) => (
            <div className="admin-table__row" key={c._id}>
              <div style={{ fontWeight: 600 }}>{c.title}</div>
              <div className="admin-muted" style={{ fontSize: '0.9rem' }}>{c.description.substring(0, 50)}...</div>
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
