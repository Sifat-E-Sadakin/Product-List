import React from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { MdOutlineAddShoppingCart } from "react-icons/md";

interface AddToCartBtnProps {
  product: any;
  addToCartFunction: (id: number) => void;
  removeFromCartFunction: (id: number) => void;
  inModal?: boolean;
}

const AddToCartBtn = ({
  inModal,
  product,
  addToCartFunction,
  removeFromCartFunction,
}: AddToCartBtnProps) => {
  return (
    <div
      className={`${
        !inModal
          ? "absolute  left-1/2 -translate-x-1/2 bottom-16 bg-transparent"
          : "bg-[#03A629] text-white"
      }  backdrop-blur border-[1.5px] border-[#FFFFFF4D] text-white rounded-md w-11/12 p-2 hidden group-hover:block  hover:bg-[#03A629] transition-all duration-300 user-select-none`}
      style={{
        userSelect: "none",
      }}>
      <div
        className={`${
          product.cartInfo.quantity > 0 ? "hidden" : "flex"
        }  items-center justify-center gap-1 cursor-pointer`}
        onClick={() => addToCartFunction(product.id)}>
        <MdOutlineAddShoppingCart />
        <span className="user-select-none"> Add to cart </span>
      </div>
      <div
        className={`${
          product.cartInfo.quantity > 0 ? "flex" : "hidden"
        } items-center justify-between gap-1  `}>
        <FaRegTrashAlt
          className="cursor-pointer hover:scale-110 transition-all duration-300"
          onClick={() => removeFromCartFunction(product.id)}
        />
        <span className="user-select-none">
          {product.cartInfo.quantity} Added in Cart
        </span>
        <FaPlus
          className="cursor-pointer hover:scale-110 transition-all duration-300"
          onClick={() => addToCartFunction(product.id)}
        />
      </div>
    </div>
  );
};

export default AddToCartBtn;
