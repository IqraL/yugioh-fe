import React, { useEffect, useMemo, useState } from "react";
import { SearchFname } from "./SearchFname";
import { Search } from "./Search";
import { SearchBody } from "../../types";

export const SearchWrapper = ({
  setSearchBody,
  setCurrentPage,
}: {
  setSearchBody: (searchBody: SearchBody) => void;
  setCurrentPage: (page: number) => void;
}) => {
  const [selectedFname, setSelectedFname] = useState<string | null>(null);
  const [selectedArchetype, setSelectedArchetype] = useState<string | string[] | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<string | string[] | null>(null);
  const [selectedTypes, setSelectedTypes] = useState<string | string[] | null>(null);
  const [selectedAttributes, setSelectedAttributes] = useState<string | string[] | null>(null);
  const [selectedRaces, setSelectedRaces] = useState<string | string[] | null>(null);

  const searchBody: SearchBody = useMemo(() => {
    return {
      ...(selectedFname && { fname: selectedFname }),
      ...(selectedArchetype && { archetype: selectedArchetype }),
      ...(selectedLevel && { level: selectedLevel }),
      ...(Array.isArray(selectedTypes) && selectedTypes.length > 0 && { type: selectedTypes.join(",") }),
      ...(Array.isArray(selectedAttributes) && selectedAttributes.length > 0 && { attribute: selectedAttributes.join(",") }),
      ...(Array.isArray(selectedRaces) && selectedRaces.length > 0 && { race: selectedRaces.join(",") }),
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
        gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
        gap: "16px",
        padding: "20px",
        backgroundColor: "#f9fafb", // light gray background
        borderRadius: "12px",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
        marginBottom: "24px",
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
