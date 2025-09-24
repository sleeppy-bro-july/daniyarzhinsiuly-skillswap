import React, { useState } from 'react';
import './Registration.css';

function Registration({ onRegister, onLogin, theme, defaultAvatar }) {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    bio: '',
    skills: [],
    currentJob: {
      title: '',
      company: '',
      location: ''
    },
    education: {
      school: '',
      degree: '',
      field: ''
    }
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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

  const handleNestedInputChange = (section, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleSkillsChange = (e) => {
    const skillsArray = e.target.value.split(',').map(skill => skill.trim()).filter(skill => skill);
    setFormData(prev => ({
      ...prev,
      skills: skillsArray
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    // Username validation
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    } else if (formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    } else if (!/^[a-zA-Z0-9_]+$/.test(formData.username)) {
      newErrors.username = 'Username can only contain letters, numbers, and underscores';
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    // Confirm password validation
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    // Full name validation
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
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
      const newUser = {
        id: Date.now(),
        username: formData.username,
        displayName: formData.fullName,
        email: formData.email,
        bio: formData.bio || 'New to SkillSwap! Excited to connect and share knowledge.',
        profilePicture: defaultAvatar,
        joinDate: new Date().toISOString(),
        skills: formData.skills,
        postsCount: 0,
        followersCount: 0,
        followingCount: 0,
        currentJob: formData.currentJob.title ? formData.currentJob : null,
        education: formData.education.school ? [formData.education] : [],
        experience: [],
        responseSuggestions: [
          "Great post! I'd love to learn more about this.",
          "This is really helpful, thanks for sharing!",
          "I have experience with this too. Happy to connect!",
          "Interesting perspective! What do you think about...",
          "Thanks for the insights! This is exactly what I needed."
        ]
      };

      onRegister(newUser);
      setIsLoading(false);
    }, 1500);
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

    onRegister(socialUser);
  };

  return (
    <div className={`registration-container ${theme}`}>
      <div className="registration-card">
        <div className="registration-header">
          <h1 className="registration-title">Join SkillSwap</h1>
          <p className="registration-subtitle">
            Connect with professionals, share knowledge, and grow your network
          </p>
        </div>

        {/* Social Login Options */}
        <div className="social-login-section">
          <h3 className="section-title">Quick Sign Up</h3>
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

        {/* Registration Form */}
        <form onSubmit={handleSubmit} className="registration-form">
          <div className="form-section">
            <h3 className="section-title">Create Your Account</h3>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="username">Username *</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  className={errors.username ? 'error' : ''}
                  placeholder="Choose a unique username"
                />
                {errors.username && <span className="error-message">{errors.username}</span>}
              </div>
              
              <div className="form-group">
                <label htmlFor="fullName">Full Name *</label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className={errors.fullName ? 'error' : ''}
                  placeholder="Your full name"
                />
                {errors.fullName && <span className="error-message">{errors.fullName}</span>}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address *</label>
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

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="password">Password *</label>
                <div className="password-input">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className={errors.password ? 'error' : ''}
                    placeholder="Create a strong password"
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

              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password *</label>
                <div className="password-input">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className={errors.confirmPassword ? 'error' : ''}
                    placeholder="Confirm your password"
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? '👁️' : '👁️‍🗨️'}
                  </button>
                </div>
                {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
              </div>
            </div>
          </div>

          <div className="form-section">
            <h3 className="section-title">Professional Information</h3>
            
            <div className="form-group">
              <label htmlFor="bio">Bio</label>
              <textarea
                id="bio"
                name="bio"
                value={formData.bio}
                onChange={handleInputChange}
                placeholder="Tell us about yourself and your professional interests..."
                rows="3"
              />
            </div>

            <div className="form-group">
              <label htmlFor="skills">Skills (comma-separated)</label>
              <input
                type="text"
                id="skills"
                value={formData.skills.join(', ')}
                onChange={handleSkillsChange}
                placeholder="React, JavaScript, Design, Marketing..."
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="jobTitle">Current Job Title</label>
                <input
                  type="text"
                  id="jobTitle"
                  value={formData.currentJob.title}
                  onChange={(e) => handleNestedInputChange('currentJob', 'title', e.target.value)}
                  placeholder="Software Engineer"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="company">Company</label>
                <input
                  type="text"
                  id="company"
                  value={formData.currentJob.company}
                  onChange={(e) => handleNestedInputChange('currentJob', 'company', e.target.value)}
                  placeholder="Tech Corp"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="location">Location</label>
              <input
                type="text"
                id="location"
                value={formData.currentJob.location}
                onChange={(e) => handleNestedInputChange('currentJob', 'location', e.target.value)}
                placeholder="San Francisco, CA"
              />
            </div>
          </div>

          <div className="form-section">
            <h3 className="section-title">Education</h3>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="school">School/University</label>
                <input
                  type="text"
                  id="school"
                  value={formData.education.school}
                  onChange={(e) => handleNestedInputChange('education', 'school', e.target.value)}
                  placeholder="Stanford University"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="degree">Degree</label>
                <input
                  type="text"
                  id="degree"
                  value={formData.education.degree}
                  onChange={(e) => handleNestedInputChange('education', 'degree', e.target.value)}
                  placeholder="Bachelor of Science"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="field">Field of Study</label>
              <input
                type="text"
                id="field"
                value={formData.education.field}
                onChange={(e) => handleNestedInputChange('education', 'field', e.target.value)}
                placeholder="Computer Science"
              />
            </div>
          </div>

          <div className="form-actions">
            <button 
              type="submit" 
              className="register-btn"
              disabled={isLoading}
            >
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </button>
            
            <p className="login-link">
              Already have an account? 
              <button 
                type="button" 
                className="link-btn"
                onClick={onLogin}
              >
                Sign in
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Registration;
