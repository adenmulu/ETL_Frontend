import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../api'; // Assuming you have an API utility for login
import '../styles.css';

const Login = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [loginError, setLoginError] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [showFailure, setShowFailure] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoginError('');
    setShowSuccess(false); // Reset success message state
    setShowFailure(false); // Reset failure message state
    try {
      const response = await login(credentials); // Call your login API
      localStorage.setItem('token', response.data.token); // Store token in localStorage
      localStorage.setItem('role', response.data.role); // Store role in localStorage
      localStorage.setItem('userName', credentials.username); // Store username in localStorage
      setShowSuccess(true); // Show success message immediately
      setTimeout(() => {
        navigate('/dashboard'); // Redirect to dashboard after showing success message
      }, 1500); // Redirect after 1.5 seconds
    } catch (error) {
      setLoginError('Login failed. Please check your credentials.'); // Handle login error
      setShowFailure(true); // Show failure message immediately
    }
  };

  return (
    <div className="login-container">
      <video autoPlay loop muted className="video-background">
        <source src="/bk.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="login-form-container">
        <div className="login-form">
          <form onSubmit={handleSubmit}>
            <h2>Login</h2>
            <div className="form-group">
              <label>Username</label>
              <input
                type="text"
                name="username"
                value={credentials.username}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                value={credentials.password}
                onChange={handleChange}
                required
              />
            </div>
            {loginError && !showFailure && <p style={{ color: 'red', textAlign: 'center' }}>{loginError}</p>}
            {showSuccess && (
              <div className="popup success">
                <p style={{ color: 'green' }}>Login successful! Redirecting...</p>
              </div>
            )}
            {showFailure && (
              <div className="popup failure">
                <p style={{ color: 'red' }}>Login failed. Please check your credentials.</p>
              </div>
            )}
            <button type="submit">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
