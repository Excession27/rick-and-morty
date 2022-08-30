import React from "react";
import Header from "components/layout/Header";
import CharacterList from "./components/CharacterList/CharacterList";

const Home = () => {
  return (
    <div>
      <Header />
      <CharacterList />
    </div>
  );
};

export default Home;
