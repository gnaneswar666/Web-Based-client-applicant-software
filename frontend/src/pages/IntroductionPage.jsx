import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/IntroductionPage.css';

const IntroductionPage = () => {
  return (
    <div className="intro-page">
      <section className="hero">
        <h1>Welcome to Interview Prep Pro</h1>
        <p>Master your interview skills with AI-powered practice sessions</p>
        <div className="cta-buttons">
          <Link to="/register" className="cta-button primary">Get Started</Link>
          <Link to="/login" className="cta-button secondary">Sign In</Link>
        </div>
      </section>

      <section className="features">
        <h2>Why Choose Us?</h2>
        <div className="feature-grid">
          <div className="feature-card">
            <h3>AI-Powered Practice</h3>
            <p>Get realistic interview experience with our advanced AI interviewer</p>
          </div>
          <div className="feature-card">
            <h3>Instant Feedback</h3>
            <p>Receive detailed feedback and suggestions to improve your responses</p>
          </div>
          <div className="feature-card">
            <h3>Custom Questions</h3>
            <p>Practice with questions tailored to your industry and experience level</p>
          </div>
          <div className="feature-card">
            <h3>Progress Tracking</h3>
            <p>Monitor your improvement with detailed performance analytics</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default IntroductionPage; 