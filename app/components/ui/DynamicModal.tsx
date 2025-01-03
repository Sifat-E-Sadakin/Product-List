import Image from "next/image";
import React from "react";
import AddToCartBtn from "./AddToCartBtn";

interface DynamicModalProps {
  name: "cartModal" | "detailsModal";
  modalData: any;
  isOpen: boolean;
  onClose: () => void;
  addToCartFunction: (id: number) => void;
  removeFromCartFunction: (id: number) => void;
}

const DynamicModal = ({
  name,
  modalData,
  isOpen,
  onClose,
  addToCartFunction,
  removeFromCartFunction,
}: DynamicModalProps) => {
  const handleOutsideClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };
  console.log("m", modalData);
  return (
    <div
      className={`
        fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50
        flex justify-center items-center
        ${isOpen ? "" : "hidden"}
      `}
      onClick={handleOutsideClick}>
      <div
        className={`
          bg-white w-full sm:w-3/4 lg:w-3/4 h-[90vh] lg:h-[75vh] rounded-lg p-5 sm:p-11
          ${isOpen ? "" : "hidden"}
        `}>
        <div className="flex justify-end">
          <button onClick={onClose}>X</button>
        </div>
        {name === "detailsModal" && (
          <div className="flex justify-center">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col md:flex-row items-center">
                <div className="w-full md:w-[45%] mb-4 md:mb-0">
                  {modalData?.thumbnail && (
                    <Image
                      src={modalData?.thumbnail}
                      alt={modalData?.title}
                      priority
                      width={500}
                      height={500}
                    />
                  )}
                </div>
                <div className="w-full h-[35vh] lg:h-[60vh] overflow-y-scroll md:w-[55%] md:ps-16">
                  <h1 className="font-bold text-4xl text-[#364A63] mb-3">
                    {modalData?.title}
                  </h1>
                  <p className="mb-5 flex items-center gap-2">
                    {/* <RatingView ratingValue={modalData?.rating} /> */}
                    <span className="font-normal text-sm text-[#8091A7] -translate-y-[2px]">
                      ({modalData?.reviews.length} Reviews)
                    </span>
                  </p>
                  <div className="flex items-center gap-2 mb-5">
                    <p className="font-normal text-xl text-[#8091A7] line-through">
                      $
                      {(
                        modalData?.price *
                        (1 + modalData?.discountPercentage / 100)
                      ).toFixed(2)}
                    </p>
                    <p className="font-bold text-2xl text-[#1882FF] -translate-y-[2px]">
                      ${modalData?.price.toFixed(2)}
                    </p>
                  </div>
                  <div className="text-lg font-normal text-[#8091A7] mb-5">
                    <p>{modalData?.description}</p>
                  </div>
                  <div className="flex gap-10 mb-5">
                    <div>
                      <h6 className="text-sm font-normal text-[#8091A7]">
                        SKU
                      </h6>
                      <p className="font-bold text-base text-[#364A63]">
                        {modalData?.sku}
                      </p>
                    </div>
                    <div>
                      <h6 className="text-sm font-normal text-[#8091A7]">
                        Category
                      </h6>
                      <p className="font-bold text-base text-[#364A63]">
                        {modalData?.category}
                      </p>
                    </div>
                  </div>
                  <div className="mb-5">
                    <h2 className="text-lg font-bold text-[#364A63] mb-3">
                      Availability
                    </h2>
                    <p className="font-normal text-sm text-[#364A63]">
                      {modalData?.availabilityStatus} ({modalData?.stock} left
                      in stock)
                    </p>
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-[#364A63] mb-3">
                      Warranty
                    </h2>
                    <p className="font-normal text-sm text-[#8091A7]">
                      {modalData?.warrantyInformation}
                    </p>
                  </div>
                  <div className="mt-5">
                    <h2 className="text-lg font-bold text-[#364A63] mb-3">
                      Shipping
                    </h2>
                    <p className="font-normal text-sm text-[#8091A7]">
                      {modalData?.shippingInformation}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 mt-5">
                    {modalData?.cartInfo ? (
                      <AddToCartBtn
                        inModal
                        product={modalData}
                        addToCartFunction={addToCartFunction}
                        removeFromCartFunction={removeFromCartFunction}
                      />
                    ) : (
                      <button className="bg-[#1882FF] text-white px-5 py-2 rounded-md">
                        Add to Cart
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {name === "cartModal" && (
          <div>
            <h1 className="font-bold text-2xl text-[#364A63] mb-5">
              Your Cart
            </h1>
            <div className="overflow-auto max-h-[50vh] mb-5">
              {modalData?.length > 0 ? (
                <table className="w-full">
                  <thead className="font-normal text-sm text-[#8091A7] border-b border-[#DBDFEA]">
                    <tr className="text-left">
                      <th>Item</th>
                      <th>Unit Price</th>
                      <th>Qnt</th>
                      <th>Total Price </th>
                    </tr>
                  </thead>
                  <tbody className="border-b border-[#DBDFEA]">
                    {modalData?.map((item: any, index: number) => (
                      <tr key={index} className="border-b border-[#DBDFEA]">
                        <td className="py-5 flex gap-3 items-center font-normal text-sm text-[#364A63]">
                          <Image
                            className="rounded-lg"
                            src={item.thumbnail}
                            alt={item.title}
                            width={50}
                            height={50}
                          />
                          {item.title}
                        </td>
                        <td className="py-5 font-normal text-sm text-[#364A63]">
                          ${item.price.toFixed(2)}
                        </td>
                        <td className="py-5 font-normal text-sm text-[#364A63]">
                          {item.cartInfo.quantity}
                        </td>
                        <td className="py-5 font-normal text-sm text-[#364A63]">
                          ${(item.price * item.cartInfo.quantity).toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr>
                      <td
                        colSpan={2}
                        className="py-5 font-bold text-base text-[#364A63]">
                        Total
                      </td>
                      <td className="py-5 font-bold text-sm text-[#364A63]">
                        {modalData?.reduce(
                          (acc: number, item: any) =>
                            acc + item.cartInfo.quantity,
                          0
                        )}
                      </td>
                      <td className="py-5 font-bold text-lg text-[#364A63]">
                        $
                        {modalData
                          ?.reduce(
                            (acc: number, item: any) =>
                              acc + item.cartInfo.quantity * item.price,
                            0
                          )
                          .toFixed(2)}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              ) : (
                <h1 className="font-bold text-2xl text-[#364A63] mb-5">
                  No items in cart
                </h1>
              )}
            </div>
            <div className="flex justify-end mt-5">
              <button
                className="border border-[#DBDFEA] font-bold text-sm flex items-center justify-center text-[#364A63] px-4 py-2 rounded-lg mr-2
                hover:bg-[#03A629] hover:text-white transition-all duration-300
                "
                onClick={onClose}>
                Continue Shopping
              </button>
              <button
                className="bg-[#03A629]  font-bold text-sm flex items-center justify-center text-white px-4 py-2 rounded-lg 
                hover:bg-transparent hover:text-[#364A63] border  transition-all duration-300"
                onClick={onClose}>
                Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DynamicModal;
