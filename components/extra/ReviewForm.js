"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { useDarkMode } from '@/context/DarkModeContext';
import Star from '@/components/extra/Stars';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { app } from '@/app/config';

const ReviewForm = ({ productId }) => {
    // const { user } = useContext(CartContext);
    const [user, setUser] = useState(null);
    const { isDarkMode } = useDarkMode();
    const [review, setReview] = useState({ rating: 0, comment: '', subject: '' });
    const [hasPurchased, setHasPurchased] = useState(false);
    const [open, setOpen] = useState(false);
    const router = useRouter();

    useEffect(() => {
        onAuthStateChanged(getAuth(app), (currentUser) => {
            setUser(currentUser);
        });
        if (user && productId) {
            const userIdentifier = user.email || user.phoneNumber.split('+91')[1];
            fetch(`/api/checkPurchase?productId=${productId}&user=${userIdentifier}`)
                .then(res => res.json())
                .then(data => setHasPurchased(data.hasPurchased))
                .catch(err => console.error('Error fetching purchase status:', err));
        }
    }, [productId, user]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await fetch(`/api/reviews`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                productId,
                ...review,
                user: user?.email || user?.phoneNumber.split('+91')[1]
            })
        });
        const data = await res.json();
        if (data.success) {
            toast.success(data.message, { duration: 5000, style: { border: '2px solid green', padding: '15px 20px', marginBottom: '40px' } });
            setReview({ rating: 0, comment: '', subject: '' });
            router.refresh();
        }else{
            setOpen(false);
            setReview({ rating: 0, comment: '', subject: '' });
            toast.error(data.error, { duration: 5000, style: { border: '2px solid red', padding: '15px 20px', marginBottom: '40px' } });
        }
    };

    const handleWriteReviewBtn = () => {
        if (!user) {
            toast.error('Please Sign-In to write a review', { duration: 5000, style: { border: '2px solid red', padding: '15px 20px', marginBottom: '40px' } });
        } else if (!hasPurchased) {
            toast.error('Please purchase this product to write a review', { duration: 5000, style: { border: '2px solid red', padding: '15px 20px', marginBottom: '40px' } });
        } else {
            setOpen(!open);
            setReview({ rating: 0, comment: '', subject: '' });
        }
    };

    const handleRatingClick = (rating) => {
        setReview({ ...review, rating });
    };

    const renderStars = () => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            if (i <= review.rating) {
                stars.push(
                    <Star key={i} filled={true} onClick={() => handleRatingClick(i)} />
                );
            } else if (i - 0.5 === review.rating) {
                stars.push(
                    <Star key={i} half={true} onClick={() => handleRatingClick(i - 0.5)} />
                );
            } else {
                stars.push(
                    <Star key={i} filled={false} onClick={() => handleRatingClick(i)} />
                );
            }
        }
        return stars;
    };

    return (
        <div className='flex flex-col items-center w-72'>
            <p className='text-sm text-red-600 mb-4 flex flex-col items-center justify-center w-48'>Note: Once you leave a review, <span>you can&apos;t edit/delete it.</span></p>
            <button
                className={`border-2 border-purple-700 ${isDarkMode ? 'hover:shadow-[0_0px_20px_0px_rgba(126,34,206,1)]' : 'hover:shadow-[0_0px_20px_0px_rgba(126,34,206,0.5)]'} transition-all duration-300 ease-in-out font-semibold py-2 px-6 rounded-lg`}
                onClick={handleWriteReviewBtn}
            >
                Leave a review
            </button>
            {open && (
                <form onSubmit={handleSubmit} className='mt-4 w-96'>
                    <div className='flex items-center flex-col'>
                        <p className='text-md'>{review.rating} out of 5</p>
                        <div className="flex items-center">
                            {renderStars()}
                        </div>
                    </div>
                    <div className='mt-4 px-8'>
                        <label htmlFor="subject">Subject:</label>
                        <input
                            type="text"
                            id="subject"
                            name="subject"
                            value={review.subject}
                            onChange={(e) => setReview({ ...review, subject: e.target.value })}
                            required
                            className={`w-full p-2 border-2 bg-transparent focus:outline-none focus:border-purple-700 rounded-lg`}
                        />
                    </div>
                    <div className="mt-4 px-8">
                        <label htmlFor="comment">Comment:</label>
                        <textarea
                            id="comment"
                            name="comment"
                            value={review.comment}
                            onChange={(e) => setReview({ ...review, comment: e.target.value })}
                            required
                            className={`w-full p-2 border-2 rounded-lg bg-transparent focus:outline-none focus:border-purple-700 resize-none`}
                            rows={5}
                        />
                    </div>
                    <button
                        type="submit"
                        className={`mt-4 mx-8 ${isDarkMode ? 'hover:shadow-[0_0px_20px_0px_rgba(126,34,206,1)]' : 'hover:shadow-[0_0px_20px_0px_rgba(126,34,206,0.5)]'} transition-all duration-300 ease-in-out bg-purple-700 text-white py-2 px-4 rounded-lg hover:bg-purple-800`}
                    >
                        Submit Review
                    </button>
                </form>
            )}
        </div>
    );
};

export default ReviewForm;