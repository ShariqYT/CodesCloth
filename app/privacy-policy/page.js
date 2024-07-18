import React from 'react'

export const metadata = {
  title: 'Privacy Policy',
};

const PrivacyPolicy = () => {
  return (
    <div className="max-w-4xl my-20 mx-auto p-8 shadow-md">
      <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
      <p className="text-lg mb-4">Effective Date: 11/07/2024</p>
      <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
      <p className="mb-4">CodesCloth is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and disclose your information.</p>
      <h2 className="text-2xl font-semibold mb-4">Information We Collect</h2>
      <ul className="list-disc list-inside mb-4">
        <li>Personal identification information (Name, email address, phone number, etc.)</li>
        <li>Payment information</li>
        <li>Purchase history</li>
        <li>Technical data (IP address, browser type, etc.)</li>
      </ul>
      <h2 className="text-2xl font-semibold mb-4">How We Use Your Information</h2>
      <ul className="list-disc list-inside mb-4">
        <li>To process and fulfill orders</li>
        <li>To improve our website and services</li>
        <li>To send promotional emails (you can opt-out at any time)</li>
        <li>To comply with legal requirements</li>
      </ul>
      <h2 className="text-2xl font-semibold mb-4">Sharing Your Information</h2>
      <p className="mb-4">We do not sell, trade, or rent your personal information to others. We may share information with trusted third parties who assist us in operating our website, conducting our business, or servicing you.</p>
      <h2 className="text-2xl font-semibold mb-4">Security</h2>
      <p className="mb-4">We implement various security measures to maintain the safety of your personal information.</p>
      <h2 className="text-2xl font-semibold mb-4">Your Consent</h2>
      <p className="mb-4">By using our site, you consent to our privacy policy.</p>
      <h2 className="text-2xl font-semibold mb-4">Changes to Our Privacy Policy</h2>
      <p className="mb-4">We may update our Privacy Policy from time to time. Changes will be posted on this page.</p>
      <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
      <p className="mb-4">If you have any questions regarding this privacy policy, you may contact us using the information below:</p>
      <ul className="list-disc list-inside mb-4">
        <li>Email: codescloth.adamin@gmail.com</li>
        <li>Phone: not available</li>
      </ul>
    </div>
  )
}

export default PrivacyPolicy
