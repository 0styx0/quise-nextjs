import { useCart } from "@/context/cartContext";
import { Product } from "@/generated/graphql/graphql";

interface CartActionsProps {
  product: Product;
}

export const CartActions = ({ product }: CartActionsProps) => {
  const { state } = useCart();
  const inCart = state.products.some((p) => p.id === product.id);

  if (inCart) {
    return <RemoveFromCartButton productId={product.id} />;
  }

  return <AddToCartButton product={product} />;
};

// --- Internal subcomponents ---

const AddToCartButton = ({ product }: { product: Product }) => {
  const { addItem } = useCart();
  return (
    <button
      onClick={() => addItem(product)}
      className="bg-blue-500 hover:bg-blue-600 text-white font-bold ml-2 py-2 rounded w-24 text-center"
    >
      Buy
    </button>
  );
};

const RemoveFromCartButton = ({ productId }: { productId: string }) => {
  const { removeItem } = useCart();
  return (
    <button
      onClick={() => removeItem(productId)}
      className="bg-pink-500 hover:bg-pink-600 text-white font-bold ml-2 py-2 rounded w-24 text-center"
    >
      Remove
    </button>
  );
};
