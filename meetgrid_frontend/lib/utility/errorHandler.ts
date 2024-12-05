import axios from "axios";

export default function handleError(error: unknown) {
  if (axios.isAxiosError(error)) {
    if (error.response) {
      console.error("Server Error:", error.response.data);
      throw new Error(error.response.data?.message || "Server error occurred");
    } else if (error.request) {
      console.error("Network Error:", error.message);
      throw new Error("Network error. Please check your internet connection.");
    } else {
      console.error("Request Error:", error.message);
      throw new Error("Error in setting up request. Please try again.");
    }
  } else {
    console.error("Unexpected Error:", error);
    throw new Error("An unexpected error occurred. Please try again.");
  }
}
