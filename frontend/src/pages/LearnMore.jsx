import React from 'react';
import '../styles/LearnMore.css';

function LearnMore() {
  return (
    <div className="learn-more-page">
      <div className="hero-section">
        <h1>Master Your Interview Skills</h1>
        <p>Your comprehensive platform for interview preparation and skill enhancement</p>
      </div>

      <div className="features-section">
        <h2>Key Features</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">💻</div>
            <h3>Technical Interview Simulation</h3>
            <p>Practice with real coding challenges and technical questions across different programming languages. Get instant feedback and improve your problem-solving skills.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🤝</div>
            <h3>Behavioral Interview Practice</h3>
            <p>Master common behavioral questions with our curated collection of scenarios. Learn to structure your responses using the STAR method.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🎯</div>
            <h3>Domain-Specific Questions</h3>
            <p>Prepare for industry-specific interviews with our specialized question bank covering various domains and roles.</p>
          </div>
        </div>
      </div>

      <div className="how-it-works">
        <h2>How It Works</h2>
        <div className="steps-grid">
          <div className="step-card">
            <div className="step-number">1</div>
            <h3>Choose Your Interview Type</h3>
            <p>Select from technical, behavioral, or domain-specific interview simulations.</p>
          </div>

          <div className="step-card">
            <div className="step-number">2</div>
            <h3>Practice with Real Questions</h3>
            <p>Access our extensive question bank and practice with timed responses.</p>
          </div>

          <div className="step-card">
            <div className="step-number">3</div>
            <h3>Get Instant Feedback</h3>
            <p>Receive detailed feedback on your performance and areas for improvement.</p>
          </div>
        </div>
      </div>

      <div className="benefits-section">
        <h2>Benefits</h2>
        <div className="benefits-grid">
          <div className="benefit-card">
            <h3>Comprehensive Practice</h3>
            <p>Access a wide range of questions covering technical, behavioral, and domain-specific topics.</p>
          </div>

          <div className="benefit-card">
            <h3>Real-time Feedback</h3>
            <p>Get immediate insights on your performance and specific areas for improvement.</p>
          </div>

          <div className="benefit-card">
            <h3>Structured Learning</h3>
            <p>Follow a systematic approach to interview preparation with our guided practice sessions.</p>
          </div>

          <div className="benefit-card">
            <h3>Track Progress</h3>
            <p>Monitor your improvement over time with detailed performance analytics.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LearnMore;