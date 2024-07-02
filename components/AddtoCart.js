"use client"
import { CartContext } from '@/context/CartContext';
import { useContext } from 'react';
import toast, { Toaster } from 'react-hot-toast';

const AddtoCart = ({ slug, product }) => {
    const { addToCart } = useContext(CartContext);

    return (
        <>
            <Toaster
                position="bottom-center"
                reverseOrder={false}
            />
            <button disabled={product.availableQty === 0} onClick={() => { addToCart(slug, 1, product.price, product.title, product.size, product.color, product.img), toast.success(`Added to your cart`, { duration: 5000, style: { border: '2px solid #7e22ce', padding: '15px 20px'} }) }} className="disabled:opacity-25 flex text-white bg-purple-700 border-0 py-2 px-6 focus:outline-none hover:bg-purple-900 rounded">Add to Cart</button>
        </>
    )
}

export default AddtoCart
