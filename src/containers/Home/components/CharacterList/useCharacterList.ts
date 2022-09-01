import { useEffect, useState } from "react";
import { useInfiniteQuery } from "react-query";
import axiosInstance from "api/axiosInstance";
import { PageDataType } from "api/types";
import useDebounce from "../../../../hooks/useDebounce/useDebounce";
import { ScrollEvent } from "api/characters/types";

// When searching/filtering pass the query with inputs, for subsequent pages just pass the params
const getQuery = (name: string, status: string, param: string) => {
  let query: string = `character/?name=${name}&status=${status}`;
  let firstRun: boolean = param.length < 10;

  if (!firstRun) query = param;

  return query;
};

const useCharacterList = () => {
  const [filter, setFilter] = useState<{
    name: string;
    status: string;
  }>({
    name: "",
    status: "",
  });

  const setFilterStatus = (value: string) => {
    setFilter((prev) => ({ ...prev, status: value }));
  };
  const setFilterName = (value: string) => {
    setFilter((prev) => ({ ...prev, name: value }));
  };

  const [search, setSearch] = useState<string>("");

  const {
    data: characterPages,
    status: charactersStatus,
    fetchNextPage,
  } = useInfiniteQuery<PageDataType>(
    ["filter-query", filter],
    async ({ pageParam = "character" }) => {
      return axiosInstance.get(getQuery(filter.name, filter.status, pageParam));
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
    const onScroll = (event: ScrollEvent) => {
      if (
        event.target.scrollingElement.scrollTop >
        event.target.scrollingElement.scrollTopMax - 20
      ) {
        fetchNextPage();
      }
    };

    window.addEventListener("scroll", (e: any) => onScroll(e));

    return () => {
      window.removeEventListener("scroll", (e: any) => onScroll(e));
    };
  }, [fetchNextPage]);

  const debouncedSearch = useDebounce(search, 400);

  useEffect(() => {
    setFilterName(debouncedSearch);
  }, [debouncedSearch]);

  return { setFilterStatus, setSearch, characterPages, charactersStatus };
};

export default useCharacterList;
