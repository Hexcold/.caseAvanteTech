import { useContext } from "react";
import { CartContext, type CartContextType } from "../context/CartContext";

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);

  if (context === undefined) {
    throw new Error("useCart deve ser usado dentro de um CartProvider");
  }

  return context;
};
