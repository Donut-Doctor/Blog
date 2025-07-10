import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function RegisterPage() {
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (!form.username || !form.email || !form.password) {
      setError('All fields are required');
      return;
    }

    try {
      await axios.post('http://localhost:3008/api/auth/register', form);
      navigate('/login');
    } catch (err) {
      setError('Registration failed');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: 'auto', padding: '20px' }}>
      <h2 style={{ textAlign: 'center' }}>Register</h2>

      <input
        type="text"
        placeholder="Username"
        value={form.username}
        onChange={e => setForm({ ...form, username: e.target.value })}
        style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
      /><br />

      <input
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={e => setForm({ ...form, email: e.target.value })}
        style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
      /><br />

      <input
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={e => setForm({ ...form, password: e.target.value })}
        style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
      /><br />

      <button
        onClick={handleRegister}
        style={{
          width: '100%',
          padding: '10px',
          backgroundColor: '#28a745',
          color: 'white',
          border: 'none',
          cursor: 'pointer'
        }}
      >
        Register
      </button>

      {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
    </div>
  );
}

export default RegisterPage;
