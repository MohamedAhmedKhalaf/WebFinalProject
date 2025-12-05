import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { validateEmail, validatePassword, validateRequired } from '../utils/validation';
import './Auth.css';

const Signup = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    role: 'Patient',
    firstname: '',
    lastname: '',
    specialty: '',
    brithdate: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const { signup } = useAuth();
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};

    if (!validateRequired(formData.email)) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!validateRequired(formData.password)) {
      newErrors.password = 'Password is required';
    } else if (!validatePassword(formData.password)) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!validateRequired(formData.firstname)) {
      newErrors.firstname = 'First name is required';
    }

    if (!validateRequired(formData.lastname)) {
      newErrors.lastname = 'Last name is required';
    }

    if (formData.role === 'Doctor' && !validateRequired(formData.specialty)) {
      newErrors.specialty = 'Specialty is required for doctors';
    }

    if (formData.role === 'Patient' && !validateRequired(formData.brithdate)) {
      newErrors.brithdate = 'Birth date is required for patients';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    if (!validate()) return;

    setLoading(true);
    const result = await signup({
      email: formData.email,
      password: formData.password,
      role: formData.role,
      firstname: formData.firstname,
      lastname: formData.lastname,
      specialty: formData.role === 'Doctor' ? formData.specialty : null,
      brithdate: formData.role === 'Patient' ? formData.brithdate : null,
    });
    setLoading(false);

    if (result.success) {
      setMessage('Account created successfully! Redirecting to login...');
      setTimeout(() => navigate('/login'), 2000);
    } else {
      setMessage(result.message || 'Signup failed. Please try again.');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card signup-card">
        <div className="auth-header">
          <h1 className="auth-title">Create Account</h1>
          <p className="auth-subtitle">Join our healthcare platform</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {message && (
            <div className={`alert ${message.includes('success') ? 'alert-success' : 'alert-error'}`}>
              {message}
            </div>
          )}

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="firstname" className="form-label">
                First Name
              </label>
              <input
                type="text"
                id="firstname"
                name="firstname"
                value={formData.firstname}
                onChange={handleChange}
                className={`form-input ${errors.firstname ? 'error' : ''}`}
                placeholder="First name"
              />
              {errors.firstname && <span className="error-message">{errors.firstname}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="lastname" className="form-label">
                Last Name
              </label>
              <input
                type="text"
                id="lastname"
                name="lastname"
                value={formData.lastname}
                onChange={handleChange}
                className={`form-input ${errors.lastname ? 'error' : ''}`}
                placeholder="Last name"
              />
              {errors.lastname && <span className="error-message">{errors.lastname}</span>}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`form-input ${errors.email ? 'error' : ''}`}
              placeholder="Enter your email"
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="role" className="form-label">
              Register As
            </label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="form-input"
            >
              <option value="Patient">Patient</option>
              <option value="Doctor">Doctor</option>
            </select>
          </div>

          {formData.role === 'Doctor' && (
            <div className="form-group">
              <label htmlFor="specialty" className="form-label">
                Specialty
              </label>
              <input
                type="text"
                id="specialty"
                name="specialty"
                value={formData.specialty}
                onChange={handleChange}
                className={`form-input ${errors.specialty ? 'error' : ''}`}
                placeholder="e.g., Cardiology, Pediatrics"
              />
              {errors.specialty && <span className="error-message">{errors.specialty}</span>}
            </div>
          )}

          {formData.role === 'Patient' && (
            <div className="form-group">
              <label htmlFor="brithdate" className="form-label">
                Birth Date
              </label>
              <input
                type="date"
                id="brithdate"
                name="brithdate"
                value={formData.brithdate}
                onChange={handleChange}
                className={`form-input ${errors.brithdate ? 'error' : ''}`}
              />
              {errors.brithdate && <span className="error-message">{errors.brithdate}</span>}
            </div>
          )}

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`form-input ${errors.password ? 'error' : ''}`}
                placeholder="Enter password"
              />
              {errors.password && <span className="error-message">{errors.password}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword" className="form-label">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`form-input ${errors.confirmPassword ? 'error' : ''}`}
                placeholder="Confirm password"
              />
              {errors.confirmPassword && (
                <span className="error-message">{errors.confirmPassword}</span>
              )}
            </div>
          </div>

          <button type="submit" className="btn btn-primary btn-full" disabled={loading}>
            {loading ? 'Creating account...' : 'Create Account'}
          </button>
        </form>

        <div className="auth-footer">
          <p>
            Already have an account?{' '}
            <Link to="/login" className="auth-link">
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
