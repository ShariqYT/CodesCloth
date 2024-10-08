import React from 'react';

const Star = ({ filled, half, onClick }) => {
    return (
        <svg
            onClick={onClick}
            fill={filled ? "currentColor" : "none"}
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="w-6 h-6 text-yellow-500 cursor-pointer"
            viewBox="0 0 24 24"
        >
            {half ? (
                // Render half-filled star
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77V2z"></path>
            ) : (
                // Render full star
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
            )}
        </svg>
    );
};

export default Star;
