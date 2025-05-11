import React, { useEffect, useState } from "react";
import "./CommentsSection.css";
import axios from "axios";
import { Link } from "react-router-dom";
const CommentSection = ({ episodeId }) => {
  const [comments, setComments] = useState([]);
  const [commentInput, setCommentInput] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token); 

    const fetchComments = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/auth/comments/${episodeId}`);
        setComments(response.data || []);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load comments");
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [episodeId]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!commentInput.trim()) return;

    setIsSubmitting(true);
    setError(null);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("You need to be logged in to comment");
      }

      const userResponse = await axios.get("http://localhost:5000/api/auth/getuser", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const userId = userResponse.data.user._id;

      const commentResponse = await axios.post(
        "http://localhost:5000/api/auth/comments",
        {
          userid: userId,
          comment: commentInput,
          episodeid: episodeId
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        }
      );

      setComments(prev => [...prev, commentResponse.data]);
      setCommentInput("");
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Failed to post comment");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return <p>Loading comments...</p>;

  return (
    <div className="comment-section">
      <h3>Comments</h3>

      {error ? (
        <p className="error">{error}</p>
      ) : comments.length === 0 ? (
        <p>No comments yet. Be the first!</p>
      ) : (
        <ul className="comment-list">
          {comments.map((comment) => (
            <li key={comment._id} className="comment-item">
              <div className="comment-user">
                <span className="comment-username">{comment.userId?.username || "Unknown"}</span>
              </div>
              <p className="comment-content">{comment.comment}</p>
              <small className="comment-date">
                {new Date(comment.createdAt).toLocaleString()}
              </small>
            </li>
          ))}
        </ul>
      )}

      {isLoggedIn ? (
        <form onSubmit={handleCommentSubmit} className="comment-form">
          <textarea
            placeholder="Write a comment..."
            value={commentInput}
            onChange={(e) => setCommentInput(e.target.value)}
            disabled={isSubmitting}
          />
          <button type="submit" disabled={isSubmitting || !commentInput.trim()}>
            {isSubmitting ? "Posting..." : "Post"}
          </button>
        </form>
      ) : (
        <p className="login-message">
  You must be <Link to="/login" className="login-link">logged in</Link> to comment.
</p>
      )}
    </div>
  );
};

export default CommentSection;
