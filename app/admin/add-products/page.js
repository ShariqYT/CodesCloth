"use client"
import ImageUpload from '@/components/ImageUpload';
import React, { useLayoutEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

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
      toast.success('Product added successfully!', {
        duration: 5000,
        style: { border: '2px solid green', padding: '15px 20px', marginBottom: '40px' }
      });
    } else {
      toast.error(data.error, {
        duration: 5000,
        style: { border: '2px solid red', padding: '15px 20px', marginBottom: '40px' }
      });
    }
  } catch (error) {
    toast.error('Failed to add product', {
      duration: 5000,
      style: { border: '2px solid red', padding: '15px 20px', marginBottom: '40px' }
    });
  }
};

const AddProducts = () => {
  const [productType, setProductType] = useState('');
  const [productTitle, setProductTitle] = useState('');
  const [description, setDescription] = useState('');
  const [variants, setVariants] = useState([{ slug: '', size: '', color: '', price: '', originalPrice: '', availableQty: '' }]);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  useLayoutEffect(() => {
    document.title = 'Admin - Add Products | CodesCloth';
  }, []);

  const handleVariantChange = (index, field, value) => {
    const newVariants = [...variants];
    if (field === 'slug') {
      value = value.replace(/\s+/g, '-');
    }
    newVariants[index][field] = value;
    setVariants(newVariants);
  };

  const addVariant = () => {
    setVariants([...variants, { slug: '', size: '', color: '', price: '', originalPrice: '', availableQty: '' }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const productData = {
      productType,
      productTitle,
      description,
      image,
      variants,
    };

    await addProducts(productData);
    setLoading(false);
  };

  const clearFields = () => {
    setProductType('');
    setProductTitle('');
    setDescription('');
    setVariants([{ slug: '', size: '', color: '', price: '', originalPrice: '', availableQty: '' }]);
    setImage(null);
  };

  const handleRemoveVariant = (indexToRemove) => {
    if (variants.length === 1) {
      toast.error('At least one variant is required', {
        duration: 5000,
        style: { border: '2px solid red', padding: '15px 20px', marginBottom: '40px' }
      });
      return;
    }
    const updatedVariants = variants.filter((_, index) => index !== indexToRemove);
    setVariants(updatedVariants);
  };

  return (
    <form className="border-2 my-10 w-80 md:w-full md:mx-auto border-purple-700 container mx-auto shadow-md rounded-lg p-7" onSubmit={handleSubmit}>
      <h4 className="text-xl font-semibold mb-6">Add Product</h4>

      <div className="mb-4 border-t pt-4">
        <label className="block text-sm font-bold mb-2" htmlFor="productType">Product Type (LowerCase)</label>
        <select
          className='w-full px-3 py-2 bg-transparent border border-gray-300 rounded-md outline-none focus:border-2 focus:border-purple-700'
          name="productType"
          value={productType}
          onChange={(e) => setProductType(e.target.value)}
          id="productType"
          required
        >
          <option className='text-black' hidden>---Select Product Type---</option>
          <option className='text-black' value="tshirts">Tshirts</option>
          <option className='text-black' value="hoodies">Hoodies</option>
          <option className='text-black' value="mugs">Mugs</option>
          <option className='text-black' value="caps">Caps</option>
        </select>
      </div>

      <div className="mb-4">
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

      <div className="mb-4">
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
        <div key={index} className="mb-4">
          <h4 className="text-md font-semibold mb-2">Variant {index + 1}</h4>

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
              className='w-full px-3 py-2 bg-transparent border border-gray-300 rounded-md outline-none focus:border-2 focus:border-purple-700'
              name={`size-${index}`}
              value={variant.size}
              onChange={(e) => handleVariantChange(index, 'size', e.target.value)}
              id={`size-${index}`}
              required
            >
              <option className='text-black' hidden>---Select Product Size---</option>
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
              required
            >
              <option className="text-black" hidden>---Select Product Color---</option>
              <option className="color-option" value="Black">
                Black
              </option>
              <option className="color-option" value="Blue">
                Blue
              </option>
              <option className="color-option" value="Brown">
                Brown
              </option>
              <option className="color-option" value="Cyan">
                Cyan
              </option>
              <option className="color-option" value="Gray">
                Gray
              </option>
              <option className="color-option" value="Green">
                Green
              </option>
              <option className="color-option" value="Indigo">
                Indigo
              </option>
              <option className="color-option" value="Fuchsia">
                Light Pink
              </option>
              <option className="color-option" value="Lime">
                Lime Green
              </option>
              <option className="color-option" value="Orange">
                Orange
              </option>
              <option className="color-option" value="Pink">
                Pink
              </option>
              <option className="color-option" value="Purple">
                Purple
              </option>
              <option className="color-option" value="Red">
                Red
              </option>
              <option className="color-option" value="Rose">
                Rose Red
              </option>
              <option className="color-option" value="Sky">
                Sky Blue
              </option>
              <option className="color-option" value="Teal">
                Teal
              </option>
              <option className="color-option" value="Violet">
                Violet
              </option>
              <option className="color-option" value="White">
                White
              </option>
              <option className="color-option" value="Yellow">
                Yellow
              </option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-bold mb-2" htmlFor={`original-price-${index}`}>Original Price (min: ₹99)</label>
            <input
              className="w-full px-3 py-2 bg-transparent border border-gray-300 rounded-md outline-none focus:border-2 focus:border-purple-700"
              id={`original-price-${index}`}
              type="number"
              min="99"
              value={variant.originalPrice}
              placeholder='e.g. 100, 1000, 1000000'
              onChange={(e) => handleVariantChange(index, 'originalPrice', e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-bold mb-2" htmlFor={`final-price-${index}`}>Final Price (min: ₹99)</label>
            <input
              className="w-full px-3 py-2 bg-transparent border border-gray-300 rounded-md outline-none focus:border-2 focus:border-purple-700"
              id={`final-price-${index}`}
              type="number"
              min="99"
              value={variant.price}
              placeholder='e.g. 100, 1000, 1000000'
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
              placeholder='e.g. 100, 1000, 1000000'
              onChange={(e) => handleVariantChange(index, 'availableQty', e.target.value)}
              required
            />
          </div>

          <button
            type="button"
            onClick={() => handleRemoveVariant(index)}
            className="text-red-500 hover:underline hover:text-red-700 ml-2"
          >
            Remove
          </button>
        </div>
      ))}

      {variants.length < 5 && (
        <button
          type="button"
          onClick={addVariant}
          className="my-2 bg-purple-700 text-white py-2 px-4 rounded-md hover:bg-purple-800 transition-all duration-200 ease-in-out"
        >
          Add Another Variant
        </button>
      )}

      <ImageUpload setImage={setImage} />

      <button
        type="submit"
        className="my-10 bg-purple-700 text-white py-2 px-4 rounded-md hover:bg-purple-800 transition-all duration-200 ease-in-out"
        disabled={loading}
      >
        {loading ? 'Adding Product...' : 'Add Product'}
      </button>

      <button
        type="reset"
        onClick={clearFields}
        className="my-10 bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-700 transition-all duration-200 ease-in-out"
      >
        Clear Fields
      </button>
    </form>
  );
}

export default AddProducts;
