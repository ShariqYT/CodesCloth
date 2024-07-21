import { getAllProducts } from '@/actions/Admin/getAllProducts';
import Image from 'next/image';
import React from 'react'

export const metadata = {
  title: 'Admin - Gallery',
}

const Gallery = async () => {
  const productImg = await getAllProducts();

  return (
    <div className='container mx-auto'>
      <div className="px-4 py-6 md:px-6 xl:px-7">
        <h4 className="text-xl font-semibold">
          All Product Images
        </h4>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
        {productImg.map((product, index) => (
          <div key={index} className="relative flex items-center justify-center overflow-hidden shadow-lg rounded-lg bg-white transition-transform duration-200 hover:scale-105">
            <Image
              src={product.img}
              alt={product.title}
              width={200}
              height={200}
              className="w-52 h-52 object-contain"
            />
            <div className="absolute inset-0 bg-black opacity-0 hover:opacity-50 transition-opacity duration-200 flex items-center justify-center">
              <span className="text-white font-semibold">{product.title}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Gallery;
