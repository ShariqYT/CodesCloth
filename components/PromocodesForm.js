'use client';
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function PromocodesForm() {
    const [code, setCode] = useState('');
    const [discountAmount, setDiscountAmount] = useState('');
    const [discountType, setDiscountType] = useState('fixed');
    const [show, setShow] = useState(false);
    const [expiry, setExpiry] = useState('');
    const [active, setActive] = useState(true);
    const [allProducts, setAllProducts] = useState(false);
    const [limit, setLimit] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Basic client-side validation
        if (!code || !discountAmount || !expiry) {
            toast.error('All required fields must be provided', {
                duration: 5000,
                style: { border: '2px solid red', padding: '15px 20px', marginBottom: '40px' },
            });
            return;
        }

        setIsSubmitting(true);

        const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/addPromocodes`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                code,
                discountAmount,
                discountType,
                active,
                allProducts,
                limit,
                expiry,
            }),
        });

        const result = await response.json();
        if (response.ok) {
            toast.success('Promo code added successfully!', {
                duration: 5000,
                style: { border: '2px solid green', padding: '15px 20px', marginBottom: '40px' },
            });
            // Clear form fields
            setCode('');
            setDiscountAmount('');
            setDiscountType('fixed');
            setExpiry('');
            setActive(true);
            setAllProducts(false);
            setLimit(0);
        } else {
            toast.error(`Error: ${result.error}`, {
                duration: 5000,
                style: { border: '2px solid red', padding: '15px 20px', marginBottom: '40px' },
            });
        }

        setIsSubmitting(false);
    };

    return (
        <div className='md:w-[60vw] flex flex-col justify-center gap-4 mx-auto p-8 m-20 border-2 border-purple-700 rounded-xl'>
            <button onClick={() => setShow(!show)} className='flex items-center justify-center text-white bg-purple-700 border-0 py-2 px-6 focus:outline-none hover:bg-purple-800 transition-all duration-200 ease-in-out rounded-lg '>Create Promo Code</button>
            {show && (
                <>
                    <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
                        <div className='w-full'>
                            <label>Promo Code Name:</label>
                            <input
                                type="text"
                                value={code}
                                onChange={(e) => setCode(e.target.value.toUpperCase())}
                                placeholder="Promo Code"
                                required
                                className='w-full border-2 p-2 outline-none rounded-lg bg-transparent focus:border-purple-700'
                            />
                        </div>
                        <div className='w-full'>
                            <label>Discount Amount:</label>
                            <input
                                type="number"
                                value={discountAmount}
                                onChange={(e) => setDiscountAmount(e.target.value)}
                                placeholder="Discount Amount"
                                required
                                className='w-full border-2 p-2 outline-none rounded-lg bg-transparent focus:border-purple-700'
                            />
                        </div>
                        <div className='w-full'>
                            <label>Discount Type:</label>
                            <select
                                value={discountType}
                                onChange={(e) => setDiscountType(e.target.value)}
                                required
                                className='w-full border-2 p-2 outline-none rounded-lg bg-transparent focus:border-purple-700'
                            >
                                <option className='text-black' value="fixed">Fixed Amount</option>
                                <option className='text-black' value="percentage">Percentage</option>
                            </select>
                        </div>
                        <div className='flex items-center gap-4'>
                            <label>Expiry Date:</label>
                            <input
                                type="date"
                                value={expiry}
                                onChange={(e) => setExpiry(e.target.value)}
                                required
                                placeholder="Select expiry date"
                                min={new Date().toISOString().split('T')[0]}
                                max="2025-12-31"
                                className='border-2 p-2 outline-none rounded-lg text-black focus:border-purple-700'
                            />
                        </div>
                        <div className='w-full'>
                            <label className='flex gap-2 items-center'>
                                Active:
                                <input
                                    type="checkbox"
                                    checked={active}
                                    onChange={(e) => setActive(e.target.checked)}
                                    className='accent-purple-700 bg-transparent w-4 h-4'
                                />
                            </label>
                        </div>
                        <div className='w-full'>
                            <label className='flex gap-2 items-center'>
                                All Products:
                                <input
                                    type="checkbox"
                                    checked={allProducts}
                                    onChange={(e) => setAllProducts(e.target.checked)}
                                    className='accent-purple-700 bg-transparent w-4 h-4'
                                />
                            </label>
                        </div>
                        <div className='w-full'>
                            <label>Limit:</label>
                            <input
                                type="number"
                                value={limit}
                                min={0}
                                onChange={(e) => setLimit(e.target.value)}
                                placeholder="Limit"
                                className='w-full border-2 p-2 outline-none rounded-lg bg-transparent focus:border-purple-700'
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`p-2 rounded-lg ${isSubmitting ? 'bg-purple-400 text-white' : 'bg-purple-700 text-white'} transition-all duration-200 ease-in-out hover:bg-purple-800 focus:outline-none`}
                        >
                            {isSubmitting ? 'Submitting...' : 'Add Promo Code'}
                        </button>
                    </form>
                </>
            )}
        </div>
    );
}
