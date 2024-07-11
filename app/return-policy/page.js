import Link from 'next/link'
import React from 'react'

const ReturnPolicy = () => {
  return (
    <div class="max-w-4xl mx-auto my-20 p-6 rounded-lg shadow-md">
        <h1 class="text-2xl font-semibold ">Return Policy</h1>
        <p class="text-sm  mt-2">Effective Date: 11/07/2024</p>
        
        <h2 class="text-lg font-semibold  mt-4">Introduction</h2>
        <p class="text-base  mt-2">We want you to be satisfied with your purchase. If you are not completely happy with your order, you can return it under the conditions outlined below.</p>
        
        <h2 class="text-lg font-semibold  mt-4">Returns</h2>
        <ul class="list-disc list-inside text-base mt-2">
            <li>Products must be returned within 2-3 days of receipt.</li>
            <li>Items must be unused, in the same condition that you received them, and in the original packaging.</li>
        </ul>
        
        <h2 class="text-lg font-semibold  mt-4">Refunds</h2>
        <ul class="list-disc list-inside text-base mt-2">
            <li>Once your return is received and inspected, we will notify you of the approval or rejection of your refund.</li>
            <li>If approved, your refund will be processed, and a credit will automatically be applied to your original method of payment within 2-3 days.</li>
        </ul>
        
        <h2 class="text-lg font-semibold  mt-4">Exchanges</h2>
        <p class="text-base mt-2">We only replace items if they are defective or damaged. If you need to exchange it for the same item, send us an email at codescloth.adamin@gmail.com</p>
        
        <h2 class="text-lg font-semibold  mt-4">Shipping</h2>
        <p class="text-base mt-2">You will be responsible for paying for your own shipping costs for returning your item. Shipping costs are non-refundable.</p>
        
        <h2 class="text-lg font-semibold  mt-4">Contact Us</h2>
        <ul class="list-disc list-inside text-base mt-2">Email:
            <Link href="mailto:codescloth.adamin@gmail.com" className='hover:underline'> codescloth.adamin@gmail.com</Link>
            <p>Phone: not available</p>
        </ul>
    </div>
  )
}

export default ReturnPolicy
