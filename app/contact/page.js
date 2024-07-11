"use client"
import Link from 'next/link'
import React, { useState } from 'react'
import toast from 'react-hot-toast'

const Contact = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      name,
      email,
      message
    }
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/addInboxMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    const result = await res.json()
    if (result.success) {
      toast.success('Message sent successfully', { duration: 5000, style: { border: '2px solid green', padding: '15px 20px', marginBottom: '40px' } })
      setName('')
      setEmail('')
      setMessage('')
    } else {
      toast.error(result.error, { duration: 5000, style: { border: '2px solid red', padding: '15px 20px', marginBottom: '40px' } })
    }
  }
  return (
    <div className="min-h-screen mt-10" id="contact">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 text-center">
        <h2 className="text-4xl font-bold">Contact</h2>
        <p className="pt-6 pb-6 text-base max-w-2xl text-center m-auto">
          Want to contact us? Choose an
          option below and well be happy to show you how we can transform companys web experience.
        </p>
      </div>
      <div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16 grid md:grid-cols-2 lg:grid-cols-2 gap-y-8 md:gap-x-8 md:gap-y-8 lg:gap-x-8 lg:gap-y-16">
        <div>
          <h2 className="text-lg font-bold">Contact Us</h2>
          <p className="max-w-sm mt-4 mb-4">Have something to say? We are here to help. Fill up the
            form or send email or call phone.</p>
          <div className="flex items-center mt-2 space-x-2 text-dark-600">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
              stroke="currentColor" aria-hidden="true" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75">
              </path>
            </svg>
            <Link className="hover:underline" href="mailto:codescloth.adamin@gmail.com">codescloth.adamin@gmail.com</Link>
          </div>
          <div className="flex items-center mt-2 space-x-2 text-dark-600">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
              stroke="currentColor" aria-hidden="true" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z">
              </path>
            </svg>
            <Link className='hover:underline' href="">Not Available</Link>
          </div>
        </div>
        <div>
          <form onSubmit={handleSubmit}>
            <div className="mb-5">
              <input onChange={(e) => setName(e.target.value)} value={name} type="text" placeholder="Full Name" required autoComplete="false"
                className="w-full bg-transparent px-4 py-3 border-2 placeholder:text-gray-500  rounded-md outline-none border-purple-700 focus:border-purple-900"
                name="name" />
            </div>
            <div className="mb-5">
              <label htmlFor="email_address" className="sr-only">Email Address</label>
              <input onChange={(e) => setEmail(e.target.value)} value={email} id="email_address" required type="email" placeholder="Email Address" autoComplete="false"
                className="w-full px-4 py-3 bg-transparent border-2  placeholder:text-gray-500  rounded-md outline-none border-purple-700 focus:border-purple-900"
                name="email" />
            </div>
            <div className="mb-3">
              <textarea onChange={(e) => setMessage(e.target.value)} value={message} placeholder="Your Message" required
                className="w-full bg-transparent resize-none px-4 py-3 border-2 placeholder:text-gray-500  rounded-md outline-none  h-36 border-purple-700 focus:border-purple-900"
                name="message">
              </textarea>
            </div>
            <button type="submit"
              className="w-full py-4 font-semibold text-white transition-all duration-200 ease-in-out rounded-lg hover:bg-purple-800 focus:outline-none bg-purple-700 focus:bg-purple-900 px-7">Send
              Message
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Contact
