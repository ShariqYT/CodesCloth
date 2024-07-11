import React from 'react'

const page = () => {
    return (
        <div className='container border-2 border-purple-700 rounded-lg h-[80vh] mt-12 m-auto '>
            <h1 className='text-3xl font-bold p-4'>Inbox</h1>
            <ul>
                <li className="flex items-center gap-4 border-t border-purple-700 hover:bg-gray-200 px-8">
                    <input type="checkbox" className="focus:ring-0 border-2 border-gray-400" />
                    <div className="w-full flex items-center justify-between p-1 my-1 cursor-pointer">
                        <div className="flex items-center">
                            <span className="w-56 pr-2 truncate">William Livingston</span>
                            <span className="w-64 truncate">Lorem ipsum dolor sit amet</span>
                            <span className="mx-1">-</span>
                            <span className="w-96 text-gray-600 text-sm truncate">Sed ut perspiciatis unde omnis iste natus error sit voluptatem</span>
                        </div>
                        <div className="w-32 flex items-center gap-8 justify-center">
                            <div  className="flex items-center ">
                                <button title="Delete">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="text-gray-500 hover:text-gray-900 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                                    </svg>
                                </button>
                            </div>
                            <span x-show="!messageHover" className="text-sm text-gray-500">
                                3:05 PM
                            </span>
                        </div>
                    </div>
                </li>
            </ul >
        </div>
    )
}

export default page
