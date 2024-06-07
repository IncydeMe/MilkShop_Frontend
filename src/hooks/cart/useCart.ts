//Handle Add to Cart
//There will be no API, and Cart will only act as a temporal storage

"use client"

import { useState, useEffect } from "react";
import type { Cart, CartProduct } from "@/types/cart";
import type { Product } from "@/types/product";

export const useCart = () => {
    const [cart, setCart] = useState<Cart>({ id: 1, products: [] });
  
    // Fetch the cart from localStorage on initial render
    useEffect(() => {
      const storedCart = localStorage.getItem('cart');
      if (storedCart) {
        setCart(JSON.parse(storedCart));
        console.log('Cart fetched from localStorage');
        console.log(JSON.parse(storedCart));
      }
    }, []);
  
    // Store the cart in localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
        console.log('Cart stored in localStorage');
        console.log(cart);
    }, [cart]);
  
    const addProduct = (product: Product) => {
      setCart((currentCart) => {
        const productIndex = currentCart.products.findIndex((p) => p.product.productId === product.productId);
        if (productIndex > -1) {
          // Product already in cart, increase quantity
          const newCart = { ...currentCart };
          newCart.products[productIndex] = { ...newCart.products[productIndex], quantity: newCart.products[productIndex].quantity + 1 };
          return newCart;
        } else {
          // Product not in cart, add it with quantity 1
          return { ...currentCart, products: [...currentCart.products, { product, quantity: 1 }] };
        }
      });
    };
  
    const removeProduct = (productId: number) => {
      setCart((currentCart) => {
        return { ...currentCart, products: currentCart.products.filter((product) => product.product.productId !== productId) };
      });
    };
  
    const clearCart = () => {
      setCart({ id: 1, products: [] });
    };
  
    const updateProductQuantity = (productId: number, quantity: number) => {
      setCart((currentCart) => {
        const productIndex = currentCart.products.findIndex((p) => p.product.productId === productId);
        if (productIndex > -1) {
          const newCart = { ...currentCart };
          newCart.products[productIndex] = { ...newCart.products[productIndex], quantity };
          return newCart;
        }
        return currentCart; // Return current cart if product not found
      });
    };
  
    const totalPrice = cart.products.reduce((total, item) => total + item.product.price * item.quantity, 0);
  
    const totalQuantity = cart.products.reduce((total, item) => total + item.quantity, 0);
  
    const totalProducts = cart.products.length;
  
    const isEmpty = totalProducts === 0;
  
    return {
      cart,
      addProduct,
      removeProduct,
      clearCart,
      updateProductQuantity,
      totalPrice,
      totalQuantity,
      totalProducts,
      isEmpty,
    };
};
