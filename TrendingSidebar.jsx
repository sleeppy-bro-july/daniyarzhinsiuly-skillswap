import React, { useState, useEffect } from 'react';
import './TrendingSidebar.css';

function TrendingSidebar({ posts, users, theme }) {
  const [trendingData, setTrendingData] = useState({
    trendingTopics: [],
    popularUsers: [],
    recentActivity: [],
    skillTrends: []
  });

  useEffect(() => {
    calculateTrendingData();
  }, [posts, users]);

  const calculateTrendingData = () => {
    // Calculate trending topics from post categories
    const topicCount = {};
    posts.forEach(post => {
      if (post.category) {
        topicCount[post.category] = (topicCount[post.category] || 0) + 1;
      }
    });
    
    const trendingTopics = Object.entries(topicCount)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 10)
      .map(([topic, count]) => ({ topic, count }));

    // Calculate popular users based on post count and likes
    const userStats = {};
    posts.forEach(post => {
      if (post.author) {
        const userId = post.author.id;
        if (!userStats[userId]) {
          userStats[userId] = {
            user: post.author,
            posts: 0,
            totalLikes: 0
          };
        }
        userStats[userId].posts += 1;
        userStats[userId].totalLikes += post.likes || 0;
      }
    });

    const popularUsers = Object.values(userStats)
      .sort((a, b) => (b.posts * 2 + b.totalLikes) - (a.posts * 2 + a.totalLikes))
      .slice(0, 5)
      .map(item => item.user);

    // Recent activity (mock data)
    const recentActivity = [
      { type: 'post', user: 'Alex Developer', action: 'shared a new post about React', time: '2m ago' },
      { type: 'like', user: 'Sarah Designer', action: 'liked your post about Design Systems', time: '5m ago' },
      { type: 'comment', user: 'Mike Analyst', action: 'commented on Data Visualization post', time: '8m ago' },
      { type: 'follow', user: 'Emma Developer', action: 'started following you', time: '12m ago' },
      { type: 'post', user: 'John Designer', action: 'shared a new post about UI/UX', time: '15m ago' }
    ];

    // Skill trends
    const skillCount = {};
    users.forEach(user => {
      if (user.skills) {
        user.skills.forEach(skill => {
          skillCount[skill] = (skillCount[skill] || 0) + 1;
        });
      }
    });

    const skillTrends = Object.entries(skillCount)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 8)
      .map(([skill, count]) => ({ skill, count }));

    setTrendingData({
      trendingTopics,
      popularUsers,
      recentActivity,
      skillTrends
    });
  };

  const getTrendIcon = (index) => {
    if (index === 0) return '🔥';
    if (index === 1) return '⚡';
    if (index === 2) return '💫';
    return '📈';
  };

  const getActivityIcon = (type) => {
    switch (type) {
      case 'post': return '📝';
      case 'like': return '❤️';
      case 'comment': return '💬';
      case 'follow': return '👥';
      default: return '📊';
    }
  };

  return (
    <div className={`trending-sidebar ${theme}`}>
      {/* Trending Topics */}
      <div className="trending-section">
        <div className="section-header">
          <h3 className="section-title">🔥 Trending Topics</h3>
          <span className="section-subtitle">What's hot right now</span>
        </div>
        <div className="trending-list">
          {trendingData.trendingTopics.map((item, index) => (
            <div key={item.topic} className="trending-item">
              <div className="trending-rank">
                <span className="trend-icon">{getTrendIcon(index)}</span>
                <span className="trend-number">#{index + 1}</span>
              </div>
              <div className="trending-content">
                <div className="trending-topic">{item.topic}</div>
                <div className="trending-count">{item.count} posts</div>
              </div>
              <div className="trending-bar">
                <div 
                  className="trending-fill" 
                  style={{ width: `${(item.count / trendingData.trendingTopics[0]?.count) * 100}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Popular Users */}
      <div className="trending-section">
        <div className="section-header">
          <h3 className="section-title">⭐ Top Contributors</h3>
          <span className="section-subtitle">Most active users</span>
        </div>
        <div className="users-list">
          {trendingData.popularUsers.map((user, index) => (
            <div key={user.id} className="user-item">
              <div className="user-rank">#{index + 1}</div>
              <div className="user-avatar">
                <img 
                  src={user.profilePicture || 'https://via.placeholder.com/40/667eea/ffffff?text=?'} 
                  alt={user.displayName}
                  className="avatar-img"
                />
              </div>
              <div className="user-info">
                <div className="user-name">{user.displayName}</div>
                <div className="user-username">@{user.username}</div>
              </div>
              <div className="user-stats">
                <div className="user-posts">{user.postsCount || 0} posts</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="trending-section">
        <div className="section-header">
          <h3 className="section-title">📊 Recent Activity</h3>
          <span className="section-subtitle">Latest community updates</span>
        </div>
        <div className="activity-list">
          {trendingData.recentActivity.map((activity, index) => (
            <div key={index} className="activity-item">
              <div className="activity-icon">{getActivityIcon(activity.type)}</div>
              <div className="activity-content">
                <div className="activity-text">
                  <strong>{activity.user}</strong> {activity.action}
                </div>
                <div className="activity-time">{activity.time}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Skill Trends */}
      <div className="trending-section">
        <div className="section-header">
          <h3 className="section-title">🚀 Rising Skills</h3>
          <span className="section-subtitle">Skills gaining popularity</span>
        </div>
        <div className="skills-list">
          {trendingData.skillTrends.map((item, index) => (
            <div key={item.skill} className="skill-trend-item">
              <div className="skill-trend-rank">#{index + 1}</div>
              <div className="skill-trend-name">{item.skill}</div>
              <div className="skill-trend-count">{item.count} users</div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="trending-section">
        <div className="section-header">
          <h3 className="section-title">⚡ Quick Actions</h3>
        </div>
        <div className="quick-actions">
          <button className="quick-action-btn">
            <span className="action-icon">📝</span>
            <span className="action-text">Create Post</span>
          </button>
          <button className="quick-action-btn">
            <span className="action-icon">🔍</span>
            <span className="action-text">Find Mentors</span>
          </button>
          <button className="quick-action-btn">
            <span className="action-icon">📚</span>
            <span className="action-text">Browse Skills</span>
          </button>
          <button className="quick-action-btn">
            <span className="action-icon">💼</span>
            <span className="action-text">Job Board</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default TrendingSidebar;
