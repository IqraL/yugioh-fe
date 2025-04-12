// eslint-disable-next-line @typescript-eslint/no-unused-vars
import react, { useState } from "react";

import { SearchArchetypes } from "./components/Search/SearchArchetypes";
import { SearchLevel } from "./components/Search/SearchLevel";
import { SearchFname } from "./components/Search/SearchFname";
import { SearchTypes } from "./components/Search/SearchType";
import { Search } from "./components/Search/Search";

function App() {
  const [selectedFname, setSelectedFname] = useState<string | null>(null);

  const [selectedArchetype, setSelectedArchetype] = useState<
    string | string[] | null
  >(null);

  const [selectedLevel, setSelectedLevel] = useState<string | string[] | null>(
    null
  );
  const [selectedTypes, setSelectedTypes] = useState<string[] | null>(null);

  console.log("fname", selectedFname);
  console.log("selectedArchetype", selectedArchetype);
  console.log("selectedLevel", selectedLevel);
  console.log("selectedTypes", selectedTypes);

  return (
    <>
      <SearchFname setSelectedFname={setSelectedFname} />
      <Search
        setSelectedResource={setSelectedArchetype}
        multiple={false}
        resourceType="archetype"
        endpoint="get-archetypes"
      />
      <Search
        setSelectedResource={setSelectedLevel}
        multiple={false}
        resourceType="levels"
        endpoint="get-levels"
      />
      <Search
        setSelectedResource={setSelectedLevel}
        multiple={true}
        resourceType="type"
        endpoint="get-types"
      />
      {/* 
      <SearchTypes setSelectedTypes={setSelectedTypes} /> */}
    </>
  );
}
export default App;
