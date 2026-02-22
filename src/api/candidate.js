import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const getCandidateByEmail = async (email) => {
  const response = await axios.get(`${BASE_URL}/api/candidate/get-by-email`, {
    params: { email },
  });
  return response.data;
};

export const applyToJob = async ({ uuid, jobId, candidateId, applicationId, repoUrl }) => {
  const response = await axios.post(`${BASE_URL}/api/candidate/apply-to-job`, {
    uuid,
    jobId,
    candidateId,
    applicationId,
    repoUrl,
  });
  return response.data;
};
