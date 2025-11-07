import { describe, it, expect } from "vitest";
import { renderHook, act } from "@testing-library/react";
import React from "react";

import { CartProvider } from "@/context/CartProvider";
import { useCart } from "@/hooks/useCart";

import type { Product } from "@/types";
import type { PropsWithChildren } from "react";

const mockProductA: Product = {
  name: "Waffle with Berries",
  category: "Waffle",
  price: 6.5,
  image: { thumbnail: "/w.jpg", mobile: "", tablet: "", desktop: "" },
};
const mockProductB: Product = {
  name: "Classic Tiramisu",
  category: "Tiramisu",
  price: 5.5,
  image: { thumbnail: "/t.jpg", mobile: "", tablet: "", desktop: "" },
};

const Wrapper: React.FC<PropsWithChildren<{}>> = ({ children }) => (
  <CartProvider>{children}</CartProvider>
);

describe("CartProvider", () => {
  it("deve inicializar com carrinho vazio e totais em zero", () => {
    const { result } = renderHook(() => useCart(), { wrapper: Wrapper });

    expect(result.current.cart).toHaveLength(0);
    expect(result.current.totalItems).toBe(0);
    expect(result.current.cartTotal).toBe(0);
  });

  it("deve adicionar um produto e atualizar os totais corretamente", () => {
    const { result } = renderHook(() => useCart(), { wrapper: Wrapper });

    act(() => {
      result.current.addToCart(mockProductA);
    });

    expect(result.current.cart).toHaveLength(1);
    expect(result.current.cart[0].name).toBe("Waffle with Berries");
    expect(result.current.cart[0].quantity).toBe(1);
    expect(result.current.totalItems).toBe(1);
    expect(result.current.cartTotal).toBe(6.5); // 6.5 * 1

    act(() => {
      result.current.addToCart(mockProductA);
    });

    expect(result.current.cart).toHaveLength(1);
    expect(result.current.cart[0].quantity).toBe(2);
    expect(result.current.totalItems).toBe(2);
    expect(result.current.cartTotal).toBe(13.0);
  });

  it("deve remover um item e limpar os totais", () => {
    const { result } = renderHook(() => useCart(), { wrapper: Wrapper });

    act(() => {
      result.current.addToCart(mockProductA);
      result.current.addToCart(mockProductB);
    });

    act(() => {
      result.current.removeFromCart(mockProductB.name);
    });

    expect(result.current.cart).toHaveLength(1);
    expect(result.current.cart[0].name).toBe(mockProductA.name);
    expect(result.current.totalItems).toBe(1);
    expect(result.current.cartTotal).toBe(6.5);
  });

  it("deve atualizar a quantidade (incremento/decremento)", () => {
    const { result } = renderHook(() => useCart(), { wrapper: Wrapper });

    act(() => {
      result.current.addToCart(mockProductA);
      result.current.addToCart(mockProductA);
    });

    act(() => {
      result.current.updateQuantity(mockProductA.name, 1);
    });
    expect(result.current.cart[0].quantity).toBe(3);
    expect(result.current.cartTotal).toBe(19.5);

    act(() => {
      result.current.updateQuantity(mockProductA.name, -1);
    });
    expect(result.current.cart[0].quantity).toBe(2);
    expect(result.current.cartTotal).toBe(13.0);

    act(() => {
      result.current.updateQuantity(mockProductA.name, -1);
      result.current.updateQuantity(mockProductA.name, -1);
    });
    expect(result.current.cart).toHaveLength(0);
    expect(result.current.cartTotal).toBe(0);
  });

  it("deve limpar o carrinho com clearCart", () => {
    const { result } = renderHook(() => useCart(), { wrapper: Wrapper });

    // Prepara: Adicionar alguns itens
    act(() => {
      result.current.addToCart(mockProductA);
      result.current.addToCart(mockProductB);
    });
    expect(result.current.cart).toHaveLength(2);

    // AÇÃO: Limpar
    act(() => {
      result.current.clearCart();
    });

    // VERIFICAÇÃO
    expect(result.current.cart).toHaveLength(0);
    expect(result.current.totalItems).toBe(0);
    expect(result.current.cartTotal).toBe(0);
  });
});
