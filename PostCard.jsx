import React, { useState } from 'react';
import Comments from './Comments';
import './PostCard.css';

function PostCard({ post, updatePost, deletePost, likePost, addComment, theme, currentUser, isProfileView = false, defaultAvatar }) {
  const [showComments, setShowComments] = useState(false);
  
  // Debug: Log video posts
  if (post.isVideoPost) {
    console.log('Video post detected:', post.title, 'Video embed:', post.videoEmbed ? 'Present' : 'Missing');
  }
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    title: post.title,
    content: post.content,
    category: post.category || '',
    skillLevel: post.skillLevel || 'beginner'
  });

  const handleEdit = () => {
    setIsEditing(true);
    setEditData({
      title: post.title,
      content: post.content,
      category: post.category || '',
      skillLevel: post.skillLevel || 'beginner'
    });
  };

  const handleSaveEdit = () => {
    updatePost(post.id, editData);
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditData({
      title: post.title,
      content: post.content,
      category: post.category || '',
      skillLevel: post.skillLevel || 'beginner'
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleLike = () => {
    if (currentUser) {
      likePost(post.id);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatRelativeTime = (dateString) => {
    const now = new Date();
    const postDate = new Date(dateString);
    const diffInSeconds = Math.floor((now - postDate) / 1000);
    
    if (diffInSeconds < 60) return 'just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)}d ago`;
    return formatDate(dateString);
  };

  const isLiked = currentUser && post.likedBy && post.likedBy.includes(currentUser.id);
  const canEdit = currentUser && post.author && post.author.id === currentUser.id;
  const canDelete = currentUser && post.author && post.author.id === currentUser.id;

  return (
    <div className={`post-card ${theme}`}>
      <div className="post-header">
        <div className="post-author">
          <img 
            src={post.author?.profilePicture || defaultAvatar} 
            alt={post.author?.displayName || 'User'}
            className="author-avatar"
          />
          <div className="author-info">
            <div className="author-name">
              {post.author?.displayName || 'Unknown User'}
            </div>
            <div className="post-meta">
              <span className="post-username">@{post.author?.username || 'unknown'}</span>
              <span className="post-date">{formatRelativeTime(post.createdAt)}</span>
            </div>
          </div>
        </div>
        
        <div className="post-actions">
          {canEdit && !isProfileView && (
            <button 
              className="edit-btn"
              onClick={handleEdit}
              aria-label="Edit post"
            >
              ✏️
            </button>
          )}
          {canDelete && !isProfileView && (
            <button 
              className="delete-btn"
              onClick={() => deletePost(post.id)}
              aria-label="Delete post"
            >
              🗑️
            </button>
          )}
        </div>
      </div>

      {post.category && (
        <div className="post-category-badge">
          {post.category}
        </div>
      )}

      {isEditing ? (
        <div className="edit-form">
          <input
            type="text"
            name="title"
            value={editData.title}
            onChange={handleInputChange}
            className="edit-title"
          />
          <textarea
            name="content"
            value={editData.content}
            onChange={handleInputChange}
            className="edit-content"
            rows="4"
          />
          <div className="edit-actions">
            <button onClick={handleSaveEdit} className="save-btn">
              Save
            </button>
            <button onClick={handleCancelEdit} className="cancel-btn">
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <>
          <h3 className="post-title">{post.title}</h3>
          <p className="post-content">{post.content}</p>
          {post.isVideoPost && post.videoEmbed && (
            <div 
              className="video-embed-container"
              dangerouslySetInnerHTML={{ __html: post.videoEmbed }}
            />
          )}
        </>
      )}

      {post.skillLevel && (
        <div className="skill-level-container">
          <span className={`skill-level ${post.skillLevel}`}>
            {post.skillLevel}
          </span>
        </div>
      )}

      <div className="post-footer">
        <div className="post-stats">
          <button 
            className={`like-btn ${isLiked ? 'liked' : ''}`}
            onClick={handleLike}
            aria-label={isLiked ? 'Unlike post' : 'Like post'}
            disabled={!currentUser}
          >
            {isLiked ? '❤️' : '🤍'} {post.likes}
          </button>
          <button 
            className="comments-btn"
            onClick={() => setShowComments(!showComments)}
            aria-label="Toggle comments"
          >
            💬 {post.comments.length}
          </button>
        </div>
      </div>

      {showComments && (
        <Comments
          comments={post.comments}
          postId={post.id}
          addComment={addComment}
          theme={theme}
          currentUser={currentUser}
          defaultAvatar={defaultAvatar}
        />
      )}
    </div>
  );
}

export default PostCard;
