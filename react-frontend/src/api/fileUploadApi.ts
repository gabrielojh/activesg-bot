import axiosInstance from "./axiosConfig";
import { endpoints } from "./endpoints";

export const uploadFile = async (file: File): Promise<void> => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await axiosInstance.post(endpoints.uploadFile, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};
