import axios from "api/axiosInstance";

export const getCharacters = (query: string) => axios.get(query);
