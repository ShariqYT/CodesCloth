import Caps from '@/components/products/Caps';
import React from 'react'

async function getProducts(category) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/getProducts?category=${category}`, { cache: 'no-store' });
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
}

export const metadata = {
  title: 'Caps',
};

const caps = async () => {
  const products = await getProducts('caps')

  return (
    <>
      <Caps products={products} />
    </>
  )
}

export default caps
