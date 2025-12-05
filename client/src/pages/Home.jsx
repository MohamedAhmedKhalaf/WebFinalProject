import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Home.css';

const Home = () => {
  const { isAuthenticated, user } = useAuth();

  const getDashboardLink = () => {
    if (!user) return '/login';

    switch (user.role) {
      case 'Patient':
        return '/patient/dashboard';
      case 'Doctor':
        return '/doctor/dashboard';
      case 'Admin':
        return '/admin/dashboard';
      default:
        return '/login';
    }
  };

  return (
    <div className="home">
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">
            Welcome to <span className="hero-highlight">HealthCare Clinic</span>
          </h1>
          <p className="hero-subtitle">
            Your health is our priority. Book appointments, manage medical records, and connect
            with healthcare professionals all in one place.
          </p>
          <div className="hero-actions">
            {isAuthenticated ? (
              <Link to={getDashboardLink()} className="btn btn-primary btn-large">
                Go to Dashboard
              </Link>
            ) : (
              <>
                <Link to="/signup" className="btn btn-primary btn-large">
                  Get Started
                </Link>
                <Link to="/login" className="btn btn-outline btn-large">
                  Sign In
                </Link>
              </>
            )}
          </div>
        </div>
      </section>

      <section className="features">
        <h2 className="section-title">Why Choose Us?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">📅</div>
            <h3 className="feature-title">Easy Appointment Booking</h3>
            <p className="feature-description">
              Book appointments with your preferred doctors in just a few clicks. No more phone
              calls or waiting.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">👨‍⚕️</div>
            <h3 className="feature-title">Experienced Doctors</h3>
            <p className="feature-description">
              Access to a wide network of qualified and experienced healthcare professionals
              across various specialties.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">📋</div>
            <h3 className="feature-title">Digital Medical Records</h3>
            <p className="feature-description">
              All your medical records in one secure place, accessible anytime, anywhere.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🔔</div>
            <h3 className="feature-title">Smart Reminders</h3>
            <p className="feature-description">
              Get automated reminders for your upcoming appointments so you never miss one.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🔒</div>
            <h3 className="feature-title">Secure & Private</h3>
            <p className="feature-description">
              Your data is protected with industry-standard security measures and encryption.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">⚡</div>
            <h3 className="feature-title">Real-time Updates</h3>
            <p className="feature-description">
              Get instant notifications about appointment confirmations, cancellations, and
              updates.
            </p>
          </div>
        </div>
      </section>

      <section className="cta">
        <div className="cta-content">
          <h2 className="cta-title">Ready to Get Started?</h2>
          <p className="cta-subtitle">Join thousands of satisfied patients managing their health online.</p>
          {!isAuthenticated && (
            <Link to="/signup" className="btn btn-white btn-large">
              Create Your Account
            </Link>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
