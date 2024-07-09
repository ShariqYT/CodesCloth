import Checkout from "@/components/extra/Checkout";
import React from "react";

export const metadata = {
    title: 'Checkout | CodesCloth',
};

const CheckoutPage = async() => {
    return (
        <>
            <Checkout />
        </>
    );
};

export default CheckoutPage;
