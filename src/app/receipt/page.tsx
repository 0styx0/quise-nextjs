"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { ErrorMessage } from "@/components/ErrorMessage";
import { useFetchOrder } from "../hooks/graphql/useFetchOrder";
import { StripeCheckoutSession } from "@/generated/graphql/graphql";
import { OrderOverview } from "@/components/receipt/OrderOverview";
import { OrderLineItems } from "@/components/receipt/OrderLineItems";

export default function ReceiptPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");

  const [fetchOrder, { loading, error }] = useFetchOrder();
  const [order, setOrder] = useState<StripeCheckoutSession>()

  useEffect(() => {
    if (!sessionId) return;

    fetchOrder({ variables: { paymentKey: sessionId } })
      .then((res) => {
        if (res.data?.fetchOrder) {
          setOrder(res.data.fetchOrder);
        }
      })
      .catch((err) => {
        console.error("Fetch order failed:", err);
      });
  }, [sessionId, fetchOrder]);

  if (!sessionId) {
    return (
      <ErrorMessage title="Unable to find order" message="Invalid payment ID" />
    );
  }

  if (loading || !order) {
    return <p>Loading receipt...</p>;
  }

  if (error) {
    return <ErrorMessage title="Unable to fetch order" message={error.message} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-white to-blue-100 p-6">
      <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-8 text-center wrap-break-word">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          🎉 Congrats! Your Order is Complete! 🎉
        </h1>
        <div className="w-40 h-1 bg-pink-400 mx-auto mb-8 rounded"></div>

        <div className="bg-gray-50 border rounded p-6 text-left">
          <h2 className="text-lg font-semibold mb-4">Receipt Details</h2>
          <OrderOverview order={order} />

          <h3 className="text-md font-semibold mt-4 mb-2">Line Items</h3>
          <OrderLineItems lineItems={order.lineItems} />
        </div>
      </div>
    </div>
  );
}
