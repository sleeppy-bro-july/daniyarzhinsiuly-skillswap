import React, { useState, useEffect } from 'react';
import './CreatePostModal.css';

function CreatePostModal({ isOpen, onClose, onSubmit, theme, currentUser, defaultAvatar }) {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: '',
    skillLevel: 'beginner'
  });
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
    }
  }, [isOpen]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.title.trim() && formData.content.trim()) {
      onSubmit(formData);
      setFormData({
        title: '',
        content: '',
        category: '',
        skillLevel: 'beginner'
      });
      handleClose();
    }
  };

  const handleClose = () => {
    setIsAnimating(false);
    setTimeout(() => {
      setFormData({
        title: '',
        content: '',
        category: '',
        skillLevel: 'beginner'
      });
      onClose();
    }, 200);
  };

  if (!isOpen) return null;

  return (
    <div className={`modal-overlay modern-modal-overlay ${isAnimating ? 'show' : ''}`} onClick={handleClose}>
      <div 
        className={`modal-content modern-modal-content ${theme} ${isAnimating ? 'show' : ''}`} 
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modern Header */}
        <div className="modal-header modern-modal-header">
          <div className="modal-author modern-author">
            <div className="author-avatar-container">
              <img 
                src={currentUser?.profilePicture || defaultAvatar} 
                alt="Your profile"
                className="modal-author-avatar modern-avatar"
              />
              <div className="avatar-status"></div>
            </div>
            <div className="modal-author-info modern-author-info">
              <div className="modal-author-name modern-author-name">{currentUser?.displayName || 'You'}</div>
              <div className="modal-author-username modern-author-username">@{currentUser?.username || 'user'}</div>
            </div>
          </div>
          <button className="close-btn modern-close-btn" onClick={handleClose}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
        
        {/* Modern Form */}
        <form onSubmit={handleSubmit} className="modal-form modern-form">
          <div className="form-group modern-form-group">
            <label htmlFor="title" className="modern-label">
              <span className="label-text">Title</span>
              <span className="label-required">*</span>
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="What's on your mind?"
              className="modern-input"
              required
            />
          </div>
          
          <div className="form-row">
            <div className="form-group modern-form-group">
              <label htmlFor="category" className="modern-label">
                <span className="label-text">Category</span>
              </label>
              <input
                type="text"
                id="category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                placeholder="e.g., Programming, Design"
                className="modern-input"
              />
            </div>
            
            <div className="form-group modern-form-group">
              <label htmlFor="skillLevel" className="modern-label">
                <span className="label-text">Skill Level</span>
              </label>
              <select
                id="skillLevel"
                name="skillLevel"
                value={formData.skillLevel}
                onChange={handleInputChange}
                className="modern-select"
              >
                <option value="beginner">🌱 Beginner</option>
                <option value="intermediate">🚀 Intermediate</option>
                <option value="advanced">⚡ Advanced</option>
                <option value="expert">🏆 Expert</option>
              </select>
            </div>
          </div>
          
          <div className="form-group modern-form-group">
            <label htmlFor="content" className="modern-label">
              <span className="label-text">Content</span>
              <span className="label-required">*</span>
            </label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleInputChange}
              placeholder="Share your knowledge, ask questions, or connect with others..."
              rows="6"
              className="modern-textarea"
              required
            />
            <div className="character-count">
              {formData.content.length}/500
            </div>
          </div>
          
          {/* Modern Actions */}
          <div className="form-actions modern-actions">
            <button type="button" onClick={handleClose} className="cancel-btn modern-cancel-btn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Cancel
            </button>
            <button type="submit" className="submit-btn modern-submit-btn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Create Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreatePostModal;
