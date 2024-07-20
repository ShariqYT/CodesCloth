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
      <div className="grid grid-cols-3 mx-auto w-fit place-items-center gap-4 md:gap-20 p-4">
        {productImg.map((product, index) => (
          <Image
            key={index}
            src={product.img}
            alt={product.title}
            width={200}
            height={200}
            className="md:h-40 md:w-40 w-full h-full m-10 shadow-xl rounded-lg hover:scale-[2] transition-all duration-200 ease-in-out object-contain bg-white"
          />
        ))}
      </div>
    </div>
  )
}

export default Gallery