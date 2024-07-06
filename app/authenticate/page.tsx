"use client";

import { useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import axios, { AxiosError } from 'axios';

const Authenticate = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const isProcessing = useRef(false); // Use ref to track processing state

  useEffect(() => {
    if (token && !isProcessing.current) {
      isProcessing.current = true; // Set ref to true to prevent multiple requests
      const authenticateToken = async () => {
        try {
          const response = await axios.post('/api/authenticate', { token });
          // Handle successful authentication
          console.log('User authenticated:', response.data);
          router.push('/dashboard'); // Redirect to a protected page
        } catch (error) {
          if (axios.isAxiosError(error)) {
            if (error.response) {
              // The request was made and the server responded with a status code
              // that falls out of the range of 2xx
              console.error('Error response:', error.response.data);
              console.error('Error status:', error.response.status);
              console.error('Error headers:', error.response.headers);
            } else if (error.request) {
              // The request was made but no response was received
              console.error('Error request:', error.request);
            } else {
              // Something happened in setting up the request that triggered an Error
              console.error('Error message:', error.message);
            }
          } else {
            console.error('Unexpected error:', error);
          }
        } finally {
          isProcessing.current = false; // Reset ref after request completes
        }
      };
      authenticateToken();
    }
  }, [token]);

  return <div>Authenticating...</div>;
};

export default Authenticate;