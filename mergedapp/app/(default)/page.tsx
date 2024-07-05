'use client'

import { metadata } from './metadata' // Import the metadata
import Hero from '@/components/hero-home'
import Features from '@/components/features-home'
// import FeaturesBlocks from '@/components/features-blocks'
// import FeaturesWorld from '@/components/features-world'
import Faqs from '@/components/faqs'
import PricingTables from '@/components/pricing-tables'
import TestimonialsCarousel from '@/components/testimonials-carousel'
import Cta from '@/components/cta'

import { nanoid } from '@/lib/utils'
import { AI, UIState } from '@/lib/chat/actions'
import { useActions, useUIState } from 'ai/rsc'
import { VercelRSCAssistantProvider, CreateThreadMessage } from '@assistant-ui/react'
import { Thread } from '@/components/ui/assistant-ui/thread'

export default function Home() {
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
    <>
      <Hero />
      <VercelRSCAssistantProvider messages={messages} append={next as any}>
        <Thread />
      </VercelRSCAssistantProvider>
      <Features />
      {/* <FeaturesBlocks /> */}
      {/* <FeaturesWorld /> */}
      {/* <News /> */}
      <PricingTables />
      <TestimonialsCarousel />
      <Faqs />
      <Cta />
    </>
  )
}