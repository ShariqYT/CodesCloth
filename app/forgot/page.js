import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const Forgot = () => {
    return (
        <div className="py-20">
            <div className="flex h-full items-center justify-center">
                <div
                    className="rounded-lg w-[40vw] border-4 border-purple-700 shadow-md bg-white flex-col flex h-full items-center justify-center sm:px-4">
                    <div className="flex w-[40vw] h-full flex-col justify-center gap-4 p-6">
                        <div className="left-0 right-0 inline-block border-gray-200 px-2 py-2.5 sm:px-4">
                            <form className="flex flex-col  gap-4 pb-4">
                                <div className='flex items-center justify-center'>
                                    <Image unoptimized quality={100}className='w-24' width={1} height={1}  priority={true} src="/logo-2.png" alt="logo" />
                                </div>
                                <h1 className="mb-4 text-4xl font-bold text-center text-black">Forgot your password</h1>
                                <div>
                                    <div className="mb-2">
                                        <label className="text-sm font-medium text-black"
                                            htmlFor="email">Email</label>
                                    </div>
                                    <div className="flex w-full rounded-lg pt-1">
                                        <div className="relative w-full"><input
                                            className="block w-full border-2 disabled:cursor-not-allowed disabled:opacity-50 bg-gray-50  focus:border-purple-700 focus:ring-purple-700 border-gray-300 outline-none text-white placeholder-gray-400  p-2.5 text-sm rounded-lg"
                                            id="email" type="email" name="email" placeholder="email@example.com"
                                            required />
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="flex flex-col gap-2">
                                    <button type="submit"
                                        className="border mb-10 transition-colors focus:ring-2 p-0.5 disabled:cursor-not-allowed border-transparent bg-purple-700 hover:bg-purple-800 active:bg-purple-900 text-white disabled:bg-gray-300 disabled:text-gray-700 rounded-lg ">
                                        <span
                                            className="flex items-center justify-center gap-1 font-medium py-1 px-2.5 text-base false">
                                            Forgot
                                        </span>
                                    </button>
                                </div>
                            </form>
                            <div className="min-w-[270px]">
                                <div className="mt-4 text-center text-black">Know your password?
                                    <Link href={"/login"} className="text-purple-700 underline hover:text-purple-800">Login here</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Forgot
