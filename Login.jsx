import React, { useState } from 'react';
import './Login.css';

function Login({ onLogin, onRegister, theme, defaultAvatar }) {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      // For demo purposes, we'll just use the first demo user
      const demoUser = {
        id: 1,
        username: 'alex_dev',
        displayName: 'Alex Developer',
        email: 'alex@example.com',
        bio: 'Full-stack developer passionate about React and Node.js. Building the future of web applications.',
        profilePicture: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
        joinDate: '2023-01-15',
        skills: ['React', 'Node.js', 'Python', 'JavaScript', 'TypeScript', 'MongoDB'],
        postsCount: 12,
        followersCount: 234,
        followingCount: 89,
        currentJob: {
          title: 'Senior Full-Stack Developer',
          company: 'TechCorp Inc.',
          location: 'San Francisco, CA',
          startDate: '2022-03-01',
          description: 'Leading development of scalable web applications using React and Node.js'
        },
        education: [
          {
            school: 'Stanford University',
            degree: 'Bachelor of Science in Computer Science',
            field: 'Computer Science',
            startDate: '2018-09-01',
            endDate: '2022-06-01',
            description: 'Graduated Magna Cum Laude'
          }
        ],
        experience: [
          {
            title: 'Senior Full-Stack Developer',
            company: 'TechCorp Inc.',
            location: 'San Francisco, CA',
            startDate: '2022-03-01',
            endDate: null,
            description: 'Leading development of scalable web applications'
          }
        ],
        responseSuggestions: [
          "Great post! I'd love to learn more about this.",
          "This is really helpful, thanks for sharing!",
          "I have experience with this too. Happy to connect!",
          "Interesting perspective! What do you think about...",
          "Thanks for the insights! This is exactly what I needed."
        ]
      };

      onLogin(demoUser);
      setIsLoading(false);
    }, 1000);
  };

  const handleSocialLogin = (platform) => {
    // Simulate social login
    const socialUser = {
      id: Date.now(),
      username: `user_${Date.now()}`,
      displayName: `Social User`,
      email: `user@${platform}.com`,
      bio: `Joined via ${platform}`,
      profilePicture: defaultAvatar,
      joinDate: new Date().toISOString(),
      skills: ['Social Media', 'Networking'],
      postsCount: 0,
      followersCount: 0,
      followingCount: 0,
      currentJob: null,
      education: [],
      experience: [],
      responseSuggestions: [
        "Great post! I'd love to learn more about this.",
        "This is really helpful, thanks for sharing!",
        "I have experience with this too. Happy to connect!",
        "Interesting perspective! What do you think about...",
        "Thanks for the insights! This is exactly what I needed."
      ]
    };

    onLogin(socialUser);
  };

  return (
    <div className={`login-container ${theme}`}>
      <div className="login-card">
        <div className="login-header">
          <h1 className="login-title">Welcome Back</h1>
          <p className="login-subtitle">
            Sign in to continue your professional journey
          </p>
        </div>

        {/* Social Login Options */}
        <div className="social-login-section">
          <div className="social-buttons">
            <button 
              className="social-btn google-btn"
              onClick={() => handleSocialLogin('Google')}
            >
              <span className="social-icon">🔍</span>
              Continue with Google
            </button>
            <button 
              className="social-btn linkedin-btn"
              onClick={() => handleSocialLogin('LinkedIn')}
            >
              <span className="social-icon">💼</span>
              Continue with LinkedIn
            </button>
            <button 
              className="social-btn github-btn"
              onClick={() => handleSocialLogin('GitHub')}
            >
              <span className="social-icon">⚡</span>
              Continue with GitHub
            </button>
          </div>
          
          <div className="divider">
            <span>or</span>
          </div>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={errors.email ? 'error' : ''}
              placeholder="your.email@example.com"
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="password-input">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className={errors.password ? 'error' : ''}
                placeholder="Enter your password"
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? '👁️' : '👁️‍🗨️'}
              </button>
            </div>
            {errors.password && <span className="error-message">{errors.password}</span>}
          </div>

          <div className="form-options">
            <label className="remember-me">
              <input type="checkbox" />
              <span>Remember me</span>
            </label>
            <button type="button" className="forgot-password">
              Forgot password?
            </button>
          </div>

          <button 
            type="submit" 
            className="login-btn"
            disabled={isLoading}
          >
            {isLoading ? 'Signing In...' : 'Sign In'}
          </button>
          
          <p className="register-link">
            Don't have an account? 
            <button 
              type="button" 
              className="link-btn"
              onClick={onRegister}
            >
              Sign up
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
