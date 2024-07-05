export const metadata = {
  title: 'Support - Simple',
  description: 'Page description',
}

export default function Support() {
  return (
    <>
      {/* Contact section */}
      <section>
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="pt-32 pb-12 md:pt-40 md:pb-20">

            {/* Section header */}
            <div className="max-w-3xl mx-auto text-center pb-12 md:pb-16">
              <h1 className="h1">Have a question about Bonsai? Contact us directly</h1>
            </div>

            {/* Contact form */}
            <form className="max-w-xl mx-auto">
              <div className="flex flex-wrap -mx-3 mb-4">
                <div className="w-full md:w-1/2 px-3 mb-4 md:mb-0">
                  <label className="block text-gray-800 text-sm font-medium mb-1" htmlFor="first-name">First Name <span className="text-red-600">*</span></label>
                  <input id="first-name" type="text" className="form-input w-full text-gray-800" placeholder="Enter your first name" required />
                </div>
                <div className="w-full md:w-1/2 px-3">
                  <label className="block text-gray-800 text-sm font-medium mb-1" htmlFor="last-name">Last Name <span className="text-red-600">*</span></label>
                  <input id="last-name" type="text" className="form-input w-full text-gray-800" placeholder="Enter your last name" required />
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-4">
                <div className="w-full px-3">
                  <label className="block text-gray-800 text-sm font-medium mb-1" htmlFor="email">Email <span className="text-red-600">*</span></label>
                  <input id="email" type="email" className="form-input w-full text-gray-800" placeholder="Enter your email address" required />
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-4">
                <div className="w-full px-3">
                  <label className="block text-gray-800 text-sm font-medium mb-1" htmlFor="subject">Subject <span className="text-red-600">*</span></label>
                  <input id="subject" type="text" className="form-input w-full text-gray-800" placeholder="How can we help you?" required />
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-4">
                <div className="w-full px-3">
                  <label className="block text-gray-800 text-sm font-medium mb-1" htmlFor="country">Country</label>
                  <select id="country" className="form-select w-full text-gray-500">
                    <option>United States</option>
                    <option>United Kingdom</option>
                    <option>Germany</option>
                  </select>
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-4">
                <div className="w-full px-3">
                  <label className="block text-gray-800 text-sm font-medium mb-1" htmlFor="message">Message</label>
                  <textarea id="message" rows={4} className="form-textarea w-full text-gray-800" placeholder="Write your message"></textarea>
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mt-4">
                <div className="w-full px-3">
                  <button className="btn text-white bg-teal-600 hover:bg-teal-700 w-full">Send</button>
                </div>
              </div>
              <div className="text-sm text-gray-600 mt-4">
                By clicking "send" you consent to allow Simple to store and process the personal information submitted above and agree to our <a className="underline" href="#0">terms and conditions</a> as well as our <a className="underline" href="#0">Privacy Policy</a>.
              </div>
            </form>

          </div>
        </div>
      </section>
    </>
  )
}
