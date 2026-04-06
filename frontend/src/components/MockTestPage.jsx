import React from 'react';
import '../styles/LearnMore.css';
import { useNavigate } from 'react-router-dom';

const MockTestPage = () => {
  const navigate = useNavigate();
  const [showScrollTop, setShowScrollTop] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      if (window.pageYOffset > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className="learn-more-page">
      <button className="back-button" onClick={() => navigate(-1)}>
        ←
      </button>
      <button 
        className={`scroll-top-button ${showScrollTop ? 'visible' : ''}`} 
        onClick={scrollToTop}
      >
        ↑
      </button>
      <div className="hero-section">
        <h1 className="animated-text">Ace Your Technical Interviews</h1>
        <p className="animated-text">Master the art of technical interviews with our comprehensive platform</p>
      </div>

      <div className="features-section">
        <h2 className="section-title animated-text">Platform Features</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🎯</div>
            <h3 className="animated-text">Smart Interview Simulation</h3>
            <p>Experience realistic interview scenarios with our AI-powered simulation system</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">⏱️</div>
            <h3 className="animated-text">Time Management</h3>
            <p>Practice with our intelligent timer system that adapts to different question types</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3 className="animated-text">Performance Analytics</h3>
            <p>Track your progress with detailed performance metrics and improvement suggestions</p>
          </div>
        </div>
      </div>

      <div className="interview-types-section">
        <h2 className="section-title animated-text">Interview Categories</h2>
        <div className="types-grid">
          <div className="type-card">
            <h3 className="animated-text">Technical Interviews</h3>
            <ul>
              <li onClick={() => navigate('/technical-interview')}>Technical Interview Categories</li>
            </ul>
          </div>

          <div className="type-card">
            <h3 className="animated-text">Behavioral Interviews</h3>
            <ul>
              <li onClick={() => navigate('/behavioral-interview')}>Behavioral Interview Categories</li>
            </ul>
          </div>

          <div className="type-card">
            <h3 className="animated-text">Domain Specific</h3>
            <ul>
              <li onClick={() => navigate('/domain-interview')}>Domain-specific Interview Categories</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="preparation-tips">
        <h2 className="section-title animated-text">Interview Preparation Tips</h2>
        <div className="tips-grid">
          <div className="tip-card">
            <h3 className="animated-text">Before Interview</h3>
            <ul>
              <li>Research the company thoroughly</li>
              <li>Review core concepts</li>
              <li>Practice mock interviews</li>
              <li>Prepare relevant questions</li>
            </ul>
          </div>

          <div className="tip-card">
            <h3 className="animated-text">During Interview</h3>
            <ul>
              <li>Listen carefully to questions</li>
              <li>Think before responding</li>
              <li>Communicate your thought process</li>
              <li>Ask clarifying questions</li>
            </ul>
          </div>

          <div className="tip-card">
            <h3 className="animated-text">After Interview</h3>
            <ul>
              <li>Send a thank-you note</li>
              <li>Review your performance</li>
              <li>Note areas for improvement</li>
              <li>Follow up appropriately</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MockTestPage;