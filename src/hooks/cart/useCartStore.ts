// useCartStore.ts
import { create } from "zustand";
import { Product } from "@/types/product";

interface State {
  cart: Product[];
  totalItems: number;
  totalPrice: number;
}

interface Actions {
  addToCart: (product: Product) => void;
  removeFromCart: (productId: Product["productId"] | undefined) => void;
  clearCart: () => void;
  decreaseQuantity: (productId: Product["productId"] | undefined) => void;
}

const INITIAL_STATE: State = {
  cart: [],
  totalItems: 0,
  totalPrice: 0,
};

export const useCartStore = create<State & Actions>((set, get) => ({
  cart: INITIAL_STATE.cart,
  totalItems: INITIAL_STATE.totalItems,
  totalPrice: INITIAL_STATE.totalPrice,
  addToCart: (product: Product) => {
    const cart = get().cart;
    const cartItem = cart.find((item) => item.productId === product.productId);

    if (cartItem) {
      const updatedCart = cart.map((item) =>
        item.productId === product.productId
          ? { ...item, quantity: (item.quantity as number) + 1 }
          : item
      );
      set((state) => ({
        cart: updatedCart,
        totalItems: state.totalItems + 1,
        totalPrice: state.totalPrice + product.price,
      }));
    } else {
      const updatedCart = [...cart, { ...product, quantity: 1 }];
      set((state) => ({
        cart: updatedCart,
        totalItems: state.totalItems + 1,
        totalPrice: state.totalPrice + product.price,
      }));
    }
  },
  removeFromCart: (productId: Product["productId"] | undefined) => {
    const cart = get().cart;
    const cartItem = cart.find((item) => item.productId === productId);

    if (cartItem) {
      const updatedCart = cart.filter((item) => item.productId !== productId);
      set((state) => ({
        cart: updatedCart,
        totalItems: state.totalItems - cartItem.quantity!,
        totalPrice: state.totalPrice - cartItem.price * cartItem.quantity!,
      }));
    }
  },
  decreaseQuantity: (productId: Product["productId"]) => {
    const cart = get().cart;
    const cartItem = cart.find((item) => item.productId === productId);

    if (cartItem && cartItem.quantity! > 1) {
      const updatedCart = cart.map((item) =>
        item.productId === productId
          ? { ...item, quantity: (item.quantity as number) - 1 }
          : item
      );
      set((state) => ({
        cart: updatedCart,
        totalItems: state.totalItems - 1,
        totalPrice: state.totalPrice - cartItem.price,
      }));
    } else {
      get().removeFromCart(productId);
    }
  },
  clearCart: () => set(INITIAL_STATE),
  saveCart: () => {
    const cart = get().cart;
    localStorage.setItem("cart", JSON.stringify(cart));
  }
}));
