import { StripeCheckoutSession } from "@/generated/graphql/graphql";
import { priceFormatter } from "@/lib/utils/formatters";

interface OrderOverviewProps {
  order: StripeCheckoutSession;
}

export function OrderOverview({ order }: OrderOverviewProps) {
  return (
    <ul className="space-y-2">
      <OrderOverviewItem label="Order ID" contents={order.id} />
      <OrderOverviewItem
        label="Total"
        contents={priceFormatter.format(order.priceTotal / 100)}
      />
    </ul>
  );
}

interface OrderOverviewItemProps {
  label: string;
  contents: string;
}
function OrderOverviewItem({ label, contents }: OrderOverviewItemProps) {
  return (
    <li className="truncate">
      <span>{label}:</span> {contents}
    </li>
  );
}
