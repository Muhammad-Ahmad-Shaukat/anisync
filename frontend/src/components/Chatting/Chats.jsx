import React, { useEffect, useState } from 'react';
import './Chats.css';
import { io } from 'socket.io-client';

const socket = io('http://localhost:5000');

export default function Chats() {
  const [friends, setFriends] = useState([]);
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [messages, setMessages] = useState({});
  const [input, setInput] = useState('');
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/login";
      return;
    }

    const fetchUser = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/auth/getuser", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("Failed to fetch user");

        const data = await res.json();
        setUserId(data.user._id);
        socket.emit('register-user', data.user._id);

        const friendsRes = await fetch(`http://localhost:5000/api/auth/getfriends?userid=${data.user._id}`);
        if (!friendsRes.ok) throw new Error("Failed to fetch friends");

        const friendsData = await friendsRes.json();
        setFriends(friendsData.friends);
      } catch (err) {
        console.error("Error loading user or friends:", err.message);
      }
    };

    fetchUser();
  }, []);

 useEffect(() => {
  socket.on('receive-message', ({ from, text }) => {
    setMessages(prev => ({
      ...prev,
      [from]: [...(prev[from] || []), { sender: getFriendUsername(from), text }],
    }));
  });

  return () => {
    socket.off('receive-message');
  };
}, [friends]);
  const getFriendUsername = (id) => {
  const friend = friends.find(f => f._id === id);
  return friend ? friend.username : "Unknown";
};

  const handleSend = () => {
    if (!input.trim() || !selectedFriend) return;

    const msg = { from: userId, to: selectedFriend._id, text: input };
    socket.emit('send-message', msg);

    setMessages((prev) => ({
      ...prev,
      [selectedFriend._id]: [...(prev[selectedFriend._id] || []), { sender: 'You', text: input }],
    }));
    setInput('');
  };

  return (
    <div className="chat-app">
      <div className="friend-list">
        <h2>Friends</h2>
        <ul>
          {friends.map((friend) => (
            <li
              key={friend._id}
              className={selectedFriend?._id === friend._id ? 'selected' : ''}
              onClick={() => setSelectedFriend(friend)}
            >
              {friend.username}
            </li>
          ))}
        </ul>
      </div>

      <div className="chat-box">
        {selectedFriend ? (
          <>
            <h2>Chat with {selectedFriend.username}</h2>
            <div className="message-area">
              {(messages[selectedFriend._id] || []).map((msg, index) => (
                <div key={index} className="message">
                  <strong>{msg.sender}:</strong> {msg.text}
                </div>
              ))}
            </div>
            <div className="input-area">
              <textarea
                placeholder="Type your message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <button onClick={handleSend}>Send</button>
            </div>
          </>
        ) : (
          <div className="no-chat">Select a friend to start chatting</div>
        )}
      </div>
    </div>
  );
}
