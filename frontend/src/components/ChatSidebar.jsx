import React from "react";
import "./Sidebar.css";
import {
  MessageSquare,
  Folder,
  Users,
  Newspaper,
  Archive,
  User,
  Settings,
  LogOut,
  Triangle,
} from "lucide-react";

// Define sidebar items with metadata
const sidebarItems = [
  { icon: <Triangle />, badge: null, active: false },
  { icon: <MessageSquare />, badge: "", active: false },
  { icon: <Folder />, badge: "1", active: true },
  { icon: <Users />, badge: null, active: false },
  { icon: <Newspaper />, badge: null, active: false },
  { icon: <Archive />, badge: null, active: false },
  { divider: true },
  { icon: <User />, badge: null, active: false },
  { icon: <Settings />, badge: null, active: false },
  { icon: <LogOut />, badge: null, active: false },
];

const ChatSidebar = () => {
  return (
    <div className="sidebar">
      {sidebarItems.map((item, index) =>
        item.divider ? (
          <div key={index} className="divider" />
        ) : (
          <div
            key={index}
            className={`sidebar-icon ${item.active ? "active" : ""} ${
              item.badge !== null ? "with-badge" : ""
            }`}
          >
            {item.icon}
            {item.badge !== null && <span className="badge">{item.badge}</span>}
          </div>
        )
      )}
    </div>
  );
};

export default ChatSidebar;
