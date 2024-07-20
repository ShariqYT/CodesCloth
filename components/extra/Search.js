"use client"
import { Search } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'

const SearchBar = () => {
    const [show, setShow] = useState(false)
    const [query, setQuery] = useState('')
    const [results, setResults] = useState([])
    const inputRef = useRef(null)

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
        <>
            <button
                onClick={() => setShow(!show)}
                className='md:border-2 border-purple-700 transition-all duration-1000 ease-in-out hover:rotate-[360deg] p-1 rounded-full'>
                <Search className='h-7 w-7' />
            </button>
            <div
                onClick={() => setShow(false)}
                className={`transform transition-transform duration-500 ease-in-out z-10 w-[23.42rem] h-[100vh] md:w-[100vw] md:h-[100vh] bg-[rgba(0,0,0,0.8)] fixed -top-[38.7rem] left-0 md:-top-4 md:-left-[8.25rem] ${show ? 'translate-y-0 ' : 'md:-translate-y-[80rem] translate-y-[50rem]'}`}>
            </div>
            <input
                ref={inputRef}
                type="text"
                placeholder='Search'
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleInputKeyDown}
                className={`transform transition-transform text-black duration-500 ease-in-out w-[23rem] h-12 md:w-[50vw] z-20 md:h-[6vh] border-2 fixed outline-none bottom-[30rem] md:-bottom-20 right-1 md:right-[23%] border-purple-700 px-4 md:px-8 rounded-xl ${show ? 'translate-y-0' : 'translate-y-[40rem] md:-translate-y-[20rem]'}`}
            />
            {show && results.length > 0 ? (
                <div className="fixed -top-96 left-2 md:top-[10rem] rounded-xl md:left-80 right-0 text-black bg-white z-30 max-w-[22.5rem] md:max-w-[60rem] max-h-[50vh] overflow-y-auto">
                    {results.map((product) => (
                        <Link href={`/product/${product.slug}`} key={product._id} className="p-4 border-b flex items-center gap-4 border-gray-200">
                            <Image className="text-sm" width={100} height={100} src={product.img} alt={product.title} />
                            <h3 className="text-lg truncate font-semibold">{product.title}</h3>
                        </Link>
                    ))}
                </div>
            ) : (
                <>
                    {show && (
                        <div className="fixed -top-96 left-2 md:top-[10rem] rounded-xl md:left-80 right-0 text-black bg-white z-30 max-w-[22.5rem] md:max-w-[60rem] max-h-[50vh] overflow-y-auto">
                            <div className="p-4 border-b flex items-center gap-4 border-gray-200">
                                <h3 className="text-lg truncate font-semibold">No results found</h3>
                            </div>
                        </div>
                    )}
                </>
            )}
        </>
    )
}

export default SearchBar