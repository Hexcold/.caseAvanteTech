import React from "react";
import type { CartItem as CartItemType } from "../../types";
import { useCart } from "../../hooks/useCart";
import { formatCurrency } from "../../utils/formatCurrency";

import IconRemoveUrl from "@/assets/icon-remove-item.svg";

interface CartItemProps {
  item: CartItemType;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { removeFromCart } = useCart();
  const itemTotal = item.price * item.quantity;

  return (
    <div className="flex items-center justify-between py-4 border-b border-gray-100 last:border-b-0">
      <div className="flex-grow pr-4">
        <h3 className={`font-semibold text-sm text-[hsl(0,0%,0%)]`}>
          {item.name}
        </h3>

        <div className="flex items-center space-x-2 mt-1">
          <span className={`font-semibold text-sm text-[#c83b0e]`}>
            {item.quantity}x
          </span>
          <span className={`text-sm text-[hsl(14,25%,72%)]`}>
            @ {formatCurrency(item.price)}
          </span>
          <span className={`text-sm font-semibold text-[hsl(12,20%,44%)]`}>
            {formatCurrency(itemTotal)}
          </span>
        </div>
      </div>

      <button
        onClick={() => removeFromCart(item.name)}
        aria-label={`Remover ${item.name} do carrinho`}
        className={`flex-shrink-0 w-5 h-5 rounded-full border border-[hsl(14,25%,72%)] text-[hsl(14,25%,72%)]
                    flex items-center justify-center
                    cursor-pointer transition-colors duration-300
                    hover:border-[hsl(0,0%,0%)] hover:text-[hsl(0,0%,0%)]
                    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#c83b0e]`}
      >
        <img src={IconRemoveUrl} alt="Remover item" className="w-2.5 h-2.5" />
      </button>
    </div>
  );
};

export default CartItem;
