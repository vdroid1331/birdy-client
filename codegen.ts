import type { CodegenConfig } from "@graphql-codegen/cli";
import { API_ENDPOINTS } from "./utils/constants";

const config: CodegenConfig = {
  overwrite: true,
  schema: API_ENDPOINTS.graphqlEndpoint,
  documents: "**/*.{tsx,ts}",
  generates: {
    "gql/": {
      preset: "client",
      plugins: [],
    },
    "./graphql.schema.json": {
      plugins: ["introspection"],
    },
  },
};

export default config;
