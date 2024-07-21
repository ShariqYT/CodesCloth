"use client";
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { getAuth, signInWithPhoneNumber, RecaptchaVerifier, onAuthStateChanged, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { app } from '@/app/config';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import Logo from '@/public/logo3.png';

const LoginPage = () => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [otp, setOtp] = useState('');
    const [confirmationResult, setConfirmationResult] = useState(null);
    const [otpSent, setOtpSent] = useState(false);
    const [loading, setLoading] = useState(false);
    const [googleLoading, setGoogleLoading] = useState(false);

    const auth = getAuth(app);
    const router = useRouter();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                router.push('/myaccount');
            }
        });
        return () => unsubscribe();
    }, [auth, router]);

    useEffect(() => {
        if (typeof window !== 'undefined' && !window.recaptchaVerifier) {
            window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
                'size': 'normal',
                'callback': (response) => {
                    // handle recaptcha success
                },
                'expired-callback': () => {
                    // handle recaptcha expiration
                    toast.error('Recaptcha expired', { duration: 5000, style: { border: '2px solid red', padding: '15px 20px', marginBottom: '40px' } });
                }
            }, auth);
            window.recaptchaVerifier.render();
        }
    }, [auth]);

    const handlePhoneNumberChange = (e) => {
        setPhoneNumber(e.target.value);
    };

    const handleOtpChange = (e) => {
        setOtp(e.target.value);
    };

    const showToast = (message, type) => {
        const style = { border: `2px solid ${type === 'success' ? 'green' : 'red'}`, padding: '15px 20px', marginBottom: '40px' };
        type === 'success' ? toast.success(message, { duration: 5000, style }) : toast.error(message, { duration: 5000, style });
    };

    const handleSendOtp = async () => {
        setLoading(true);
        try {
            const formattedPhoneNumber = `+91${phoneNumber}`;
            const confirmation = await signInWithPhoneNumber(auth, formattedPhoneNumber, window.recaptchaVerifier);
            setConfirmationResult(confirmation);
            setOtpSent(true);
            showToast('OTP sent successfully', 'success');
        } catch (err) {
            showToast('Please Enter Valid Phone Number', 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleOtpSubmit = async () => {
        setLoading(true);
        try {
            const result = await confirmationResult.confirm(otp);
            await fetch('/api/createUser', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ phoneNumber })
            });
            showToast('Logged in successfully with Phone Number', 'success');
            router.push('/myaccount');
        } catch (err) {
            showToast('Wrong OTP entered', 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        setGoogleLoading(true);
        try {
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider);
            await fetch('/api/createUser', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userEmail: result.user.email })
            });
            showToast('Logged in successfully with Google', 'success');
            router.push('/myaccount');
        } catch (err) {
            showToast('Failed to log in with Google', 'error');
        } finally {
            setGoogleLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col mt-8 md:mt-32 sm:px-6 md:px-8 px-6">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <Image className="mx-auto object-contain w-48 md:w-52" src={Logo} alt="Logo" />
                <h2 className="mt-6 text-center text-2xl md:text-3xl leading-9 font-extrabold">
                    Sign in to your account
                </h2>
            </div>
            <div className="md:mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="py-8 px-4 sm:px-10">
                    <div className="mt-1 relative rounded-md shadow-sm">
                        {!otpSent ? (
                            <input
                                id="number"
                                name="number"
                                placeholder="Enter your 10 digit phone number"
                                type="tel"
                                value={phoneNumber}
                                onChange={handlePhoneNumberChange}
                                required
                                className="appearance-none bg-transparent block w-full px-3 py-2 border-2 border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:border-purple-700 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                            />
                        ) : (
                            <input
                                type="number"
                                value={otp}
                                onChange={handleOtpChange}
                                placeholder='Enter OTP'
                                className='appearance-none mb-4 block w-full px-3 py-2 border-2 border-gray-300 rounded-md bg-transparent placeholder-gray-400 focus:outline-none focus:border-purple-700 transition duration-150 ease-in-out sm:text-sm sm:leading-5'
                            />
                        )}
                    </div>
                    {!otpSent && (
                        <div className='my-4' id="recaptcha-container"></div>
                    )}
                    <span className="block w-full rounded-md shadow-sm">
                        <button
                            onClick={otp ? handleOtpSubmit : handleSendOtp}
                            type="submit"
                            disabled={loading || googleLoading}
                            className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:shadow-outline-indigo transition duration-150 ease-in-out"
                        >
                            {loading ? (
                                <svg className='w-5 h-5 mr-2 animate-spin' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                    <path fill="none" stroke="currentColor" strokeWidth="2" d="M12 2v6M12 16v6M4.22 4.22l4.24 4.24M15.54 15.54l4.24 4.24M2 12h6m10 0h6M4.22 19.78l4.24-4.24M15.54 8.46l4.24-4.24" />
                                </svg>
                            ) : otp ? 'Submit' : 'Send OTP'}
                        </button>
                    </span>
                    {!otpSent && (
                        <>
                            <div
                                className="my-4 flex items-center before:h-px before:flex-1 before:bg-gray-300 before:content-[''] after:h-px after:flex-1 after:bg-gray-300 after:content-['']">
                                <button type="button" className="flex items-center rounded-full border border-gray-300 bg-secondary-50 px-3 py-2 text-center text-sm font-medium text-gray-900 hover:bg-gray-100">
                                    OR
                                </button>
                            </div>
                            <span className="w-full flex justify-center items-center rounded-md shadow-sm mt-4">
                                <button
                                    onClick={handleGoogleLogin}
                                    type="button"
                                    disabled={googleLoading}
                                    className="w-full px-4 py-2 border flex justify-center items-center gap-2 border-purple-700 rounded-lg hover:border-2 hover:text-slate-900 hover:shadow transition-all duration-300 ease-in-out"
                                >
                                    {googleLoading ? (
                                        <svg className='w-5 h-5 mr-2 animate-spin' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                            <path fill="none" stroke="currentColor" strokeWidth="2" d="M12 2v6M12 16v6M4.22 4.22l4.24 4.24M15.54 15.54l4.24 4.24M2 12h6m10 0h6M4.22 19.78l4.24-4.24M15.54 8.46l4.24-4.24" />
                                        </svg>
                                    ) : (
                                        <>
                                            <Image className="w-6 h-6" width={24} height={24} src="https://www.svgrepo.com/show/475656/google-color.svg" loading="lazy" alt="Google logo" />
                                            <span className='text-sm flex items-center justify-center'>Sign-In with Google</span>
                                        </>
                                    )}
                                </button>
                            </span>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
