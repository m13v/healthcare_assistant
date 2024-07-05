"use client";
// src/components/AuthPopup.js
import React, { useState } from 'react';
import { StytchLogin } from "@stytch/nextjs";
import { Products } from "@stytch/vanilla-js";

interface StytchLoginConfig {
  products: (Products.emailMagicLinks | Products.oauth | Products.passwords)[];
  emailMagicLinksOptions?: {
    loginRedirectURL: string;
    loginExpirationMinutes: number;
    signupRedirectURL: string;
    signupExpirationMinutes: number;
  };
  oauthOptions?: {
    providers: { type: string }[];
  };
  passwordsOptions?: {
    loginRedirectURL: string;
    loginExpirationMinutes: number;
    signupRedirectURL: string;
    signupExpirationMinutes: number;
  };
}

export const AuthPopup = () => {
  const [isOpen, setIsOpen] = useState(false);

  const config: StytchLoginConfig = {
    products: [Products.emailMagicLinks, Products.oauth],
    emailMagicLinksOptions: {
      loginRedirectURL: 'http://localhost:3000/authenticate',
      loginExpirationMinutes: 60,
      signupRedirectURL: 'http://localhost:3000/authenticate',
      signupExpirationMinutes: 60,
    },
    oauthOptions: {
      providers: [{ type: 'google' }, { type: 'facebook' }],
    },
  };

  return (
    <div>
      <button onClick={() => setIsOpen(true)}>Login / Signup</button>
      {isOpen && (
        <div className="popup">
          <button onClick={() => setIsOpen(false)}>Close</button>
          <StytchLogin config={config} />
        </div>
      )}
    </div>
  );
};