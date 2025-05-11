import React, { useEffect, useState } from "react";
import "./CommentsSection.css";
import axios from "axios";

const CommentSection = ({ episodeId }) => {
  const [comments, setComments] = useState([]);
  const [commentInput, setCommentInput] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/auth/comments/${episodeId}`);
        console.log("response.data", response.data); // Log to inspect the structure of the response
        // Assuming response.data is directly the array of comments
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
      // First get the user ID
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("You need to be logged in to comment");
      }

      // Get user data
      const userResponse = await axios.get("http://localhost:5000/api/auth/getuser", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const userId = userResponse.data.user._id;
      console.log(userResponse.data.user._id)
      // Post the comment
      const commentResponse = await axios.post(
        "http://localhost:5000/api/auth/comments",
        {
          userid: userId, // Adjusted for correct field name
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

      setComments(prev => [...prev, commentResponse.data]); // Add new comment to the list
      setCommentInput(""); // Clear input field after submit
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Failed to post comment");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Only render the comments section if comments are successfully fetched
  if (loading) {
    return <p>Loading comments...</p>; // Optional: you can show a spinner or a placeholder if desired
  }

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
                {/* Assuming you have the user profile picture and username */}

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
    </div>
  );
};

export default CommentSection;
