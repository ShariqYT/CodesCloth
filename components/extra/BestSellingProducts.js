import Link from 'next/link';
import Image from 'next/image';
import React from 'react';
import { formatIndianCurrency } from './FormatAmount';
import { useDarkMode } from '@/context/DarkModeContext';
import ReviewComponent from './ReviewComponent';

const BestSellingProducts = ({ product }) => {
  const { isDarkMode } = useDarkMode();

  const renderColorButtons = (color) => {
    let buttonClasses = 'border-2 border-gray-300 ml-1 rounded-full w-3 md:w-4 h-3 md:h-4 transition-all duration-300 ease-in-out focus:outline-none';

    if (color.toLowerCase() === 'black') {
      buttonClasses += ' bg-black';
    } else if (color.toLowerCase() === 'white') {
      buttonClasses += ' bg-white';
    } else {
      buttonClasses += ` bg-${color.toLowerCase()}-500`;
    }

    return <button title={color} className={buttonClasses} />;
  };

  const sizeClass = isDarkMode ? 'border-white' : 'border-black';

  return (
    <div id="productSlider" className="flex items-center md:overflow-x-scroll scrollbar-hide">
      <Link href={`/product/${product.slug}`} className="md:w-64 shadow-lg mx-4 border rounded-lg border-gray-200 p-2 w-44">
        <div className="flex h-32 md:h-52 justify-center items-center relative rounded-lg">
          <Image
            className="rounded-lg bg-white object-contain"
            fill
            sizes="(min-width: 1540px) 272px, (min-width: 1280px) 220px, (min-width: 1040px) 169px, (min-width: 780px) 118px, (min-width: 680px) 550px, calc(94.44vw - 73px)"
            priority
            src={product.img}
            alt={product.title} // Updated alt text for better accessibility
          />
        </div>
        <div className="mt-4">
          <h3 className="md:text-[12px] text-[10px] tracking-widest mb-1">{product.category}</h3>
          <h2 className="md:text-md truncate font-medium">{product.title}</h2>
          <ReviewComponent productId={product.slug} />
          <p className="mt-1 text-purple-600 tracking-wider font-semibold drop-shadow-[0_0_20px_rgba(255,255,255,1)] text-lg md:text-lg">
            ₹{formatIndianCurrency(product.price)}
          </p>
          <div className="mt-1">
            {product.size.includes('S') && <span className={`border ${sizeClass} text-xs md:text-sm px-1 mx-1`}>S</span>}
            {product.size.includes('M') && <span className={`border ${sizeClass} text-xs md:text-sm px-1 mx-1`}>M</span>}
            {product.size.includes('L') && <span className={`border ${sizeClass} text-xs md:text-sm px-1 mx-1`}>L</span>}
            {product.size.includes('XL') && <span className={`border ${sizeClass} text-xs md:text-sm px-1 mx-1`}>XL</span>}
            {product.size.includes('XXL') && <span className={`border ${sizeClass} text-xs md:text-sm px-1 mx-1`}>XXL</span>}
          </div>
          <div className="mt-1">
            {renderColorButtons(product.color)}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default BestSellingProducts;
