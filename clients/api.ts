import { GraphQLClient } from "graphql-request";
import { API_ENDPOINTS } from "@/utils/constants";

const isClient = typeof window !== "undefined";

export const graphqlClient = new GraphQLClient(API_ENDPOINTS.graphqlEndpoint, {
  headers: () => ({
    Authorization: isClient
      ? `Bearer ${window.localStorage.getItem("__birdy_token")}`
      : "",
  }),
});
