// src/components/CartSidebar/index.tsx
import React from "react";
import { useCart } from "@/hooks/useCart";
import { formatCurrency } from "@/utils/formatCurrency";
import IconEmptyCart from "@/assets/illustration-empty-cart.svg";
import CartItem from "@/components/CartItem";

import OrderConfirmationModal from "@/components/OrderConfirmationModal";

import IconCarbonNeutralUrl from "@/assets/icon-carbon-neutral.svg";

const CartSidebar: React.FC = () => {
  const { cart, totalItems, cartTotal, clearCart } = useCart();
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const handleConfirmOrder = () => {
    setIsModalOpen(true);
  };

  const handleNewOrder = () => {
    clearCart();
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-sm p-6 w-full">
        <h2 className={`text-2xl font-bold text-[#c83b0e] mb-6`}>
          Your Cart ({totalItems})
        </h2>

        {cart.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center py-10">
            <img
              src={IconEmptyCart}
              alt="Empty cart"
              className="w-24 h-auto text-gray-300"
            />
            <p className={`mt-4 font-semibold text-[hsl(12,20%,44%)]`}>
              Your added items will appear here
            </p>
          </div>
        ) : (
          <>
            <div className="divide-y divide-[hsl(13,31%,94%)]">
              {cart.map((item) => (
                <CartItem key={item.name} item={item} />
              ))}
            </div>

            <div className="flex justify-between items-center my-6">
              <span className="text-base text-[hsl(12,20%,44%)]">
                Order Total
              </span>
              <span className="text-2xl font-bold text-gray-900">
                {formatCurrency(cartTotal)}
              </span>
            </div>

            <div
              className={`flex items-center justify-center space-x-2 bg-[hsl(20,50%,98%)] p-3 rounded-md`}
            >
              <img
                src={IconCarbonNeutralUrl}
                alt="Carbon neutral"
                className="w-5 h-5"
              />
              <span className="text-sm">
                This is a{" "}
                <span className={`font-semibold text-[hsl(155,60%,40%)]`}>
                  carbon-neutral
                </span>{" "}
                delivery
              </span>
            </div>

            <button
              onClick={handleConfirmOrder}
              className={`w-full bg-[#c83b0e] text-white font-semibold py-3 px-4 rounded-full mt-6
                          cursor-pointer transition-opacity duration-300
                          hover:opacity-90
                          focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#c83b0e]`}
            >
              Confirm Order
            </button>
          </>
        )}
      </div>

      {isModalOpen && (
        <OrderConfirmationModal
          cart={cart}
          orderTotal={cartTotal}
          onNewOrder={handleNewOrder}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
};

export default CartSidebar;
