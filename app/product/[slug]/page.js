import React from 'react';
import Pincode from '@/components/Pincode';
import Image from 'next/image';
import AddtoCart from '@/components/extra/AddtoCart';
import SizeandColor from '@/components/extra/SizeandColor';
import BuyNow from '@/components/extra/BuyNow';
import ErrorPage from '@/app/not-found';
import Wishlist from '@/components/extra/Wishlist';
import ProductSlider from '@/components/extra/ProductSlider';
import ReviewForm from '@/components/extra/ReviewForm';
import ProductsReviews from '@/components/extra/ProductsReviews';
import ReviewComponent from '@/components/extra/ReviewComponent';

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
  const { slug } = params;
  const { product, variants } = await oneProduct(slug);
  const products = await getProducts('tshirts');

  if (!product) {
    return <ErrorPage />;
  }

  const discountPercentage = Math.round((1 - product.price / product.originalPrice) * 100);

  return (
    <>
      <section className="body-font overflow-hidden min-h-screen">
        <div className="container mx-auto flex justify-center items-center md:items-start flex-col md:flex-row px-5 md:py-24 py-16">
          <div className="flex w-80 h-80 md:h-96 md:w-96 mt-10 justify-center items-center relative rounded-lg">
            <Image
              className="rounded-lg object-cover shadow-lg transition-all duration-200 ease-in-out"
              fill={true}
              sizes="(min-width: 780px) 369px, 320px"
              src={product.img}
              alt="tshirt"
            />
          </div>
          <div className="md:w-1/2 w-full md:pl-10 md:py-6 mt-6 md:mt-0">
            <h2 className="md:text-sm text-xs tracking-widest">CodesCloth</h2>
            <h1 className="md:text-3xl text-lg font-medium mb-1">
              {product.title} ({product.size}/{product.color})
            </h1>

            <ReviewComponent productId={product.slug} />

            <SizeandColor product={product} variants={variants} />

            <div className='border md:my-8 my-4 border-gray-300 rounded-full'></div>

            {product.availableQty > 0 ? (
              <div>
                {product.originalPrice && product.originalPrice > product.price ? (
                  <div className="flex flex-col justify-center">
                    <p className="font-medium text-purple-600 text-3xl">
                      <span className="font-normal text-2xl text-red-500">-{discountPercentage}%</span> ₹{product.price}
                    </p>
                    <p className="font-medium text-purple-400 text-xl line-through mr-2">
                      ₹{product.originalPrice}
                    </p>
                  </div>
                ) : (
                  <p className="title-font font-semibold text-purple-600 text-3xl">
                    ₹{product.price}
                  </p>
                )}
              </div>
            ) : (
              <p className="title-font font-medium text-3xl text-red-500">Out of Stock!</p>
            )}
            <p className='text-sm'>Inclusive of all taxes</p>

            <div className='border md:my-8 my-4 border-gray-300 rounded-full'></div>

            <Pincode />
            <div className="flex gap-4 mt-8 justify-center md:justify-normal items-center">
              <AddtoCart slug={slug} product={product} />
              <BuyNow slug={slug} product={product} />
              <Wishlist slug={slug} />
            </div>
          </div>
        </div>
        <div className="container mx-auto p-4 md:my-10 my-4">
          <h1 className="text-xl font-semibold">About the Product</h1>
          <p className="leading-relaxed mt-2 text-xs md:text-base">{product.desc}</p>
          <ProductSlider slug={slug} products={products} />

          <h1 className="text-xl font-semibold mt-20">Customer Reviews</h1>
          <div className="flex flex-col md:flex-row mt-10 mb-20 gap-12 p-4">
            <ReviewForm productId={product.slug} />
            <div className="border-2 border-gray-200 rounded-full"></div>
            <ProductsReviews productId={product.slug} />
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductSlug;
