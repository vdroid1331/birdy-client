const API_ENDPOINT: string = process.env.NEXT_PUBLIC_API_URL as string;
export const API_ENDPOINTS = {
  graphqlEndpoint: `${API_ENDPOINT}/graphql`,
  fileUploadEndpoint: `${API_ENDPOINT}/api/uploadFile`,
};
