import React, { useEffect, useState } from "react";
import { getMembers, getContactMsgs } from "../api/api";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import CountUp from "react-countup";
const ActualCountUp = (CountUp && typeof CountUp === 'object' && 'default' in CountUp) ? CountUp.default : CountUp;
import "../styles/admin.css";

const dummyChartData = [
  { name: "Mon", msgs: 4 },
  { name: "Tue", msgs: 7 },
  { name: "Wed", msgs: 5 },
  { name: "Thu", msgs: 12 },
  { name: "Fri", msgs: 9 },
  { name: "Sat", msgs: 15 },
  { name: "Sun", msgs: 10 },
];

export default function Dashboard() {
  const [stats, setStats] = useState({
    members: 0,
    messages: 0,
    newMessages: 0,
    recentMessages: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [memRes, msgRes] = await Promise.all([getMembers(), getContactMsgs()]);

        const members = memRes?.data?.data || [];
        const messages = msgRes?.data?.data || [];
        const newMessages = messages.filter((m) => m.status === "New" || !m.status).length;

        setStats({
          members: members.length,
          messages: messages.length,
          newMessages,
          recentMessages: messages.slice(0, 6),
        });
      } catch (err) {
        console.error("Dashboard data fetch error:", err);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="dashboard-container">
      <div className="admin-pagehead">
        <div>
          <h1 className="admin-title">Welcome back!</h1>
          <p className="admin-subtitle">Here's what's happening with your website today.</p>
        </div>
      </div>

      <div className="dashboard-stats">
        <div className="stat-card">
          <div className="stat-icon stat-icon--primary">
            <i className="fa-solid fa-users" />
          </div>
          <div className="stat-info">
            <span className="stat-value">
              <ActualCountUp end={stats.members} duration={2} />
            </span>
            <span className="stat-label">Total Members</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon stat-icon--success">
            <i className="fa-solid fa-envelope" />
          </div>
          <div className="stat-info">
            <span className="stat-value">
              <ActualCountUp end={stats.messages} duration={2} />
            </span>
            <span className="stat-label">Total Messages</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon stat-icon--warning">
            <i className="fa-solid fa-bell" />
          </div>
          <div className="stat-info">
            <span className="stat-value">
              <ActualCountUp end={stats.newMessages} duration={2} />
            </span>
            <span className="stat-label">New Notifications</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon stat-icon--danger">
            <i className="fa-solid fa-chart-line" />
          </div>
          <div className="stat-info">
            <span className="stat-value">84%</span>
            <span className="stat-label">Growth Rate</span>
          </div>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-card">
          <div className="dashboard-card__header">
            <h3 className="dashboard-card__title">Message Activity</h3>
            <span className="admin-muted" style={{ fontSize: "12px" }}>
              Last 7 Days
            </span>
          </div>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={dummyChartData}>
                <defs>
                  <linearGradient id="colorMsgs" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0044eb" stopOpacity={0.1} />
                    <stop offset="95%" stopColor="#0044eb" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#94a3b8", fontSize: 12 }}
                  dy={10}
                />
                <YAxis hide />
                <Tooltip
                  contentStyle={{
                    borderRadius: "12px",
                    border: "none",
                    boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="msgs"
                  stroke="#0044eb"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorMsgs)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="dashboard-card">
          <div className="dashboard-card__header">
            <h3 className="dashboard-card__title">Recent Inquiries</h3>
          </div>
          <div className="recent-list">
            {stats.recentMessages.map((msg, idx) => (
              <div className="recent-item" key={msg._id || idx}>
                <div className="recent-avatar">
                  {msg.name ? msg.name.charAt(0).toUpperCase() : "M"}
                </div>
                <div className="recent-meta">
                  <div className="recent-name">{msg.name}</div>
                  <div className="recent-time">{new Date(msg.createdAt).toLocaleDateString()}</div>
                </div>
                {msg.status === "New" && (
                  <span
                    style={{
                      marginLeft: "auto",
                      width: "8px",
                      height: "8px",
                      background: "#0044eb",
                      borderRadius: "50%",
                    }}
                  />
                )}
              </div>
            ))}
            {stats.recentMessages.length === 0 && (
              <div className="admin-muted" style={{ textAlign: "center", padding: "20px" }}>
                No recent messages
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

