import React from "react";
import type { CartItem } from "@/types";
import { formatCurrency } from "@/utils/formatCurrency";
import IconOrderConfirmed from "@/assets/icon-order-confirmed.svg";

interface OrderConfirmationModalProps {
  cart: CartItem[];
  orderTotal: number;
  onNewOrder: () => void;
  onClose: () => void;
}

const OrderConfirmationModal: React.FC<OrderConfirmationModalProps> = ({
  cart,
  orderTotal,
  onNewOrder,
  onClose,
}) => {
  return (
    <div
      className="fixed inset-0 bg-black/50 z-40 flex justify-center items-end md:items-center p-0 md:p-4"
      aria-modal="true"
      role="dialog"
      onClick={onClose}
    >
      <div
        className="bg-white p-8 md:rounded-lg rounded-t-3xl shadow-xl w-full md:max-w-sm z-50 text-left
                   transform transition-transform duration-300 translate-y-0"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-start mb-4">
          <img
            src={IconOrderConfirmed}
            alt="Order Confirmed"
            className="w-12 h-12"
          />
        </div>

        <h2 className="text-3xl font-bold text-[hsl(0,0%,0%)] mb-2">
          Order Confirmed
        </h2>
        <p className="text-[hsl(12,20%,44%)] mb-6">
          We hope you enjoy your food!
        </p>

        <div className="bg-[hsl(20,50%,98%)] p-4 rounded-lg text-left mb-6 max-h-72 overflow-y-auto">
          {cart.map((item, index) => (
            <div
              key={item.name}
              className={`flex items-center justify-between py-2 ${
                index > 0 ? "border-t border-gray-200" : ""
              }`}
            >
              <div className="flex items-center space-x-2">
                <img
                  src={item.image.thumbnail.replace("./", "/")}
                  alt={item.name}
                  className="w-10 h-10 rounded-md object-cover"
                />
                <div>
                  <h3 className="text-sm font-semibold text-[hsl(0,0%,0%)]">
                    {item.name}
                  </h3>
                  <div className="flex items-center space-x-1 text-xs">
                    <span className="text-[#c83b0e] font-semibold">
                      {item.quantity}x
                    </span>
                    <span className="text-[hsl(12,20%,44%)]">
                      @ {formatCurrency(item.price)}
                    </span>
                  </div>
                </div>
              </div>
              <span className="text-sm font-semibold text-[hsl(12,20%,44%)]">
                {formatCurrency(item.quantity * item.price)}
              </span>
            </div>
          ))}

          <div className="flex justify-between items-center pt-4 mt-4 border-t border-gray-200">
            <span className="text-base text-[hsl(0,0%,0%)]">Order Total</span>
            <span className="text-2xl font-bold text-[hsl(0,0%,0%)]">
              {formatCurrency(orderTotal)}
            </span>
          </div>
        </div>

        <button
          onClick={onNewOrder}
          className="w-full bg-[#c83b0e] text-white font-semibold py-3 px-4 rounded-full 
                           cursor-pointer transition-opacity duration-300
                           hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#c83b0e]"
        >
          Start New Order
        </button>
      </div>
    </div>
  );
};

export default OrderConfirmationModal;
