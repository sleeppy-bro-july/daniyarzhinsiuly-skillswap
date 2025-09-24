import React from 'react';
import PostCard from './PostCard';
import './Profile.css';

function Profile({ user, posts, currentUser, theme, onUserClick, onEditProfile, onStartConversation, defaultAvatar }) {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatDateRange = (startDate, endDate) => {
    const start = new Date(startDate).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short'
    });
    const end = endDate ? new Date(endDate).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short'
    }) : 'Present';
    return `${start} - ${end}`;
  };

  const isCurrentUser = currentUser && user.id === currentUser.id;

  return (
    <div className={`profile ${theme}`}>
      <div className="profile-container">
        {/* Profile Header */}
        <div className="profile-header">
          <div className="profile-banner">
            <div className="banner-gradient"></div>
          </div>
          
          <div className="profile-info">
            <div className="profile-picture-container">
              <img 
                src={user.profilePicture || defaultAvatar} 
                alt={`${user.displayName}'s profile`}
                className="profile-picture"
              />
            </div>
            
            <div className="profile-details">
              <div className="profile-name-section">
                <h1 className="profile-display-name">{user.displayName}</h1>
                <p className="profile-username">@{user.username}</p>
                {isCurrentUser && (
                  <span className="profile-badge">You</span>
                )}
                {user.isBot && (
                  <span className="bot-badge">Bot</span>
                )}
              </div>
              
              <p className="profile-bio">{user.bio}</p>
              
              <div className="profile-stats">
                <div className="stat">
                  <span className="stat-number">{user.postsCount}</span>
                  <span className="stat-label">Posts</span>
                </div>
                <div className="stat">
                  <span className="stat-number">{user.followersCount}</span>
                  <span className="stat-label">Followers</span>
                </div>
                <div className="stat">
                  <span className="stat-number">{user.followingCount}</span>
                  <span className="stat-label">Following</span>
                </div>
              </div>
              
              <div className="profile-actions">
                {isCurrentUser ? (
                  <button className="edit-profile-btn" onClick={onEditProfile}>
                    Edit Profile
                  </button>
                ) : (
                  <button 
                    className="message-btn" 
                    onClick={() => onStartConversation(user)}
                  >
                    Message
                  </button>
                )}
              </div>
              
              <div className="profile-meta">
                <p className="join-date">Joined {formatDate(user.joinDate)}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Current Job Section */}
        {user.currentJob && user.currentJob.title && (
          <div className="profile-section">
            <h2 className="section-title">Current Position</h2>
            <div className="job-card">
              <div className="job-header">
                <h3 className="job-title">{user.currentJob.title}</h3>
                <p className="job-company">{user.currentJob.company}</p>
                <p className="job-location">{user.currentJob.location}</p>
                <p className="job-duration">{formatDateRange(user.currentJob.startDate, user.currentJob.endDate)}</p>
              </div>
              {user.currentJob.description && (
                <p className="job-description">{user.currentJob.description}</p>
              )}
            </div>
          </div>
        )}

        {/* Education Section */}
        {user.education && user.education.length > 0 && (
          <div className="profile-section">
            <h2 className="section-title">Education</h2>
            <div className="education-list">
              {user.education.map((edu, index) => (
                <div key={index} className="education-card">
                  <div className="education-header">
                    <h3 className="education-degree">{edu.degree}</h3>
                    <p className="education-field">{edu.field}</p>
                    <p className="education-school">{edu.school}</p>
                    <p className="education-duration">{formatDateRange(edu.startDate, edu.endDate)}</p>
                  </div>
                  {edu.description && (
                    <p className="education-description">{edu.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Experience Section */}
        {user.experience && user.experience.length > 0 && (
          <div className="profile-section">
            <h2 className="section-title">Experience</h2>
            <div className="experience-list">
              {user.experience.map((exp, index) => (
                <div key={index} className="experience-card">
                  <div className="experience-header">
                    <h3 className="experience-title">{exp.title}</h3>
                    <p className="experience-company">{exp.company}</p>
                    <p className="experience-location">{exp.location}</p>
                    <p className="experience-duration">{formatDateRange(exp.startDate, exp.endDate)}</p>
                  </div>
                  {exp.description && (
                    <p className="experience-description">{exp.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills Section */}
        {user.skills && user.skills.length > 0 && (
          <div className="profile-section">
            <h2 className="section-title">Skills & Expertise</h2>
            <div className="skills-container">
              {user.skills.map((skill, index) => (
                <span key={index} className="skill-tag">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Response Suggestions Section */}
        {user.responseSuggestions && user.responseSuggestions.length > 0 && (
          <div className="profile-section">
            <h2 className="section-title">Quick Response Suggestions</h2>
            <div className="suggestions-container">
              {user.responseSuggestions.map((suggestion, index) => (
                <div key={index} className="suggestion-item">
                  <span className="suggestion-text">"{suggestion}"</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Posts Section */}
        <div className="profile-section">
          <div className="section-header">
            <h2 className="section-title">Posts</h2>
            <span className="posts-count">{posts.length} posts</span>
          </div>
          
          {posts.length === 0 ? (
            <div className="empty-posts">
              <div className="empty-posts-icon">📝</div>
              <h3>No posts yet</h3>
              <p>
                {isCurrentUser 
                  ? "You haven't shared any posts yet. Create your first post to get started!"
                  : `${user.displayName} hasn't shared any posts yet.`
                }
              </p>
            </div>
          ) : (
            <div className="profile-posts">
              {posts.map(post => (
                <PostCard
                  key={post.id}
                  post={post}
                  updatePost={() => {}} // Profile view is read-only
                  deletePost={() => {}} // Profile view is read-only
                  likePost={() => {}} // Will be handled by parent
                  addComment={() => {}} // Will be handled by parent
                  theme={theme}
                  currentUser={currentUser}
                  isProfileView={true}
                  defaultAvatar={defaultAvatar}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
