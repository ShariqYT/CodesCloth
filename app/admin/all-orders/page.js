import { getAllProducts } from '@/actions/Admin/getAllProducts'
import AllProduct from '@/components/Tables/AllProduct'
import React from 'react'

const AllOrders = () => {
  let products = getAllProducts()
  return (
    <>
      <AllProduct products={products} />
    </>
  )
}

export default AllOrders
