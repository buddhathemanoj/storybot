

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const [showVerifyModal, setShowVerifyModal] = useState(false);
  const [otp, setOTP] = useState('');
  const [verificationResponse, setVerificationResponse] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/api/Auth/register', { name, email, password })
      .then((res) => {
        // Handle registration success
        console.log(res.data);
        setShowVerifyModal(true);
      })
      .catch((err) => {
        // Handle registration error
      });
  };
  const handleVerifyOTP = () => {
    axios.post('http://localhost:5000/api/Auth/verifyotp', { email, otp })
      .then((res) => {
        // Handle OTP verification response
        console.log(res.data);
        setVerificationResponse(res.data.message);
        setShowVerifyModal(false);
        navigate('/login');
      })
      .catch((err) => {
        // Handle OTP verification error
        console.error('Error while verifying OTP:', err);
        setVerificationResponse('Error verifying OTP. Please try again.');
      });
  };

  return (
<div style={{ backgroundColor: '#242424', justifyContent: 'center', margin: '0 auto', height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <form style={{ backgroundColor: '#242424', maxWidth: '400px', padding: '20px', width: '100%' }} onSubmit={handleSubmit}>
        {/* Name input */}
        <input
          style={{ backgroundColor: '#446e60', marginBottom: '10px', borderColor: 'transparent' }}
          className="form-control"
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

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
        <button style={{ backgroundColor: 'green', color: '#fff', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer', width: '100%' }} type="submit">Register</button>
      </form>
      {showVerifyModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0, 0, 0, 0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ background: '#fff', padding: '20px', borderRadius: '5px', maxWidth: '300px' }}>
            <h3>OTP Verification</h3>
            <input
              style={{ marginBottom: '10px' }}
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOTP(e.target.value)}
            />
            <button style={{ background: 'green', color: '#fff', border: 'none', padding: '8px 15px', borderRadius: '5px', cursor: 'pointer' }} onClick={handleVerifyOTP}>Verify</button>
          </div>
        </div>
      )}

      {/* Verification Response */}
      {verificationResponse && (
        <div style={{ marginTop: '20px' }}>{verificationResponse}</div>
      )}
    </div>
  );
};

export default Register;
