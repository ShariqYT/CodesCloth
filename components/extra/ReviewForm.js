"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { useDarkMode } from '@/context/DarkModeContext';
import Star from '@/components/extra/Stars';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { app } from '@/app/config';

const ReviewForm = ({ productId }) => {
    const [user, setUser] = useState(null);
    const { isDarkMode } = useDarkMode();
    const [review, setReview] = useState({ rating: 0, comment: '', subject: '' });
    const [hasPurchased, setHasPurchased] = useState(false);
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const auth = getAuth(app);
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        if (user && productId) {
            const userIdentifier = user.email || user.phoneNumber?.split('+91')[1];
            fetch(`/api/checkPurchase?productId=${productId}&user=${userIdentifier}`)
                .then(res => res.json())
                .then(data => setHasPurchased(data.hasPurchased))
                .catch(err => console.error('Error fetching purchase status:', err));
        }
    }, [productId, user]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await fetch('/api/reviews', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ productId, ...review, user: user?.email || user?.phoneNumber?.split('+91')[1] })
            });
            const data = await response.json();
            if (data.success) {
                toast.success(data.message, { duration: 5000, style: { border: '2px solid green', padding: '15px 20px', marginBottom: '40px' } });
                setReview({ rating: 0, comment: '', subject: '' });
                router.refresh();
            } else {
                setOpen(false);
                setReview({ rating: 0, comment: '', subject: '' });
                toast.error(data.error, { duration: 5000, style: { border: '2px solid red', padding: '15px 20px', marginBottom: '40px' } });
            }
        } catch (error) {
            console.error('Error submitting review:', error);
            toast.error('An error occurred while submitting your review.', { duration: 5000, style: { border: '2px solid red', padding: '15px 20px', marginBottom: '40px' } });
        } finally {
            setLoading(false);
        }
    };

    const handleWriteReviewBtn = () => {
        if (!user) {
            toast.error('Please Sign-In to write a review', { duration: 5000, style: { border: '2px solid red', padding: '15px 20px', marginBottom: '40px' } });
        } else if (!hasPurchased) {
            toast.error('Please purchase this product to write a review', { duration: 5000, style: { border: '2px solid red', padding: '15px 20px', marginBottom: '40px' } });
        } else {
            setOpen(prev => !prev);
            setReview({ rating: 0, comment: '', subject: '' });
        }
    };

    const handleRatingClick = (rating) => {
        setReview(prev => ({ ...prev, rating }));
    };

    const renderStars = () => {
        return Array.from({ length: 5 }, (_, i) => {
            const starRating = i + 1;
            const isFilled = starRating <= review.rating;
            const isHalf = !isFilled && (starRating - 0.5 === review.rating);
            return (
                <Star
                    key={i}
                    filled={isFilled}
                    half={isHalf}
                    onClick={() => handleRatingClick(isHalf ? starRating - 0.5 : starRating)}
                />
            );
        });
    };

    return (
        <div className='flex flex-col items-center w-72'>
            <p className='text-sm text-red-600 mb-4 flex flex-col items-center justify-center w-48'>
                Note: Once you leave a review, <span>you can&apos;t edit/delete it.</span>
            </p>
            <button
                className={`border-2 border-purple-700 ${isDarkMode ? 'hover:shadow-[0_0px_20px_0px_rgba(126,34,206,1)]' : 'hover:shadow-[0_0px_20px_0px_rgba(126,34,206,0.5)]'} transition-all duration-300 ease-in-out font-semibold py-2 px-6 rounded-lg`}
                onClick={handleWriteReviewBtn}
            >
                Leave a review
            </button>
            {open && (
                <form onSubmit={handleSubmit} className='mt-4 md:w-96 flex flex-col items-center'>
                    <div className='flex items-center flex-col'>
                        <p className='text-md'>{review.rating} out of 5</p>
                        <div className="flex items-center">{renderStars()}</div>
                    </div>
                    <div className='mt-4 px-8'>
                        <label htmlFor="subject">Subject:</label>
                        <input
                            type="text"
                            id="subject"
                            name="subject"
                            value={review.subject}
                            onChange={(e) => setReview(prev => ({ ...prev, subject: e.target.value }))}
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
                            onChange={(e) => setReview(prev => ({ ...prev, comment: e.target.value }))}
                            required
                            className={`w-full p-2 border-2 rounded-lg bg-transparent focus:outline-none focus:border-purple-700 resize-none`}
                            rows={5}
                        />
                    </div>
                    <button
                        type="submit"
                        className={`mt-4 mx-8 ${isDarkMode ? 'hover:shadow-[0_0px_20px_0px_rgba(126,34,206,1)]' : 'hover:shadow-[0_0px_20px_0px_rgba(126,34,206,0.5)]'} transition-all duration-300 ease-in-out bg-purple-700 text-white py-2 px-4 rounded-lg hover:bg-purple-800`}
                        disabled={loading}
                    >
                        {loading ? 'Submitting...' : 'Submit Review'}
                    </button>
                </form>
            )}
        </div>
    );
};

export default ReviewForm;
