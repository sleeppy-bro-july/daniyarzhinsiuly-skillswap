import React, { useState } from 'react';
import './ProfileEditModal.css';

function ProfileEditModal({ isOpen, onClose, onSubmit, theme, currentUser, defaultAvatar }) {
  const [formData, setFormData] = useState({
    displayName: currentUser?.displayName || '',
    username: currentUser?.username || '',
    bio: currentUser?.bio || '',
    email: currentUser?.email || '',
    profilePicture: currentUser?.profilePicture || defaultAvatar,
    skills: currentUser?.skills || [],
    currentJob: currentUser?.currentJob || {
      title: '',
      company: '',
      location: '',
      startDate: '',
      description: ''
    },
    education: currentUser?.education || [],
    experience: currentUser?.experience || [],
    responseSuggestions: currentUser?.responseSuggestions || []
  });

  const [newSkill, setNewSkill] = useState('');
  const [newEducation, setNewEducation] = useState({
    school: '',
    degree: '',
    field: '',
    startDate: '',
    endDate: '',
    description: ''
  });
  const [newExperience, setNewExperience] = useState({
    title: '',
    company: '',
    location: '',
    startDate: '',
    endDate: '',
    description: ''
  });
  const [newResponseSuggestion, setNewResponseSuggestion] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleJobChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      currentJob: {
        ...prev.currentJob,
        [name]: value
      }
    }));
  };

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData(prev => ({
          ...prev,
          profilePicture: e.target.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const addSkill = () => {
    if (newSkill.trim() && !formData.skills.includes(newSkill.trim())) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()]
      }));
      setNewSkill('');
    }
  };

  const removeSkill = (skillToRemove) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }));
  };

  const addEducation = () => {
    if (newEducation.school.trim() && newEducation.degree.trim()) {
      setFormData(prev => ({
        ...prev,
        education: [...prev.education, { ...newEducation }]
      }));
      setNewEducation({
        school: '',
        degree: '',
        field: '',
        startDate: '',
        endDate: '',
        description: ''
      });
    }
  };

  const removeEducation = (index) => {
    setFormData(prev => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== index)
    }));
  };

  const addExperience = () => {
    if (newExperience.title.trim() && newExperience.company.trim()) {
      setFormData(prev => ({
        ...prev,
        experience: [...prev.experience, { ...newExperience }]
      }));
      setNewExperience({
        title: '',
        company: '',
        location: '',
        startDate: '',
        endDate: '',
        description: ''
      });
    }
  };

  const removeExperience = (index) => {
    setFormData(prev => ({
      ...prev,
      experience: prev.experience.filter((_, i) => i !== index)
    }));
  };

  const addResponseSuggestion = () => {
    if (newResponseSuggestion.trim() && !formData.responseSuggestions.includes(newResponseSuggestion.trim())) {
      setFormData(prev => ({
        ...prev,
        responseSuggestions: [...prev.responseSuggestions, newResponseSuggestion.trim()]
      }));
      setNewResponseSuggestion('');
    }
  };

  const removeResponseSuggestion = (suggestionToRemove) => {
    setFormData(prev => ({
      ...prev,
      responseSuggestions: prev.responseSuggestions.filter(suggestion => suggestion !== suggestionToRemove)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedUser = {
      ...currentUser,
      ...formData,
      id: currentUser.id
    };
    onSubmit(updatedUser);
    onClose();
  };

  const handleClose = () => {
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className={`profile-edit-modal ${theme}`} onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Edit Profile</h2>
          <button className="close-btn" onClick={handleClose}>
            ×
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="modal-form">
          {/* Profile Picture */}
          <div className="form-section">
            <h3>Profile Picture</h3>
            <div className="profile-picture-upload">
              <img 
                src={formData.profilePicture} 
                alt="Profile preview"
                className="profile-preview"
              />
              <input
                type="file"
                accept="image/*"
                onChange={handleProfilePictureChange}
                className="file-input"
                id="profile-picture"
              />
              <label htmlFor="profile-picture" className="upload-btn">
                Change Photo
              </label>
            </div>
          </div>

          {/* Basic Info */}
          <div className="form-section">
            <h3>Basic Information</h3>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="displayName">Display Name *</label>
                <input
                  type="text"
                  id="displayName"
                  name="displayName"
                  value={formData.displayName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="username">Username *</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="bio">Bio</label>
              <textarea
                id="bio"
                name="bio"
                value={formData.bio}
                onChange={handleInputChange}
                rows="3"
                placeholder="Tell us about yourself..."
              />
            </div>
          </div>

          {/* Current Job */}
          <div className="form-section">
            <h3>Current Job</h3>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="jobTitle">Job Title</label>
                <input
                  type="text"
                  id="jobTitle"
                  name="title"
                  value={formData.currentJob.title}
                  onChange={handleJobChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="company">Company</label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.currentJob.company}
                  onChange={handleJobChange}
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="location">Location</label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.currentJob.location}
                  onChange={handleJobChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="startDate">Start Date</label>
                <input
                  type="date"
                  id="startDate"
                  name="startDate"
                  value={formData.currentJob.startDate}
                  onChange={handleJobChange}
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="jobDescription">Job Description</label>
              <textarea
                id="jobDescription"
                name="description"
                value={formData.currentJob.description}
                onChange={handleJobChange}
                rows="2"
              />
            </div>
          </div>

          {/* Skills */}
          <div className="form-section">
            <h3>Skills</h3>
            <div className="skills-container">
              {formData.skills.map((skill, index) => (
                <span key={index} className="skill-tag">
                  {skill}
                  <button type="button" onClick={() => removeSkill(skill)} className="remove-skill">
                    ×
                  </button>
                </span>
              ))}
            </div>
            <div className="add-skill">
              <input
                type="text"
                placeholder="Add a skill"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
              />
              <button type="button" onClick={addSkill}>Add</button>
            </div>
          </div>

          {/* Education */}
          <div className="form-section">
            <h3>Education</h3>
            {formData.education.map((edu, index) => (
              <div key={index} className="education-item">
                <div className="education-header">
                  <h4>{edu.degree} in {edu.field}</h4>
                  <button type="button" onClick={() => removeEducation(index)} className="remove-btn">
                    Remove
                  </button>
                </div>
                <p>{edu.school} • {edu.startDate} - {edu.endDate}</p>
                {edu.description && <p className="description">{edu.description}</p>}
              </div>
            ))}
            <div className="add-education">
              <div className="form-row">
                <div className="form-group">
                  <label>School</label>
                  <input
                    type="text"
                    value={newEducation.school}
                    onChange={(e) => setNewEducation(prev => ({ ...prev, school: e.target.value }))}
                  />
                </div>
                <div className="form-group">
                  <label>Degree</label>
                  <input
                    type="text"
                    value={newEducation.degree}
                    onChange={(e) => setNewEducation(prev => ({ ...prev, degree: e.target.value }))}
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Field of Study</label>
                  <input
                    type="text"
                    value={newEducation.field}
                    onChange={(e) => setNewEducation(prev => ({ ...prev, field: e.target.value }))}
                  />
                </div>
                <div className="form-group">
                  <label>Start Date</label>
                  <input
                    type="date"
                    value={newEducation.startDate}
                    onChange={(e) => setNewEducation(prev => ({ ...prev, startDate: e.target.value }))}
                  />
                </div>
                <div className="form-group">
                  <label>End Date</label>
                  <input
                    type="date"
                    value={newEducation.endDate}
                    onChange={(e) => setNewEducation(prev => ({ ...prev, endDate: e.target.value }))}
                  />
                </div>
              </div>
              <button type="button" onClick={addEducation}>Add Education</button>
            </div>
          </div>

          {/* Experience */}
          <div className="form-section">
            <h3>Experience</h3>
            {formData.experience.map((exp, index) => (
              <div key={index} className="experience-item">
                <div className="experience-header">
                  <h4>{exp.title}</h4>
                  <button type="button" onClick={() => removeExperience(index)} className="remove-btn">
                    Remove
                  </button>
                </div>
                <p>{exp.company} • {exp.location} • {exp.startDate} - {exp.endDate || 'Present'}</p>
                {exp.description && <p className="description">{exp.description}</p>}
              </div>
            ))}
            <div className="add-experience">
              <div className="form-row">
                <div className="form-group">
                  <label>Job Title</label>
                  <input
                    type="text"
                    value={newExperience.title}
                    onChange={(e) => setNewExperience(prev => ({ ...prev, title: e.target.value }))}
                  />
                </div>
                <div className="form-group">
                  <label>Company</label>
                  <input
                    type="text"
                    value={newExperience.company}
                    onChange={(e) => setNewExperience(prev => ({ ...prev, company: e.target.value }))}
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Location</label>
                  <input
                    type="text"
                    value={newExperience.location}
                    onChange={(e) => setNewExperience(prev => ({ ...prev, location: e.target.value }))}
                  />
                </div>
                <div className="form-group">
                  <label>Start Date</label>
                  <input
                    type="date"
                    value={newExperience.startDate}
                    onChange={(e) => setNewExperience(prev => ({ ...prev, startDate: e.target.value }))}
                  />
                </div>
                <div className="form-group">
                  <label>End Date</label>
                  <input
                    type="date"
                    value={newExperience.endDate}
                    onChange={(e) => setNewExperience(prev => ({ ...prev, endDate: e.target.value }))}
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea
                  value={newExperience.description}
                  onChange={(e) => setNewExperience(prev => ({ ...prev, description: e.target.value }))}
                  rows="2"
                />
              </div>
              <button type="button" onClick={addExperience}>Add Experience</button>
            </div>
          </div>

          {/* Response Suggestions */}
          <div className="form-section">
            <h3>Response Suggestions</h3>
            <p className="section-description">Quick response suggestions for comments and messages</p>
            <div className="suggestions-container">
              {formData.responseSuggestions.map((suggestion, index) => (
                <div key={index} className="suggestion-item">
                  <span>{suggestion}</span>
                  <button type="button" onClick={() => removeResponseSuggestion(suggestion)} className="remove-suggestion">
                    ×
                  </button>
                </div>
              ))}
            </div>
            <div className="add-suggestion">
              <input
                type="text"
                placeholder="Add a response suggestion"
                value={newResponseSuggestion}
                onChange={(e) => setNewResponseSuggestion(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addResponseSuggestion())}
              />
              <button type="button" onClick={addResponseSuggestion}>Add</button>
            </div>
          </div>

          <div className="form-actions">
            <button type="button" onClick={handleClose} className="cancel-btn">
              Cancel
            </button>
            <button type="submit" className="submit-btn">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProfileEditModal;
