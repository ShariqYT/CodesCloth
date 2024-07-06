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
                {Object.keys(variants).includes('White') && Object.keys(variants['White']).includes(size) && <button onClick={() => { refreshVaraint(size, 'White') }} className={`border-2 bg-white rounded-full w-6 h-6 focus:outline-none ${color === 'White' ? 'border-black' : 'border-gray-300'}`}></button>}
                {Object.keys(variants).includes('Red') && Object.keys(variants['Red']).includes(size) && <button onClick={() => { refreshVaraint(size, 'Red') }} className={`border-2 ml-1 bg-red-500 rounded-full w-6 h-6 focus:outline-none ${color === 'Red' ? 'border-black' : 'border-gray-300'}`}></button>}
                {Object.keys(variants).includes('Blue') && Object.keys(variants['Blue']).includes(size) && <button onClick={() => { refreshVaraint(size, 'Blue') }} className={`border-2 ml-1 bg-blue-500 rounded-full w-6 h-6 focus:outline-none ${color === 'Blue' ? 'border-black' : 'border-gray-300'}`}></button>}
                {Object.keys(variants).includes('Green') && Object.keys(variants['Green']).includes(size) && <button onClick={() => { refreshVaraint(size, 'Green') }} className={`border-2 ml-1 bg-green-500 rounded-full w-6 h-6 focus:outline-none ${color === 'Green' ? 'border-black' : 'border-gray-300'}`}></button>}
                {Object.keys(variants).includes('Yellow') && Object.keys(variants['Yellow']).includes(size) && <button onClick={() => { refreshVaraint(size, 'Yellow') }} className={`border-2 ml-1 bg-yellow-500 rounded-full w-6 h-6 focus:outline-none ${color === 'Yellow' ? 'border-black' : 'border-gray-300'}`}></button>}
                {Object.keys(variants).includes('Black') && Object.keys(variants['Black']).includes(size) && <button onClick={() => { refreshVaraint(size, 'Black') }} className={`border-2 ml-1 bg-black rounded-full w-6 h-6 focus:outline-none ${color === 'Black' ? 'border-black' : 'border-gray-300'}`}></button>}
                {Object.keys(variants).includes('Purple') && Object.keys(variants['Purple']).includes(size) && <button onClick={() => { refreshVaraint(size, 'Purple') }} className={`border-2 ml-1 bg-purple-500 rounded-full w-6 h-6 focus:outline-none ${color === 'Purple' ? 'border-black' : 'border-gray-300'}`}></button>}
                {Object.keys(variants).includes('Pink') && Object.keys(variants['Pink']).includes(size) && <button onClick={() => { refreshVaraint(size, 'Pink') }} className={`border-2 ml-1 bg-pink-300 rounded-full w-6 h-6 focus:outline-none ${color === 'Pink' ? 'border-black' : 'border-gray-300'}`}></button>}
            </div>
            <div className="flex ml-6 items-center">
                <span className="mr-3">Size</span>
                <div className="relative">
                    <select value={size} onChange={(e) => { refreshVaraint(e.target.value, color) }} className="rounded border appearance-none bg-transparent border-gray-300 py-2 focus:outline-none ${color === 'white' ? 'border-black' : 'border-gray-300'} focus:ring-2 focus:ring-purple-700 focus:border-purple-700 text-base pl-3 pr-10">
                        {Object.keys(variants[color]).includes('S') && <option className='text-black' value={'S'}>S</option>}
                        {Object.keys(variants[color]).includes('M') && <option className='text-black' value={'M'}>M</option>}
                        {Object.keys(variants[color]).includes('L') && <option className='text-black' value={'L'}>L</option>}
                        {Object.keys(variants[color]).includes('XL') && <option className='text-black' value={'XL'}>XL</option>}
                        {Object.keys(variants[color]).includes('XXL') && <option className='text-black' value={'XXL'}>XXL</option>}
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
