import axiosClient from "api/axios";

export const getCharacters = (query: string) => axiosClient.get(query);
