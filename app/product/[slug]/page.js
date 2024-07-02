import React from 'react';
import Pincode from '@/components/Pincode';
import Image from 'next/image';
import AddtoCart from '@/components/AddtoCart';
import SizeandColor from '@/components/SizeandColor';
import BuyNow from '@/components/BuyNow';
import ErrorPage from '@/app/not-found';

async function oneProduct(slug) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/oneProduct?slug=${slug}`, { cache: 'no-store' });

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

const page = async ({ params }) => {
  const { product, variants } = await oneProduct(params.slug);
  const { slug } = params;

  if (!product) {
    return <ErrorPage />;
  }

  return (
    <>
      <section className="text-gray-600 body-font overflow-hidden">

        <div className="container px-5 md:py-24 py-16 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <Image unoptimized quality={100} priority={true} alt="ecommerce" className="lg:w-1/2 w-full lg:h-auto px-24 object-cover object-center rounded" width={1} height={1} src={product.img} />
            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <h2 className="text-sm title-font text-gray-500 tracking-widest">CODESCLOTH</h2>
              <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">{product.title} ({product.size}/{product.color})</h1>

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

              <p className="leading-relaxed">{product.desc}</p>
              <SizeandColor product={product} variants={variants} />
              {product.availableQty > 0 ? <span className="title-font font-medium text-2xl text-gray-900">₹{product.price}</span> : <span className="title-font font-medium text-3xl text-red-500">Out of Stock!</span>}
              <Pincode />
              <div className="flex gap-4 mt-8 items-center">
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
        </div>
      </section>
    </>
  )
}

export default page
