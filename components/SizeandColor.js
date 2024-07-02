"use client"
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const SizeandColor = ({ product, variants }) => {
    const [color, setColor] = useState(product.color)
    const [size, setSize] = useState(product.size)
    const router = useRouter()

    const refreshVaraint = (newSize, newColor) => {
        let url = `${process.env.NEXT_PUBLIC_HOST}/product/${variants[newColor][newSize]["slug"]}`
        router.push(url)
    }

    return (
        <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
            <div className="flex">
                <span className="mr-3">Color</span>
                {Object.keys(variants).includes('white') && Object.keys(variants['white']).includes(size) && <button onClick={() => { refreshVaraint(size, 'white') }} className={`border-2 rounded-full w-6 h-6 focus:outline-none ${color === 'white' ? 'border-black' : 'border-gray-300'}`}></button>}
                {Object.keys(variants).includes('red') && Object.keys(variants['red']).includes(size) && <button onClick={() => { refreshVaraint(size, 'red') }} className={`border-2 ml-1 bg-red-500 rounded-full w-6 h-6 focus:outline-none ${color === 'red' ? 'border-black' : 'border-gray-300'}`}></button>}
                {Object.keys(variants).includes('blue') && Object.keys(variants['blue']).includes(size) && <button onClick={() => { refreshVaraint(size, 'blue') }} className={`border-2 ml-1 bg-blue-500 rounded-full w-6 h-6 focus:outline-none ${color === 'blue' ? 'border-black' : 'border-gray-300'}`}></button>}
                {Object.keys(variants).includes('green') && Object.keys(variants['green']).includes(size) && <button onClick={() => { refreshVaraint(size, 'green') }} className={`border-2 ml-1 bg-green-500 rounded-full w-6 h-6 focus:outline-none ${color === 'green' ? 'border-black' : 'border-gray-300'}`}></button>}
                {Object.keys(variants).includes('yellow') && Object.keys(variants['yellow']).includes(size) && <button onClick={() => { refreshVaraint(size, 'yellow') }} className={`border-2 ml-1 bg-yellow-500 rounded-full w-6 h-6 focus:outline-none ${color === 'yellow' ? 'border-black' : 'border-gray-300'}`}></button>}
                {Object.keys(variants).includes('black') && Object.keys(variants['black']).includes(size) && <button onClick={() => { refreshVaraint(size, 'black') }} className={`border-2 ml-1 bg-black rounded-full w-6 h-6 focus:outline-none ${color === 'black' ? 'border-black' : 'border-gray-300'}`}></button>}
                {Object.keys(variants).includes('purple') && Object.keys(variants['purple']).includes(size) && <button onClick={() => { refreshVaraint(size, 'purple') }} className={`border-2 ml-1 bg-purple-500 rounded-full w-6 h-6 focus:outline-none ${color === 'purple' ? 'border-black' : 'border-gray-300'}`}></button>}
                {Object.keys(variants).includes('pink') && Object.keys(variants['pink']).includes(size) && <button onClick={() => { refreshVaraint(size, 'pink') }} className={`border-2 ml-1 bg-pink-300 rounded-full w-6 h-6 focus:outline-none ${color === 'pink' ? 'border-black' : 'border-gray-300'}`}></button>}
            </div>
            <div className="flex ml-6 items-center">
                <span className="mr-3">Size</span>
                <div className="relative">
                    <select value={size} onChange={(e) => { refreshVaraint(e.target.value, color) }} className="rounded border appearance-none border-gray-300 py-2 focus:outline-none ${color === 'white' ? 'border-black' : 'border-gray-300'} focus:ring-2 focus:ring-purple-700 focus:border-purple-700 text-base pl-3 pr-10">
                        {Object.keys(variants[color]).includes('S') && <option value={'S'}>S</option>}
                        {Object.keys(variants[color]).includes('M') && <option value={'M'}>M</option>}
                        {Object.keys(variants[color]).includes('L') && <option value={'L'}>L</option>}
                        {Object.keys(variants[color]).includes('XL') && <option value={'XL'}>XL</option>}
                        {Object.keys(variants[color]).includes('XXL') && <option value={'XXL'}>XXL</option>}
                    </select>
                    <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
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
