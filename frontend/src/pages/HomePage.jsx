import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/HomePage.css';
import { useAuth } from '../context/AuthContext';

const HomePage = () => {
  const { user } = useAuth();
  const features = [
    {
      title: 'Realistic Mock Interviews',
      description: 'Practice with a vast library of questions and scenarios tailored to your desired role and industry.',
      icon: '🎯'
    },
    {
      title: 'Performance Analytics',
      description: 'Go beyond scores. Get detailed insights on your speech, body language, and communication style.',
      icon: '📊'
    },
    {
      title: 'Instant, Actionable Feedback',
      description: 'Receive immediate, constructive feedback from our advanced AI to pinpoint areas for improvement.',
      icon: '🤖'
    }
  ];

  const testimonials = [
    { name: 'John Doe', role: 'Software Engineer', company: 'Google', rating: 5, text: "PrepUp's AI feedback on my filler words and pacing was a game-changer. I went into my final rounds feeling incredibly confident." },
    { name: 'Jane Smith', role: 'Product Manager', company: 'Microsoft', rating: 5, text: "The variety of questions in the Question Bank helped me prepare for every possible scenario. I highly recommend PrepUp." },
    { name: 'Mike Johnson', role: 'Data Scientist', company: 'Amazon', rating: 5, text: "As a product manager, communication is key. The performance analytics helped me refine my delivery and land a top offer." }
  ];

  return (
    <div className="home-page">
      {/* Navigation */}
      {!user && (
      <nav className="main-nav">
        <div className="nav-container">
          <div className="nav-logo">
              <h1>PrepUp</h1>
          </div>
          <div className="nav-links">
            <Link to="/job-seekers">Job Seekers</Link>
            <Link to="/training">Training</Link>
          </div>
          <div className="nav-actions">
            <Link to="/login" className="login-btn">Sign In</Link>
           
          </div>
        </div>
      </nav>
      )}

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-container">
          <h1 className="hero-title">
            Propel Your Career. <span className="highlight">Ace Your Next Interview.</span>
          </h1>
          <p className="hero-subtitle">
            PrepUp provides AI-powered mock interviews and personalized feedback to help you build confidence and master your interviewing skills.
          </p>
          <div className="hero-buttons">
            <Link to="/learn-more" className="secondary-btn" style={{ backgroundColor: 'red' }}>
              Start Practicing Today
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="section-container">
          <h2 className="section-title">
            The Ultimate Toolkit for Interview Success
          </h2>
          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon">{feature.icon}</div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <div className="section-container">
          <h2 className="section-title">What Our Users Say</h2>
          <div className="testimonials-grid">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="testimonial-card">
                <div className="testimonial-rating">
                  {'★'.repeat(testimonial.rating)}
                </div>
                <p className="testimonial-text">
                  "{testimonial.text}"
                </p>
                <div className="testimonial-author">
                  <h4>{testimonial.name}</h4>
                  <p>{testimonial.role} at {testimonial.company}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="main-footer">
        <div className="footer-container">
          <div className="footer-links">
            <div className="footer-column">
              <h3>Company</h3>
              <Link to="/blog">Blog</Link>
              <Link to="/contact">Contact Us</Link>
              <Link to="/faqs">FAQs</Link>
            </div>
            <div className="footer-column">
              <h3>Legal</h3>
              <Link to="/terms">Terms</Link>
              <Link to="/privacy">Privacy</Link>
              <Link to="/support">Support</Link>
            </div>
            <div className="footer-column">
              <h3>Connect</h3>
              <Link to="/facebook">Facebook</Link>
              <Link to="/instagram">Instagram</Link>
              <Link to="/linkedin">LinkedIn</Link>
            </div>
          </div>
          <div className="footer-bottom">
            <p>© 2024 PrepUp. All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;