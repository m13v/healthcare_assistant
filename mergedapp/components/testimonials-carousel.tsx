'use client'

import { useState, useRef, useEffect } from 'react'
import Image, { StaticImageData } from 'next/image'
import { Transition } from '@headlessui/react'

import UserImage01 from '@/public/images/testimonial-01.jpg'
import UserImage02 from '@/public/images/testimonial-02.jpg'
import UserImage03 from '@/public/images/testimonial-03.jpg'

export default function TestimonialsCarousel() {

  const [active, setActive] = useState<number>(0)
  const [autorotate, setAutorotate] = useState<boolean>(true)
  const [autorotateTiming] = useState<number>(7000)

  interface Item {
    img: StaticImageData
    alt: string
    quote: string
    name: string
    role: string
    // href: string
    // team: string
    // link: string
  }

  const items: Item[] = [
    {
      img: UserImage01,
      alt: 'Testimonial 1: Thank you so much for making the daily oral version available. The even dosage really helps me not feel sick at the start like the injection does.',
      quote: '“Thank you so much for making the daily oral version available. The even dosage really helps me not feel sick at the start like the injection does.“',
      name: 'Sarah',
      role: 'Switched from injection to oral',
      // href: '#0',
      // team: '@Dropbox',
      // link: '#0'
    },
    {
      img: UserImage02,
      alt: 'Testimonial 1: I was buying peptides from a third-party source in China. Using the peptides and reconstituting them myself didn\'t feel great. I\'m glad to access safer versions created at a US pharmacy now through Bonsai.',
      quote: '“I was buying peptides from a third-party source in China. Using the peptides and reconstituting them myself didn\'t feel great. I\'m glad to access safer versions created at the pharmacy now.“',
      name: 'Jeanine',
      role: 'Switched from injection to oral',
      // href: '#0',
      // team: '@Shopify',
      // link: '#0'
    },
    {
      img: UserImage03,
      alt: 'Testimonial 3: Making GLP-1s accessible to everyone is really important work. I\'m glad Bonsai is working on it.',
      quote: '“Making GLP-1s accessible to everyone is really important work. I\'m glad Bonsai is working on it.“',
      name: 'Naina',
      role: 'MD',
      // href: '#0',
      // team: '@Google',
      // link: '#0'
    }
  ]

  const testimonials = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!autorotate) return
    const interval = setInterval(() => {
      setActive(active + 1 === items.length ? 0 : active => active + 1)
    }, autorotateTiming)
    return () => clearInterval(interval)
  }, [active, autorotate])

  const heightFix = () => {
    if (testimonials.current && testimonials.current.parentElement) testimonials.current.parentElement.style.height = `${testimonials.current.clientHeight}px`
  }

  useEffect(() => {
    heightFix()
  }, [])

  return (
    <section className="relative">

      {/* Social icons illustrations */}

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="py-12 md:py-20">

          {/* Section header */}
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-16">
            <h2 className="h2 mb-4">What people are saying</h2>
            <p className="text-xl text-gray-600" data-aos="zoom-y-out"></p>
          </div>

          {/* Carousel area */}
          <div className="max-w-3xl mx-auto">

            {/* Carousel */}
            <div className="relative mt-20" data-aos="zoom-y-out">

              {/* Testimonials */}
              <div className="transition-all border-2 border-gray-200 rounded bg-white">
                <div className="relative flex flex-col items-start z-10" ref={testimonials}>

                  {items.map((item, index) => (
                    <Transition
                      key={index}
                      show={active === index}
                      className="w-full text-center px-12 py-8 pt-20 mx-4 md:mx-0"
                      enter="transition ease-in-out duration-700 transform order-first"
                      enterFrom="opacity-0 -translate-y-8"
                      enterTo="opacity-100 scale-100"
                      leave="transition ease-in-out duration-300 transform absolute"
                      leaveFrom="opacity-100 translate-y-0"
                      leaveTo="opacity-0 translate-y-8"
                      beforeEnter={() => heightFix()}
                      unmount={false}
                    >
                      <div className="absolute top-0 -mt-8 left-1/2 transform -translate-x-1/2">
                        <svg className="absolute top-0 right-0 -mt-3 -mr-8 w-16 h-16 fill-current text-blue-500" viewBox="0 0 64 64" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
                          <path d="M37.89 58.338c-2.648-5.63-3.572-10.045-2.774-13.249.8-3.203 8.711-13.383 23.737-30.538l2.135.532c-6.552 10.033-10.532 17.87-11.939 23.515-.583 2.34.22 6.158 2.41 11.457l-13.57 8.283zm-26.963-6.56c-2.648-5.63-3.572-10.046-2.773-13.25.799-3.203 8.71-13.382 23.736-30.538l2.136.533c-6.552 10.032-10.532 17.87-11.94 23.515-.583 2.339.22 6.158 2.41 11.456l-13.57 8.283z" />
                        </svg>
                        {/* <Image className="relative rounded-full" src={item.img} width={96} height={96} alt={item.alt} /> */}
                      </div>
                      <blockquote className="text-xl font-medium mb-4">{item.quote}</blockquote>
                      <cite className="block font-bold text-lg not-italic mb-1">{item.name}</cite>
                      <div className="text-gray-600">
                        <span>{item.role}</span><a className="text-blue-600 hover:underline"></a>
                      </div>
                    </Transition>
                  ))}

                </div>
              </div>

              {/* Arrows */}
              <div className="absolute inset-0 flex items-center justify-between">
                <button
                  className="relative z-20 w-16 h-16 p-1 flex items-center justify-center bg-white rounded-full border border-gray-200 shadow-md hover:shadow-lg transform -translate-x-2 md:-translate-x-1/2"
                  onClick={() => { setActive(active === 0 ? items.length - 1 : active - 1); setAutorotate(false); }}
                >
                  <span className="sr-only">Previous</span>
                  <svg className="w-4 h-4 fill-current text-gray-500" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6.7 14.7l1.4-1.4L3.8 9H16V7H3.8l4.3-4.3-1.4-1.4L0 8z" />
                  </svg>
                </button>
                <button
                  className="relative z-20 w-16 h-16 p-1 flex items-center justify-center bg-white rounded-full border border-gray-200 shadow-md hover:shadow-lg transform translate-x-2 md:translate-x-1/2"
                  onClick={() => { setActive(active === items.length - 1 ? 0 : active + 1); setAutorotate(false); }}
                >
                  <span className="sr-only">Next</span>
                  <svg className="w-4 h-4 fill-current text-gray-500" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.3 14.7l-1.4-1.4L12.2 9H0V7h12.2L7.9 2.7l1.4-1.4L16 8z" />
                  </svg>
                </button>
              </div>

            </div>

          </div>
        </div>
      </div>
    </section >
  )
}