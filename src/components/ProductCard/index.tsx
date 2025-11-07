import React, { useState } from "react";
import type { Product } from "../../types";
import { useCart } from "../../hooks/useCart";
import { formatCurrency } from "../../utils/formatCurrency";
import IconCartUrl from "../../assets/icon-add-to-cart.svg";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { cart, addToCart, updateQuantity } = useCart();
  const [isSelected, setIsSelected] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product);
  };

  const handleIncrease = (e: React.MouseEvent) => {
    e.stopPropagation();
    updateQuantity(product.name, 1);
  };

  const handleDecrease = (e: React.MouseEvent) => {
    e.stopPropagation();
    updateQuantity(product.name, -1);
  };

  const itemInCart = cart.find((item) => item.name === product.name);
  const inCart = !!itemInCart;
  const quantityInCart = itemInCart?.quantity ?? 0;

  const imageMobile = product.image.mobile.replace("./", "/");
  const imageTablet = product.image.tablet.replace("./", "/");
  const imageDesktop = product.image.desktop.replace("./", "/");

  return (
    <div className="font-sans text-left">
      <div
        className={`cursor-pointer rounded-lg border-2 ${
          inCart || isSelected ? "border-[#c83b0e]" : "border-transparent"
        }`}
        onClick={() => setIsSelected(!isSelected)}
      >
        <div className="relative">
          <picture>
            <source srcSet={imageDesktop} media="(min-width: 1024px)" />
            <source srcSet={imageTablet} media="(min-width: 768px)" />
            <img
              src={imageMobile}
              alt={product.name}
              className={`w-full h-auto object-cover rounded-lg transition-transform duration-300 ${
                inCart || isSelected ? "transform scale-105 opacity-80" : ""
              }`}
            />
          </picture>

          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2">
            {inCart ? (
              <div
                className={`flex items-center justify-between w-40 h-11 px-4 rounded-full bg-[#c83b0e] text-white text-sm font-semibold shadow-md`}
              >
                <button
                  onClick={handleDecrease}
                  aria-label={`Diminuir quantidade de ${product.name}`}
                  className="w-7 h-7 flex items-center justify-center rounded-full border border-white hover:bg-white/20 transition-colors cursor-pointer"
                >
                  <svg
                    width="10"
                    height="2"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path fill="#fff" d="M0 .375h10v1.25H0V.375Z" />
                  </svg>
                </button>
                <span className="font-bold">{quantityInCart}</span>
                <button
                  onClick={handleIncrease}
                  aria-label={`Aumentar quantidade de ${product.name}`}
                  className="w-7 h-7 flex items-center justify-center rounded-full border border-white hover:bg-white/20 transition-colors cursor-pointer"
                >
                  <svg
                    width="10"
                    height="10"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill="#fff"
                      d="M6.25 0H3.75v3.75H0v2.5h3.75v3.75h2.5V6.25H10v-2.5H6.25V0Z"
                    />
                  </svg>
                </button>
              </div>
            ) : (
              <button
                onClick={handleAddToCart}
                className={`flex items-center justify-center gap-2 w-40 h-11 rounded-full bg-white border border-[hsl(13,31%,94%)] text-[hsl(0,0%,0%)] font-semibold text-sm
                            shadow-sm transition-all duration-300 cursor-pointer
                            hover:border-[#c83b0e] hover:text-[#c83b0e]
                            focus:outline-none focus:ring-2 focus:ring-[#c83b0e] focus:ring-offset-2`}
              >
                <img src={IconCartUrl} alt="Add to cart" className="w-5 h-5" />
                <span>Add to Cart</span>
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="mt-8 px-1">
        <p className="text-sm text-[hsl(14,25%,72%)]">{product.category}</p>
        <h3 className="text-base font-semibold text-[hsl(0,0%,0%)] mt-1">
          {product.name}
        </h3>
        <p className="text-base font-semibold text-[#c83b0e] mt-1">
          {formatCurrency(product.price)}
        </p>
      </div>
    </div>
  );
};

export default ProductCard;
