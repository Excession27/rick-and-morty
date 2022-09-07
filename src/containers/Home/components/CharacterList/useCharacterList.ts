import { useCallback, useEffect, useState } from "react";
import { useInfiniteQuery } from "react-query";
import { PageDataType } from "api/types";
import useDebounce from "../../../../hooks/useDebounce/useDebounce";
import { getCharacters } from "api/characters";

type FilterDataType = {
  name: string;
  status: string;
};

const useCharacterList = () => {
  const [filter, setFilter] = useState<FilterDataType>({
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
    isFetchingNextPage,
  } = useInfiniteQuery<PageDataType>(
    ["filter-query", filter],
    async ({ pageParam }) => {
      return getCharacters(filter.name, filter.status, pageParam);
    },
    {
      getNextPageParam: (lastPage) => {
        if (lastPage.data.info.next) {
          // return page number from URL
          const params = new URL(lastPage.data.info.next).searchParams;
          return params.get("page");
        }
      },
    }
  );

  // Determine if scrollbar has come to the end of the page
  const loadOnScroll = useCallback(() => {
    const scrollTop = document.scrollingElement!.scrollTop;
    const scrollTopMax =
      document.scrollingElement!.scrollHeight -
      document.scrollingElement!.clientHeight -
      20;
    if (scrollTop >= scrollTopMax && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, isFetchingNextPage]);

  // Check to see viewport position in order to fetch next page
  useEffect(() => {
    window.addEventListener("scroll", loadOnScroll);

    return () => {
      window.removeEventListener("scroll", loadOnScroll);
    };
  }, [fetchNextPage, loadOnScroll]);

  const debouncedSearch = useDebounce(search, 400);

  useEffect(() => {
    setFilterName(debouncedSearch);
  }, [debouncedSearch]);

  return { setFilterStatus, setSearch, characterPages, charactersStatus };
};

export default useCharacterList;
