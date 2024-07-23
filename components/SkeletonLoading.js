import { useDarkMode } from '@/context/DarkModeContext'
import React from 'react'
const SkeletonLoading = () => {
    const { isDarkMode } = useDarkMode()
    return (
        <section className="flex relative min-h-screen">

            <div className="max-w-[90rem] px-5 py-20 md:py-24 mx-auto">
                <div className="flex flex-wrap -m-4 justify-center">
                    <div className="md:w-72 shadow-lg md:m-4 my-2 border rounded-lg border-gray-200 p-2 w-44">
                        <div className="animate-pulse flex h-32 md:h-52 justify-center items-center relative rounded-lg">
                            <div className="animate-pulse rounded-lg object-contain bg-white" />
                        </div>
                        <div className="animate-pulse mt-4">
                            <h3 className="md:text-[12px] text-[10px] tracking-widest mb-1">CODESCLOTH</h3>
                            <h2 className="animate-pulse md:text-lg truncate font-medium"></h2>
                            <div />

                            <div className='animate-pulse '>


                            </div>

                            <div className='animate-pulse mt-1'>
                                <span className={`animate-pulse border ${isDarkMode ? 'border-white' : 'border-black'} text-sm px-1 mx-1`}></span>
                                <span className={`animate-pulse border ${isDarkMode ? 'border-white' : 'border-black'} text-sm px-1 mx-1`}></span>
                                <span className={`animate-pulse border ${isDarkMode ? 'border-white' : 'border-black'} text-sm px-1 mx-1`}></span>
                                <span className={`animate-pulse border ${isDarkMode ? 'border-white' : 'border-black'} text-sm px-1 mx-1`}></span>
                                <span className={`animate-pulse border ${isDarkMode ? 'border-white' : 'border-black'} text-sm px-1 mx-1`}></span>
                            </div>
                            <div className='animate-pulse mt-1'>
                                
                            </div>
                        </div>
                    </div>

                </div>
            </div>

        </section>
    )
}

export default SkeletonLoading
