"use client"
import { Search } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'
import { useDarkMode } from '@/context/DarkModeContext'

const SearchBar = () => {
    const [show, setShow] = useState(false)
    const [query, setQuery] = useState('')
    const [results, setResults] = useState([])
    const inputRef = useRef(null)
    const {isDarkMode} = useDarkMode()

    const handleKeyDown = (event) => {
        if (event.key === 'Escape') {
            setShow(false)
        } else if (/^[a-zA-Z]$/.test(event.key)) {
            setShow(true)
        }
    }

    const handleInputKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleSubmit()
        }
    }

    const handleSubmit = async () => {
        try {
            const res = await fetch(`/api/search?query=${query}`)
            const data = await res.json()
            console.log('Search results:', data)
            setResults(data)
            setShow(true)
        } catch (error) {
            console.error('Error fetching search results:', error)
        }
    }

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown)
        return () => {
            document.removeEventListener('keydown', handleKeyDown)
        }
    }, [])

    useEffect(() => {
        if (show && inputRef.current) {
            inputRef.current.focus()
        }
    }, [show])

    return (
        <div>
            <button
                onClick={() => {setShow(!show), setQuery('')}}
                className='border-2 border-purple-700 transition-transform duration-300 ease-in-out hover:rotate-[360deg] p-1 rounded-full'>
                <Search className='h-7 w-7' />
            </button>
            <input
                ref={inputRef}
                type="text"
                placeholder='Search'
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleInputKeyDown}
                className={`fixed z-20 w-[90vw] md:w-[60vw] h-12 border-2 border-purple-700 px-4 rounded-xl outline-none transition-all duration-500 ease-in-out left-1/2 transform -translate-x-1/2 backdrop-blur ${isDarkMode? "bg-[rgba(0,0,0,0.6)]":"bg-[rgba(255,255,255,0.4)]"} ${show ? 'md:top-3 -top-[607px]' : 'md:top-[-100px] -top-[700px]'}`}
            />
            {show && (
                <div className={`fixed ${show ? 'opacity-100' : 'opacity-0'} -top-[540px] md:top-20 left-1/2 transform transition-all duration-500 ease-in-out border-2 border-purple-700 backdrop-blur -translate-x-1/2 ${isDarkMode? "bg-[rgba(0,0,0,0.8)]":"bg-[rgba(255,255,255,0.4)]"} shadow-[0_0_20px_#7e22ce] rounded-xl w-[90vw] md:w-[60vw] max-h-[45vh] md:max-h-[50vh] overflow-y-auto z-30`}>
                    {results.length > 0 ? (
                        results.map((product, index) => (
                            <Link href={`/product/${product.slug}`} onClick={() => {setShow(false), setQuery('')}} key={index} className="p-4 hover:text-purple-700 h-20 border-b flex items-center gap-4 border-purple-700">
                                <Image className="h-12 w-12 rounded-lg" unoptimized priority width={1} height={1} src={product.img} alt={product.title} />
                                <h3 className="text-md truncate font-semibold">{product.title}</h3>
                            </Link>
                        ))
                    ) : (
                        <div className="p-4 flex items-center gap-4">
                            <h3 className="text-lg truncate font-semibold text-red-700">No results found</h3>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}

export default SearchBar
