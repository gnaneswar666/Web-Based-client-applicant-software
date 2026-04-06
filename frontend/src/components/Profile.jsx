import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Briefcase, Award, Link, Edit2, Save, X } from 'lucide-react';
import BackButton from './BackButton';
import axios from 'axios';
import '../styles/Profile.css';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState({ text: '', type: '' });
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    experience: '',
    skills: [],
    preferredRole: '',
    about: '',
    education: '',
    certifications: [],
    linkedin: '',
    github: '',
    portfolio: ''
  });

  // Load profile data when component mounts
  useEffect(() => {
    const loadProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.error('No token found');
          return;
        }

        const response = await axios.get('http://localhost:5002/api/users/profile', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (response.data) {
          setProfile({
            name: response.data.name || '',
            email: response.data.email || '',
            experience: response.data.experience || '',
            skills: Array.isArray(response.data.skills) ? response.data.skills : [],
            preferredRole: response.data.preferredRole || '',
            about: response.data.about || '',
            education: response.data.education || '',
            certifications: Array.isArray(response.data.certifications) ? response.data.certifications : [],
            linkedin: response.data.linkedin || '',
            github: response.data.github || '',
            portfolio: response.data.portfolio || ''
          });
        }
      } catch (error) {
        console.error('Error loading profile:', error);
        setSaveMessage({
          text: 'Failed to load profile data',
          type: 'error'
        });
      }
    };

    loadProfile();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveMessage({ text: '', type: '' });

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await axios.put(
        'http://localhost:5002/api/users/updateProfile',
        profile,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data) {
        setSaveMessage({
          text: 'Profile updated successfully!',
          type: 'success'
        });
        setIsEditing(false);
        
        // Update local storage with new profile data
        localStorage.setItem('userProfile', JSON.stringify(response.data));
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      setSaveMessage({
        text: error.response?.data?.message || 'Failed to update profile',
        type: 'error'
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    // Reload profile data from server
    const loadProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return;

        const response = await axios.get('http://localhost:5002/api/users/profile', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (response.data) {
          setProfile({
            name: response.data.name || '',
            email: response.data.email || '',
            experience: response.data.experience || '',
            skills: Array.isArray(response.data.skills) ? response.data.skills : [],
            preferredRole: response.data.preferredRole || '',
            about: response.data.about || '',
            education: response.data.education || '',
            certifications: Array.isArray(response.data.certifications) ? response.data.certifications : [],
            linkedin: response.data.linkedin || '',
            github: response.data.github || '',
            portfolio: response.data.portfolio || ''
          });
        }
      } catch (error) {
        console.error('Error reloading profile:', error);
      }
    };

    loadProfile();
    setIsEditing(false);
    setSaveMessage({ text: '', type: '' });
  };

  const renderField = (label, icon, value, component) => (
    <div className="space-y-2">
      <label className="label-text flex items-center gap-2">
        {icon} {label}
      </label>
      {isEditing ? component : (
        <div className="input-field bg-gray-50">
          {value || `No ${label.toLowerCase()} provided`}
        </div>
      )}
    </div>
  );

  return (
    <div className="profile-container">
      <BackButton />
      <motion.div 
        className="profile-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="profile-header">
          <div className="flex justify-between items-center">
            <div>
              <h1>Professional Profile</h1>
              <p>Shape your professional identity</p>
            </div>
          </div>
        </div>

        {saveMessage.text && (
          <div className={`status-message ${saveMessage.type === 'success' ? 'status-success' : 'status-error'}`}>
            {saveMessage.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="p-8 space-y-8">
          {/* Personal Information */}
          <motion.div 
            className="profile-section"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h3 className="section-title">
              <User className="w-6 h-6 text-indigo-600" />
              Personal Information
            </h3>
            <div className="grid-container">
              {renderField('Full Name', <User className="w-5 h-5" />, profile.name,
                <input
                  type="text"
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  placeholder="Enter full name"
                  className="input-field"
                />
              )}
              <div>
                <label className="label-text">Email Address</label>
                <input
                  type="email"
                  value={profile.email}
                  readOnly
                  className="input-field bg-gray-50"
                />
              </div>
            </div>
          </motion.div>

          {/* Professional Details */}
          <motion.div 
            className="profile-section"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="section-title">
              <Briefcase className="w-6 h-6 text-indigo-600" />
              Professional Details
            </h3>
            <div className="space-y-6">
              {renderField('Experience', <Briefcase className="w-5 h-5" />, profile.experience,
                <input
                  type="text"
                  value={profile.experience}
                  onChange={(e) => setProfile({ ...profile, experience: e.target.value })}
                  placeholder="e.g., 5 years"
                  className="input-field"
                />
              )}
            </div>
          </motion.div>

          {/* Skills and Bio */}
          <motion.div 
            className="profile-section"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h3 className="section-title">
              <Award className="w-6 h-6 text-indigo-600" />
              Skills & Biography
            </h3>
            <div className="space-y-6">
              {renderField('Skills', <Award className="w-5 h-5" />, Array.isArray(profile.skills) ? profile.skills.join(', ') : '',
                <input
                  type="text"
                  value={Array.isArray(profile.skills) ? profile.skills.join(', ') : ''}
                  onChange={(e) => setProfile({ ...profile, skills: e.target.value.split(',').map(skill => skill.trim()) })}
                  placeholder="JavaScript, React, Node.js"
                  className="input-field"
                />
              )}
              {renderField('Professional Bio', <Mail className="w-5 h-5" />, profile.about,
                <textarea
                  rows="4"
                  value={profile.about}
                  onChange={(e) => setProfile({ ...profile, about: e.target.value })}
                  placeholder="Write a brief professional bio"
                  className="input-field"
                />
              )}
            </div>
          </motion.div>

          {/* Social Links */}
          <motion.div 
            className="profile-section"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h3 className="section-title">
              <Link className="w-6 h-6 text-indigo-600" />
              Social Links
            </h3>
            <div className="space-y-6">
              {renderField('GitHub', <Link className="w-5 h-5" />, profile.github,
                <input
                  type="url"
                  value={profile.github}
                  onChange={(e) => setProfile({ ...profile, github: e.target.value })}
                  placeholder="https://github.com/yourusername"
                  className="input-field"
                />
              )}
              {renderField('LinkedIn', <Link className="w-5 h-5" />, profile.linkedin,
                <input
                  type="url"
                  value={profile.linkedin}
                  onChange={(e) => setProfile({ ...profile, linkedin: e.target.value })}
                  placeholder="https://linkedin.com/in/yourusername"
                  className="input-field"
                />
              )}
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div 
            className="flex justify-end space-x-4 pt-6 border-t border-gray-100"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            {!isEditing ? (
              <motion.button
                type="button"
                onClick={() => setIsEditing(true)}
                className="action-button primary-button"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Edit2 className="w-5 h-5" />
                Edit Profile
              </motion.button>
            ) : (
              <>
                <motion.button
                  type="button"
                  onClick={handleCancel}
                  className="action-button secondary-button"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <X className="w-5 h-5" />
                  Cancel
                </motion.button>
                <motion.button
                  type="submit"
                  disabled={isSaving}
                  className={`action-button primary-button ${isSaving ? 'loading' : ''}`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isSaving ? (
                    <>
                      <div className="loading-spinner" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="w-5 h-5" />
                      Save Changes
                    </>
                  )}
                </motion.button>
              </>
            )}
          </motion.div>
        </form>
      </motion.div>
    </div>
  );
};

export default Profile;
