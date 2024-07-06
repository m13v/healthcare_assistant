"use client";

import { nanoid } from '@/lib/utils'
import { AI, UIState } from '@/lib/chat/actions'
import { useActions, useUIState } from 'ai/rsc'
import { VercelRSCAssistantProvider, CreateThreadMessage } from '@assistant-ui/react'
import { Thread } from '@/components/ui/assistant-ui/thread'
import { ReactNode } from "react";
import { createContext, useEffect, useLayoutEffect, useState } from 'react';
import { Auth0Provider } from '@auth0/auth0-react';

const domain: string = process.env.NEXT_PUBLIC_AUTH0_DOMAIN || '';
const clientId: string = process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID || '';

export default function IndexPage() {
  const { submitUserMessage } = useActions()
  const [messages, setMessages] = useUIState<typeof AI>()
  const [redirectUri, setRedirectUri] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setRedirectUri(window.location.origin);
    }
  }, []);

  const next = async (m: CreateThreadMessage) => {
    if (m.content[0].type !== 'text')
      throw new Error('Only text messages are supported')

    const input = m.content[0].text

    // Optimistically add user message UI
    setMessages((currentConversation: UIState) => [
      ...currentConversation,
      { id: nanoid(), role: 'user', display: input }
    ])

    // Submit and get response message
    const message = await submitUserMessage(input)
    setMessages((currentConversation: UIState) => [
      ...currentConversation,
      message
    ])
  }

  if (!redirectUri) {
    return null; // or a loading spinner
  }

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{ redirect_uri: redirectUri }}
    >
      <VercelRSCAssistantProvider messages={messages} append={next as any}>
        <Thread />
      </VercelRSCAssistantProvider>
    </Auth0Provider>
  )
}
