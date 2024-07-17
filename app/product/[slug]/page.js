import React from 'react';
import Pincode from '@/components/Pincode';
import Image from 'next/image';
import AddtoCart from '@/components/extra/AddtoCart';
import SizeandColor from '@/components/extra/SizeandColor';
import BuyNow from '@/components/extra/BuyNow';
import ErrorPage from '@/app/not-found';
import Wishlist from '@/components/extra/Wishlist';
import ProductSlider from '@/components/extra/ProductSlider';

async function getProducts(category) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/getProducts?category=${category}`, { cache: 'no-store' });
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
}

export async function generateMetadata({ params }) {
  const { product } = await oneProduct(params.slug);
  return {
    title: product ? `${product.title} (${product.size}/${product.color}) | CodesCloth` : 'Product not found',
    openGraph: {
      title: product ? `${product.title} (${product.size}/${product.color}) | CodesCloth` : 'Product not found',
      images: product ? [product.img] : [],
    }
  };
}

async function oneProduct(slug) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/oneProduct?slug=${slug}`, { cache: 'no-store' });

    if (!res.ok) {
      const errorDetails = await res.text();
      throw new Error(errorDetails);
    }

    return res.json();
  } catch (error) {
    return { product: null, variants: [] };
  }
}

const ProductSlug = async ({ params }) => {
  const { product, variants } = await oneProduct(params.slug);
  const { slug } = params;
  const products = await getProducts('tshirts');

  if (!product) {
    return <ErrorPage />;
  }

  return (
    <>
      <section className="body-font overflow-hidden min-h-screen">

        <div className="container mx-auto flex justify-center items-center md:items-start flex-col md:flex-row px-5 md:py-24 py-16">

          <div className="flex w-80 h-80 md:h-96 md:w-96 mt-10 justify-center items-center relative rounded-lg">
            <Image className="rounded-lg object-cover shadow-lg transition-all duration-200 ease-in-out" fill={true} sizes="(min-width: 780px) 369px, 320px" src={product.img} alt="tshirt" />
          </div>
          <div className="md:w-1/2 w-full md:pl-10 md:py-6 mt-6 md:mt-0">
            <h2 className="text-sm title-font tracking-widest">CodesCloth</h2>
            <h1 className="md:text-3xl text-2xl title-font font-medium mb-1">{product.title} ({product.size}/{product.color})</h1>

            <div className="flex mb-4">
              <span className="flex items-center">
                <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-yellow-500" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
                <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-yellow-500" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
                <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-yellow-500" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
                <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-yellow-500" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-yellow-500" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
                <span className="ml-3">4 Reviews</span>
              </span>

            </div>

            <SizeandColor product={product} variants={variants} />
            {product.availableQty > 0 ? <p className="title-font font-semibold text-purple-600 text-3xl">₹{product.price}</p> : <p className="title-font font-medium text-3xl text-red-500">Out of Stock!</p>}
            <Pincode />
            <div className="flex gap-4 mt-8 justify-center md:justify-normal items-center">
              <AddtoCart slug={slug} product={product} />
              <BuyNow slug={slug} product={product} />
              <Wishlist slug={slug} />
            </div>
          </div>
        </div>
        <div className='container mx-auto p-4 md:my-10 my-4'>
          <h1 className='text-xl font-semibold'>About the Product</h1>
          <p className="leading-relaxed  mt-2 text-xs md:text-base">{product.desc}</p>
          <ProductSlider slug={slug} products={products} />
        </div>
      </section>
    </>
  )
}

export default ProductSlug