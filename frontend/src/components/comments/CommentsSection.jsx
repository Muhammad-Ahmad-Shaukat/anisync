import React, { useState } from "react";
import "./CommentsSection.css";

const CommentsSection = ({ videoName }) => {
  const [comments, setComments] = useState([
    { userName: "John Doe", text: "Great video!", timestamp: "2025-05-01 10:00", profilePic: "" },
    { userName: "Jane Smith", text: "Very informative, thanks for sharing.", timestamp: "2025-05-01 09:45", profilePic: "" },
  ]);
  const [newComment, setNewComment] = useState("");
  const [error, setError] = useState(null);

  // Handle new comment submission
  const handleCommentSubmit = (e) => {
    e.preventDefault();

    if (newComment.trim()) {
      const newCommentData = {
        userName: "Guest", // Hardcoded as "Guest" for now
        text: newComment,
        timestamp: new Date().toLocaleString(),
        profilePic: "", // No profile pic for guest
      };
      setComments([newCommentData, ...comments]);
      setNewComment(""); // Clear the input field
    } else {
      setError("Comment cannot be empty.");
    }
  };

  return (
    <div className="comments-section">
      <h3>Comments on {videoName}</h3>

      {error && <p className="error-message">{error}</p>}

      <div className="comment-list">
        {comments.length > 0 ? (
          comments.map((comment, index) => (
            <div key={index} className="comment">
              <div className="user-info">
                <div className="user-profile-pic">
                  {comment.profilePic ? (
                    <img src={comment.profilePic} alt="User Profile" />
                  ) : (
                    <span className="fallback-avatar">U</span>
                  )}
                </div>
                <div className="user-name">
                  <strong>{comment.userName}</strong>
                  <p className="timestamp">{comment.timestamp}</p>
                </div>
              </div>
              <p className="comment-text">{comment.text}</p>
            </div>
          ))
        ) : (
          <p>No comments yet. Be the first to comment!</p>
        )}
      </div>

      <form onSubmit={handleCommentSubmit} className="comment-form">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Write a comment..."
          rows="3"
          className="comment-input"
        ></textarea>
        <button type="submit" className="submit-comment-button">Post Comment</button>
      </form>
    </div>
  );
};

export default CommentsSection;
