import React, { useState } from 'react';
import './Comments.css';

function Comments({ comments, postId, addComment, theme, currentUser, defaultAvatar }) {
  const [newComment, setNewComment] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim() && currentUser) {
      addComment(postId, {
        content: newComment
      });
      setNewComment('');
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className={`comments-section ${theme}`}>
      {currentUser && (
        <form onSubmit={handleSubmit} className="comment-form">
          <div className="comment-input-wrapper">
            <img 
              src={currentUser.profilePicture || defaultAvatar} 
              alt="Your profile"
              className="commenter-avatar"
            />
            <div className="comment-inputs">
              <textarea
                placeholder="Write a comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="comment-text"
                rows="2"
                required
              />
            </div>
          </div>
          <button type="submit" className="submit-comment-btn">
            Post Comment
          </button>
        </form>
      )}

      <div className="comments-list">
        {comments.length === 0 ? (
          <p className="no-comments">
            {currentUser ? 'No comments yet. Be the first to comment!' : 'No comments yet.'}
          </p>
        ) : (
          comments.map(comment => (
            <div key={comment.id} className="comment">
              <img 
                src={comment.author?.profilePicture || defaultAvatar} 
                alt={comment.author?.displayName || 'User'}
                className="comment-avatar"
              />
              <div className="comment-content-wrapper">
                <div className="comment-header">
                  <span className="comment-author">{comment.author?.displayName || 'Unknown User'}</span>
                  <span className="comment-username">@{comment.author?.username || 'unknown'}</span>
                  <span className="comment-date">{formatDate(comment.createdAt)}</span>
                </div>
                <p className="comment-content">{comment.content}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Comments;
