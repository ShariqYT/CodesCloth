"use client";
import { Search } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import { useDarkMode } from '@/context/DarkModeContext';

const SearchBar = () => {
    const [show, setShow] = useState(false);
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const inputRef = useRef(null);
    const { isDarkMode } = useDarkMode();

    const fetchResults = async (query) => {
        setLoading(true);
        try {
            const res = await fetch(`/api/search?query=${query}`);
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await res.json();
            setResults(data);
        } catch (error) {
            console.error('Error fetching search results:', error);
            setResults([]);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = () => {
        fetchResults(query);
        setShow(true);
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Escape') {
            setShow(false);
            setQuery('');
            setResults([]);
        }
    };

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    useEffect(() => {
        if (show && inputRef.current) {
            inputRef.current.focus();
        }
    }, [show]);

    return (
        <div className='relative'>
            <button
                onClick={() => {
                    setShow(prev => !prev);
                    if (!show) {
                        setQuery('');
                        setResults([]);
                    }
                }}
                className='border-2 border-purple-700 transition-transform duration-300 ease-in-out hover:rotate-[360deg] p-1 rounded-full'
                aria-label="Search"
            >
                <Search className='h-7 w-7' />
            </button>
            {show && (
                <>
                    <input
                        ref={inputRef}
                        type="text"
                        placeholder='Search'
                        value={query}
                        onChange={(e) => {
                            setQuery(e.target.value);
                            fetchResults(e.target.value); // Fetch results as query changes
                        }}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                handleSubmit();
                            }
                        }}
                        className={`fixed z-20 w-[90vw] lg:w-[60vw] md:w-[70vw] h-12 border-2 border-purple-700 px-4 rounded-xl outline-none transition-all duration-500 ease-in-out left-1/2 transform -translate-x-1/2 ${isDarkMode ? "bg-[rgba(0,0,0,1)]" : "bg-[rgba(255,255,255,1)]"} ${show ? 'top-20 opacity-100' : 'top-[-96px] md:top-[-100px] lg:top-[-96px] opacity-0'}`}
                    />

                    <div className={`fixed left-1/2 transform -translate-x-1/2 transition-all duration-500 ease-in-out ${show ? 'top-36 opacity-100' : 'lg:top-[-550px] md:top-[-550px] top-[-550px] opacity-0'} border-2 border-purple-700 backdrop-blur ${isDarkMode ? "bg-[rgba(0,0,0,1)]" : "bg-[rgba(255,255,255,1)]"} shadow-[0_0_20px_#7e22ce] rounded-xl w-[90vw] lg:w-[60vw] md:w-[70vw] h-[45vh] md:h-[50vh] overflow-y-auto z-30`}>
                        {loading ? (
                            <div className="p-4 flex justify-center items-center">
                                <div className="loader"></div> {/* Add your spinner here */}
                            </div>
                        ) : results.length > 0 ? (
                            results.map((product, index) => (
                                <Link href={`/product/${product.slug}`} onClick={() => { setShow(false); setQuery(''); }} key={index} className="p-4 hover:text-purple-700 h-20 border-b flex items-center gap-4 border-purple-700">
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
                </>
            )}
        </div>
    );
}

export default SearchBar;
