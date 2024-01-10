const API_ENDPOINT: string =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
export const API_ENDPOINTS = {
  graphqlEndpoint: `${API_ENDPOINT}/graphql`,
  fileUploadEndpoint: `${API_ENDPOINT}/api/uploadFile`,
};
