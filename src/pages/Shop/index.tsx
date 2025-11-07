import React, { useEffect, useState } from "react";
import type { Product } from "../../types";
import { getProducts } from "../../services/productService";
import ProductCard from "../../components/ProductCard";
import CartSidebar from "../../components/CartSidebar";

const Shop: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (err) {
        setError("Failed to fetch products. Please try again later.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen">
      <main className="container mx-auto max-w-7xl p-4 md:p-8">
        <div className="lg:flex lg:gap-8">
          <section className="lg:w-2/3">
            <h1 className="text-3xl font-bold mb-6 text-gray-900">Desserts</h1>

            {isLoading && (
              <p className="text-lg text-gray-600">Carregando sobremesas...</p>
            )}

            {error && (
              <p className="text-lg text-red-600">
                Falha ao buscar produtos. Tente novamente mais tarde.
              </p>
            )}

            {!isLoading && !error && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
                {products.map((product) => (
                  <ProductCard key={product.name} product={product} />
                ))}
              </div>
            )}
          </section>

          <aside className="lg:w-1/3 mt-12 lg:mt-0">
            <div className="sticky top-8">
              <CartSidebar />
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
};

export default Shop;
