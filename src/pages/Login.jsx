import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5002/api/Auth/login', { email, password })
      .then((res) => {
        // Handle login success
        console.log(res.data);
        navigate('/storybot');

      })
      .catch((err) => {
        // Handle login error
        console.error(err);
      });
  };

  return (
    <div style={{ backgroundColor: '#242424', justifyContent: 'center', margin: '0 auto', height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <form style={{ backgroundColor: '#242424', maxWidth: '400px', padding: '20px', width: '100%' }} onSubmit={handleSubmit}>
        {/* Email input */}
        <input
          style={{ backgroundColor: '#446e60', marginBottom: '10px', borderColor: 'transparent' }}
          className="form-control"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Password input */}
        <input
          style={{ backgroundColor: '#446e60', marginBottom: '10px', borderColor: 'transparent' }}
          className="form-control"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Submit button */}
        <button style={{ backgroundColor: 'green', color: '#fff', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer', width: '100%' }} type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
