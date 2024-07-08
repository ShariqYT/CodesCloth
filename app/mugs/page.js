import React from 'react'
import Mugs from '@/components/products/Mugs';

async function getProducts(category) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/getProducts?category=${category}`, { cache: 'no-store' });
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
}

export const metadata = {
  title: 'Mugs - CodesCloth',
};

const mugs = async () => {
  const products = await getProducts('mugs')

  return (
    <>
      <Mugs products={products} />
    </>
  )
}

export default mugs
