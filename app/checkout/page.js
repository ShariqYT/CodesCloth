/* eslint-disable react-hooks/rules-of-hooks */
"use client"
import React, { useContext, useEffect, useState } from 'react';
import { CartContext } from '@/context/CartContext';
import Image from 'next/image';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { app } from '@/app/config';
import { useRouter } from 'next/navigation';
import Script from 'next/script';
import Logo from '@/public/logo-2.png';
import { toast, Toaster } from 'react-hot-toast';
import { formatIndianCurrency } from '@/components/FormatAmount';

const page = () => {
    const { subTotal, cart, clearCart, user } = useContext(CartContext);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [pincode, setPincode] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [disabled, setDisabled] = useState(true);
    const [success, setSuccess] = useState(true);
    const auth = getAuth(app);
    const router = useRouter();

    

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setPhone(user.phoneNumber.split('+91')[1] || ''); // Set phone number if available
            } else {
                // User is signed out
                setPhone('');
            }
        });

        return () => unsubscribe();
    }, [auth]);

    const handleChange = async (e) => {
        const { name, value } = e.target;

        switch (name) {
            case 'name':
                setName(value);
                break;
            case 'email':
                setEmail(value);
                break;
            case 'address':
                setAddress(value);
                break;
            case 'pincode':
                setPincode(value);
                if (e.target.value.length === 6) {
                    let pins = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pincode`)
                    let pinJson = await pins.json()
                    if (Object.keys(pinJson).includes(e.target.value)) {
                        setState(pinJson[e.target.value][1])
                        setCity(pinJson[e.target.value][0])
                    } else {
                        setState('')
                        setCity('')
                    }
                } else {
                    setState('')
                    setCity('')
                }
                break;
            default:
                break;
        }
    };

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (!user) {
                router.push('/login');
            }
        });
    }, [auth, router]);

    useEffect(() => {
        // Check if all fields are filled and subTotal is greater than 0
        if (name && email && address && phone && pincode && subTotal > 0) {
            setDisabled(false);
        } else {
            setDisabled(true);
        }
    }, [name, email, address, phone, pincode, subTotal]);

    const createOrderId = async () => {
        try {
            let oid = Math.floor(Math.random() * Date.now());
            const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/razorpayOrder`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    amount: subTotal,
                    currency: 'INR',
                    address: address,
                    phone: phone,
                    oid: oid,
                    cart: cart,
                    subTotal: subTotal,
                    email: email,
                    name: name,
                    pincode: pincode,
                    city: city,
                    state: state
                }),
            });

            let data = await response.json();
            if (data.success == false) {
                if(data.clearCart){
                    clearCart();
                }
                toast.error(data.error, { duration: 5000, style: { border: '2px solid red', padding: '15px 20px' } });
                setSuccess(false);
                return null;
            }
            setSuccess(true);
            return data.orderId;
        } catch (error) {
            console.error('There was a problem with your fetch operation:', error);
            setSuccess(false);
            return null;
        }
    };

    const processPayment = async (e) => {
        e.preventDefault();
        try {
            const orderId = await createOrderId();
            if (!orderId) {
                return;
            }

            const options = {
                key: process.env.NEXT_PUBLIC_RAZORPAY_ID,
                amount: parseFloat(subTotal) * 100,
                currency: 'INR',
                name: 'CodesCloth',
                description: 'Test Transaction',
                image: Logo,
                order_id: orderId,
                handler: async function (response) {
                    const data = {
                        orderCreationId: orderId,
                        razorpayPaymentId: response.razorpay_payment_id,
                        razorpayOrderId: response.razorpay_order_id,
                        razorpaySignature: response.razorpay_signature,
                    };

                    const result = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/razorpayVerify`, {
                        method: 'POST',
                        body: JSON.stringify({ ...data, cart, subTotal }),
                        headers: { 'Content-Type': 'application/json' },
                    });
                    const res = await result.json();
                    if (res.success) {
                        clearCart();
                        toast.success(res.message, { duration: 5000, style: { border: '2px solid green', padding: '15px 20px' } });
                        router.push('/order-placed?id=' + res.order._id);
                    } else {
                        toast.error(res.error, { duration: 5000, style: { border: '2px solid red', padding: '15px 20px' } });
                    }
                },
                prefill: {
                    name: name,
                    email: email,
                },
                theme: {
                    color: '#5500ff',
                },
            };
            const paymentObject = new window.Razorpay(options);
            paymentObject.on('payment.failed', function (response) {
                toast.error(response.error.description, { duration: 5000, style: { border: '2px solid red', padding: '15px 20px' } });
            });
            paymentObject.open();
        } catch (error) {
            console.error(error);
        }
    };


    const inrSubTotal = formatIndianCurrency(subTotal);

    return (
        <div className='h-fit container shadow-2xl rounded-xl mb-24 border-2 border-purple-700 m-auto my-20'>
            <Toaster position='bottom-center' reverseOrder={false} />
            <Script id='razorpay-checkout-js' src='https://checkout.razorpay.com/v1/checkout.js' />
            <h1 className='text-4xl font-bold text-center my-8'>Checkout</h1>
            <div className='flex my-20'>
                <div className='w-1/2 px-20'>
                    <h2 className='mb-8 font-semibold text-2xl'>Delivery Details</h2>
                    <div className='grid grid-cols-2 gap-4'>
                        <div className='w-full'>
                            <label htmlFor='name' className='block text-black mb-1'>
                                Full Name
                            </label>
                            <input
                                name='name'
                                value={name}
                                onChange={handleChange}
                                placeholder='John'
                                type='text'
                                id='name'
                                className='w-full outline-none focus:border-purple-700 rounded-lg border-2 py-2 px-3'
                            />
                        </div>
                        <div>
                            <label htmlFor='email' className='block text-black mb-1'>
                                Email
                            </label>
                            <input
                                name='email'
                                value={email}
                                onChange={handleChange}
                                placeholder='email@example.com'
                                type='text'
                                id='email'
                                className='w-full outline-none focus:border-purple-700 rounded-lg border-2 py-2 px-3'
                            />
                        </div>
                    </div>

                    <div className='mt-4'>
                        <label htmlFor='address' className='block text-black mb-1'>
                            Address
                        </label>
                        <input
                            name='address'
                            onChange={handleChange}
                            value={address}
                            type='text'
                            id='address'
                            placeholder='your address'
                            className='w-full outline-none resize-none focus:border-purple-700 rounded-lg border-2 py-2 px-3'
                        />
                    </div>

                    <div className='mt-4 grid grid-cols-2 gap-4'>
                        <div>
                            <label htmlFor='phone' className='block text-black mb-1'>
                                Phone Number
                            </label>
                            <input
                                readOnly
                                name='phone'
                                value={phone}
                                onChange={handleChange}
                                type='number'
                                id='phone'
                                placeholder='10 digits phone number'
                                className='w-full outline-none focus:border-purple-700 rounded-lg border-2 py-2 px-3'
                            />
                        </div>
                        <div>
                            <label htmlFor='pincode' className='block text-black mb-1'>
                                PIN Code
                            </label>
                            <input
                                name='pincode'
                                value={pincode}
                                onChange={handleChange}
                                type='number'
                                id='pincode'
                                placeholder='211004'
                                className='w-full outline-none focus:border-purple-700 rounded-lg border-2 py-2 px-3'
                            />
                        </div>
                    </div>

                    <div className='grid grid-cols-2 gap-4 mt-4'>
                        <div>
                            <label htmlFor='city' className='block text-black mb-1'>
                                City
                            </label>
                            <input
                                onChange={handleChange}
                                value={city}
                                name='city'
                                type='text'
                                id='city'
                                placeholder='Automatically Generate'
                                className='w-full outline-none focus:border-purple-700 rounded-lg border-2 py-2 px-3'
                            />
                        </div>
                        <div>
                            <label htmlFor='state' className='block text-black mb-1'>
                                State
                            </label>
                            <input
                                onChange={handleChange}
                                value={state}
                                name='state'
                                type='text'
                                id='state'
                                placeholder='Automatically Generate'
                                className='w-full outline-none focus:border-purple-700 rounded-lg border-2 py-2 px-3'
                            />
                        </div>
                    </div>
                </div>
                <div className='w-1 opacity-40 rounded bg-purple-700'></div>
                <div className='w-1/2 px-20'>
                    <h2 className='mb-8 font-semibold text-2xl'>Payment Details</h2>
                    <div className='h-full'>
                        <div>
                            <div className='flex justify-between mb-2'>
                                <span>Subtotal</span>
                                <span>₹{inrSubTotal ? inrSubTotal : 0}</span>
                            </div>
                            <div className='flex justify-between mb-2'>
                                <span>
                                    Promo Code{' '}
                                    <span className='ml-2 bg-purple-800 font-semibold text-sm rounded py-1 px-2 opacity-75 text-white'>
                                        CODESCLOTH100
                                    </span>
                                </span>
                                <span>-₹100</span>
                            </div>
                            <div className='flex justify-between mb-2'>
                                <span>Shipping</span>
                                <span>₹FREE</span>
                            </div>
                            <hr className='my-2' />
                            <div className='flex justify-between mb-2'>
                                <span className='font-semibold'>Total</span>
                                <span className='font-bold text-xl text-purple-700'>₹{inrSubTotal ? inrSubTotal : 0}</span>
                            </div>
                        </div>
                        <button
                            onClick={processPayment}
                            disabled={!subTotal || disabled}
                            className='bg-purple-700 hover:bg-purple-900 disabled:opacity-25 flex items-center justify-center gap-2 text-white py-2 px-4 rounded-lg mt-4 w-full'
                        >
                            PAY
                        </button>
                        <div className='mt-10'>
                            <label className='font-semibold' htmlFor='promocode'>
                                {' '}
                                Promo Code{' '}
                            </label>
                            <div className='flex gap-2 items-center'>
                                <input
                                    name='promocode'
                                    onChange={handleChange}
                                    type='text'
                                    id='promocode'
                                    placeholder='Enter Code'
                                    className='outline-none focus:border-purple-700 rounded-lg border-2 py-2 px-3'
                                />
                                <button className='bg-purple-700 hover:bg-purple-900 text-white py-2 px-4 rounded-lg'>APPLY</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex flex-col justify-center items-center m-20'>
                <h1 className='text-4xl font-bold'>Review Item</h1>
                <div className='border-4 border-purple-700  overflow-y-scroll h-fit rounded-lg mt-10 w-full p-10'>
                    {Object.keys(cart).length == 0 && (
                        <p className='text-2xl font-bold flex justify-center gap-4 items-center py-32'>
                            Your Cart is empty.
                            <svg
                                className='w-12'
                                xmlns='http://www.w3.org/2000/svg'
                                viewBox='0 0 24 24'
                                color='#000000'
                                fill='none'
                            >
                                <path
                                    d='M8 16H15.2632C19.7508 16 20.4333 13.1808 21.261 9.06908C21.4998 7.88311 21.6192 7.29013 21.3321 6.89507C21.045 6.5 20.4947 6.5 19.3941 6.5H19M6 6.5H8'
                                    stroke='currentColor'
                                    strokeWidth='1.5'
                                    strokeLinecap='round'
                                />
                                <path
                                    d='M10.5 3L13.5 6M13.5 6L16.5 9M13.5 6L10.5 9M13.5 6L16.5 3'
                                    stroke='currentColor'
                                    strokeWidth='1.5'
                                    strokeLinecap='round'
                                />
                                <path
                                    d='M8 16L5.37873 3.51493C5.15615 2.62459 4.35618 2 3.43845 2H2.5'
                                    stroke='currentColor'
                                    strokeWidth='1.5'
                                    strokeLinecap='round'
                                />
                                <path
                                    d='M8.88 16H8.46857C7.10522 16 6 17.1513 6 18.5714C6 18.8081 6.1842 19 6.41143 19H17.5'
                                    stroke='currentColor'
                                    strokeWidth='1.5'
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                />
                                <circle cx='10.5' cy='20.5' r='1.5' stroke='currentColor' strokeWidth='1.5' />
                                <circle cx='17.5' cy='20.5' r='1.5' stroke='currentColor' strokeWidth='1.5' />
                            </svg>
                        </p>
                    )}
                    {Object.keys(cart).map((k) => {
                        return (
                            <li className='list-none' key={k}>
                                <div className='md:flex justify-between border-2 rounded-full items-center py-8 md:p-10 lg:py-8'>
                                    <div className='flex justify-center items-center'>
                                        <Image
                                            unoptimized
                                            src={cart[k].img}
                                            priority={true}
                                            alt='Product Image'
                                            width={100}
                                            height={100}
                                            className='w-[7vw] object-cover md:block'
                                        />
                                        <div className='px-8'>
                                            <p className='text-lg font-bold leading-none text-gray-800'>{cart[k].name}</p>
                                            <p className='text-sm leading-3 text-gray-800 font-semibold pt-2'>Size: {cart[k].size}</p>
                                            <p className='text-sm leading-3 text-gray-800 font-semibold py-4'>Color: {cart[k].variant}</p>
                                            <p className='text-xl font-bold leading-none text-gray-800'>₹{cart[k].price}</p>
                                        </div>
                                    </div>
                                    <p aria-label='Select quantity' className='py-2 px-4 border-2 border-purple-700 mr-6'>
                                        {cart[k].qty}
                                    </p>
                                </div>
                            </li>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default page;
