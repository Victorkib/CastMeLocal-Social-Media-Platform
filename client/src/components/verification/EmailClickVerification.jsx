// src/components/Verification.js
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { apiUrl } from '../../utils/api';

const EmailClickVerification = () => {
  const { userId, token } = useParams();
  console.log(userId);
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await axios.get(
          `${apiUrl}/api/socials/users/verify/${userId}/${token}`
        );
        setStatus(response.data.status);
        setMessage(response.data.message);

        if (response.data.status === 'success') {
          // Redirect to home page after successful verification

          navigate('/');
        }
      } catch (error) {
        setStatus('error');
        setMessage('Verification failed. Please try again.');
      }
    };

    verifyEmail();
  }, [userId, token, navigate]);

  return (
    <div>
      <h1>Email Verification</h1>
      <p>{message}</p>
      {status === 'error' && (
        <button onClick={() => navigate('/register')}>Try Again</button>
      )}
    </div>
  );
};

export default EmailClickVerification;
