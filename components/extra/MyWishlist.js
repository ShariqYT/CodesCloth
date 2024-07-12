"use client"
import { CartContext } from '@/context/CartContext'
import React, { useContext, useEffect, useState, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { formatIndianCurrency } from './FormatAmount'
import toast from 'react-hot-toast'

const MyWishList = () => {
    const { user } = useContext(CartContext)
    const [wishList, setWishList] = useState([])
    const [loading, setLoading] = useState(false)
    const [spin, setSpin] = useState(false)

    const getWishList = useCallback(async () => {
        if (!user) return;
    
        setLoading(true);
    
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/getWishlist`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ phoneNumber: user.phoneNumber }),
            });
            const data = await response.json();
            setWishList(data.products || []);
        } catch (error) {
            console.error('Error fetching wishlist:', error);
        } finally {
            setLoading(false);
        }
    }, [user]);
    
    useEffect(() => {
        getWishList();
    }, [getWishList]);
    

    const removeFromWishlist = async (slug) => {
        setSpin(true)
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/removeWishlist`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ user, slug }),
            })
            const data = await response.json()
            if (data.success) {
                setWishList(wishList.filter((item) => item.slug !== slug))
                toast.success('Item removed from WishList', {
                    duration: 5000,
                    style: { border: '2px solid #7e22ce', padding: '15px 20px', marginBottom: '40px' }
                })
            }
        } catch (error) {
            console.log(error)
            toast.error('Failed to remove item from WishList', {
                duration: 5000,
                style: { border: '2px solid #7e22ce', padding: '15px 20px', marginBottom: '40px' }
            })
        } finally {
            setSpin(false)
        }
    }
    

    return (
        <div className='min-h-screen md:my-14 my-2 md:max-w-7xl m-auto'>
            <div className='flex flex-col items-center gap-1 justify-center'>
                <h3 className="text-2xl text-center mt-6 md:mt-0 font-semibold">My Wishlist</h3>
                <div data-aos="fade-right" data-aos-duration="1000" className="border-2 rounded border-purple-600 md:w-[12%] w-[25%]"></div>
            </div>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <ul className='flex justify-center flex-col border-2 border-purple-700 mx-4 mt-12 md:mt-20'>
                {wishList.length > 0 ? (
                        wishList.map((item, index) => (
                            <li key={index} className="flex items-center justify-between md:flex-row flex-col gap-8 border-t border-purple-700 px-3 md:px-8">
                                <div className='w-32 h-32 m-4 rounded-lg relative overflow-hidden'>
                                    <Image className='rounded-lg object-contain' sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw' src={item.img} alt={item.title} fill={true} />
                                </div>
                                <div className="w-full">
                                    <Link className='hover:underline text-purple-700 font-bold hover:text-purple-800' href={`/product/${item.slug}`} alt={item.title}>{item.title}</Link>
                                    <p>Size: <span className='font-medium'>{item.size}</span> </p>
                                    <p>Color: <span className='font-medium'>{item.color}</span> </p>
                                    <p>Price: <span className='text-purple-700 font-semibold text-lg'>₹ {formatIndianCurrency(item.price)}</span> </p>
                                </div>
                                <div className='md:w-52 mb-2 md:mb-0 flex items-center  gap-2'>
                                    <button onClick={() => { removeFromWishlist(item.slug) }} className="disabled:opacity-25 flex items-center justify-center gap-1 text-white bg-purple-700 border-0 py-2 px-6 focus:outline-none transition-colors duration-300 ease-in-out hover:bg-red-700 rounded">
                                        Remove
                                    </button>
                                </div>
                            </li>
                        ))
                    ) : (
                        <p className='flex justify-center items-center flex-col h-96'>
                            <svg className='w-12 h-12' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
                                <path d="M12 21C10.6588 21 9.88572 20.4278 8.33953 19.2834C0.221721 13.2749 1.01807 6.15294 4.53744 3.99415C7.21909 2.34923 9.55962 3.01211 10.9656 4.06801C11.5422 4.50096 11.8304 4.71743 12 4.71743C12.1696 4.71743 12.4578 4.50096 13.0344 4.06801C14.4404 3.01211 16.7809 2.34923 19.4626 3.99415C21.1812 5.04838 22.2505 7.28623 21.9494 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                <path d="M16 14L19 17M19 17L22 20M19 17L22 14M19 17L16 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            No items in your WishList</p>
                    )}
                </ul>
            )}
        </div>
    )
}

export default MyWishList
