"use client";
import React, { useEffect, useState } from "react";
import { fetchData } from "@/app/utils/DataFetcher/fetchData";
import ProductCart from "../ui/ProductCart";
import toast, { Toaster } from "react-hot-toast";
interface ProductListProps {
  productList: any;
}

const ProductList = ({ productList }: ProductListProps) => {
  const [customProductList, setCustomProductList] = useState<any>([]);

  useEffect(() => {
    const productListWithCartInfo = [] as any;
    productList?.map((product: any) => {
      productListWithCartInfo.push({
        ...product,
        cartInfo: {
          quantity: 0,
        },
      });
    });
    setCustomProductList(productListWithCartInfo);
  }, []);

  const handleAddToCart = (id: number) => {
    const updatedProductList = customProductList?.map((product: any) => {
      if (product.id === id) {
        toast.success(`${product.title} added to cart`);
        product.cartInfo.quantity += 1;
      }
      return product;
    });
    setCustomProductList(updatedProductList);
  };

  const handleRemoveFromCart = (id: number) => {
    const updatedProductList = customProductList?.map((product: any) => {
      if (product.id === id) {
        toast.error(`${product.title} removed from cart`);
        product.cartInfo.quantity -= 1;
      }
      return product;
    });
    setCustomProductList(updatedProductList);
  };
  return (
    <div className="container mx-auto  px-0 xl:px-16 2xl:px-40">
      <div className="grid  justify-center sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-4 gap-y-9 my-3">
        {customProductList?.map((product: any) => (
          <ProductCart
            key={product.id}
            product={product}
            addToCartFunction={handleAddToCart}
            removeFromCartFunction={handleRemoveFromCart}
          />
        ))}
      </div>
      <Toaster />
    </div>
  );
};

export default ProductList;
