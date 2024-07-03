import React from 'react'
import Tshirts from '@/components/products/Tshirts';

async function getProducts(category) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getProducts?category=${category}`, { cache: 'no-store' });
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
}

export const metadata = {
  title: 'Tshirts - CodesCloth',
};

const tshirts = async () => {
  const products = await getProducts('tshirts')

  return (
    <>
      <Tshirts products={products} />
    </>
  )
}

export default tshirts
