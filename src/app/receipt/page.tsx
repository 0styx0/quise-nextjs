import { ErrorMessage } from "@/components/ErrorMessage";
import { OrderOverview } from "@/components/receipt/OrderOverview";
import { OrderLineItems } from "@/components/receipt/OrderLineItems";
import { getOrder } from "@/lib/helpers/getOrder";
import { ClearCart } from "./ClearCart";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Receipt",
};

interface ReceiptPageProps extends PageProps<"/receipt"> {
  searchParams: Promise<{
    session_id?: string;
  }>;
}

export default async function ReceiptPage({ searchParams }: ReceiptPageProps) {
  const paymentKey = (await searchParams).session_id || "";
  const { order, error } = await getOrder(paymentKey);

  if (!paymentKey || !order || error) {
    return (
      <ErrorMessage
        title="Unable to fetch order"
        message={error?.message || ""}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-white to-blue-100 p-6">
      <ClearCart />
      <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-8 text-center wrap-break-word">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          🎉 Congrats! Your Order is Complete! 🎉
        </h1>
        <div className="w-40 h-1 bg-pink-400 mx-auto mb-8 rounded"></div>

        <div className="bg-gray-50 border rounded p-6 text-left">
          <h2 className="text-lg font-semibold mb-4">Receipt Details</h2>
          <OrderOverview order={order} />

          <h3 className="text-md font-semibold mt-4 mb-2">Items</h3>
          <OrderLineItems lineItems={order.lineItems} />
        </div>
      </div>
    </div>
  );
}
