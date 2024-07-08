"use client"
import ImageUpload from '@/components/ImageUpload';
import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

const addProducts = async (productData) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/addProducts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(productData),
    });

    const data = await response.json();

    if (data.success) {
      toast.success('Product added successfully!', { duration: 5000, style: { border: '2px solid green', padding: '15px 20px', marginBottom: '40px' } });
    } else {
      toast.error(data.error, { duration: 5000, style: { border: '2px solid red', padding: '15px 20px', marginBottom: '40px' } });
    }
  } catch (error) {
    console.error('Error adding product:', error);
    toast.error('Failed to add product', { duration: 5000, style: { border: '2px solid red', padding: '15px 20px', marginBottom: '40px' } });
  }
};

const AddProducts = () => {
  const [productType, setProductType] = useState('');
  const [productTitle, setProductTitle] = useState('');
  const [description, setDescription] = useState('');
  const [variants, setVariants] = useState([{ slug: '', size: '', color: '', price: 0, availableQty: 0 }]);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleVariantChange = (index, field, value) => {
    const newVariants = [...variants];
    newVariants[index][field] = value;
    setVariants(newVariants);
  };

  const addVariant = () => {
    setVariants([...variants, { slug: '', size: '', color: '', price: 0, availableQty: 0 }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const productData = {
      productType,
      productTitle,
      description,
      variants,
      image,
    };

    await addProducts(productData);
    setLoading(false);
  };

  const clearFields = () => {
    setProductType('');
    setProductTitle('');
    setDescription('');
    setVariants([{ slug: '', size: '', color: '', price: 0, availableQty: 0 }]);
    setImage(null);
  };

  const handleRemoveVariant = (indexToRemove) => {
    const updatedVariants = variants.filter((_, index) => index !== indexToRemove);
    setVariants(updatedVariants);
  };

  return (
    <form className="max-w-full border-2 border-purple-700 mx-auto shadow-md rounded" onSubmit={handleSubmit}>
      <Toaster position="bottom-center" reverseOrder={false} />
      <div className="p-7">
        <h4 className="text-xl font-semibold">Add Product</h4>
      </div>

      <div className="mb-4 pt-7 px-7 border-purple-700 border-t">
        <label className="block text-sm font-bold mb-2" htmlFor="productType">Product Type (LowerCase)</label>
        <select
          className='w-full px-3 py-2 bg-transparent border  border-gray-300 rounded-md outline-none focus:border-2 focus:border-purple-700'
          name="productType"
          value={productType}
          onChange={(e) => setProductType(e.target.value)}
          id="productType"
        >
          <option className='text-black' default hidden>---Select Product Type---</option>
          <option className='text-black' value="tshirts">Tshirts</option>
          <option className='text-black' value="hoodies">Hoodies</option>
          <option className='text-black' value="mugs">Mugs</option>
          <option className='text-black' value="mousepads">Mousepads</option>
          <option className='text-black' value="caps">Caps</option>
        </select>
      </div>

      <div className="mb-4 px-7">
        <label className="block text-sm font-bold mb-2" htmlFor="productTitle">Product Title</label>
        <input
          className="w-full px-3 py-2 bg-transparent border border-gray-300 rounded-md outline-none focus:border-2 focus:border-purple-700"
          id="productTitle"
          type="text"
          value={productTitle}
          placeholder='e.g., "Neon Gaming T-Shirts"'
          onChange={(e) => setProductTitle(e.target.value)}
          required
        />
      </div>

      <div className="mb-4 px-7">
        <label className="block text-sm font-bold mb-2" htmlFor="description">Description</label>
        <textarea
          className="w-full resize-none px-3 py-2 bg-transparent border border-gray-300 rounded-md outline-none focus:border-2 focus:border-purple-700"
          id="description"
          rows={3}
          value={description}
          placeholder='e.g., "This is a description of the product"'
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>

      {variants.map((variant, index) => (
        <div key={index} className="mb-4 px-7">
          <h4 className="text-md font-semibold">Variant {index + 1}</h4>

          <div className="mb-4">
            <label className="block text-sm font-bold mb-2" htmlFor={`slug-${index}`}>Product Slug</label>
            <input
              className="w-full px-3 py-2 bg-transparent border border-gray-300 rounded-md outline-none focus:border-2 focus:border-purple-700"
              id={`slug-${index}`}
              type="text"
              value={variant.slug}
              placeholder='e.g., "neon-gaming-tshirts-S-Black"'
              onChange={(e) => handleVariantChange(index, 'slug', e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-bold mb-2" htmlFor={`size-${index}`}>Size</label>
            <select
              className='w-full px-3  py-2 bg-transparent border border-gray-300 rounded-md outline-none focus:border-2 focus:border-purple-700'
              name={`size-${index}`}
              value={variant.size}
              onChange={(e) => handleVariantChange(index, 'size', e.target.value)}
              id={`size-${index}`}
            >
              <option className='text-black' default hidden>---Select Product Size---</option>
              <option className='text-black' value="S">S</option>
              <option className='text-black' value="M">M</option>
              <option className='text-black' value="L">L</option>
              <option className='text-black' value="XL">XL</option>
              <option className='text-black' value="XXL">XXL</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-bold mb-2" htmlFor={`color-${index}`}>Color</label>
            <select
              className='w-full px-3 py-2 bg-transparent border border-gray-300 rounded-md outline-none focus:border-2 focus:border-purple-700'
              name={`color-${index}`}
              value={variant.color}
              onChange={(e) => handleVariantChange(index, 'color', e.target.value)}
              id={`color-${index}`}
            >
              <option className='text-black' default hidden>---Select Product Color---</option>
              <option className='text-black' value="Black">Black</option>
              <option className='text-black' value="White">White</option>
              <option className='text-black' value="Red">Red</option>
              <option className='text-black' value="Blue">Blue</option>
              <option className='text-black' value="Green">Green</option>
              <option className='text-black' value="Yellow">Yellow</option>
              <option className='text-black' value="Purple">Purple</option>
              <option className='text-black' value="Orange">Orange</option>
              <option className='text-black' value="Pink">Pink</option>
              <option className='text-black' value="Brown">Brown</option>
              <option className='text-black' value="Gray">Gray</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-bold mb-2" htmlFor={`price-${index}`}>Price (min: ₹99)</label>
            <input
              className="w-full px-3 py-2 bg-transparent border border-gray-300 rounded-md outline-none focus:border-2 focus:border-purple-700"
              id={`price-${index}`}
              type="number"
              min="99"
              value={variant.price}
              placeholder='e.g., 100'
              onChange={(e) => handleVariantChange(index, 'price', e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-bold mb-2" htmlFor={`availableQty-${index}`}>Stock</label>
            <input
              className="w-full px-3 py-2 bg-transparent border border-gray-300 rounded-md outline-none focus:border-2 focus:border-purple-700"
              id={`availableQty-${index}`}
              type="number"
              value={variant.availableQty}
              min="0"
              placeholder='e.g., 1000'
              onChange={(e) => handleVariantChange(index, 'availableQty', e.target.value)}
              required
            />
          </div>

          <button
            type="button"
            onClick={() => handleRemoveVariant(index)}
            className="text-red-500 hover:text-red-700 ml-2"
          >
            Remove
          </button>
        </div>
      ))}

      {variants.length < 5 && (
        <>
          <button
            type="button"
            onClick={addVariant}
            className="my-2 mx-7 bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-700 outline-none transition-all duration-200 ease-linear"
          >
            Add Another Variant
          </button>
        </>
      )}

      <ImageUpload setImage={setImage} />

      <button
        type="submit"
        className="my-10 mx-7 bg-purple-700 text-white py-2 px-4 rounded-md hover:bg-purple-800 outline-none transition-all duration-200 ease-linear"
        disabled={loading}
      >
        {loading ? 'Adding Product...' : 'Add Product'}
      </button>
      <button
        type="reset"
        onClick={clearFields}
        className="my-10 bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-700 outline-none transition-all duration-200 ease-linear"
      >
        Clear Fields
      </button>
    </form>
  );
}

export default AddProducts;