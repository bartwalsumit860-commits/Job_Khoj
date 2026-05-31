const API_BASE_URL = import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, "") || "https://job-khoj-3.onrender.com/api/v1";

export const USER_API_ENDPOINT = `${API_BASE_URL}/user`;
export const JOB_API_ENDPOINT = `${API_BASE_URL}/job`;
export const APPLICATION_API_ENDPOINT = `${API_BASE_URL}/application`;
export const COMPANY_API_ENDPOINT = `${API_BASE_URL}/company`;
