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
              "User wants to get started",
            parameters: z.object({
              // first_name: z.string(),
              // last_name: z.string(),
              // // departingAirport: z.string().describe('Departing airport code'),
              // // arrivalAirport: z.string().describe('Arrival airport code'),
              // date: z
              //   .string()
              //   .describe(
              //     "Preferred date to start receiving medications"
              //   )
            })
          },
          // listDestinations: {
          //   description: 'List destinations to travel cities, max 5.',
          //   parameters: z.object({
          //     destinations: z.array(
          //       z
          //         .string()
          //         .describe(
          //           'List of destination cities. Include rome as one of the cities.'
          //         )
          //     )
          //   })
          // },
          // showSeatPicker: {
          //   description:
          //     'Show the UI to choose or change seat for the selected flight.',
          //   parameters: z.object({
          //     departingCity: z.string(),
          //     arrivalCity: z.string(),
          //     flxightCode: z.string(),
          //     date: z.string()
          //   })
          // },
          // showHotels: {
          //   description: 'Show the UI to choose a hotel for the trip.',
          //   parameters: z.object({})
          // },
          // checkoutBooking: {
          //   description:
          //     'Show the UI to purchase/checkout a flight and hotel booking.',
          //   parameters: z.object({})
          // },
          // showBoardingPass: {
          //   description: "Show user's imaginary boarding pass.",
          //   parameters: z.object({
          //     airline: z.string(),
          //     arrival: z.string(),
          //     departure: z.string(),
          //     departureTime: z.string(),
          //     arrivalTime: z.string(),
          //     price: z.number(),
          //     seat: z.string(),
          //     date: z
          //       .string()
          //       .describe('Date of the flight, example format: 6 April, 1998'),
          //     gate: z.string()
          //   })
          // },
          // showFlightStatus: {
          //   description:
          //     'Get the current status of imaginary flight by flight number and date.',
          //   parameters: z.object({
          //     flightCode: z.string(),
          //     date: z.string(),
          //     departingCity: z.string(),
          //     departingAirport: z.string(),
          //     departingAirportCode: z.string(),
          //     departingTime: z.string(),
          //     arrivalCity: z.string(),
          //     arrivalAirport: z.string(),
          //     arrivalAirportCode: z.string(),
          //     arrivalTime: z.string()
          //   })
          // }
        },
        system: `\
      You are a friendly assistant that helps the user with their weight loss journey using Bonsai's services. You assist users with understanding how Bonsai works, product details, subscription plans, and customer support.
      Your responses are solely based on the provided context about Bonsai and its products.
      Right now, the user clicked on the AI assistant widget and your job is to determine their intent.
      The user intent might not be clear, in this case you ask clarifying questions.
      The user question might not be complete, in this case you ask for follow-up questions.
        
      Here's a list of user intents to pick from: 
      - Subscription details
      - Product specific questions
      - Customer support questions (e.g. track purchase, payment issues, order issues)
      - Escalate to doctor or customer support human agent
      - Ask a clarification/follow-up question
      - Promotions

      Context knowledge:
      ------------
      How Bonsai works:
      1. See a clinician online
      Our clinicians ensure you're a fit for our program and write a prescription as necessary.
      2. Receive the medication
      A monthly subscription covers any physician visits and medication cost.
      3. Track your journey on our platform
      Log your diet and exercise and optionally get paired with physical trainers and/or food services for weight loss maintenance!
      
      ------------
      All Inclusive Subscription:
      Subcription includes cost of medication and clinician visits.
      1. Bill Yearly -20%
      2. Bill Monthly
      Compounded Sublingual Semaglutide
      $300/month
      Same ingredient as Ozempic®*, Wegovy®* and Rybelsus®*
      GLP-1 taken once daily
      Tablets or drops (no injection needed!)
      Monthly free shipment
      Dieticians and physical trainers to support you
      
      Compounded Sublingual Tirzepatide:
      $350/month
      Same ingredient as Mounjaro®* and Zepbound™
      GLP-1 taken once daily
      Tablets or drops (no injection needed!)
      Monthly free shipment
      Dieticians and physical trainers to support you
      
      ------------
      What people are saying:
      “Making GLP-1s accessible to everyone is really important work. I'm glad Bonsai is working on it.“
      Naina
      MD
      
      “Thank you so much for making the daily oral version available. The even dosage really helps me not feel sick at the start like the injection does.“
      Sarah
      Switched from injection to oral
      
      “I was buying peptides from a third-party source in China. Using the peptides and reconstituting them myself didn't feel great. I'm glad to access safer versions created at the pharmacy now.“
      Jeanine
      Switched from injection to oral
      
      ------------
      Frequently Asked Questions:
      
      Is the oral form effective?
      Clinical studies are showing that the oral forms are just as effective as the inejctions, when used at higher dosages. The compounding pharmacies that we work with are able to compound at the dosages required to be effective for our patients.
      
      
      Do the oral forms cause more nausea and side effects?
      Clinical studies have shown that the side effects of both the injections and the oral forms are similar, although more people complained about belching on the oral form. The most common side effects are nausea and diarrhea, which are usually mild and go away after a few days. Both forms need to be titrated up in quantity to ensure the body adjusts to the medication. SUSTAIN and PIONEER clinical trial programs also reported that gastrointestinal disorders were prevalent with both subcutaneous and oral semaglutide, with a slightly higher incidence in the oral form (39.1%) compared to subcutaneous (41.9%)
      
      
      What's the difference between the sublingual and oral form?
      Sublingual medications are taken under the tongue and absorbed through the mucous membranes, while the oral forms are swallowed and absorbed through the stomach. The sublingual forms bypass first pass digestion in the stomach and the liver so they have a higher bioavailability. This means that you need less of the active ingredient in the sublingual form to achieve the same effect as the oral form and decreases side effects.
      
      
      Why oral? Why not injections?
      Oral weightloss medication is taken once daily, ensuring a more even dosage throughout the week, instead of the peaks and valleys in appetite suppression of the injections. Also, people who are afraid of needles can access the medication they need to stay healthy!
      
      
      Why should I trust the oral formulations?
      We only work with pharmacies that obtain their semaglutide from FDA-registered sources to ensure the potency and purity of our compounded suspensions.
      
      Ready to get started?
      We have a generous starting price to get started right away.
      `,
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
              <>
              <BotCard>
                <CalComponent />
              </BotCard>
              </>
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
        //   } else if (toolName === 'showFlights') {
        //     aiState.done({
        //       ...aiState.get(),
        //       interactions: [],
        //       messages: [
        //         ...aiState.get().messages,
        //         {
        //           id: nanoid(),
        //           role: 'assistant',
        //           content:
        //             "Here's a list of flights for you. Choose one and we can proceed to pick a seat.",
        //           display: {
        //             name: 'showFlights',
        //             props: {
        //               summary: args
        //             }
        //           }
        //         }
        //       ]
        //     })

        //     uiStream.append(
        //       <BotCard>
        //         <ListFlights summary={args} />
        //       </BotCard>
        //     )
        //   } else if (toolName === 'showSeatPicker') {
        //     aiState.done({
        //       ...aiState.get(),
        //       interactions: [],
        //       messages: [
        //         ...aiState.get().messages,
        //         {
        //           id: nanoid(),
        //           role: 'assistant',
        //           content:
        //             "Here's a list of available seats for you to choose from. Select one to proceed to payment.",
        //           display: {
        //             name: 'showSeatPicker',
        //             props: {
        //               summary: args
        //             }
        //           }
        //         }
        //       ]
        //     })

        //     uiStream.append(
        //       <BotCard>
        //         <SelectSeats summary={args} />
        //       </BotCard>
        //     )
        //   } else if (toolName === 'showHotels') {
        //     aiState.done({
        //       ...aiState.get(),
        //       interactions: [],
        //       messages: [
        //         ...aiState.get().messages,
        //         {
        //           id: nanoid(),
        //           role: 'assistant',
        //           content:
        //             "Here's a list of hotels for you to choose from. Select one to proceed to payment.",
        //           display: {
        //             name: 'showHotels',
        //             props: {}
        //           }
        //         }
        //       ]
        //     })

        //     uiStream.append(
        //       <BotCard>
        //         <ListHotels />
        //       </BotCard>
        //     )
        //   } else if (toolName === 'checkoutBooking') {
        //     aiState.done({
        //       ...aiState.get(),
        //       interactions: []
        //     })

        //     uiStream.append(
        //       <BotCard>
        //         <PurchaseTickets />
        //       </BotCard>
        //     )
        //   } else if (toolName === 'showBoardingPass') {
        //     aiState.done({
        //       ...aiState.get(),
        //       interactions: [],
        //       messages: [
        //         ...aiState.get().messages,
        //         {
        //           id: nanoid(),
        //           role: 'assistant',
        //           content:
        //             "Here's your boarding pass. Please have it ready for your flight.",
        //           display: {
        //             name: 'showBoardingPass',
        //             props: {
        //               summary: args
        //             }
        //           }
        //         }
        //       ]
        //     })

        //     uiStream.append(
        //       <BotCard>
        //         <BoardingPass summary={args} />
        //       </BotCard>
        //     )
        //   } else if (toolName === 'showFlightStatus') {
        //     aiState.update({
        //       ...aiState.get(),
        //       interactions: [],
        //       messages: [
        //         ...aiState.get().messages,
        //         {
        //           id: nanoid(),
        //           role: 'assistant',
        //           content: `The flight status of ${args.flightCode} is as follows:
        //         Departing: ${args.departingCity} at ${args.departingTime} from ${args.departingAirport} (${args.departingAirportCode})
        //         `
        //         }
        //       ],
        //     })

        //     uiStream.append(
        //       <BotCard>
        //         <FlightStatus summary={args} />
        //       </BotCard>
        //     )
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