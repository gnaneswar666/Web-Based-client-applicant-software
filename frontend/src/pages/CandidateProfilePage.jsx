import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { FaEdit, FaSave, FaTimes } from 'react-icons/fa';
import '../styles/CandidateProfilePage.css';

const CandidateProfilePage = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: user?.name || '',
    email: user?.email || '',
    experience: '',
    skills: '',
    preferredRole: '',
    about: ''
  });
  const [savedProfile, setSavedProfile] = useState(null);

  useEffect(() => {
    // In a real app, you would fetch the saved profile from your backend here
    const fetchedProfile = localStorage.getItem('userProfile');
    if (fetchedProfile) {
      const parsedProfile = JSON.parse(fetchedProfile);
      setProfile(parsedProfile);
      setSavedProfile(parsedProfile);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you would save to your backend here
    localStorage.setItem('userProfile', JSON.stringify(profile));
    setSavedProfile(profile);
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setProfile(savedProfile);
    setIsEditing(false);
  };

  const ProfileDisplay = () => (
    <div className="profile-display">
      <div className="profile-header">
        <h1>Candidate Profile</h1>
        <button onClick={handleEdit} className="edit-button">
          <FaEdit /> Edit Profile
        </button>
      </div>
      
      <div className="profile-info">
        <div className="info-group">
          <h3>Full Name</h3>
          <p>{profile.name || 'Not specified'}</p>
        </div>

        <div className="info-group">
          <h3>Email</h3>
          <p>{profile.email || 'Not specified'}</p>
        </div>

        <div className="info-group">
          <h3>Years of Experience</h3>
          <p>{profile.experience || 'Not specified'}</p>
        </div>

        <div className="info-group">
          <h3>Skills</h3>
          <p>{profile.skills || 'Not specified'}</p>
        </div>

        <div className="info-group">
          <h3>Preferred Role</h3>
          <p>{profile.preferredRole || 'Not specified'}</p>
        </div>

        <div className="info-group">
          <h3>About</h3>
          <p>{profile.about || 'Not specified'}</p>
        </div>
      </div>
    </div>
  );

  const ProfileForm = () => (
    <form onSubmit={handleSubmit} className="profile-form">
      <div className="form-header">
        <h1>Edit Profile</h1>
        <button type="button" onClick={handleCancel} className="cancel-button">
          <FaTimes /> Cancel
        </button>
      </div>

      <div className="form-group">
        <label htmlFor="name">Full Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={profile.name}
          onChange={handleChange}
          placeholder="Enter your full name"
        />
      </div>

      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={profile.email}
          onChange={handleChange}
          placeholder="Enter your email"
        />
      </div>

      <div className="form-group">
        <label htmlFor="experience">Years of Experience</label>
        <input
          type="number"
          id="experience"
          name="experience"
          value={profile.experience}
          onChange={handleChange}
          placeholder="Years of experience"
        />
      </div>

      <div className="form-group">
        <label htmlFor="skills">Skills</label>
        <textarea
          id="skills"
          name="skills"
          value={profile.skills}
          onChange={handleChange}
          placeholder="Enter your skills (comma separated)"
        />
      </div>

      <div className="form-group">
        <label htmlFor="preferredRole">Preferred Role</label>
        <input
          type="text"
          id="preferredRole"
          name="preferredRole"
          value={profile.preferredRole}
          onChange={handleChange}
          placeholder="Enter your preferred role"
        />
      </div>

      <div className="form-group">
        <label htmlFor="about">About</label>
        <textarea
          id="about"
          name="about"
          value={profile.about}
          onChange={handleChange}
          placeholder="Tell us about yourself"
        />
      </div>

      <button type="submit" className="save-button">
        <FaSave /> Save Profile
      </button>
    </form>
  );

  return (
    <div className="profile-page">
      <div className="profile-container">
        {isEditing ? <ProfileForm /> : <ProfileDisplay />}
      </div>
    </div>
  );
};

export default CandidateProfilePage; 