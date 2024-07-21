/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useRouter } from 'next/navigation';
import React, { createContext, useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { app } from '@/app/config';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState({});
    const [subTotal, setSubTotal] = useState(0);
    const [user, setUser] = useState('');
    const auth = getAuth(app);
    const router = useRouter();
    const cartRef = useRef({});

    useEffect(() => {
        const handleAuthStateChange = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user.email);
            } else {
                setUser('');
            }
        });

        return () => handleAuthStateChange();
    }, []);

    useEffect(() => {
        try {
            const cartData = localStorage.getItem('cart');
            if (cartData) {
                const parsedCart = JSON.parse(cartData);
                setCart(parsedCart);
                cartRef.current = parsedCart;
                saveCart(parsedCart);
            }
        } catch (err) {
            localStorage.clear();
        }
    }, []);

    const saveCart = useCallback((myCart) => {
        localStorage.setItem('cart', JSON.stringify(myCart));
        let subTotal = 0;
        let keys = Object.keys(myCart);
        for (let i = 0; i < keys.length; i++) {
            subTotal += myCart[keys[i]].price * myCart[keys[i]].qty;
        }
        setSubTotal(subTotal);
    }, []);

    const addToCart = useCallback((itemCode, qty, price, name, size, variant, img) => {
        let newCart = { ...cartRef.current };

        if (itemCode in newCart) {
            newCart[itemCode].qty += qty;
        } else {
            newCart[itemCode] = { qty, price, name, size, variant, img };
        }

        setCart(newCart);
        cartRef.current = newCart;
        saveCart(newCart);
    }, [saveCart]);

    const buyNow = useCallback((itemCode, qty, price, name, size, variant, img) => {
        let newCart = { [itemCode]: { qty, price, name, size, variant, img } };

        setCart(newCart);
        cartRef.current = newCart;
        saveCart(newCart);
        router.push('/checkout');
    }, [router, saveCart]);

    const clearCart = useCallback(() => {
        setCart({});
        cartRef.current = {};
        saveCart({});
    }, [saveCart]);

    const removeFromCart = useCallback((itemCode, qty) => {
        let newCart = { ...cartRef.current };

        if (itemCode in newCart) {
            newCart[itemCode].qty -= qty;
        }

        if (newCart[itemCode].qty <= 0) {
            delete newCart[itemCode];
        }

        setCart(newCart);
        cartRef.current = newCart;
        saveCart(newCart);
    }, [saveCart]);

    const contextValue = useMemo(() => ({
        user,
        cart,
        subTotal,
        addToCart,
        removeFromCart,
        clearCart,
        buyNow
    }), [user, cart, subTotal, addToCart, removeFromCart, clearCart, buyNow]);

    return (
        <CartContext.Provider value={contextValue}>
            {children}
        </CartContext.Provider>
    );
};
