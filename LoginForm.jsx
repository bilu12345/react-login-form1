import React, { useState } from 'react';
import './login.css';

export default function LoginForm({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const validateEmail = (v) => /\S+@\S+\.\S+/.test(v);
  const validatePassword = (v) => v.length >= 6;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    if (!validatePassword(password)) {
      setError('Password must be at least 6 characters.');
      return;
    }
    setLoading(true);
    try {
      await new Promise((r) => setTimeout(r, 900));
      if (email === 'user@example.com' && password === 'password') {
        onLogin?.({ email });
      } else {
        setError('Invalid email or password.');
      }
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="login-form" onSubmit={handleSubmit} noValidate>
      <h2>Sign in</h2>
      {error && <div className="error">{error}</div>}
      <label>Email
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" required />
      </label>
      <label>Password
        <div className="pw-row">
          <input type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter password" required minLength={6} />
          <button type="button" className="toggle" onClick={() => setShowPassword((s) => !s)}>{showPassword ? 'Hide' : 'Show'}</button>
        </div>
      </label>
      <button className="submit" type="submit" disabled={loading}>{loading ? 'Signing in...' : 'Sign in'}</button>
      <div className="hint">Demo credentials: <strong>user@example.com</strong> / <strong>password</strong></div>
    </form>
  );
}