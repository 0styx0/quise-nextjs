import type { CodegenConfig } from "@graphql-codegen/cli";

// creates typescript types from graphql schema
const config: CodegenConfig = {
  overwrite: true,
  // update to your schema server
  schema: "http://localhost:3000/graphql",
  documents: "src/**/*.ts",
  generates: {
    "src/generated/graphql/": {
      preset: "client",
      plugins: [],
    },
  },
};

export default config;
