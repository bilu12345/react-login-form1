import React, { useState } from 'react';
import LoginForm from './components/LoginForm';
import './login.css';

export default function App() {
  const [user, setUser] = useState(null);

  return (
    <div className="page">
      {!user ? (
        <LoginForm onLogin={(u) => setUser(u)} />
      ) : (
        <div className="welcome">
          <h2>Welcome, {user.email} 🎉</h2>
          <p>You are logged in.</p>
          <button onClick={() => setUser(null)}>Log out</button>
        </div>
      )}
    </div>
  );
}