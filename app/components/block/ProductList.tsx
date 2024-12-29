"use client";
import React, { useEffect, useState } from "react";
import { fetchData } from "@/app/utils/DataFetcher/fetchData";
import ProductCart from "../ui/ProductCart";
import toast, { Toaster } from "react-hot-toast";
import DynamicModal from "../ui/DynamicModal";
import { MdOutlineAddShoppingCart } from "react-icons/md";
interface ProductListProps {
  productList: any;
}

const ProductList = ({ productList }: ProductListProps) => {
  const [customProductList, setCustomProductList] = useState<any>([]);
  const [cart, setCart] = useState<any>([]);
  const [openModal, setOpenModal] = useState(false);
  const [modalData, setModalData] = useState<any>(null);

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
        if (product.cartInfo.quantity === 1) {
          setCart([...cart, product]);
        }
      }
      return product;
    });
    setCustomProductList(updatedProductList);
  };
  console.log(cart);
  const handleRemoveFromCart = (id: number) => {
    const updatedProductList = customProductList?.map((product: any) => {
      if (product.id === id) {
        toast.error(`${product.title} removed from cart`);
        product.cartInfo.quantity -= 1;
        if (product.cartInfo.quantity === 0) {
          const updatedCart = cart.filter((item: any) => item.id !== id);
          setCart(updatedCart);
        }
      }
      return product;
    });
    setCustomProductList(updatedProductList);
  };

  const handleModalOpen = () => {
    setOpenModal(true);
    setModalData(cart);
  };
  return (
    <div className="">
      <div className=" sticky top-0   bg-transparent backdrop-blur-lg z-10 py-2   ">
        <div className="container mx-auto flex justify-between items-center px-1 xl:px-16 2xl:px-40 ">
          <h1>
            <span className="text-[#03A629] font-bold text-xl">Green</span>{" "}
            Store
          </h1>
          <button
            onClick={() => handleModalOpen()}
            className="
          bg-[#03A629] text-white px-3 py-2 rounded-lg
          hover:bg-[#FFA03B] transition-all duration-300   flex items-center gap-1               
        ">
            <MdOutlineAddShoppingCart /> View Cart
          </button>
        </div>
      </div>
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
        <DynamicModal
          name="cartModal"
          isOpen={openModal}
          onClose={() => setOpenModal(false)}
          modalData={modalData}
          addToCartFunction={handleAddToCart}
          removeFromCartFunction={handleRemoveFromCart}
        />
      </div>
    </div>
  );
};

export default ProductList;
