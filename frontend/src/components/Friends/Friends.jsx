import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Friends.css";

const Friends = () => {
  const [user, setUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [friends, setFriends] = useState([]);
  const [sentRequests, setSentRequests] = useState([]);
  const [receivedRequests, setReceivedRequests] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [activeTab, setActiveTab] = useState("friends");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/login";
      return;
    }

    const fetchUser = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/auth/getuser", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error("Failed to fetch user");

        const data = await res.json();
        setUser(data.user);
      } catch (err) {
        console.error("Error fetching user:", err.message);
        alert("Failed to load user data.");
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    if (!user) return;

    const fetchFriendsData = async () => {
      try {
        const [friendsRes, sentRes, receivedRes] = await Promise.all([
          axios.get(`http://localhost:5000/api/auth/getfriends?userid=${user._id}`),
          axios.get(`http://localhost:5000/api/auth/getSentRequests?userid=${user._id}`),
          axios.get(`http://localhost:5000/api/auth/getReceivedFriendRequests?userid=${user._id}`),
        ]);
        setFriends(friendsRes.data.friends);
        setSentRequests(sentRes.data.sentRequests);
        setReceivedRequests(receivedRes.data.receivedRequests);
      } catch (error) {
        console.error("Error fetching friend data:", error);
      }
    };

    fetchFriendsData();
  }, [user]);

  const handleSearchChange = async (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    if (term.length > 2) {
      try {
        const response = await axios.get(`http://localhost:5000/api/auth/searchfriends?searchTerm=${term}`);
        setSearchResults(response.data.users);
      } catch (error) {
        console.error("Error searching users:", error);
      }
    } else {
      setSearchResults([]);
    }
  };

  const handleAddFriend = async (friendId) => {
    try {
      const response = await axios.post("http://localhost:5000/api/auth/addfriend", {
        userid: user._id,
        friendid: friendId,
      });
      alert(response.data.message);
      window.location.reload();
    } catch (error) {
      const message = error.response?.data?.message || "Failed to send friend request.";
      console.error("Error adding friend:", message);
      alert(message);
    }
  };

  const handleAcceptRequest = async (friendId) => {
    try {
      const response = await axios.post("http://localhost:5000/api/auth/acceptreq", {
        userid: user._id,
        friendid: friendId,
        action: "accept",
      }, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      alert(response.data.message);
      window.location.reload();
    } catch (error) {
      console.error("Error accepting friend request:", error);
      alert("Failed to accept friend request.");
    }
  };

  const handleRejectRequest = async (friendId) => {
    try {
      const response = await axios.post("http://localhost:5000/api/auth/acceptreq", {
        userid: user._id,
        friendid: friendId,
        action: "reject",
      }, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      alert(response.data.message);
      window.location.reload();
    } catch (error) {
      console.error("Error rejecting friend request:", error);
      alert("Failed to reject friend request.");
    }
  };

  const renderFriendsList = () => {
    switch (activeTab) {
      case "friends":
        return (
          <>
            {friends.length > 0 ? (
              <ul>
                {friends.map((friend) => (
                  <li key={friend._id}>
                    {friend.username} <span>{friend.name}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No friends yet.</p>
            )}
          </>
        );
      case "sent":
        return (
          <>
            {sentRequests.length > 0 ? (
              <ul>
                {sentRequests.map((friend) => (
                  <li key={friend._id}>
                    {friend.username} <span>{friend.name}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No sent requests.</p>
            )}
          </>
        );
      case "received":
        return (
          <>
            {receivedRequests.length > 0 ? (
              <ul>
                {receivedRequests.map((friend) => (
                  <li key={friend._id}>
                    {friend.username} <span>{friend.name}</span>
                    <div className="friend-actions">
                      <button className="accept-btn" onClick={() => handleAcceptRequest(friend._id)}>
                        Accept
                      </button>
                      <button className="reject-btn" onClick={() => handleRejectRequest(friend._id)}>
                        Reject
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No received requests.</p>
            )}
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="friends-container">
      <div className="friends-header">
        <h2>Friends</h2>
      </div>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search users..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>

      {searchTerm && searchResults.length > 0 && (
        <div className="search-results">
          <ul>
            {searchResults.map((user) => (
              <li key={user._id} onClick={() => handleAddFriend(user._id)}>
                {user.username} <span>{user.name}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="tabs">
        <button
          className={`tab-button ${activeTab === "friends" ? "active" : ""}`}
          onClick={() => setActiveTab("friends")}
        >
          Friends
        </button>
        <button
          className={`tab-button ${activeTab === "sent" ? "active" : ""}`}
          onClick={() => setActiveTab("sent")}
        >
          Sent Requests
        </button>
        <button
          className={`tab-button ${activeTab === "received" ? "active" : ""}`}
          onClick={() => setActiveTab("received")}
        >
          Received Requests
        </button>
      </div>

      <div className="friends-list">
        {renderFriendsList()}
      </div>
    </div>
  );
};

export default Friends;