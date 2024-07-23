"use client";
import React, { useEffect, useState } from 'react';

const ReviewComponent = ({ productId }) => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await fetch(`/api/reviews?productId=${productId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch reviews');
                }
                const data = await response.json();
                setReviews(data);
            } catch (error) {
                setError('Error fetching reviews');
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchReviews();
    }, [productId]);

    if (loading) {
        return <div className="flex mb-4 items-center">
        <span className="flex items-center">
            {/* Render stars */}
            {Array.from({ length: 5 }, (_, i) => {
                return (
                    <svg
                        key={i}
                        className={`w-4 h-4 text-gray-300 `}
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 22 20"
                    >
                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                    </svg>
                );
            })}
            <span className='ml-3 md:block hidden'>0.0</span>
            <span className='ml-2 md:block hidden'>•</span>
            <span className="ml-2 md:block hidden text-purple-500">Review</span>
            <span className="ml-4 md:hidden text-sm">0</span>
        </span>
    </div>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    const totalReviews = reviews.length;
    const averageRating = totalReviews > 0 ? reviews.reduce((acc, review) => acc + review.rating, 0) / totalReviews : 0;

    // Calculate number of filled stars
    const filledStars = Math.floor(averageRating);

    return (
        <div className="flex mb-4 items-center">
            <span className="flex items-center">
                {/* Render stars */}
                {Array.from({ length: 5 }, (_, i) => {
                    const starRating = i + 1;
                    return (
                        <svg
                            key={i}
                            className={`w-4 h-4 ${starRating <= filledStars ? 'text-yellow-500' : 'text-gray-300'}`}
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 22 20"
                        >
                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                        </svg>
                    );
                })}
                <span className='ml-3 md:block hidden'>{averageRating.toFixed(1)}</span>
                <span className='ml-2 md:block hidden'>•</span>
                <span className="ml-2 md:block hidden text-purple-500">{totalReviews} {totalReviews <= 1 ? 'Review' : 'Reviews'}</span>
                <span className="ml-4 md:hidden text-sm">{totalReviews}</span>
            </span>
        </div>
    );
}

export default ReviewComponent;
