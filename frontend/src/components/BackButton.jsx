import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/BackButton.css';

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <button 
      className="back-button" 
      onClick={() => navigate(-1)}
      aria-label="Go back"
    >
      ←
    </button>
  );
};

export default BackButton; 