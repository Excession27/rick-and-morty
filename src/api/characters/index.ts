import axiosClient from "api/axios";

interface IFilters {
  name: string;
  status: string;
}

export const getCharacters = (
  name: string,
  status: string,
  pageParam: number
) => {
  const filters = {} as IFilters;
  if (name) filters["name"] = name;
  if (status) filters["status"] = status;

  return axiosClient.get("/character", {
    params: { page: pageParam, ...filters },
  });
};
