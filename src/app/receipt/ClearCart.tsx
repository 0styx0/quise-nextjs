"use client";

import { useCart } from "@/context/cartContext";
import { useEffect } from "react";

export function ClearCart() {
  const { clearCart } = useCart();

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return null;
}
