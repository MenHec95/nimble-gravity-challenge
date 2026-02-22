import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const getJobs = async () => {
  const response = await axios.get(`${BASE_URL}/api/jobs/get-list`);
  return response.data;
};
