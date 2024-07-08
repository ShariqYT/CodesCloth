"use client";
import Image from "next/image";
import Link from "next/link";
import { formatIndianCurrency } from "../extra/FormatAmount";
import { useState } from "react";

const AllProduct = ({ products }) => {
  // Check if products is an array, and fallback to an empty array if not
  const productList = Array.isArray(products) ? products : [];

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = productList.slice(startIndex, endIndex);

  const totalPages = Math.ceil(productList.length / itemsPerPage);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="rounded-sm border font-semibold shadow ">
      <div className="px-4 py-6 md:px-6 xl:px-7">
        <h4 className="text-xl font-semibold">
          All Products
        </h4>
      </div>

      <div className="grid grid-cols-8 border-t gap-8 px-4 py-4 sm:grid-cols-8 md:px-6 2xl:px-7">
        <div className="col-span-2 flex items-center">
          <p className="font-medium">Product Name</p>
        </div>
        <div className="col-span-2 flex items-center">
          <p className="font-medium">Slug</p>
        </div>
        <div className="col-span-1 hidden items-center sm:flex">
          <p className="font-medium">Category</p>
        </div>
        <div className="col-span-1 hidden items-center sm:flex">
          <p className="font-medium">Size/Color</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Stock</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Price</p>
        </div>
      </div>

      {currentProducts.map((product, key) => (
        <div
          className="grid grid-cols-8 border-t gap-8 px-4 py-4 sm:grid-cols-8 md:px-6 2xl:px-7"
          key={key}
        >
          <div className="col-span-2 truncate flex items-center">
            <div className="flex flex-col pr-7 gap-8 sm:flex-row sm:items-center">
              <div className="h-12 w-16 rounded-md">
                <Image
                  src={product.img}
                  className="w-10"
                  width={60}
                  height={50}
                  alt="Product"
                />
              </div>
              <p className="text-sm">
                {product.title}
              </p>
            </div>
          </div>
          <div className="col-span-2 hidden items-center sm:flex">
            <p className="text-sm font-bold">
              <Link href={'/product/' + product.slug} target="_blank">
                {product.slug}
              </Link>
            </p>
          </div>
          <div className="col-span-1 hidden items-center sm:flex">
            <p className="text-sm">
              {product.category}
            </p>
          </div>
          <div className="col-span-1 hidden items-center sm:flex">
            <p className="text-sm">
              {product.size}/{product.color}
            </p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="text-sm">{product.availableQty}</p>
          </div>

          <div className="col-span-1 flex items-center">
            <p className="text-lg text-purple-700">
              ₹{formatIndianCurrency(product.price)}
            </p>
          </div>
        </div>
      ))}

      <div className="flex justify-between px-4 py-4 sm:px-6 2xl:px-7">
        <button
          className="border-2 border-purple-700 cursor-pointer hover:bg-purple-700 hover:text-white transition-all duration-300 ease-in-out rounded px-4 py-2"
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="text-sm">
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="border-2 border-purple-700 cursor-pointer hover:bg-purple-700 hover:text-white transition-all duration-300 ease-in-out rounded px-4 py-2"
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AllProduct;
