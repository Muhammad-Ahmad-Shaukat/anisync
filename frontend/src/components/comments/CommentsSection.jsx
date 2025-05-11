import React, { useEffect, useState } from "react";
import "./CommentsSection.css";

const Comment = ({ comment }) => {
  return (
    <div className="comment">
      <div className="comment-header-line">
        <span className="comment-username">{comment.userId?.username || "Unknown User"}</span>
        <span className="comment-time">
          {new Date(comment.createdAt).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
      </div>

      <div className="comment-body">
        <p dangerouslySetInnerHTML={{ __html: comment.comment }} />
      </div>

      <div className="comment-footer">
        <button>↩️ Reply</button>
        <button>👍</button>
        <button>👎</button>
        <button>⋯ More</button>
      </div>
    </div>
  );
};

const CommentSection = ({ episodeId }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  useEffect(() => {
    const fetchComments = async () => {
      if (!episodeId) return;

      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`http://localhost:5000/api/auth/getcomment/${episodeId}`);
        if (!res.ok) {
          throw new Error("Failed to fetch comments");
        }
        const data = await res.json();
        setComments(data);
      } catch (err) {
        console.error("Error fetching comments:", err);
        setError("Could not load comments.");
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [episodeId]);

  const handleCommentPost = () => {
    if (commentText.trim()) {
      console.log("Comment added:", commentText);
      setCommentText("");
      // Optional: Send to backend and refresh comments after successful post
    }
  };

  const handleLoginRedirect = () => {
    window.location.href = "/login";
  };

  return (
    <div className="comment-section">
      <div className="comment-top-bar">
        <h2>📺 Episode Comments</h2>
        <h3>💬 {comments.length} Comments</h3>
      </div>

      <div className="comment-box">
        <img className="avatar" src="/default-avatar.png" alt="avatar" />
        <div className="input-block">
          {!isLoggedIn ? (
            <p className="login-warning">
              You must be{" "}
              <span className="login-link" onClick={handleLoginRedirect}>
                login
              </span>{" "}
              to post a comment
            </p>
          ) : null}
          <textarea
            placeholder="Leave a comment"
            disabled={!isLoggedIn}
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
          />
          <button onClick={handleCommentPost} disabled={!isLoggedIn || !commentText.trim()}>
            Post Comment
          </button>
        </div>
      </div>

      <div className="comments-list">
        {loading ? (
          <p>Loading comments...</p>
        ) : error ? (
          <p className="error">{error}</p>
        ) : comments.length === 0 ? (
          <p>No comments yet. Be the first to comment!</p>
        ) : (
          comments.map((c) => <Comment key={c._id} comment={c} />)
        )}
      </div>
    </div>
  );
};

export default CommentSection;
