import axiosInstance from "./axios";

// Send AI chat message
export const sendAIChat = async (message) => {
  const response = await axiosInstance.post(
    "/ai/chat",
    {
      message,
    }
  );

  return response.data;
};