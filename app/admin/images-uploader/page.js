import Image from 'next/image';
import React from 'react'

const ImageUploader = () => {
  const images = [
    'https://via.placeholder.com/300',
    'https://via.placeholder.com/300',
    'https://via.placeholder.com/300',
    'https://via.placeholder.com/300',
    'https://via.placeholder.com/300',
    'https://via.placeholder.com/300',
  ];
  return (
    <>
      <div className="px-4 py-6 md:px-6 xl:px-7">
        <h4 className="text-xl font-semibold">
          Upload An Images
        </h4>
      </div>
      <div className="grid grid-cols-3 gap-4 p-4">
        {images.map((imageUrl, index) => (
          <div key={index} className="relative overflow-hidden rounded-lg">
            <Image src={imageUrl} alt={`Image ${index + 1}`} className="object-contain rounded" fill={true} />
            <div className="absolute inset-0 bg-black opacity-0 hover:opacity-75 transition duration-300">
              <p className="text-white text-center text-lg p-4">Image {index + 1}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default ImageUploader
