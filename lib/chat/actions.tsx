// @ts-nocheck

/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
'use server'

import {
  createAI,
  createStreamableUI,
  getMutableAIState,
  createStreamableValue
} from 'ai/rsc'

import { BotCard, BotMessage } from '@/components/stocks'

import { nanoid, sleep } from '@/lib/utils'
import { SpinnerMessage } from '@/components/stocks/message'
import { FlightStatus } from '@/components/flights/flight-status'
import { SelectSeats } from '@/components/flights/select-seats'
import { ListFlights } from '@/components/flights/list-flights'
import { BoardingPass } from '@/components/flights/boarding-pass'
import { PurchaseTickets } from '@/components/flights/purchase-ticket'
import { CheckIcon, SpinnerIcon } from '@/components/ui/icons'
import { format } from 'date-fns'
import { experimental_streamText } from 'ai'
import { openai } from '@ai-sdk/openai'
import { z } from 'zod'
import { ListHotels } from '@/components/hotels/list-hotels'
import { Destinations } from '@/components/flights/destinations'
import { CalComponent } from '@/components/cal'
import { PricingTables } from '@/components/pricing-tables'
import { SYSTEM_PROMPT } from './system_prompt';
import { AuthPopup } from '@/components/auth-popup';

const CalComponentWrapper = () => <CalComponent />;

async function submitUserMessage(content: string) {
  'use server'

  const aiState = getMutableAIState()

  aiState.update({
    ...aiState.get(),
    messages: [
      ...aiState.get().messages,
      {
        id: nanoid(),
        role: 'user',
        content: `${aiState.get().interactions.join('\n\n')}\n\n${content}`
      }
    ]
  })

  const history = aiState.get().messages.map((message) => ({
    role: message.role,
    content: message.content
  }))
  // console.log(history)

  const uiStream = createStreamableUI(<SpinnerMessage />)
  ;(async () => {
    try {
      const result = await experimental_streamText({
        model: openai('gpt-3.5-turbo'),
        temperature: 0,
        tools: {
          get_started: {
            description:
              "Only trigger this tool when the user prompts 'Get started', or it's clear that they want to buy",
            parameters: z.object({})
          },
          pricing: {
            description:
              "Only trigger this tool when the user wants to see pricing or subcription options",
            parameters: z.object({})
          },

        },
        toolChoice: 'auto',
        system: SYSTEM_PROMPT,
        messages: [...history]
      })

      let textContent = ''
      uiStream.update(null)

      for await (const delta of result.fullStream) {
        const { type } = delta

        if (type === 'text-delta') {
          const { textDelta } = delta

          textContent += textDelta
          uiStream.update(<BotMessage content={textContent} />)

          aiState.update({
            ...aiState.get(),
            messages: [
              ...aiState.get().messages,
              {
                id: nanoid(),
                role: 'assistant',
                content: textContent
              }
            ]
          })
        } else if (type === 'tool-call') {
          const { toolName, args } = delta

          if (toolName === 'get_started') {
            // const { destinations } = args

            uiStream.append(
              <AuthPopup />
                // <CalComponentWrapper />  
            )

            aiState.done({
              ...aiState.get(),
              interactions: [],
              messages: [
                ...aiState.get().messages,
                {
                  id: nanoid(),
                  role: 'assistant',
                  content: `Let's get started with your journey. Please schedule a consultation.`,
                  display: {
                    name: 'CalComponent',
                    props: {
                      // destinations
                    }
                  }
                }
              ]
            })
          } else if (toolName === 'pricing') {
            aiState.done({
              ...aiState.get(),
              interactions: [],
              messages: [
                ...aiState.get().messages,
                {
                  id: nanoid(),
                  role: 'assistant',
                  content:
                    "Here are pricing options.",
                  display: {
                    name: 'pricing',
                    props: {
                      // summary: args
                    }
                  }
                }
              ]
            })

            uiStream.append(
              <PricingTables />
            )

          }
        }
      } 
      uiStream.done()
    } catch (e) {
      console.error(e)

      const error = new Error(
        'We are experiencing technical issues, please try again later.'
      )
      uiStream.error(error)
      aiState.done()
    }
  })()

  return {
    id: nanoid(),
    role: 'assistant',
    display: uiStream.value
  }
}

export async function requestCode() {
  'use server'

  const aiState = getMutableAIState()

  aiState.done({
    ...aiState.get(),
    messages: [
      ...aiState.get().messages,
      {
        role: 'assistant',
        content:
          "A code has been sent to user's phone. They should enter it in the user interface to continue."
      }
    ]
  })

  const ui = createStreamableUI(
    <div className="animate-spin">
      <SpinnerIcon />
    </div>
  )

  ;(async () => {
    await sleep(2000)
    ui.done()
  })()

  return {
    status: 'requires_code',
    display: ui.value
  }
}

export async function validateCode() {
  'use server'

  const aiState = getMutableAIState()

  const status = createStreamableValue('in_progress')
  const ui = createStreamableUI(
    <div className="flex flex-col items-center justify-center gap-3 p-6 text-zinc-500">
      <div className="animate-spin">
        <SpinnerIcon />
      </div>
      <div className="text-sm text-zinc-500">
        Please wait while we fulfill your order.
      </div>
    </div>
  )

  ;(async () => {
    await sleep(2000)

    ui.done(
      <div className="flex flex-col items-center text-center justify-center gap-3 p-4 text-emerald-700">
        <CheckIcon />
        <div>Payment Succeeded</div>
        <div className="text-sm text-zinc-600">
          Thanks for your purchase! You will receive an email confirmation
          shortly.
        </div>
      </div>
    )

    aiState.done({
      ...aiState.get(),
      messages: [
        ...aiState.get().messages.slice(0, -1),
        {
          role: 'assistant',
          content: 'The purchase has completed successfully.'
        }
      ]
    })

    status.done('completed')
  })()

  return {
    status: status.value,
    display: ui.value
  }
}

export type Message = {
  role: 'user' | 'assistant' | 'system' | 'function' | 'data' | 'tool'
  content: string
  id?: string
  name?: string
  display?: {
    name: string
    props: Record<string, any>
  }
}

export type AIState = {
  chatId: string
  interactions?: string[]
  messages: Message[]
}

export type UIState = {
  id: string
  role: 'user' | 'assistant'
  display: React.ReactNode
}[]

export const AI = createAI<AIState, UIState>({
  actions: {
    submitUserMessage,
    requestCode,
    validateCode,
  },
  initialUIState: [],
  initialAIState: { chatId: nanoid(), interactions: [], messages: [] },
})