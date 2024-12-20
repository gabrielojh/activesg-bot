import { SearchCriteria } from "../types/SearchCriteria";
import { Venue } from "../types/Venue";
import axiosInstance from "./axiosConfig";
import { endpoints } from "./endpoints";

export const getVenues = async (searchCriteria: SearchCriteria): Promise<Venue[]> => {
  const response = await axiosInstance.post(endpoints.search, searchCriteria);
  return response.data;
}