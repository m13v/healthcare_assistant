'use client'

import { nanoid } from '@/lib/utils'
import { AI, UIState } from '@/lib/chat/actions'
import { useActions, useUIState } from 'ai/rsc'
import { VercelRSCAssistantProvider, CreateThreadMessage } from '@assistant-ui/react'
import { Thread } from '@/components/ui/assistant-ui/thread'
import { ReactNode } from "react";
import { createContext, useEffect, useLayoutEffect, useState } from 'react';
import { StytchProvider } from '@stytch/nextjs';
import { createStytchUIClient } from '@stytch/nextjs/ui';

const stytch = createStytchUIClient(process.env.NEXT_PUBLIC_STYTCH_PUBLIC_TOKEN || '');


export default function IndexPage() {
  const { submitUserMessage } = useActions()
  const [messages, setMessages] = useUIState<typeof AI>()

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

  return (
    <StytchProvider stytch={stytch}>
      <VercelRSCAssistantProvider messages={messages} append={next as any}>
        <Thread />
      </VercelRSCAssistantProvider>
    </StytchProvider>
  )
}
