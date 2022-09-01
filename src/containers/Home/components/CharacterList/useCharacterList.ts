import { useEffect, useState } from "react";
import { useInfiniteQuery } from "react-query";
import { PageDataType } from "api/types";
import useDebounce from "../../../../hooks/useDebounce/useDebounce";
import { getCharacters } from "api/characters";

// When searching/filtering pass the query with inputs, for subsequent pages just pass the params
const getQuery = (name: string, status: string, param: string): string => {
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
      return getCharacters(getQuery(filter.name, filter.status, pageParam));
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
    const loadOnScroll = () => {
      const scrollTop = document.scrollingElement!.scrollTop;
      const scrollTopMax =
        document.scrollingElement!.scrollHeight -
        document.scrollingElement!.clientHeight -
        20;
      if (scrollTop >= scrollTopMax) {
        fetchNextPage();
      }
    };

    window.addEventListener("scroll", loadOnScroll);

    return () => {
      window.removeEventListener("scroll", loadOnScroll);
    };
  }, [fetchNextPage]);

  const debouncedSearch = useDebounce(search, 400);

  useEffect(() => {
    setFilterName(debouncedSearch);
  }, [debouncedSearch]);

  return { setFilterStatus, setSearch, characterPages, charactersStatus };
};

export default useCharacterList;
