import Link from 'next/link'

export default function Cta() {
  return (
    <section>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="pb-12 md:pb-20">

          {/* CTA box */}
          <div className="bg-teal-500 rounded py-10 px-8 md:py-16 md:px-12 shadow-2xl" data-aos="zoom-y-out">

            <div className="flex flex-col lg:flex-row justify-between items-center">

              {/* CTA content */}
              <div className="mb-6 lg:mr-16 lg:mb-0 text-center lg:text-left">
                <h3 className="h3 text-white mb-2">Ready to get started?</h3>
                <p className="text-white text-lg opacity-75">We have a generous starting price to get started right away.</p>
              </div>

              {/* CTA button */}

              <Link href="/signup">
                <div>
                  <a className="btn text-teal-500 bg-gradient-to-r from-blue-100 to-white" href="#0">Chat with us to get started</a>
                </div>
              </Link>
            </div>

          </div>

        </div>
      </div>
    </section>
  )
}