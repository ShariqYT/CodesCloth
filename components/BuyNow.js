"use client"
import { CartContext } from '@/context/CartContext';
import { useContext } from 'react';

const BuyNow = ({ slug, product }) => {
    const { buyNow } = useContext(CartContext);

    return (
        <button disabled={product.availableQty === 0} onClick={() => { buyNow(slug, 1, product.price, product.title, product.size, product.color, product.img) } } className="disabled:opacity-25 flex text-white bg-purple-700 border-0 py-2 px-6 focus:outline-none hover:bg-purple-900 rounded">Buy Now</button>
    )
}

export default BuyNow
