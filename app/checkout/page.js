import Checkout from "@/components/extra/Checkout";
import React from "react";

export const metadata = {
    title: 'Checkout',
};

const CheckoutPage = async() => {
    return (
        <>
            <Checkout />
        </>
    );
};

export default CheckoutPage;
