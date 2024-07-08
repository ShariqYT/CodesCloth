import Mousepads from '@/components/products/Mousepads';
import React from 'react'

async function getProducts(category) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/getProducts?category=${category}`, { cache: 'no-store' });
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
}

export const metadata = {
  title: 'Mousepads - CodesCloth',
};

const mousepads = async () => {
  const products = await getProducts('mousepads')

  return (
    <>
      <Mousepads products={products} />
    </>
  )
}

export default mousepads
