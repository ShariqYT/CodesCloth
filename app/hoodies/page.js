import React from 'react'
import Hoodies from '@/components/products/Hoodies';

async function getProducts(category) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/getProducts?category=${category}`, { cache: 'no-store' });
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
}

export const metadata = {
  title: 'Hoodies | CodesCloth',
};

const hoodies = async () => {
  const products = await getProducts('hoodies')

  return (
    <>
      <Hoodies products={products} />
    </>
  )
}

export default hoodies
