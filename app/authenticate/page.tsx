import { useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

const Authenticate = () => {
  const router = useRouter();
  const { token } = router.query;

  useEffect(() => {
    if (token) {
      const authenticateToken = async () => {
        try {
          const response = await axios.post('/api/authenticate', { token });
          // Handle successful authentication
          console.log('User authenticated:', response.data);
          router.push('/dashboard'); // Redirect to a protected page
        } catch (error) {
          console.error('Authentication failed:', error);
          // Handle authentication failure
        }
      };
      authenticateToken();
    }
  }, [token]);

  return <div>Authenticating...</div>;
};

export default Authenticate;