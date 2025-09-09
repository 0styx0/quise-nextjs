
### Update TypeScript types for GraphQL

Usecase: Updating Typescript types after a GraphQL schema change.

First, update `queries/` to reflect changes to queries.

Next, run the following command:
```bash
yarn run codegen
```

Result: Stores generated types in `src/generated/graphql/`

### Using Stripe

See the [stripe docs](https://docs.stripe.com/payments/accept-a-payment?platform=web&ui=stripe-hosted#test-cards) for test data to use when checking out.

- `4242 4242 4242 4242` card number = success