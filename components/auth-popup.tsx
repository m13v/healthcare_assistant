"use client";
// src/components/AuthPopup.js
import React, { useState, useEffect } from 'react';
// import { StytchLogin } from "@stytch/nextjs";
// import { Products } from "@stytch/vanilla-js";
import { Auth0Provider, useAuth0 } from '@auth0/auth0-react';

// interface StytchLoginConfig {
//   products: (Products.emailMagicLinks | Products.oauth | Products.passwords)[];
//   emailMagicLinksOptions?: {
//     loginRedirectURL: string;
//     loginExpirationMinutes: number;
//     signupRedirectURL: string;
//     signupExpirationMinutes: number;
//   };
//   oauthOptions?: {
//     providers: { type: string }[];
//   };
//   passwordsOptions?: {
//     loginRedirectURL: string;
//     loginExpirationMinutes: number;
//     signupRedirectURL: string;
//     signupExpirationMinutes: number;
//   };
// }

const domain = process.env.NEXT_PUBLIC_AUTH0_DOMAIN!;
const clientId = process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID!;
console.log('domain + clientId');
console.log(domain + clientId);    

const AuthPopupComponent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { loginWithRedirect, logout, user, isAuthenticated } = useAuth0();
  
  // const config: StytchLoginConfig = {
  //   products: [Products.emailMagicLinks, Products.oauth],
  //   emailMagicLinksOptions: {
  //     loginRedirectURL: 'http://localhost:3000/authenticate',
  //     loginExpirationMinutes: 60,
  //     signupRedirectURL: 'http://localhost:3000/authenticate',
  //     signupExpirationMinutes: 60,
  //   },
  //   oauthOptions: {
  //     providers: [{ type: 'google' }, { type: 'facebook' }],
  //   },
  // };

  return (
    <div>
      {!isAuthenticated && (
        <button onClick={() => loginWithRedirect()}>Login / Signup</button>
      )}
      {isAuthenticated && user && (
        <div>
          <h2>Welcome, {user.name}</h2>
          <button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
            Log out
          </button>
        </div>
      )}
      {/* {isOpen && (
        <div className="popup">
          <button onClick={() => setIsOpen(false)}>Close</button>
          <StytchLogin config={config} />
        </div>
      )} */}
    </div>
  );
};

export const AuthPopup = () => (
  <Auth0Provider
    domain={domain}
    clientId={clientId}
    authorizationParams={{ redirect_uri: window.location.origin }}
  >
    <AuthPopupComponent />
  </Auth0Provider>
);