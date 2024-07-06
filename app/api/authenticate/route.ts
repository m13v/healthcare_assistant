import * as stytch from 'stytch';
import type { NextApiRequest, NextApiResponse } from 'next';
import { NextRequest, NextResponse } from 'next/server';
import { NextIncomingMessage } from 'next/dist/server/request-meta';
import { cookies } from 'next/headers';

type Data = {
  user_id: string;
  request_id: string;
  status_code: number;
  public_key_credential_creation_options: string;
};

type ErrorData = {
  errorString: string;
};

// Helper functions to account for the fact this applications is deployed on many different domains via Vercel, and on localhost

// Use on the frontend (React components) to get domain
export const getDomainFromWindow = () => {
  // First, check if this function is being called on the frontend. If so, get domain from window
  if (typeof window !== 'undefined') {
    return window.location.origin;
  }

  return null;
};

// Use on the backend (API, getServerSideProps) to get the host domain
export const getDomainFromRequestBackend = (req: NextRequest, isWebAuthN: boolean = false) => {
  const host = req.headers.get('host') || '';
  const protocol = req.headers.get('x-forwarded-proto') ? 'https://' : 'http://';

  // WebAuthN uses the host but doesn't require protocol
  if (isWebAuthN) {
    // WebAuthN requires port number is stripped from localhost
    if (host.includes('localhost:')) {
      return 'localhost';
    } else {
      return host;
    }
  }

  return protocol + host;
};

let client: stytch.Client;
const loadStytch = () => {
  if (!client) {
    client = new stytch.Client({
      project_id: process.env.STYTCH_PROJECT_ID || '',
      secret: process.env.STYTCH_SECRET || '',
    });
  }
  console.log('client: ', client);
  return client;
};

export const POST = async (req: NextRequest) => {
  // Get session from cookie
  const cookieStore = cookies();
  const storedSession = cookieStore.get('api_webauthn_session')?.value;
  // If session does not exist display an error
  if (!storedSession) {
    return NextResponse.json({ errorString: 'No session provided' }, { status: 400 });
  }
  try {
    const stytchClient = loadStytch();
    // Validate Stytch session
    const { session } = await stytchClient.sessions.authenticate({ session_token: storedSession });
    // Begin webauthn registration
    const authnResp = await stytchClient.webauthn.registerStart({
      user_id: session.user_id,
      domain: getDomainFromRequestBackend(req, true),
    });
    return NextResponse.json(authnResp, { status: 200 });
  } catch (error) {
    const errorString = JSON.stringify(error);
    return NextResponse.json({ errorString }, { status: 400 });
  }
};
