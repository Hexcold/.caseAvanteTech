import type { Product } from "../types";

export const getProducts = async (): Promise<Product[]> => {
  try {
    const response = await fetch("/data.json");
    if (!response.ok) {
      throw new Error(`Erro ao buscar produtos: ${response.statusText}`);
    }
    const data: Product[] = await response.json();
    return data;
  } catch (error) {
    console.error("Falha ao carregar os produtos do data.json:", error);
    return [];
  }
};
