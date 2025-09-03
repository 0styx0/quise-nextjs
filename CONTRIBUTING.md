
### Update TypeScript types for GraphQL

Usecase: Updating Typescript types after a GraphQL schema change.

First, update `queries/` to reflect changes to queries.

Next, run the following command:
```bash
yarn run codegen
```

Result: Stores generated types in `src/generated/graphql/`