"use client"
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { getAllUsers } from '@/actions/Admin/getAllUsers';

const ProductsReviews = ({ productId }) => {
    const [reviews, setReviews] = useState([]);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsersAndReviews = async () => {
            try {
                const fetchedUsers = await getAllUsers();
                setUsers(fetchedUsers);

                const res = await fetch(`/api/reviews?productId=${productId}`);
                if (!res.ok) {
                    throw new Error('Failed to fetch reviews');
                }
                const data = await res.json();
                setReviews(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        if (productId) {
            fetchUsersAndReviews();
        }
    }, [productId]);


    return (
        <div className='w-full'>
            {reviews.length > 0 ? (
                reviews.map(review => {
                    return (
                        <article key={review._id} className="md:p-6 p-4 mb-6 rounded-lg border-2 border-purple-700 shadow-lg">
                            <div className="flex items-center mb-4">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-10 h-10 me-4 rounded-full" fill="none">
                                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
                                    <path d="M7.5 17C9.8317 14.5578 14.1432 14.4428 16.5 17M14.4951 9.5C14.4951 10.8807 13.3742 12 11.9915 12C10.6089 12 9.48797 10.8807 9.48797 9.5C9.48797 8.11929 10.6089 7 11.9915 7C13.3742 7 14.4951 8.11929 14.4951 9.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                </svg>
                                <p className='font-semibold'>{review.name}</p>
                            </div>
                            <p className="mb-2 font-semibold">{review.subject}</p>
                            <div className="flex items-center mb-1 space-x-1 rtl:space-x-reverse">
                                {Array.from({ length: 5 }, (_, i) => (
                                    <svg key={i} className={`w-4 h-4 ${i < review.rating ? 'text-yellow-500' : 'text-gray-300'}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                    </svg>
                                ))}
                                <p className='px-2 text-gray-300'> | <span className='text-purple-700 font-medium px-2 text-sm'> Verified Purchase </span></p>
                            </div>
                            <h3 className="ms-2 text-sm font-semibold">{review.title}</h3>
                            <footer className="mb-5 text-sm"><p>Reviewed in India on {new Date(review.date).toLocaleTimeString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: '2-digit' })}</p></footer>
                            <p className="mb-2 text-md whitespace-pre-line">{review.comment}</p>
                        </article>
                    );
                })
            ) : (
                <p>No reviews yet.</p>
            )}
        </div>
    );
};

export default ProductsReviews;
