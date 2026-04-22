import React, { useEffect, useState } from "react";
import {
  deleteContactMsg,
  getContactMsgs,
  replyContactMsg,
  updateContactMsgStatus,
} from "../api/api";
import "../styles/admin.css";

export default function ContactMessages() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [ok, setOk] = useState("");
  const [messages, setMessages] = useState([]);

  // Reply modal state
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [sendingReply, setSendingReply] = useState(false);

  const load = async () => {
    setError("");
    setOk("");
    setLoading(true);
    try {
      const res = await getContactMsgs();
      const data = res?.data?.data;
      setMessages(Array.isArray(data) ? data : []);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const changeStatus = async (id, newStatus) => {
    try {
      await updateContactMsgStatus(id, newStatus);
      await load();
    } catch (e) {
      setError(e.message);
    }
  };

  const remove = async (id) => {
    if (!window.confirm("Are you sure you want to delete this message?")) return;
    try {
      await deleteContactMsg(id);
      setOk("Message deleted");
      await load();
    } catch (e) {
      setError(e.message);
    }
  };

  const handleReply = async (e) => {
    e.preventDefault();
    if (!replyText || !replyingTo) return;
    
    setSendingReply(true);
    setError("");
    setOk("");
    try {
      await replyContactMsg(replyingTo._id, replyText);
      setOk("Reply sent successfully via email!");
      setReplyingTo(null);
      setReplyText("");
      await load();
    } catch (e) {
      setError(e.message || "Failed to send reply");
    } finally {
      setSendingReply(false);
    }
  };

  return (
    <div>
      <div className="admin-pagehead">
        <div>
          <h1 className="admin-title">Messages</h1>
          <p className="admin-subtitle">View and reply to contact messages.</p>
        </div>
        <button className="admin-btn admin-btn--ghost" type="button" onClick={load} disabled={loading}>
          Refresh
        </button>
      </div>

      {error ? <div className="admin-alert admin-alert--error">{error}</div> : null}
      {ok ? <div className="admin-alert admin-alert--ok">{ok}</div> : null}

      {replyingTo && (
        <form className="admin-card" onSubmit={handleReply}>
          <div className="admin-card__title">Reply to {replyingTo.name}</div>
          <div className="admin-muted" style={{ marginBottom: "12px" }}>
            <strong>Subject:</strong> {replyingTo.subject}<br/>
            <strong>Message:</strong> {replyingTo.message}
          </div>
          
          <label className="admin-field">
            <div className="admin-field__label">Your Reply</div>
            <textarea
              className="admin-input admin-textarea"
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              required
              placeholder="Type your reply. This will be emailed to the user."
            />
          </label>
          <div className="admin-actions" style={{ gap: "10px" }}>
            <button className="admin-btn" type="button" onClick={() => setReplyingTo(null)}>
              Cancel
            </button>
            <button className="admin-btn admin-btn--primary" type="submit" disabled={sendingReply}>
              {sendingReply ? "Sending..." : "Send Reply"}
            </button>
          </div>
        </form>
      )}

      <div className="admin-card">
        <div className="admin-card__title">Inbox</div>
        <div className="admin-table">
          <div className="admin-table__head" style={{ gridTemplateColumns: "1fr 1.5fr 1fr 1fr auto" }}>
            <div>Sender</div>
            <div>Message</div>
            <div>Date</div>
            <div>Status</div>
            <div />
          </div>
          {messages.map((m) => (
            <div className="admin-table__row" key={m._id} style={{ gridTemplateColumns: "1fr 1.5fr 1fr 1fr auto" }}>
              <div>
                <div style={{ fontWeight: "700" }}>{m.name}</div>
                <div className="admin-muted" style={{ fontSize: "12px" }}>{m.email}</div>
              </div>
              <div className="admin-muted">
                <strong>{m.subject || "No Subject"}</strong>
                <p style={{ margin: "4px 0 0", fontSize: "13px" }}>{m.message}</p>
                {m.reply && (
                   <div style={{ marginTop: "8px", padding: "8px", background: "#f1f5f9", borderRadius: "8px", fontSize: "12px" }}>
                     <strong>You Replied:</strong> {m.reply}
                   </div>
                )}
              </div>
              <div className="admin-muted" style={{ fontSize: "13px" }}>
                {new Date(m.createdAt).toLocaleDateString()}
              </div>
              <div>
                <select 
                  className="admin-input" 
                  value={m.status || "New"}
                  onChange={(e) => changeStatus(m._id, e.target.value)}
                  style={{ padding: "4px 8px" }}
                >
                  <option value="New">New</option>
                  <option value="Read">Read</option>
                  <option value="Replied">Replied</option>
                </select>
              </div>
              <div className="admin-actions" style={{ gap: "8px" }}>
                <button 
                  className="admin-btn admin-btn--ghost" 
                  style={{ color: "#0044eb", borderColor: "#0044eb" }}
                  type="button" 
                  onClick={() => setReplyingTo(m)}
                >
                  Reply
                </button>
                <button className="admin-btn admin-btn--danger" type="button" onClick={() => remove(m._id)}>
                  Delete
                </button>
              </div>
            </div>
          ))}
          {messages.length === 0 && !loading && (
             <div style={{ padding: "20px", textAlign: "center", color: "#64748b" }}>
               No messages found.
             </div>
          )}
        </div>
      </div>
    </div>
  );
}
