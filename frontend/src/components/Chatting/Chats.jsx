import React, { useState } from 'react';
import './Chats.css'; // Import the CSS styles

const dummyFriends = [
  { id: 1, username: 'alice' },
  { id: 2, username: 'bob' },
  { id: 3, username: 'charlie' },
];

export default function Chats() {
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [messages, setMessages] = useState({});
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;

    const newMessage = { sender: 'You', text: input };
    setMessages((prev) => ({
      ...prev,
      [selectedFriend.id]: [...(prev[selectedFriend.id] || []), newMessage],
    }));
    setInput('');
  };

  return (
    <div className="chat-app">
      {/* Friend List */}
      <div className="friend-list">
        <h2>Friends</h2>
        <ul>
          {dummyFriends.map((friend) => (
            <li
              key={friend.id}
              className={selectedFriend?.id === friend.id ? 'selected' : ''}
              onClick={() => setSelectedFriend(friend)}
            >
              {friend.username}
            </li>
          ))}
        </ul>
      </div>

      {/* Chat Box */}
      <div className="chat-box">
        {selectedFriend ? (
          <>
            <h2>Chat with {selectedFriend.username}</h2>
            <div className="message-area">
              {(messages[selectedFriend.id] || []).map((msg, index) => (
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
