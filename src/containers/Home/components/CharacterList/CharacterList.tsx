import React from "react";
import Card from "containers/Home/components/CharacterList/Card";
import AsyncComponent from "components/providers/AsyncComponent/AsyncComponent";
import SearchFilter from "containers/Home/components/CharacterList/SearchFilter";
import placeholderImg from "assets/img/placeholder.jpeg";
import { CharacterType } from "api/characters/types";
import useCharacterList from "containers/Home/components/CharacterList/useCharacterList";

const CharacterList = () => {
  const { setFilterStatus, setSearch, characterPages, charactersStatus } =
    useCharacterList();

  return (
    <div className="w-full bg-slate-300">
      <SearchFilter setFilterStatus={setFilterStatus} setSearch={setSearch} />
      <div
        id="card-container"
        className="grid h-[calc(100%_-_192px)] min-h-[calc(100vh_-_192px)] grid-flow-row grid-rows-2 gap-4 px-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
      >
        <AsyncComponent
          component={
            <>
              {characterPages?.pages.map((page) =>
                page.data.results.map((character: CharacterType) => {
                  return (
                    <Card
                      image={character.image}
                      name={character.name}
                      key={character.id}
                    />
                  );
                })
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
