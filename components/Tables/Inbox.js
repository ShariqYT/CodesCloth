"use client"
import React, { useState } from 'react'

const InboxTable = ({ inboxMessages }) => {
  const [inbox, setInbox] = useState(inboxMessages);

  // Function to format createdAt time
  const formatTime = (createdAt) => {
    const date = new Date(createdAt);
    return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
  };

  const handleRemove = async (id) => {

  };

  return (
    <div className='container md:w-full w-[100vw] relative border-2 border-purple-700 rounded-lg h-[80vh] mt-12 m-auto '>
      <h1 className='text-3xl font-bold p-4'>Inbox</h1>
      <div className='overflow-x-auto md:w-full w-[100vw]'>

        <div className='flex md:w-full w-[100vw] justify-between border-y-2 border-purple-700 items-center py-3 md:px-10 font-bold'>
          <p className=''>Name</p>
          <p className=''>Email</p>
          <p className='w-1/4'>Message</p>
          <div className='flex gap-8'>
            <p>Action</p>
            <p>Time</p>
          </div>
        </div>
        <ul className='md:w-full w-[100vw]'>
          {inbox.map((item, index) => (
            <li key={index} className="flex md:w-full w-[100vw] items-center cursor-pointer justify-between gap-4 py-4 border-b hover:bg-purple-200 md:px-8">
              <p className=''>{item.name}</p>
              <p className=''>{item.email}</p>
              <p className='md:w-2/4 md:truncate'>{item.message}</p>
              <div className='flex items-center justify-center gap-8'>
                <svg onClick={handleRemove} className='w-6' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
                  <path d="M19.5 5.5L18.8803 15.5251C18.7219 18.0864 18.6428 19.3671 18.0008 20.2879C17.6833 20.7431 17.2747 21.1273 16.8007 21.416C15.8421 22 14.559 22 11.9927 22C9.42312 22 8.1383 22 7.17905 21.4149C6.7048 21.1257 6.296 20.7408 5.97868 20.2848C5.33688 19.3626 5.25945 18.0801 5.10461 15.5152L4.5 5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M3 5.5H21M16.0557 5.5L15.3731 4.09173C14.9196 3.15626 14.6928 2.68852 14.3017 2.39681C14.215 2.3321 14.1231 2.27454 14.027 2.2247C13.5939 2 13.0741 2 12.0345 2C10.9688 2 10.436 2 9.99568 2.23412C9.8981 2.28601 9.80498 2.3459 9.71729 2.41317C9.32164 2.7167 9.10063 3.20155 8.65861 4.17126L8.05292 5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M9.5 16.5L9.5 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M14.5 16.5L14.5 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
                <p>{formatTime(item.createdAt)}</p>
              </div>
            </li>
          ))}
        </ul >
      </div>
    </div>
  );
}

export default InboxTable;
