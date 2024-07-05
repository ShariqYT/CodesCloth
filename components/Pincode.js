"use client"
import React, { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'

const Pincode = () => {
    const [pin, setPin] = useState(0)
    const [service, setService] = useState()

    const changePin = (e) => {
        setPin(e.target.value)
    }

    const handlePin = async () => {
        let pins = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pincode`)
        let pinJson = await pins.json()
        if (Object.keys(pinJson).includes(pin)) {
            toast.success('Service Available!', { duration: 5000, style: { border: '2px solid green', padding: '15px 20px', marginBottom: '40px' } })
            setService(true)
        } else {
            toast.error('Service Unavailable!', { duration: 5000, style: { border: '2px solid red', padding: '15px 20px', marginBottom: '40px' } })
            setService(false)
        }
    }

    return (
        <div className="pin mt-6 flex flex-col justify-center items-center md:items-start text-sm">
            <Toaster
                position="bottom-center"
                reverseOrder={false}
            />
            <div className='flex gap-2'>
                <input onChange={changePin} type="number" id="pincode" name="pincode" placeholder="Enter your Pincode" className="w-fit bg-transparent p-2 border border-purple-700 outline-none rounded" />
                <button onClick={handlePin} className="flex text-white bg-purple-700 border-0 py-2 px-6 focus:outline-none hover:bg-purple-900 rounded">Check</button>
            </div>
            {(!service && service != null) && (
                <p className='text-red-500 text-sm mt-3'>Service Unavailable</p>
            )}
            {(service && service != null) && (
                <p className='text-green-700 text-sm mt-3'>Service Available</p>
            )}

        </div>
    )
}

export default Pincode
