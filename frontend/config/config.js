export const config = {
  API_URL:
    process.env.NODE_ENV === "production"
      ? "https://your-backend-project.vercel.app" // Production API URL
      : "http://localhost:3000", // Development API URL
};
