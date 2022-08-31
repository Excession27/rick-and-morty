import React, { ChangeEvent } from "react";
import Card from "containers/Home/components/CharacterList/Card";
import AsyncComponent from "components/providers/AsyncComponent/AsyncComponent";
import placeholderImg from "assets/img/placeholder.jpeg";
import { CharacterStatus, CharacterType } from "api/characters/types";
import useCharacterList from "containers/Home/components/CharacterList/useCharacterList";

const CharacterList = () => {
  const { setFilterStatus, setSearch, ref, characterPages, charactersStatus } =
    useCharacterList();

  return (
    <div className="w-full bg-slate-300 py-2">
      <div
        id="serach-and-filter"
        className="flex flex-wrap justify-center py-2 sm:justify-between"
      >
        <div
          className="flex flex-wrap gap-2 py-4 px-2"
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            setFilterStatus(event.target.value);
          }}
        >
          <p>Character status: </p>
          <div>
            <input
              id="status_any"
              type="radio"
              value={CharacterStatus.any}
              name="status"
            />
            <label htmlFor="status_any">Any</label>
          </div>
          <div>
            <input
              id="status_alive"
              type="radio"
              value={CharacterStatus.alive}
              name="status"
            />
            <label htmlFor="status_alive">Alive</label>
          </div>
          <div>
            <input
              id="status_dead"
              type="radio"
              value={CharacterStatus.dead}
              name="status"
            />
            <label htmlFor="status_dead">Dead</label>
          </div>
          <div>
            <input
              id="status_unknown"
              type="radio"
              value={CharacterStatus.unknown}
              name="status"
            />
            <label htmlFor="status_unknown">Unknown</label>
          </div>
        </div>
        <input
          className="mr-3 rounded-lg p-3"
          type="text"
          name=""
          id=""
          placeholder="Search"
          onChange={(event) => setSearch(event.target.value)}
        />
      </div>
      <div className="card-container grid grid-flow-row grid-cols-1 gap-4 px-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        <AsyncComponent
          component={
            <>
              {characterPages?.pages.map((page) =>
                page.data.results.map(
                  (character: CharacterType, index: number) => {
                    return (
                      <div key={index} ref={ref}>
                        <Card
                          image={character.image}
                          name={character.name}
                          key={character.id}
                        />
                      </div>
                    );
                  }
                )
              )}
            </>
          }
          status={charactersStatus}
          skeleton={<Card image={placeholderImg} name={charactersStatus} />}
        />
      </div>
    </div>
  );
};

export default CharacterList;
