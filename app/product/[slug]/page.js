import React from 'react';
import Pincode from '@/components/Pincode';
import AddtoCart from '@/components/extra/AddtoCart';
import BuyNow from '@/components/extra/BuyNow';
import ErrorPage from '@/app/not-found';
import Wishlist from '@/components/extra/Wishlist';
import ReviewForm from '@/components/extra/ReviewForm';
import ProductsReviews from '@/components/extra/ProductsReviews';
import ReviewComponent from '@/components/extra/ReviewComponent';
import ShareButton from '@/components/extra/ShareButton';
import SlugProductColor from '@/components/extra/SlugProductColor';
import ProductZoomEffect from '@/components/extra/ProductZoomEffect';
import ProductSizeChart from '@/components/extra/ProductSizeChart';


async function fetchProduct(slug) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/oneProduct?slug=${slug}`, { cache: 'no-store' });
  if (!res.ok) {
    throw new Error('Failed to fetch product data');
  }
  return res.json();
}

export async function generateMetadata({ params }) {
  const { product } = await fetchProduct(params.slug);
  return {
    title: product ? `${product.title} (${product.size}/${product.color}) | CodesCloth` : 'Product not found',
    openGraph: {
      title: product ? `${product.title} (${product.size}/${product.color}) | CodesCloth` : 'Product not found',
      images: product ? [product.img] : [],
    }
  };
}

const ProductSlug = async ({ params }) => {
  const { slug } = params;
  const { product, variants, title } = await fetchProduct(slug);

  if (!product) {
    return <ErrorPage />;
  }

  const discountPercentage = Math.round((1 - product.price / product.originalPrice) * 100);

  return (
    <section className="body-font overflow-hidden min-h-screen">
      <div className="container mx-auto flex justify-center items-center md:items-start flex-col md:flex-row px-5 md:py-24 py-16">
        <div className="flex w-80 h-80 md:h-96 md:w-96 mt-10 justify-center items-center relative rounded-lg">
          <ProductZoomEffect img={product.img} />
        </div>
        <div className='mt-6 lg:my-0'>
          <ShareButton />
        </div>
        <div className="md:w-1/2 w-full md:pl-10 md:py-6 mt-6 md:mt-0">
          <h2 className="lg:text-sm text-xs tracking-widest">CodesCloth</h2>
          <h1 className="lg:text-3xl text-xl font-medium mb-1">
            {product.title} ({product.size}/{product.color})
          </h1>

          <ReviewComponent productId={product.slug} />

          <SlugProductColor title={title} product={product} variants={variants} />

          {/* Size Chart */}
          <ProductSizeChart product={product} />

          <div className='border lg:my-4 my-4 border-gray-300 rounded-full'></div>

          {product.availableQty > 0 ? (
            <div>
              {product.availableQty <= 5 ? (
                <p className="title-font font-medium text-xl text-red-500">Only {product.availableQty} left in stock!</p>
              ) : (
                <p className="title-font font-medium text-xl text-green-600">In Stock</p>
              )}
              {product.originalPrice && product.originalPrice > product.price ? (
                <div className="flex flex-col justify-center">
                  <p className="font-medium text-purple-600 text-3xl">
                    <span className="font-normal text-2xl text-red-500">-{discountPercentage}%</span> ₹ {product.price}
                  </p>
                  <p className="font-medium text-purple-400 text-xl line-through mr-2">
                    ₹ {product.originalPrice}
                  </p>
                </div>
              ) : (
                <p className="title-font font-semibold text-purple-600 text-3xl">
                  ₹ {product.price}
                </p>
              )}
            </div>
          ) : (
            <p className="title-font font-medium text-3xl text-red-500">Out of Stock!</p>
          )}
          <p className='text-sm'>Inclusive of all taxes</p>

          <div className='border md:my-8 my-4 border-gray-300 rounded-full'></div>

          <Pincode />
          <div className="flex gap-4 mt-8 text-sm lg:text-lg justify-center lg:justify-normal items-center">
            <AddtoCart slug={product.slug} product={product} />
            <BuyNow slug={product.slug} product={product} />
            <Wishlist slug={product.slug} />
          </div>

          {/* Exciting Offers */}
          <div className='mt-8'>
            <h1 className='text-lg font-bold'>Exciting Offers:</h1>

            {/* Offer 1 */}
            <div className='flex items-center gap-2 mt-4'>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className='w-6 h-6 text-[#7e22ce]' fill="none">
                <path d="M17.5 5C18.3284 5 19 5.67157 19 6.5C19 7.32843 18.3284 8 17.5 8C16.6716 8 16 7.32843 16 6.5C16 5.67157 16.6716 5 17.5 5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M2.77423 11.1439C1.77108 12.2643 1.7495 13.9546 2.67016 15.1437C4.49711 17.5033 6.49674 19.5029 8.85633 21.3298C10.0454 22.2505 11.7357 22.2289 12.8561 21.2258C15.8979 18.5022 18.6835 15.6559 21.3719 12.5279C21.6377 12.2187 21.8039 11.8397 21.8412 11.4336C22.0062 9.63798 22.3452 4.46467 20.9403 3.05974C19.5353 1.65481 14.362 1.99377 12.5664 2.15876C12.1603 2.19608 11.7813 2.36233 11.472 2.62811C8.34412 5.31646 5.49781 8.10211 2.77423 11.1439Z" stroke="currentColor" strokeWidth="1.5" />
                <path d="M13.7884 12.3666C13.8097 11.9656 13.9222 11.232 13.3125 10.6745M13.3125 10.6745C13.1238 10.502 12.866 10.3463 12.5149 10.2225C11.2583 9.77964 9.71484 11.262 10.8067 12.6189C11.3936 13.3482 11.8461 13.5726 11.8035 14.4008C11.7735 14.9835 11.2012 15.5922 10.4469 15.8241C9.7916 16.0255 9.06876 15.7588 8.61156 15.2479C8.05332 14.6242 8.1097 14.0361 8.10492 13.7798M13.3125 10.6745L14.0006 9.98639M8.66131 15.3257L8.00781 15.9792" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <p className='text-sm w-full'>
                Get Flat Rs.100 off using promo code
                <span className='text-purple-700 font-semibold drop-shadow-[0_0_10px_rgba(107,33,168,1)]'> FLAT100OFF</span>
              </p>
            </div>
            {/* Offer 2 */}
            <div className='flex items-center gap-2 mt-4'>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className='w-6 h-6 text-[#7e22ce]' fill="none">
                <path d="M17.5 5C18.3284 5 19 5.67157 19 6.5C19 7.32843 18.3284 8 17.5 8C16.6716 8 16 7.32843 16 6.5C16 5.67157 16.6716 5 17.5 5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M2.77423 11.1439C1.77108 12.2643 1.7495 13.9546 2.67016 15.1437C4.49711 17.5033 6.49674 19.5029 8.85633 21.3298C10.0454 22.2505 11.7357 22.2289 12.8561 21.2258C15.8979 18.5022 18.6835 15.6559 21.3719 12.5279C21.6377 12.2187 21.8039 11.8397 21.8412 11.4336C22.0062 9.63798 22.3452 4.46467 20.9403 3.05974C19.5353 1.65481 14.362 1.99377 12.5664 2.15876C12.1603 2.19608 11.7813 2.36233 11.472 2.62811C8.34412 5.31646 5.49781 8.10211 2.77423 11.1439Z" stroke="currentColor" strokeWidth="1.5" />
                <path d="M13.7884 12.3666C13.8097 11.9656 13.9222 11.232 13.3125 10.6745M13.3125 10.6745C13.1238 10.502 12.866 10.3463 12.5149 10.2225C11.2583 9.77964 9.71484 11.262 10.8067 12.6189C11.3936 13.3482 11.8461 13.5726 11.8035 14.4008C11.7735 14.9835 11.2012 15.5922 10.4469 15.8241C9.7916 16.0255 9.06876 15.7588 8.61156 15.2479C8.05332 14.6242 8.1097 14.0361 8.10492 13.7798M13.3125 10.6745L14.0006 9.98639M8.66131 15.3257L8.00781 15.9792" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <p className='text-sm w-full'>
                Get Flat 10% off on all prepaid orders above ₹499 using promo code
                <span className='text-purple-700 font-semibold drop-shadow-[0_0_10px_rgba(107,33,168,1)]'> CODESCLOTH10</span>
              </p>
            </div>
          </div>

        </div>
      </div>
      <div className="container mx-auto p-4 md:my-10 my-4">
        <h1 className="text-xl font-semibold">About the Product</h1>
        <p className="leading-relaxed mt-2 text-sm lg:text-base whitespace-pre-line">{product.desc}</p>


        <h1 className="text-xl font-semibold mt-20">Customer Reviews</h1>
        <div className="flex flex-col lg:flex-row mt-10 mb-20 gap-12 lg:p-4">
          <ReviewForm productId={product.slug} />
          <div className="border-2 border-gray-200 rounded-full"></div>
          <ProductsReviews productId={product.slug} />
        </div>
      </div>
    </section>
  );
};

export default ProductSlug;
