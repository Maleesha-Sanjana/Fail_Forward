import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

function LandingPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <h1 className="hero-title">
            Turn Failures Into Fuel
          </h1>
          <p className="hero-subtitle">
            Join a community where mistakes are celebrated, lessons are shared, 
            and every failure becomes a stepping stone to success.
          </p>
          <div className="hero-cta">
            <Link to="/login" className="btn btn-primary">
              Get Started
            </Link>
            <Link to="/login" className="btn btn-secondary" style={{color: 'white', borderColor: 'white'}}>
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="p-4">
        <div className="container">
          <div className="grid grid-3" style={{marginTop: '60px', marginBottom: '60px'}}>
            <div className="card text-center">
              <div style={{fontSize: '48px', marginBottom: '16px'}}>💡</div>
              <h3 className="card-title">Share Your Failures</h3>
              <p className="card-subtitle">
                Document your mistakes and challenges. Every failure is a learning opportunity.
              </p>
            </div>
            
            <div className="card text-center">
              <div style={{fontSize: '48px', marginBottom: '16px'}}>🔧</div>
              <h3 className="card-title">Find Solutions</h3>
              <p className="card-subtitle">
                Get help from the community. Learn from others who've faced similar challenges.
              </p>
            </div>
            
            <div className="card text-center">
              <div style={{fontSize: '48px', marginBottom: '16px'}}>🚀</div>
              <h3 className="card-title">Build Your Future</h3>
              <p className="card-subtitle">
                Set goals, track progress, and turn your lessons into future success.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="p-4" style={{backgroundColor: 'white'}}>
        <div className="container">
          <h2 className="text-center mb-4" style={{fontSize: '32px', fontWeight: '700'}}>
            How FailForward Works
          </h2>
          <div className="grid grid-2" style={{gap: '40px', alignItems: 'center'}}>
            <div>
              <h3 style={{fontSize: '24px', marginBottom: '16px'}}>1. Post Your Failure</h3>
              <p style={{fontSize: '16px', lineHeight: '1.6', color: 'var(--linkedin-text-secondary)'}}>
                Share what went wrong, what you tried, and what you learned. 
                Be honest about your mistakes - it helps everyone grow.
              </p>
            </div>
            <div style={{textAlign: 'center'}}>
              <div style={{fontSize: '120px'}}>📝</div>
            </div>
          </div>
          
          <div className="grid grid-2" style={{gap: '40px', alignItems: 'center', marginTop: '40px'}}>
            <div style={{textAlign: 'center'}}>
              <div style={{fontSize: '120px'}}>🤝</div>
            </div>
            <div>
              <h3 style={{fontSize: '24px', marginBottom: '16px'}}>2. Get Community Help</h3>
              <p style={{fontSize: '16px', lineHeight: '1.6', color: 'var(--linkedin-text-secondary)'}}>
                Others share their solutions, experiences, and advice. 
                Vote on the best fixes and learn from the community.
              </p>
            </div>
          </div>
          
          <div className="grid grid-2" style={{gap: '40px', alignItems: 'center', marginTop: '40px'}}>
            <div>
              <h3 style={{fontSize: '24px', marginBottom: '16px'}}>3. Build Your Future</h3>
              <p style={{fontSize: '16px', lineHeight: '1.6', color: 'var(--linkedin-text-secondary)'}}>
                Use your lessons to set future goals. Track your growth and 
                inspire others with your journey from failure to success.
              </p>
            </div>
            <div style={{textAlign: 'center'}}>
              <div style={{fontSize: '120px'}}>🎯</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="hero-section">
        <div className="container">
          <h2 style={{fontSize: '36px', marginBottom: '16px'}}>
            Ready to Transform Your Failures?
          </h2>
          <p style={{fontSize: '18px', marginBottom: '32px', opacity: '0.9'}}>
            Join thousands of learners who are turning their mistakes into their greatest strengths.
          </p>
          <Link to="/login" className="btn btn-primary" style={{fontSize: '18px', padding: '12px 24px'}}>
            Start Your Journey
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer style={{backgroundColor: 'var(--linkedin-text-primary)', color: 'white', padding: '40px 0', textAlign: 'center'}}>
        <div className="container">
          <h3 style={{fontSize: '24px', marginBottom: '16px'}}>FailForward</h3>
          <p style={{marginBottom: '16px', opacity: '0.8'}}>
            Turn failures into fuel. Build your future, one lesson at a time.
          </p>
          <div style={{display: 'flex', justifyContent: 'center', gap: '24px', flexWrap: 'wrap'}}>
            <a href="#" style={{color: 'white', textDecoration: 'none'}}>About</a>
            <a href="#" style={{color: 'white', textDecoration: 'none'}}>Contact</a>
            <a href="#" style={{color: 'white', textDecoration: 'none'}}>Privacy</a>
            <a href="#" style={{color: 'white', textDecoration: 'none'}}>Terms</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
