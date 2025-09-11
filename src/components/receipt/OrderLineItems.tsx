import { StripeLineItem } from "@/generated/graphql/graphql";
import { priceFormatter } from "@/lib/utils/formatters";

interface OrderLineItemsProps {
  lineItems: StripeLineItem[];
}
export function OrderLineItems({ lineItems }: OrderLineItemsProps) {
  return (
    <ul className="space-y-1">
      {lineItems.map((item) => (
        <li key={item.id}>
          {item.name} — {priceFormatter.format(item.priceUnit / 100)}
        </li>
      ))}
    </ul>
  );
}
