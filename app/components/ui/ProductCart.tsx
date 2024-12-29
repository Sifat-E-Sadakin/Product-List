"use client";
import Image from "next/image";
import React, { useState } from "react";
import connector from "@/public/assets/Connector.png";
import tail from "@/public/assets/Tail.png";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { FiEye } from "react-icons/fi";
import DynamicModal from "./DynamicModal";
import AddToCartBtn from "./AddToCartBtn";
interface ProductCartProps {
  product: any;
  addToCartFunction: (id: number) => void;
  removeFromCartFunction: (id: number) => void;
}

const ProductCart = ({
  product,
  addToCartFunction,
  removeFromCartFunction,
}: ProductCartProps) => {
  const [openModal, setOpenModal] = useState(false);
  const [modalData, setModalData] = useState<any>(null);

  const handleModalOpen = (product: any) => {
    setOpenModal(true);
    setModalData(product);
  };
  return (
    <div className="flex group  items-start justify-center rounded-lg hover:shadow-lg  transition-all duration-300 max-w-[218px]">
      <div>
        <div className="relative">
          <Image
            className="bg-[#ebe6e6] group-hover:bg-[#9e9b9c] duration-300  rounded-lg "
            src={product?.thumbnail}
            alt={product?.title}
            width={210}
            height={210}
          />
          <AddToCartBtn
            product={product}
            addToCartFunction={addToCartFunction}
            removeFromCartFunction={removeFromCartFunction}
          />
          <button
            className="absolute left-1/2 -translate-x-1/2 bottom-3 bg-transparent backdrop-blur border-[1.5px] border-[#FFFFFF4D] text-white rounded-md w-11/12 p-2 hidden group-hover:flex justify-center items-center gap-1 hover:bg-[#03A629] transition-all duration-300 user-select-none"
            onClick={() => handleModalOpen(product)}>
            <FiEye /> Quick View
          </button>
          <div className="absolute  top-[12px] -left-[4] w-fit ps-2 h-[24px] rounded-tl bg-gradient-to-r from-[#F27D00] to-[#FFA03B]">
            <div className="relative">
              <Image
                src={connector}
                alt="connector"
                width={4}
                height={6}
                className="absolute top-[24px] -left-2"
              />
              <Image
                src={tail}
                alt="tail"
                width={12}
                height={24}
                className="absolute right-[-12px]"
              />
            </div>
            <h3 className="text-white text-center">
              {product.discountPercentage} %
            </h3>
          </div>
        </div>
        <div className="w-48 px-2 py-3">
          <h4 className="font-normal text-sm text-[#5A6573]">
            {product.brand ? product.brand : "Non Branded"}
          </h4>
          <h2 className="font-[525] text-base leading-[22px]  text-[#1A2B3D] h-11">
            {product.title}
          </h2>
          <div className="flex gap-2 items-center ">
            <span className="font-[475] text-xl leading-[22px] text-[#1882FF] ">
              ৳ {product.price}
            </span>
            <span className="font-normal text-sm text-[#77818C] translate-y-[1.4px] line-through">
              ৳ {product.price}
            </span>
          </div>
        </div>
      </div>
      <DynamicModal
        modalData={modalData}
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        addToCartFunction={addToCartFunction}
        removeFromCartFunction={removeFromCartFunction}
      />
    </div>
  );
};

export default ProductCart;
