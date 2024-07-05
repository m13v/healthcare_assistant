import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

const authenticate = async (req: NextApiRequest, res: NextApiResponse) => {
  const { token } = req.body;

  try {
    const response = await axios.post('https://api.stytch.com/v1/magic_links/authenticate', {
      token,
    }, {
      auth: {
        username: process.env.STYTCH_PROJECT_ID,
        password: process.env.STYTCH_SECRET,
      },
    });

    // Handle successful authentication
    res.status(200).json(response.data);
  } catch (error) {
    console.error('Error authenticating token:', error);
    res.status(500).json({ error: 'Authentication failed' });
  }
};

export default authenticate;