"use client"
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const SizeandColor = ({ product, variants }) => {
    const [color, setColor] = useState(product.color)
    const [size, setSize] = useState(product.size)
    const router = useRouter()

    const refreshVariant = (newSize, newColor) => {
        let url = `${process.env.NEXT_PUBLIC_URL}/product/${variants[newColor][newSize]["slug"]}`
        router.push(url)
    }

    const colors = Object.keys(variants)
    return (
        <div className="flex mt-6  items-center pb-5 border-b-2 border-gray-100">
            <div className="flex">
                <div className="hidden bg-blue-500 bg-cyan-500 bg-fuchsia-500 bg-gray-500 bg-green-500 bg-indigo-500 bg-lime-500
                 bg-orange-500 bg-pink-500 bg-purple-500 bg-red-500 bg-rose-500 bg-sky-500 bg-teal-500 bg-violet-500
                 bg-yellow-500">
                </div>

                <span className="mr-3">Color</span>
                {colors.map((col) => (
                    variants[col][size] && (
                        <button
                            key={col}
                            onClick={() => { refreshVariant(size, col) }}
                            className={`border-2 ml-1 bg-${col.toLowerCase()}${(col.toLowerCase() === 'black' || col.toLowerCase() === 'white' ? '' : '-500')} rounded-full w-6 h-6 focus:outline-none ${color === col ? 'border-black' : 'border-gray-300'}`}
                        ></button>
                    )
                ))}
            </div>
            <div className="flex ml-6 items-center">
                <span className="mr-3">Size</span>
                <div className="relative">
                    <select
                        value={size}
                        onChange={(e) => { refreshVariant(e.target.value, color) }}
                        className="rounded border appearance-none bg-transparent border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-purple-700 focus:border-purple-700 text-base pl-3 pr-10"
                    >
                        {Object.keys(variants[color]).map((sz) => (
                            <option key={sz} className='text-black' value={sz}>{sz}</option>
                        ))}
                    </select>
                    <span className="absolute right-0 top-0 h-full w-10 text-center pointer-events-none flex items-center justify-center">
                        <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4" viewBox="0 0 24 24">
                            <path d="M6 9l6 6 6-6"></path>
                        </svg>
                    </span>
                </div>
            </div>
        </div>
    )
}

export default SizeandColor
