import React, { useState, useEffect } from "react";
import axios from "axios";

const FriendManager = ({ currentUsername }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  const [friends, setFriends] = useState([]);
  const [friendRequests, setFriendRequests] = useState([]);

  const fetchFriends = async () => {
    try {
      const res = await axios.get(`/api/auth/friends/${currentUsername}`);
      setFriends(res.data.friends);
    } catch (err) {
      console.error("Failed to fetch friends", err);
    }
  };

  const fetchFriendRequests = async () => {
    try {
      const res = await axios.get(`/api/friend-requests/${currentUsername}`);
      setFriendRequests(res.data.requests);
    } catch (err) {
      console.error("Failed to fetch friend requests", err);
    }
  };

  const handleSearch = async () => {
    try {
      const res = await axios.get(`/api/user-by-username?username=${searchTerm}`);
      setSearchResult(res.data.user);
    } catch (err) {
      setSearchResult(null);
    }
  };

  const sendFriendRequest = async (friendUsername) => {
    try {
      await axios.post(`/api/add-friend?userid=${currentUsername}&friendid=${friendUsername}`);
      alert("Friend request sent.");
    } catch (err) {
      alert(err.response.data.message || "Error sending request");
    }
  };

  const respondToRequest = async (friendUsername, action) => {
    try {
      await axios.get(`/api/acceptfriend?userid=${friendUsername}&friendid=${currentUsername}&action=${action}`);
      fetchFriendRequests();
      fetchFriends();
    } catch (err) {
      console.error("Error responding to friend request:", err);
    }
  };

  useEffect(() => {
    fetchFriends();
    fetchFriendRequests();
  }, []);

  return (
    <div className="p-4 max-w-xl mx-auto text-white bg-zinc-800 rounded-xl shadow-lg">
      <h2 className="text-xl font-bold mb-4">Friend Manager</h2>

      {/* Search */}
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Search user by username"
          className="flex-1 px-2 py-1 rounded bg-zinc-700"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="px-3 py-1 bg-blue-600 rounded" onClick={handleSearch}>
          Search
        </button>
      </div>

      {/* Search Result */}
      {searchResult && (
        <div className="mb-4 bg-zinc-700 p-2 rounded">
          <p>{searchResult.username}</p>
          <button
            className="mt-1 px-2 py-1 bg-green-600 rounded"
            onClick={() => sendFriendRequest(searchResult.username)}
          >
            Add Friend
          </button>
        </div>
      )}

      {/* Friend Requests */}
      <div className="mb-4">
        <h3 className="font-semibold mb-2">Friend Requests</h3>
        {friendRequests.length === 0 ? (
          <p className="text-gray-400">No pending requests.</p>
        ) : (
          friendRequests.map((req) => (
            <div key={req._id} className="flex justify-between items-center bg-zinc-700 p-2 mb-2 rounded">
              <p>{req.user.username}</p>
              <div className="flex gap-2">
                <button
                  className="bg-green-600 px-2 py-1 rounded"
                  onClick={() => respondToRequest(req.user.username, "accept")}
                >
                  Accept
                </button>
                <button
                  className="bg-red-600 px-2 py-1 rounded"
                  onClick={() => respondToRequest(req.user.username, "reject")}
                >
                  Reject
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Friends List */}
      <div>
        <h3 className="font-semibold mb-2">Your Friends</h3>
        {friends.length === 0 ? (
          <p className="text-gray-400">You have no friends yet.</p>
        ) : (
          <ul>
            {friends.map((f) => (
              <li key={f._id} className="mb-1 bg-zinc-700 p-2 rounded">
                {f.username}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default FriendManager;
