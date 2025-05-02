import React from "react";
import "./CommentsSection.css";

const Comment = ({ comment }) => {
  return (
    <div className="comment">
      <div className="comment-header-line">
        <span className="comment-username">{comment.userId?.username || "Unknown User"}</span>
        <span className="comment-time">{new Date(comment.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
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

const CommentSection = ({ comments }) => {
  return (
    <div className="comment-section">
      <div className="comment-top-bar">
        <h2>📺 Episode 1127</h2>
        <h3>💬 2,574 Comments</h3>
      </div>

      <div className="comment-box">
        <img className="avatar" src="/default-avatar.png" alt="avatar" />
        <div className="input-block">
          <p className="login-warning">You must be <span className="login-link">login</span> to post a comment</p>
          <textarea placeholder="Leave a comment" disabled></textarea>
        </div>
      </div>

      <div className="comments-list">
        {comments.map((c) => (
          <Comment key={c._id} comment={c} />
        ))}
      </div>
    </div>
  );
};

export default CommentSection;
