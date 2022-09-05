import React, { ChangeEvent } from "react";
import useCharacterList from "containers/Home/components/CharacterList/useCharacterList";
import { CharacterStatus } from "api/characters/types";

const SearchFilter = () => {
  const { setFilterStatus, setSearch } = useCharacterList();

  return (
    <div
      id="serach-and-filter"
      className="flex flex-wrap justify-center py-4 sm:justify-between"
    >
      <div
        className="flex flex-wrap gap-2 py-4 px-4"
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          setFilterStatus(event.target.value);
        }}
      >
        <p>Character status: </p>
        <div>
          <input
            id="status_any"
            type="radio"
            value={CharacterStatus.Any}
            name="status"
          />
          <label htmlFor="status_any">Any</label>
        </div>
        <div>
          <input
            id="status_alive"
            type="radio"
            value={CharacterStatus.Alive}
            name="status"
          />
          <label htmlFor="status_alive">Alive</label>
        </div>
        <div>
          <input
            id="status_dead"
            type="radio"
            value={CharacterStatus.Dead}
            name="status"
          />
          <label htmlFor="status_dead">Dead</label>
        </div>
        <div>
          <input
            id="status_unknown"
            type="radio"
            value={CharacterStatus.Unknown}
            name="status"
          />
          <label htmlFor="status_unknown">Unknown</label>
        </div>
      </div>
      <input
        className="mr-4 rounded-lg p-4"
        type="text"
        name=""
        id=""
        placeholder="Search"
        onChange={(event) => setSearch(event.target.value)}
      />
    </div>
  );
};

export default SearchFilter;
