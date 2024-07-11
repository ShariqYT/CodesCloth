"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { formatIndianCurrency } from "../extra/FormatAmount";

const AllProduct = ({ products }) => {
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const maxPageButtons = 5; // Maximum number of page buttons to show

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = products.slice(startIndex, endIndex);
  const totalPages = Math.ceil(products.length / itemsPerPage);

  const handlePageClick = (pageNumber) => {
    if (pageNumber !== currentPage) {
      setCurrentPage(pageNumber);
    }
  };

  const handleSortName = () => {
    const newSortOrder = sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(newSortOrder);
    sortProducts(newSortOrder);
  };

  const handleSortCategory = () => {
    const newSortOrder = sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(newSortOrder);
    sortCategory(newSortOrder);
  };

  const handleSortStock = () => {
    const newSortOrder = sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(newSortOrder);
    sortStock(newSortOrder);
  };

  const handleSortPrice = () => {
    const newSortOrder = sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(newSortOrder);
    sortPrice(newSortOrder);
  };

  const sortProducts = (order) => {
    products.sort((a, b) => {
      if (order === "asc") {
        return a.title.localeCompare(b.title);
      } else {
        return b.title.localeCompare(a.title);
      }
    });
  };

  const sortCategory = (order) => {
    products.sort((a, b) => {
      if (order === "asc") {
        return a.category.localeCompare(b.category);
      } else {
        return b.category.localeCompare(a.category);
      }
    });
  };

  const sortStock = (order) => {
    products.sort((a, b) => {
      if (order === "asc") {
        return a.availableQty - b.availableQty;
      } else {
        return b.availableQty - a.availableQty;
      }
    });
  };

  const sortPrice = (order) => {
    products.sort((a, b) => {
      if (order === "asc") {
        return a.price - b.price;
      } else {
        return b.price - a.price;
      }
    });
  };

  const renderPageButtons = () => {
    const pageButtons = [];
    const startPage = Math.max(1, currentPage - Math.floor(maxPageButtons / 2));
    const endPage = Math.min(totalPages, startPage + maxPageButtons - 1);

    for (let i = startPage; i <= endPage; i++) {
      pageButtons.push(
        <li key={i}>
          <p
            className={`rounded-full px-4 py-2 cursor-pointer ${currentPage === i ? "bg-purple-700 text-white" : "hover:bg-purple-600 hover:text-white transition-all duration-200 ease-in-out"
              }`}
            onClick={() => handlePageClick(i)}
          >
            {i}
          </p>
        </li>
      );
    }
    return pageButtons;
  };

  return (
    <div className="rounded-lg border-2 border-purple-700 flex flex-col justify-between container mx-auto m-20 min-h-screen font-semibold shadow ">
      <div>
        <div className="px-4 py-6 md:px-6 xl:px-7">
          <h4 className="text-xl font-semibold">All Products</h4>
        </div>
        <div className="grid grid-cols-4 md:grid-cols-8 border-y border-purple-700 gap-8 px-4 py-4 sm:grid-cols-8 md:px-6 2xl:px-7">
          <div className="col-span-2 flex items-center">
            <p onClick={handleSortName} className="font-medium hover:underline cursor-pointer">Product Name</p>
          </div>
          <div className="col-span-1 md:col-span-2 hidden md:flex items-center">
            <p className="font-medium">Slug</p>
          </div>
          <div className="col-span-1 hidden items-center md:flex">
            <p onClick={handleSortCategory} className="font-medium hover:underline cursor-pointer">Category</p>
          </div>
          <div className="col-span-1 hidden items-center md:flex">
            <p className="font-medium">Size/Color</p>
          </div>
          <div className="col-span-1 flex items-center">
            <p onClick={handleSortStock} className="font-medium hover:underline cursor-pointer">Stock</p>
          </div>
          <div className="col-span-1 flex items-center">
            <p onClick={handleSortPrice} className="font-medium hover:underline cursor-pointer">Price</p>
          </div>
        </div>
        {currentProducts.map((product, key) => (
          <div
            className="grid grid-cols-4 md:grid-cols-8 border-b gap-8 px-4 py-4 sm:grid-cols-8 md:px-6 2xl:px-7"
            key={key}
          >
            <div className="col-span-2 truncate flex items-center">
              <div className="flex pr-7 md:gap-8 md:flex-row items-center">
                <div className="h-12 w-16 rounded-md">
                  <Image
                    src={product.img}
                    className="w-10"
                    width={60}
                    height={50}
                    alt="Product"
                  />
                </div>
                <p className="text-sm text-center">{product.title}...</p>
              </div>
            </div>
            <div className="col-span-2 hidden items-center md:flex">
              <p className="text-sm truncate hover:underline font-bold">
                <Link href={'/product/' + product.slug} target="_blank">
                  {product.slug}...
                </Link>
              </p>
            </div>
            <div className="col-span-1 hidden items-center md:flex">
              <p className="text-sm">{product.category}</p>
            </div>
            <div className="col-span-1 hidden items-center md:flex">
              <p className="text-sm">{product.size}/{product.color}</p>
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
      </div>
      <div className="flex my-4 justify-center">
        <ul className="flex flex-wrap bg-purple-200 rounded-full p-1 md:px-2 md:py-2 text-black gap-2 font-medium">
          
          {renderPageButtons()}
          
        </ul>
      </div>
    </div>
  );
};

export default AllProduct;
