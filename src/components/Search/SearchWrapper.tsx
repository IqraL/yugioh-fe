import React, { useEffect, useMemo, useState } from "react";
import { SearchFname } from "./SearchFname";
import { Search } from "./Search";
import { SearchBody } from "../../types";

export const SearchWrapper = ({
  setSearchBody,
  setCurrentPage
}: {
  setSearchBody: (searchBody: SearchBody) => void;
  setCurrentPage: (page: number) => void;
}) => {
  const [selectedFname, setSelectedFname] = useState<string | null>(null);

  const [selectedArchetype, setSelectedArchetype] = useState<
    string | string[] | null
  >(null);

  const [selectedLevel, setSelectedLevel] = useState<string | string[] | null>(
    null
  );
  const [selectedTypes, setSelectedTypes] = useState<string | string[] | null>(
    null
  );
  const [selectedAttributes, setSelectedAttributes] = useState<
    string | string[] | null
  >(null);
  const [selectedRaces, setSelectedRaces] = useState<string | string[] | null>(
    null
  );

  const searchBody: SearchBody = useMemo(() => {
    return {
      ...(selectedFname && { fname: selectedFname }),
      ...(selectedArchetype && { archetype: selectedArchetype }),
      ...(selectedLevel && { level: selectedLevel }),
      ...(Array.isArray(selectedTypes) &&
        selectedTypes?.length > 0 && { type: selectedTypes.join(",") }),
      ...(Array.isArray(selectedAttributes) &&
        selectedAttributes?.length > 0 && {
          attribute: selectedAttributes.join(","),
        }),
      ...(Array.isArray(selectedRaces) &&
        selectedRaces?.length > 0 && { race: selectedRaces.join(",") }),
    };
  }, [
    selectedFname,
    selectedArchetype,
    selectedLevel,
    selectedTypes,
    selectedAttributes,
    selectedRaces,
  ]);

  useEffect(() => {
    setSearchBody(searchBody);
    setCurrentPage(1);
  }, [searchBody, setCurrentPage, setSearchBody]);

  return (
    <div
      className="search-wrapper"
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 1fr",
        columnGap: "10px",
      }}
    >
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
        setSelectedResource={setSelectedTypes}
        multiple={true}
        resourceType="type"
        endpoint="get-types"
      />
      <Search
        setSelectedResource={setSelectedAttributes}
        multiple={true}
        resourceType="attributes"
        endpoint="get-attributes"
      />
      <Search
        setSelectedResource={setSelectedRaces}
        multiple={true}
        resourceType="race"
        endpoint="get-allRaces"
      />
    </div>
  );
};
