"use client";

import { Product } from "@/generated/graphql/graphql";
import {
  createContext,
  useContext,
  ReactNode,
  useEffect,
  Dispatch,
} from "react";
import { useImmerReducer } from "use-immer";

export interface CartState {
  products: Product[];
}

interface CartContext {
  addItem: (product: Product) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  state: CartState;
}

enum CartActionType {
  ADD_ITEM = "ADD_ITEM",
  REMOVE_ITEM = "REMOVE_ITEM",
  CLEAR = "CLEAR",
  HYDRATE = "HYDRATE",
}
type CartAction =
  | { type: CartActionType.ADD_ITEM; product: Product }
  | { type: CartActionType.REMOVE_ITEM; productId: string }
  | { type: CartActionType.CLEAR }
  | { type: CartActionType.HYDRATE; state: CartState };

const STORAGE_KEY = "cart_state";

const CartContext = createContext<CartContext | undefined>(undefined);

const cartReducer = (draft: CartState, action: CartAction) => {
  switch (action.type) {
    case CartActionType.ADD_ITEM:
      const exists = draft.products.find(
        (product) => product.id === action.product.id,
      );
      if (exists) return;
      draft.products.push(action.product);
      break;
    case CartActionType.REMOVE_ITEM:
      draft.products = draft.products.filter(
        (product) => product.id !== action.productId,
      );
      break;
    case CartActionType.CLEAR:
      draft.products = [];
      break;
    case CartActionType.HYDRATE:
      Object.assign(draft, action.state);
      break;
  }
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useImmerReducer<CartState, CartAction>(
    cartReducer,
    { products: [] },
  );

  useLocalStorage(state, dispatch);

  const addItem = (product: Product) =>
    dispatch({ type: CartActionType.ADD_ITEM, product });
  const removeItem = (productId: string) =>
    dispatch({ type: CartActionType.REMOVE_ITEM, productId });
  const clearCart = () => dispatch({ type: CartActionType.CLEAR });

  return (
    <CartContext.Provider value={{ state, addItem, removeItem, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

function useLocalStorage(state: CartState, dispatch: Dispatch<CartAction>) {
  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (saved) {
      try {
        dispatch({
          type: CartActionType.HYDRATE,
          state: JSON.parse(saved) as CartState,
        });
      } catch {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
  }, []);

  // Save to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);
}

export const useCart = (): CartContext => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
