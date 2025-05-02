export const config = {
  API_URL:
    process.env.NODE_ENV === "production"
      ? process.env.BACKEND_PROD_URL
      : "http://localhost:3000",
};
