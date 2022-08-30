import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useInfiniteQuery } from "react-query";
import axiosInstance from "api/axiosInstance";
import { PageDataType } from "api/types";
import useDebounce from "../../../../hooks/useDebounce/useDebounce";

const useCharacterList = () => {
  const [filter, setFilter] = useState<{
    name: string;
    status: string;
    page: number;
  }>({
    name: "",
    status: "",
    page: 0,
  });

  const setFilterStatus = (value: string) => {
    setFilter((prev) => ({ ...prev, status: value }));
  };
  const setFilterName = (value: string) => {
    setFilter((prev) => ({ ...prev, name: value }));
  };

  const [search, setSearch] = useState<string>("");

  const { ref, inView } = useInView({ threshold: 0.4 });

  // Depending on the parameters supplied a different API endpoint will be called,
  // however after the first run useInfiniteQuery provides a special query for the next pages thus the last IF statement
  const getQuery = (name: string, status: string, param: string) => {
    let query: string = "character";
    let firstRun: boolean = param.length < 10;

    if (name.length > 1 && firstRun) query = `character/?name=${name}`;
    if (status.length > 1 && firstRun) query = `character/?status=${status}`;
    if (name.length > 1 && status.length > 1 && firstRun)
      query = `character/?name=${name}&status=${status}`;
    if (!firstRun) query = param;

    return query;
  };

  const {
    data: characterPages,
    status: charactersStatus,
    fetchNextPage,
  } = useInfiniteQuery<PageDataType>(
    ["filter-query", filter],
    async ({ pageParam = "character" }) => {
      let datum: any;

      datum = axiosInstance.get(
        getQuery(filter.name, filter.status, pageParam)
      );

      return datum;
    },
    {
      getPreviousPageParam: (firstPage) => {
        if (firstPage.data.info.prev) {
          const prev = firstPage.data.info.prev?.split(
            "https://rickandmortyapi.com/api/"
          );
          return prev[1];
        }
      },
      getNextPageParam: (lastPage) => {
        if (lastPage.data.info.next) {
          const next = lastPage.data.info.next?.split(
            "https://rickandmortyapi.com/api/"
          );

          return next[1];
        }
      },
    }
  );

  // Check to see viewport position in order to fetch next page
  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage]);

  const debouncedSearch = useDebounce(search, 400);

  useEffect(() => {
    setFilterName(debouncedSearch);
  }, [debouncedSearch]);

  return { setFilterStatus, setSearch, ref, characterPages, charactersStatus };
};

export default useCharacterList;
