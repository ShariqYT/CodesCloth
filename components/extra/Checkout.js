"use client";
import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import Script from 'next/script';
import Image from 'next/image';
import { CartContext } from '@/context/CartContext';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { app } from '@/app/config';
import { useRouter } from 'next/navigation';
import { formatIndianCurrency } from '@/components/extra/FormatAmount';

const Checkoutpage = () => {
    const { subTotal, cart, clearCart } = useContext(CartContext);
    const [spin, setSpin] = useState(false);
    const [user, setUser] = useState(null);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [pincode, setPincode] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [promocode, setPromocode] = useState('');
    const [isApplying, setIsApplying] = useState(false);
    const [disabled, setDisabled] = useState(true);
    const [discount, setDiscount] = useState(0);
    const auth = getAuth(app);
    const router = useRouter();

    useEffect(() => {
        const fetchUser = async () => {
            const getUser = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/getUser`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user: user?.email || user?.phoneNumber?.split('+91')[1] || '',}),
            })

            const data = await getUser.json();
            if (data.success) {
                setName(data.name || '');
                setEmail(data.email || '');
                setPhone(data.phone || '');
                setAddress(data.address || '');
            }
        }
        document.title = 'Checkout | CodesCloth';
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
                if (user.phoneNumber) {
                    setPhone(user.phoneNumber.split('+91')[1] || '');
                } else if (user.email) {
                    setEmail(user.email);
                }
                else {
                    setPhone('');
                    setEmail('');
                }

            }
        });
        fetchUser();
        return () => unsubscribe();
    }, [auth, router, user]);

    useEffect(() => {
        if (name && email && address && phone && pincode && subTotal > 0) {
            setDisabled(false);
        } else {
            setDisabled(true);
        }
    }, [name, email, address, phone, pincode, subTotal]);

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
            case 'promocode':
                setPromocode(value.toUpperCase());
                break;
            case 'phone':
                if (value.length <= 10) {
                    setPhone(value);
                }
                break;
                case 'pincode':
                    if (value.length <= 6) {
                        setPincode(value);
                        try {
                            let response = await fetch(`https://api.postalpincode.in/pincode/${value}`);
                            let data = await response.json();
                
                            if (data[0]?.PostOffice?.length > 0) {
                                setState(data[0].PostOffice[0].State);
                                setCity(data[0].PostOffice[0].Block);
                            } else {
                                setState('');
                                setCity('');
                            }
                        } catch (error) {
                            setState('');
                            setCity('');
                        }
                    } else {
                        setState('');
                        setCity('');
                    }
                    break;
                
            default:
                break;
        }
    };

    const checkPromocodes = async () => {
        setIsApplying(true);
        const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/checkPromocodes`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                promoCode: promocode,
                subTotal
            }),
        });

        let data = await response.json();
        if (data.success) {
            setDiscount(Math.floor(data.discountAmount));
            toast.success(data.message, { duration: 5000, style: { border: '2px solid green', padding: '15px 20px', marginBottom: '40px' } });
        } else {
            setDiscount(0);
            toast.error(data.error, { duration: 5000, style: { border: '2px solid red', padding: '15px 20px', marginBottom: '40px' } });
        }
        setIsApplying(false);
    };

    const removePromocode = () => {
        toast.success('Promocode removed', { duration: 5000, style: { border: '2px solid green', padding: '15px 20px', marginBottom: '40px' } });
        setPromocode('');
        setDiscount(0);
    };

    const createOrderId = async () => {
        setSpin(true);
        try {
            let oid = Math.floor(Math.random() * Date.now());
            const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/razorpayOrder`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    amount: subTotal - discount,
                    currency: 'INR',
                    address,
                    phone,
                    oid,
                    cart,
                    subTotal,
                    email,
                    name,
                    pincode,
                    city,
                    state,
                    user
                }),
            });

            let data = await response.json();
            if (!data.success) {
                if (data.clearCart) {
                    clearCart();
                }
                toast.error(data.error, { duration: 5000, style: { border: '2px solid red', padding: '15px 20px', marginBottom: '40px' } });
                return null;
            }
            return data.orderId;
        } catch (error) {
            toast.error('Failed to create Order ', { duration: 5000, style: { border: '2px solid red', padding: '15px 20px', marginBottom: '40px' } });
            return null;
        }
    };
    const processPayment = async (e) => {
        e.preventDefault();

        try {
            const orderId = await createOrderId();
            if (!orderId) {
                setSpin(false);
                return;
            }


            const options = {
                key: process.env.NEXT_PUBLIC_RAZORPAY_ID,
                amount: parseFloat(subTotal - discount) * 100, // Apply discount
                currency: 'INR',
                name: 'CodesCloth',
                description: 'Test Transaction',
                image: 'https://codescloth.netlify.app/logo-2.png,',
                order_id: orderId,
                handler: async function (response) {
                    const data = {
                        orderCreationId: orderId,
                        razorpayPaymentId: response.razorpay_payment_id,
                        razorpayOrderId: response.razorpay_order_id,
                        razorpaySignature: response.razorpay_signature,
                        promocode: promocode,
                    };

                    const result = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/razorpayVerify`, {
                        method: 'POST',
                        body: JSON.stringify({ ...data, cart, subTotal }),
                        headers: { 'Content-Type': 'application/json' },
                    });
                    const res = await result.json();
                    if (res.success) {
                        setSpin(false);
                        clearCart();
                        setPromocode('');
                        setDiscount(0);
                        toast.success(res.message, { duration: 5000, style: { border: '2px solid green', padding: '15px 20px', marginBottom: '40px' } });
                        router.push('/order-placed?id=' + res.order._id);
                    } else {
                        setSpin(false);
                        toast.error(res.error, { duration: 5000, style: { border: '2px solid red', padding: '15px 20px', marginBottom: '40px' } });
                    }
                },
                prefill: {
                    name,
                    email,
                    contact: phone,
                },
                theme: {
                    color: '#5500ff',
                },
            };
            const paymentObject = new window.Razorpay(options);
            paymentObject.open();
        } catch (error) {
            toast.error("Payment process failed", { duration: 5000, style: { border: '2px solid red', padding: '15px 20px', marginBottom: '40px' } });
        }
        setSpin(false);
    };

    const inrSubTotal = formatIndianCurrency(subTotal);
    const inrDiscount = formatIndianCurrency(discount);
    const inrTotal = formatIndianCurrency(subTotal - discount);
    return (
        <div className='h-fit container shadow-2xl rounded-xl mb-24 border-2 border-purple-700 m-auto my-20'>

            <Script id='razorpay-checkout-js' src='https://checkout.razorpay.com/v1/checkout.js' />
            <h1 className='text-4xl font-bold text-center my-8'>Checkout</h1>
            <div className='flex flex-col md:flex-row my-20'>
                <div className='md:w-1/2 lg:px-20'>
                    <h2 className='mb-8 font-semibold text-2xl'>1. Delivery Details</h2>
                    <div className='grid md:grid-cols-2 gap-4'>
                        <div className='w-full'>
                            <label htmlFor='name' className='block  mb-1'>
                                Full Name
                            </label>
                            <input
                                name='name'
                                value={name}
                                onChange={handleChange}
                                placeholder='John'
                                type='text'
                                id='name'
                                className='w-full outline-none bg-transparent focus:border-purple-700 rounded-lg border-2 py-2 px-3'
                            />
                        </div>
                        <div>
                            <label htmlFor='email' className='block  mb-1'>
                                Email
                            </label>
                            <input
                                name='email'
                                value={email}
                                onChange={handleChange}
                                placeholder='email@example.com'
                                type='text'
                                id='email'
                                className='w-full outline-none bg-transparent focus:border-purple-700 rounded-lg border-2 py-2 px-3'
                            />
                        </div>
                    </div>

                    <div className='mt-4'>
                        <label htmlFor='address' className='block  mb-1'>
                            Address
                        </label>
                        <input
                            name='address'
                            onChange={handleChange}
                            value={address}
                            type='text'
                            id='address'
                            placeholder='your address'
                            className='w-full outline-none bg-transparent resize-none focus:border-purple-700 rounded-lg border-2 py-2 px-3'
                        />
                    </div>

                    <div className='mt-4 grid grid-cols-2 gap-4'>
                        <div>
                            <label htmlFor='phone' className='block  mb-1'>
                                Phone Number
                            </label>
                            <input
                                name='phone'
                                value={phone}
                                onChange={handleChange}
                                type='number'
                                id='phone'
                                placeholder='10 digits phone number'
                                className='w-full outline-none bg-transparent focus:border-purple-700 rounded-lg border-2 py-2 px-3'
                            />
                        </div>
                        <div>
                            <label htmlFor='pincode' className='block  mb-1'>
                                PIN Code
                            </label>
                            <input
                                name='pincode'
                                value={pincode}
                                onChange={handleChange}
                                maxLength={6}
                                type='number'
                                id='pincode'
                                placeholder='211004'
                                className='w-full outline-none bg-transparent focus:border-purple-700 rounded-lg border-2 py-2 px-3'
                            />
                        </div>
                    </div>

                    <div className='grid md:grid-cols-2 gap-4 mt-4'>
                        <div>
                            <label htmlFor='city' className='block  mb-1'>
                                City
                            </label>
                            <input
                                readOnly
                                onChange={handleChange}
                                value={city}
                                name='city'
                                type='text'
                                id='city'
                                placeholder='Automatically Generate'
                                className='w-full outline-none bg-transparent focus:border-purple-700 rounded-lg border-2 py-2 px-3'
                            />
                        </div>
                        <div>
                            <label htmlFor='state' className='block  mb-1'>
                                State
                            </label>
                            <input
                                readOnly
                                onChange={handleChange}
                                value={state}
                                name='state'
                                type='text'
                                id='state'
                                placeholder='Automatically Generate'
                                className='w-full outline-none bg-transparent focus:border-purple-700 rounded-lg border-2 py-2 px-3'
                            />
                        </div>
                    </div>
                </div>
                <div className='w-1 opacity-40 rounded bg-purple-700'></div>
                <div className='md:w-1/2 lg:px-20 mt-14 lg:mt-0'>
                    <h2 className='mb-8 font-semibold text-2xl'>2. Payment Details</h2>
                    <div className='h-full'>
                        <div>
                            <div className='flex justify-between mb-2'>
                                <span>Subtotal</span>
                                <span>₹ {inrSubTotal ? inrSubTotal : 0}</span>
                            </div>
                            {discount > 0 && (
                                <div className={`flex items-center justify-between mb-2`}>
                                    <span className='flex items-center'>
                                        Promo Code
                                        <span className='md:ml-2 bg-purple-800 font-semibold text-[10px] md:text-sm rounded py-1 px-2 text-white'>
                                            {promocode}
                                        </span>
                                        <button onClick={removePromocode} className=' ml-2 bg-red-500 py-1 px-2 rounded '>
                                            <svg className='md:w-6 w-4' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" color='white' fill="none">
                                                <path d="M19.5 5.5L18.8803 15.5251C18.7219 18.0864 18.6428 19.3671 18.0008 20.2879C17.6833 20.7431 17.2747 21.1273 16.8007 21.416C15.8421 22 14.559 22 11.9927 22C9.42312 22 8.1383 22 7.17905 21.4149C6.7048 21.1257 6.296 20.7408 5.97868 20.2848C5.33688 19.3626 5.25945 18.0801 5.10461 15.5152L4.5 5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                                <path d="M3 5.5H21M16.0557 5.5L15.3731 4.09173C14.9196 3.15626 14.6928 2.68852 14.3017 2.39681C14.215 2.3321 14.1231 2.27454 14.027 2.2247C13.5939 2 13.0741 2 12.0345 2C10.9688 2 10.436 2 9.99568 2.23412C9.8981 2.28601 9.80498 2.3459 9.71729 2.41317C9.32164 2.7167 9.10063 3.20155 8.65861 4.17126L8.05292 5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                                <path d="M9.5 16.5L9.5 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                                <path d="M14.5 16.5L14.5 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                            </svg>
                                        </button>
                                    </span>
                                    <span className='text-green-600'>- ₹ {inrDiscount}</span>
                                </div>
                            )}
                            <div className='flex justify-between mb-2'>
                                <span>Shipping</span>
                                <span>₹ FREE</span>
                            </div>
                            <hr className='my-2' />
                            <div className='flex justify-between mb-2'>
                                <span className='font-semibold'>Total</span>
                                <span className='font-bold text-xl text-purple-600'>₹ {inrTotal ? inrTotal : 0}</span>
                            </div>
                        </div>
                        <button
                            onClick={processPayment}
                            disabled={!subTotal || disabled || phone.length < 10 || pincode.length < 6}
                            className='bg-purple-700 hover:bg-purple-900 disabled:opacity-25 flex items-center justify-center gap-1 text-white py-2 px-4 rounded-lg mt-4 w-full'
                        >
                            {spin && <svg className='w-4 h-4' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M12,23a9.63,9.63,0,0,1-8-9.5,9.51,9.51,0,0,1,6.79-9.1A1.66,1.66,0,0,0,12,2.81h0a1.67,1.67,0,0,0-1.94-1.64A11,11,0,0,0,12,23Z"><animateTransform attributeName="transform" dur="0.75s" repeatCount="indefinite" type="rotate" values="0 12 12;360 12 12" /></path></svg>}{spin ? '' : 'Proceed to Payment'}
                        </button>
                        <div className='mt-10 text-center lg:text-start'>
                            <label className='font-semibold' htmlFor='promocode'>
                                Promo Code
                            </label>
                            <div className='flex flex-col lg:flex-row gap-2 items-center'>
                                <input
                                    readOnly={discount}
                                    name='promocode'
                                    onChange={handleChange}
                                    value={promocode}
                                    type='text'
                                    id='promocode'
                                    placeholder='Enter Code'
                                    className='outline-none bg-transparent focus:border-purple-700 rounded-lg border-2 py-2 px-3'
                                />
                                <button type='button' onClick={checkPromocodes} disabled={discount} className='disabled:opacity-25 bg-purple-700 hover:bg-purple-900 flex justify-center items-center gap-1 text-white py-2 px-4 rounded-lg'>{isApplying && <svg className='w-4 h-4' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M12,23a9.63,9.63,0,0,1-8-9.5,9.51,9.51,0,0,1,6.79-9.1A1.66,1.66,0,0,0,12,2.81h0a1.67,1.67,0,0,0-1.94-1.64A11,11,0,0,0,12,23Z"><animateTransform attributeName="transform" dur="0.75s" repeatCount="indefinite" type="rotate" values="0 12 12;360 12 12" /></path></svg>}{isApplying ? 'Applying...' : 'Apply'}</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex flex-col justify-center items-center md:m-20'>
                <h1 className='md:text-4xl text-3xl font-bold'>Review Item</h1>
                <div className='border-4 border-purple-700  overflow-y-scroll h-fit rounded-lg mt-10 w-full md:p-10'>
                    {Object.keys(cart).length == 0 && (
                        <p className='text-2xl font-bold flex justify-center flex-col-reverse gap-4 items-center py-32'>
                            Your Cart is empty.
                            <svg
                                className='w-12'
                                xmlns='http://www.w3.org/2000/svg'
                                viewBox='0 0 24 24'
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
                                <div className='justify-between flex items-end md:items-center px-4 py-8 md:p-10 md:py-8'>
                                    <div className='flex md:flex-row flex-col gap-4 md:justify-center items-center'>
                                        <div className='overflow-hidden relative w-32 h-32'>
                                            <Image
                                                src={cart[k].img}
                                                priority={true}
                                                alt='Product Image'
                                                fill={true}
                                                sizes='100%'
                                                className='rounded-lg object-contain bg-white'
                                            />
                                        </div>
                                        <div className='md:px-8'>
                                            <p className='md:text-lg font-bold leading-none '>{cart[k].name}</p>
                                            <p className='text-sm leading-3  font-semibold pt-2'>Size: {cart[k].size}</p>
                                            <p className='text-sm leading-3  font-semibold py-4'>Color: {cart[k].variant}</p>
                                            <p className='text-xl font-bold text-purple-600 leading-none '>₹{cart[k].price}</p>
                                        </div>
                                    </div>
                                    <p aria-label='Select quantity' className='py-2 px-4 border-2 border-purple-700 md:mr-6'>
                                        {cart[k].qty}
                                    </p>
                                </div>
                            </li>
                        );
                    })}
                </div>
            </div>
        </div>
    )
}

export default Checkoutpage
