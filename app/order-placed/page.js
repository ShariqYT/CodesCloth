import React, { Suspense } from "react";
import OrderDetails from "@/components/extra/OrderDetails";

export const metadata = {
  title: "Order Placed",
};
const OrderPlaced = () => {
  return (
    <Suspense>
      <OrderDetails />
    </Suspense>
  );
};

export default OrderPlaced;
