export const metadata = {
  title: 'Consult - Bonsai',
  description: 'Page description',
}

import Link from 'next/link'

import CalComponent from '@/components/cal'

export default function SignUp() {
  return (
    <section className="bg-gradient-to-b from-gray-100 to-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="pt-32 pb-12 md:pt-40 md:pb-20">

          {/* Page header */}
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
            <h1 className="h1">See if Bonsai is right for you</h1>
          </div>

          {/* Form */}
          {/* <div className="max-w-sm mx-auto">
            <form action="https://docs.google.com/forms/d/e/1FAIpQLSedw5JKxUl-pj8IIOiXWsF7Oo8UMKSLLar_iJv-LnFczq3Z7Q/formResponse" method="POST" target="_self">
              <div className="flex flex-wrap -mx-3 mb-4">
                <div className="w-full px-3">
                  <label className="block text-gray-800 text-sm font-medium mb-1" htmlFor="name">Name <span className="text-red-600">*</span></label>
                  <input id="name" type="text" name="entry.11514087" className="form-input w-full text-gray-800" placeholder="Please enter your full name" required />
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-4">
                <div className="w-full px-3">
                  <label className="block text-gray-800 text-sm font-medium mb-1" htmlFor="email">Email <span className="text-red-600">*</span></label>
                  <input id="email" type="email" name="entry.1498106300" className="form-input w-full text-gray-800" placeholder="Enter your email address" required />
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-4">
                <div className="w-full px-3">
                  <label className="block text-gray-800 text-sm font-medium mb-1" htmlFor="password">1812538630 <span className="text-red-600">*</span></label>
                  <input id="password" type="text" name="entry.1812538630" className="form-input w-full text-gray-800" placeholder="Enter your text" required />
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-4">
                <div className="w-full px-3">
                  <label className="block text-gray-800 text-sm font-medium mb-1" htmlFor="text">entry.1973135259 <span className="text-red-600">*</span></label>
                  <input id="text" type="text" name="entry.1973135259" className="form-input w-full text-gray-800" placeholder="Enter your text" required />
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-4">
                <div className="w-full px-3">
                  <label className="block text-gray-800 text-sm font-medium mb-1" htmlFor="text">entry.1246437064 <span className="text-red-600">*</span></label>
                  <input id="text" type="text" name="entry.1246437064" className="form-input w-full text-gray-800" placeholder="Enter your password" required />
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mt-6">
                <div className="w-full px-3">
                  <button className="btn text-white bg-blue-600 hover:bg-blue-700 w-full">Sign up</button>
                </div>
              </div>
              <div className="text-sm text-gray-500 text-center mt-3">
                By creating an account, you agree to the <a className="underline" href="#0">terms & conditions</a>, and our <a className="underline" href="#0">privacy policy</a>.
              </div>
            </form>
            <div className="text-gray-600 text-center mt-6">
              Already using Bonsai? <Link href="/signin" className="text-blue-600 hover:underline transition duration-150 ease-in-out">Sign in</Link>
            </div>
          </div> */}

          <div className="mt-10 flex justify-center gap-x-6">
            <CalComponent />
          </div>
        </div>
      </div>
    </section>
  )
}
