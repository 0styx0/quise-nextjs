'use client'

import { useCart } from "@/context/cartContext";
import { useCheckout } from "@/lib/hooks/graphql/useCheckout";
import { loadStripe } from "@stripe/stripe-js";
import { ErrorMessage } from "../ErrorMessage";
import Button from "../shared/Button";

export function CheckoutButton() {

    const { state } = useCart();
    const [checkout, { loading, error }] = useCheckout();

    const shouldDisableButton = loading || !!error || state.products.length === 0

    function handleCheckout() {

        if (loading) return;

        const productsToCheckout = state.products.map((p) => ({ id: p.id }));

        checkout({
            variables: { checkoutProducts: { products: productsToCheckout } },
            onCompleted: (data) => {
                initiateCheckout(data.checkout.paymentKey)
            },
        });
    };
    
    return (
        <>
            {error && <ErrorMessage title="Error checking out!" message={error.message} />}

            <div className="mt-6 flex justify-end">
                <Button
                    onClick={handleCheckout}
                    disabled={shouldDisableButton}
                >
                    {loading ? "Processing..." : "Checkout"}
                </Button>

            </div>
        </>
    )
}


async function initiateCheckout(paymentKey: string) {

    const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

    // stripe=null handled by error section in main component
    stripe?.redirectToCheckout({ sessionId: paymentKey });
}