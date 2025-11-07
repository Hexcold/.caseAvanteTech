import { createContext } from "react";
import type { CartItem, Product } from "../types";

export interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productName: string) => void;
  updateQuantity: (productName: string, amount: number) => void;
  clearCart: () => void;
  totalItems: number;
  cartTotal: number;
}

export const CartContext = createContext<CartContextType | undefined>(
  undefined
);
