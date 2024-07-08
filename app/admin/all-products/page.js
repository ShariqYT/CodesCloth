
import React from 'react'
import AllProduct from '@/components/Tables/AllProduct'
import { getAllProducts } from '@/actions/Admin/getAllProducts'

const AllProducts = async() => {
  let products = await getAllProducts()

  return (
    <>
      <AllProduct products={products}/>
    </>
  )
}

export default AllProducts