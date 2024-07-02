/* eslint-disable react-hooks/exhaustive-deps */
"use client"
import { useRouter } from 'next/navigation';
import React, { createContext, useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { app } from '@/app/config';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState({});
    const [subTotal, setSubTotal] = useState(0);
    const [user, setUser] = useState('');
    const auth = getAuth(app);
    const router = useRouter();

    useEffect(() => {
        try {
            const cartData = localStorage.getItem('cart');
            if (cartData) {
                const parsedCart = JSON.parse(cartData);
                setCart(parsedCart);
                saveCart(parsedCart);
            }
        } catch (err) {
            localStorage.clear();
        }
    }, [router]);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            } else {
                setUser('');
            }
        });
    
        return () => unsubscribe();
      }, []);

    const saveCart = (myCart) => {
        localStorage.setItem('cart', JSON.stringify(myCart));
        let subTotal = 0;
        let keys = Object.keys(myCart);
        for (let i = 0; i < keys.length; i++) {
            subTotal += myCart[keys[i]].price * myCart[keys[i]].qty;
        }
        setSubTotal(subTotal);
    };

    const addToCart = (itemCode, qty, price, name, size, variant, img) => {
        let newCart = { ...cart };

        if (itemCode in cart) {
            newCart[itemCode].qty = newCart[itemCode].qty + qty;
        } else {
            newCart[itemCode] = { qty, price, name, size, variant, img };
        }
        setCart(newCart);
        saveCart(newCart);
    };

    const buyNow = (itemCode, qty, price, name, size, variant, img) => {
        let newCart = {}
        newCart[itemCode] = { qty, price, name, size, variant, img };
        setCart(newCart);
        saveCart(newCart);
        router.push('/checkout');
    }

    const clearCart = () => {
        setCart({});
        saveCart({});
    };

    const removeFromCart = (itemCode, qty) => {
        let newCart = { ...cart };

        if (itemCode in cart) {
            newCart[itemCode].qty = newCart[itemCode].qty - qty;
        }

        if (newCart[itemCode].qty <= 0) {
            delete newCart[itemCode];
        }

        setCart(newCart);
        saveCart(newCart);
    };

    return (
        <CartContext.Provider value={{ user, cart, subTotal, addToCart, removeFromCart, clearCart, buyNow }}>
            {children}
        </CartContext.Provider>
    );
};
