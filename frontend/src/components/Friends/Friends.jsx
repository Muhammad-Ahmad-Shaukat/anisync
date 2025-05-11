import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Friends.css";

const Friends = () => {
  const [userid, setUserId] = useState("abc");
  const [searchTerm, setSearchTerm] = useState("");
  const [friends, setFriends] = useState([]);
  const [sentRequests, setSentRequests] = useState([]);
  const [receivedRequests, setReceivedRequests] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fetchCurrentFriends = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/auth/getfriends?userid=${userid}`);
        setFriends(response.data.friends);
      } catch (error) {
        console.error("Error fetching current friends:", error);
      }
    };

    const fetchSentRequests = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/auth/getSentRequests?userid=${userid}`);
        setSentRequests(response.data.sentRequests);
      } catch (error) {
        console.error("Error fetching sent requests:", error);
      }
    };

    const fetchReceivedRequests = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/auth/getReceivedFriendRequests?userid=${userid}`);
        setReceivedRequests(response.data.receivedRequests);
      } catch (error) {
        console.error("Error fetching received requests:", error);
      }
    };

    fetchCurrentFriends();
    fetchSentRequests();
    fetchReceivedRequests();
  }, [userid]);

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
      const response = await axios.post(
        "http://localhost:5000/api/auth/addfriend",
        { userid: userid, friendid: friendId }
      );
      alert(response.data.message);
      // Refresh the lists after adding
      window.location.reload();
    } catch (error) {
      console.error("Error adding friend:", error);
      alert("Failed to send friend request.");
    }
  };
const handleAcceptRequest = async (friendId) => {
  try {
    const response = await axios.post("http://localhost:5000/api/auth/acceptreq", {
      userid: userid,
      friendid: friendId,
      action: "accept",
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
      userid: userid,
      friendid: friendId,
      action: "reject",
    });
    alert(response.data.message);
    window.location.reload();
  } catch (error) {
    console.error("Error rejecting friend request:", error);
    alert("Failed to reject friend request.");
  }
};


  return (
    <div className="friends-container">
      <h2>Friends</h2>

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
          <h3>Search Results</h3>
          <ul>
            {searchResults.map((user) => (
              <li key={user._id} onClick={() => handleAddFriend(user._id)}>
                {user.username} <span>{user.name}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="current-friends">
        <h3>Current Friends</h3>
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
      </div>

      <div className="sent-requests">
        <h3>Sent Requests</h3>
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
      </div>

      <div className="received-requests">
        <h3>Received Requests</h3>
        {receivedRequests.length > 0 ? (
          <ul>
            {receivedRequests.map((friend) => (
              <li key={friend._id}>
                {friend.username} <span>{friend.name}</span>
                <div className="friend-actions">
                  <button 
                    className="accept-btn" 
                    onClick={() => handleAcceptRequest(friend._id)}
                  >
                    Accept
                  </button>
                  <button 
                    className="reject-btn" 
                    onClick={() => handleRejectRequest(friend._id)}
                  >
                    Reject
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No received requests.</p>
        )}
      </div>
    </div>
  );
};

export default Friends;