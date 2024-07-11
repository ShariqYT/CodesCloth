"use client"
import React, { useState } from 'react'
import {toast} from 'react-hot-toast'

const Pincode = () => {
    const [pin, setPin] = useState('')
    const [service, setService] = useState(null)
    const [spin, setSpin] = useState(false)

    const changePin = (e) => {
        if(e.target.value.length <= 6) {
            setPin(e.target.value)
        }
    }

    const handlePin = async () => {
        setSpin(true)
        if (pin.length !== 6 || isNaN(pin)) {
            toast.error('Please enter a valid 6-digit pincode', { duration: 5000, style: { border: '2px solid red', padding: '15px 20px', marginBottom: '40px' } })
            setService(null)
            setSpin(false)
            return
        }

        try {
            const response = await fetch(`https://api.postalpincode.in/pincode/${pin}`)
            const data = await response.json()
            if (data[0].Status === "Success") {
                toast.success('Service Available!', { duration: 5000, style: { border: '2px solid green', padding: '15px 20px', marginBottom: '40px' } })
                setService(true)
                setSpin(false)
            } else {
                toast.error('Service Unavailable!', { duration: 5000, style: { border: '2px solid red', padding: '15px 20px', marginBottom: '40px' } })
                setService(false)
                setSpin(false)
            }
        } catch (error) {
            toast.error('Error fetching pincode data', { duration: 5000, style: { border: '2px solid red', padding: '15px 20px', marginBottom: '40px' } })
            setService(false)
            setSpin(false)
        }
    }

    return (
        <div className="pin mt-6 flex flex-col justify-center items-center md:items-start text-sm">
            
            <div className='flex gap-2'>
                <input onChange={changePin} value={pin}  type="number" id="pincode" name="pincode" placeholder="Enter your Pincode" className="w-fit bg-transparent p-2 border border-purple-700 outline-none rounded" />
                <button onClick={handlePin} className="flex items-center justify-center gap-1 text-white bg-purple-700 border-0 py-2 px-6 focus:outline-none hover:bg-purple-900 rounded">{spin && <svg className='w-4 h-4' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M12,23a9.63,9.63,0,0,1-8-9.5,9.51,9.51,0,0,1,6.79-9.1A1.66,1.66,0,0,0,12,2.81h0a1.67,1.67,0,0,0-1.94-1.64A11,11,0,0,0,12,23Z"><animateTransform attributeName="transform" dur="0.75s" repeatCount="indefinite" type="rotate" values="0 12 12;360 12 12"/></path></svg>}{spin?'Checking...':'Check'}</button>
            </div>
            {(!service && service !== null) && (
                <p className='text-red-500 text-sm mt-3'>Service Unavailable</p>
            )}
            {(service && service !== null) && (
                <p className='text-green-700 text-sm mt-3'>Service Available</p>
            )}
        </div>
    )
}

export default Pincode
