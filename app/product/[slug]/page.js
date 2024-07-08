import React from 'react';
import Pincode from '@/components/Pincode';
import Image from 'next/image';
import AddtoCart from '@/components/extra/AddtoCart';
import SizeandColor from '@/components/extra/SizeandColor';
import BuyNow from '@/components/extra/BuyNow';
import ErrorPage from '@/app/not-found';

export async function generateMetadata({ params }) {
  const { product } = await oneProduct(params.slug);
  return {
    title: product ? `${product.title} (${product.size}/${product.color}) | CodesCloth` : 'Product not found',
  };
}

async function oneProduct(slug) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/oneProduct?slug=${slug}`, { cache: 'no-store' });

    if (!res.ok) {
      const errorDetails = await res.text();
      console.error('Fetch error details:', errorDetails);
      throw new Error('Failed to fetch data');
    }

    return res.json();
  } catch (error) {
    console.error('Error fetching product:', error);
    return { product: null, variants: [] };
  }
}

const ProductSlug = async ({ params }) => {
  const { product, variants } = await oneProduct(params.slug);
  const { slug } = params;

  if (!product) {
    return <ErrorPage />;
  }

  return (
    <>
      <section className="body-font overflow-hidden min-h-screen">

        <div className="container mx-auto flex justify-center px-5 md:py-24 py-16">

          <div className="flex h-96 w-96 mt-10 justify-center items-center relative rounded-lg">
            <Image className="rounded-lg object-cover hover:scale-[1.7] hover:shadow-lg transition-all duration-200 ease-linear" fill={true} sizes="(min-width: 780px) 369px, (min-width: 560px) calc(6.5vw + 185px), calc(100vw - 325px)" src={product.img} alt="tshirt" />
          </div>
          <div className="md:w-1/2 w-full md:pl-10 md:py-6 mt-6 md:mt-0">
            <h2 className="text-sm title-font tracking-widest">CodesCloth</h2>
            <h1 className="md:text-3xl text-2xl title-font font-medium mb-1">{product.title} ({product.size}/{product.color})</h1>

            {/* <div className="flex mb-4">
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
                  <span className="text-gray-600 ml-3">4 Reviews</span>
                </span>

              </div> */}

            <p className="leading-relaxed my-2 text-sm md:text-base">{product.desc}</p>
            <SizeandColor product={product} variants={variants} />
            {product.availableQty > 0 ? <span className="title-font font-semibold text-purple-600 text-3xl">₹{product.price}</span> : <span className="title-font font-medium text-3xl text-red-500">Out of Stock!</span>}
            <Pincode />
            <div className="flex gap-4 mt-8 justify-center md:justify-normal items-center">
              <AddtoCart slug={slug} product={product} />
              <BuyNow slug={slug} product={product} />
              {/* <button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                  <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                  </svg>
                </button> */}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default ProductSlug