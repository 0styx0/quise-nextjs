"use client"

import { Product } from "@/generated/graphql/graphql";
import { OpResult, OpResultType } from "@/lib/utils/flags";
import { createContext, useContext, ReactNode } from "react";
import { useImmerReducer } from "use-immer";

export interface CartState {
  products: Product[];
};

interface CartContext {
    addItem: (product: Product) => OpResultType;
    removeItem: (id: string) => OpResultType;
    clearCart: () => void;
    state: CartState;
}

enum CartActionType {
  ADD_ITEM = "ADD_ITEM",
  REMOVE_ITEM = "REMOVE_ITEM",
  CLEAR = "CLEAR"
}
type CartAction =
  | { type: CartActionType.ADD_ITEM; product: Product }
  | { type: CartActionType.REMOVE_ITEM; productId: string }
  | { type: CartActionType.CLEAR; }
  

const CartContext = createContext<CartContext | undefined>(undefined);

const cartReducer = (draft: CartState, action: CartAction) => {

    switch (action.type) {
        case CartActionType.ADD_ITEM:
            const exists = draft.products.find((product) => product.id === action.product.id)
            if (exists) return;
            draft.products.push(action.product)
            break;
        case CartActionType.REMOVE_ITEM:
            draft.products = draft.products.filter((product) => product.id !== action.productId);
            break;
        case CartActionType.CLEAR:
            draft.products = []
            break;
            
    }
}

export const CartProvider = ({children}: { children: ReactNode }) => {

    const [state, dispatch] = useImmerReducer<CartState, CartAction>(cartReducer, { products: [] });
    
    const addItem = (product: Product) => {
      dispatch({ type: CartActionType.ADD_ITEM, product })
      // future-proofing
      return OpResult.SUCCESS;
    }
    const removeItem = (productId: string) => {
      dispatch({ type: CartActionType.REMOVE_ITEM, productId })
      return OpResult.SUCCESS;
    }
    const clearCart = () => {
      dispatch({ type: CartActionType.CLEAR })
    }
    
    return (
        <CartContext.Provider value={{state, addItem, removeItem, clearCart }}>
          {children}
        </CartContext.Provider>
    )
}


export const useCart = (): CartContext => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};