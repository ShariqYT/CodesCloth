import React from 'react'

export const metadata = {
  title: 'Shipping Policy',
};

const ShippingPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto my-20 p-6 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-4">Shipping Policy</h1>
      <p className="text-lg mb-4">Effective Date: 11/07/2024</p>
      <h2 className="text-2xl font-semibold my-4">Introduction</h2>
      <p className="mb-4">CodesCloth aims to provide timely and efficient delivery of your orders.</p>
      <h2 className="text-2xl font-semibold my-4">Shipping Rates and Delivery Estimates</h2>
      <ul className="list-disc list-inside mb-4">
        <li>Shipping charges for your order will be calculated and displayed at checkout.</li>
        <li>Delivery estimates vary depending on your location.</li>
      </ul>
      <h2 className="text-2xl font-semibold my-4">Order Processing Time</h2>
      <p className="mb-4">All orders are processed within 1-2 business days. Orders are not shipped or delivered on weekends or holidays.</p>
      <h2 className="text-2xl font-semibold my-4">Shipping Confirmation</h2>
      <p className="mb-4">You will receive a shipping confirmation email with your tracking number once your order has shipped.</p>
      <h2 className="text-2xl font-semibold my-4">Customs, Duties, and Taxes</h2>
      <p className="mb-4">CodesCloth is not responsible for any customs and taxes applied to your order. All fees imposed during or after shipping are the responsibility of the customer.</p>
      <h2 className="text-2xl font-semibold my-4">Damages</h2>
      <p className="mb-4">CodesCloth is not liable for any products damaged or lost during shipping. If you received your order damaged, please contact the shipment carrier to file a claim.</p>
      <h2 className="text-2xl font-semibold my-4">Contact Us</h2>
      <p className="mb-4">For more information on shipping, please contact us:</p>
      <ul className="list-disc list-inside mb-4">
        <li>Email: codescloth.adamin@gmail.com</li>
        <li>Phone: not available</li>
      </ul>
    </div>
  )
}

export default ShippingPolicy
