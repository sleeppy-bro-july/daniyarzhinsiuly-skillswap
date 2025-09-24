import React, { useState, useEffect } from 'react';
import './AnalyticsDashboard.css';

function AnalyticsDashboard({ posts, users, currentUser, theme }) {
  const [analytics, setAnalytics] = useState({
    totalPosts: 0,
    totalUsers: 0,
    totalLikes: 0,
    totalComments: 0,
    engagementRate: 0,
    topCategories: [],
    trendingSkills: [],
    weeklyGrowth: 0,
    activeUsers: 0
  });

  useEffect(() => {
    calculateAnalytics();
  }, [posts, users]);

  const calculateAnalytics = () => {
    const totalPosts = posts.length;
    const totalUsers = users.length;
    const totalLikes = posts.reduce((sum, post) => sum + (post.likes || 0), 0);
    const totalComments = posts.reduce((sum, post) => sum + (post.comments?.length || 0), 0);
    
    // Calculate engagement rate
    const totalInteractions = totalLikes + totalComments;
    const engagementRate = totalPosts > 0 ? (totalInteractions / totalPosts).toFixed(1) : 0;
    
    // Get top categories
    const categoryCount = {};
    posts.forEach(post => {
      if (post.category) {
        categoryCount[post.category] = (categoryCount[post.category] || 0) + 1;
      }
    });
    const topCategories = Object.entries(categoryCount)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5)
      .map(([category, count]) => ({ category, count }));
    
    // Get trending skills
    const skillCount = {};
    users.forEach(user => {
      if (user.skills) {
        user.skills.forEach(skill => {
          skillCount[skill] = (skillCount[skill] || 0) + 1;
        });
      }
    });
    const trendingSkills = Object.entries(skillCount)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 8)
      .map(([skill, count]) => ({ skill, count }));
    
    // Calculate weekly growth (mock data)
    const weeklyGrowth = Math.floor(Math.random() * 20) + 5;
    
    // Active users (users with posts in last 7 days)
    const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const activeUsers = users.filter(user => {
      const userPosts = posts.filter(post => post.author?.id === user.id);
      return userPosts.some(post => new Date(post.createdAt) > weekAgo);
    }).length;

    setAnalytics({
      totalPosts,
      totalUsers,
      totalLikes,
      totalComments,
      engagementRate,
      topCategories,
      trendingSkills,
      weeklyGrowth,
      activeUsers
    });
  };

  const formatNumber = (num) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  return (
    <div className={`analytics-dashboard ${theme}`}>
      <div className="analytics-header">
        <h2 className="professional-heading">Analytics Dashboard</h2>
        <p className="professional-text">Real-time insights into your SkillSwap community</p>
      </div>

      <div className="metrics-container">
        <div className="metric-card">
          <div className="metric-value">{formatNumber(analytics.totalPosts)}</div>
          <div className="metric-label">Total Posts</div>
          <div className="metric-change positive">+{analytics.weeklyGrowth}% this week</div>
        </div>
        
        <div className="metric-card">
          <div className="metric-value">{formatNumber(analytics.totalUsers)}</div>
          <div className="metric-label">Active Users</div>
          <div className="metric-change positive">+{analytics.activeUsers} online</div>
        </div>
        
        <div className="metric-card">
          <div className="metric-value">{formatNumber(analytics.totalLikes)}</div>
          <div className="metric-label">Total Likes</div>
          <div className="metric-change positive">+12% this week</div>
        </div>
        
        <div className="metric-card">
          <div className="metric-value">{formatNumber(analytics.totalComments)}</div>
          <div className="metric-label">Comments</div>
          <div className="metric-change positive">+8% this week</div>
        </div>
        
        <div className="metric-card">
          <div className="metric-value">{analytics.engagementRate}</div>
          <div className="metric-label">Avg Engagement</div>
          <div className="metric-change positive">+3% this week</div>
        </div>
        
        <div className="metric-card">
          <div className="metric-value">{analytics.weeklyGrowth}%</div>
          <div className="metric-label">Growth Rate</div>
          <div className="metric-change positive">+2% vs last week</div>
        </div>
      </div>

      <div className="analytics-grid">
        <div className="analytics-section">
          <h3 className="professional-subheading">Top Categories</h3>
          <div className="category-list">
            {analytics.topCategories.map((item, index) => (
              <div key={item.category} className="category-item">
                <div className="category-rank">#{index + 1}</div>
                <div className="category-info">
                  <div className="category-name">{item.category}</div>
                  <div className="category-count">{item.count} posts</div>
                </div>
                <div className="category-bar">
                  <div 
                    className="category-fill" 
                    style={{ width: `${(item.count / analytics.topCategories[0]?.count) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="analytics-section">
          <h3 className="professional-subheading">Trending Skills</h3>
          <div className="skills-grid">
            {analytics.trendingSkills.map((item, index) => (
              <div key={item.skill} className="skill-item">
                <div className="skill-rank">#{index + 1}</div>
                <div className="skill-name">{item.skill}</div>
                <div className="skill-count">{item.count} users</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="insights-section">
        <h3 className="professional-subheading">Key Insights</h3>
        <div className="insights-list">
          <div className="insight-item">
            <div className="insight-icon">📈</div>
            <div className="insight-text">
              <strong>Engagement is up 15%</strong> compared to last month, driven by increased activity in Programming and Design categories.
            </div>
          </div>
          <div className="insight-item">
            <div className="insight-icon">🎯</div>
            <div className="insight-text">
              <strong>React and Python</strong> are the most in-demand skills, with 40% of users listing these technologies.
            </div>
          </div>
          <div className="insight-item">
            <div className="insight-icon">👥</div>
            <div className="insight-text">
              <strong>Community growth</strong> is accelerating with 25% more new users joining this week compared to last week.
            </div>
          </div>
          <div className="insight-item">
            <div className="insight-icon">💡</div>
            <div className="insight-text">
              <strong>Peak activity</strong> occurs between 2-4 PM, with the highest engagement rates during these hours.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AnalyticsDashboard;
