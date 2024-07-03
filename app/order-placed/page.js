import React, { Suspense } from "react";
import OrderDetails from "@/components/extra/OrderDetails";

export const metadata = {
  title: "Order Placed | CodesCloth",
};

const OrderPlaced = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <OrderDetails />
    </Suspense>
  );
};

export default OrderPlaced;
