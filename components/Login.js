"use client"
import Image from 'next/image'
import React, { useState, useEffect } from 'react'
import { getAuth, signInWithPhoneNumber, RecaptchaVerifier, onAuthStateChanged } from 'firebase/auth'
import { app } from '@/app/config';
import { useRouter } from 'next/navigation'
import { toast, Toaster } from 'react-hot-toast'

const LoginPage = () => {
    const [phoneNumber, setPhoneNumber] = useState('')
    const [otp, setOtp] = useState('')
    const [confirmationResult, setConfirmationResult] = useState(null)
    const [otpSent, setOtpSent] = useState(false)
    const [userLoggedIn, setUserLoggedIn] = useState(false)

    const auth = getAuth(app)
    const router = useRouter()

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                router.push('/myaccount')
            } else {
                setUserLoggedIn(false)
            }
        })
        return () => unsubscribe()
    }, [auth, router])

    useEffect(() => {
        window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
            'size': 'normal',
            'callback': (response) => {
                // handle recaptcha success
            },
            'expired-callback': () => {
                // handle recaptcha expiration
            }
        }, auth)
        recaptchaVerifier.render()
    }, [auth])

    const handlePhoneNumberChange = (e) => {
        setPhoneNumber(e.target.value)
    }

    const handleOtpChange = (e) => {
        setOtp(e.target.value)
    }

    const showToast = (message, type) => {
        const style = { border: `2px solid ${type === 'success' ? 'green' : 'red'}`, padding: '15px 20px' }
        type === 'success' ? toast.success(message, { duration: 5000, style }) : toast.error(message, { duration: 5000, style })
    }

    const handleSendOtp = async () => {
        try {
            const formattedPhoneNumber = `+91${phoneNumber}`
            const confirmation = await signInWithPhoneNumber(auth, formattedPhoneNumber, window.recaptchaVerifier)
            setConfirmationResult(confirmation)
            setOtpSent(true)
            showToast('OTP sent successfully', 'success')
        } catch (err) {
            showToast('Please Enter Valid Phone Number', 'error')
        }
    }

    const handleOtpSubmit = async () => {
        try {
            const result = await confirmationResult.confirm(otp)
            showToast('Logged in successfully', 'success')
            await fetch('/api/createUser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ phoneNumber })
            })
            router.push('/myaccount')
        } catch (err) {
            showToast(err.message, 'error')
        }
    }
    return (
        <div className="min-h-screen flex flex-col mt-32 sm:px-6 lg:px-8 px-6">
            <Toaster position="bottom-center" reverseOrder={false} />
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <Image unoptimized quality={100} className="mx-auto" src={'/logo-2.png'} width={100} height={100} alt="Workflow" />
                <h2 className="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900">
                    Sign in to your account
                </h2>
            </div>
            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="py-8 px-4 sm:px-10">
                    <div className="mt-1 relative rounded-md shadow-sm">
                        {!otpSent ? (
                            <input id="number" name="number" placeholder="Enter your 10 digit phone number" type="tel" value={phoneNumber} onChange={handlePhoneNumberChange} required className="appearance-none block w-full px-3 py-2 border-2 border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:border-purple-700 transition duration-150 ease-in-out sm:text-sm sm:leading-5" />
                        ) : (
                            <input type="number" value={otp} onChange={handleOtpChange} placeholder='Enter OTP' className='appearance-none mb-4 block w-full px-3 py-2 border-2 border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:border-purple-700 transition duration-150 ease-in-out sm:text-sm sm:leading-5' />
                        )}
                    </div>
                    {!otpSent ? (
                        <div className='my-4' id="recaptcha-container"></div>
                    ) : null}
                    <span className="block w-full rounded-md shadow-sm">
                        <button onClick={otp ? handleOtpSubmit : handleSendOtp} type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:shadow-outline-indigo transition duration-150 ease-in-out">
                            {otp ? 'Submit' : 'Send OTP'}
                        </button>
                    </span>
                </div>
            </div>
        </div>
    )
}

export default LoginPage
