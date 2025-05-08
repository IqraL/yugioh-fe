import react, { useState, useEffect } from "react";
import { Cards } from "./Cards";
import { Pagination } from "./Pagination";
import { Search } from "./Search/Search";
import { CardType } from "../types";

export const apiUrl = import.meta.env.VITE_YUGIOH_API_URL;

export const Sets = () => {
  const [setName, setSetName] = react.useState<string[] | string | null>([]);
  const [cards, setCards] = react.useState<CardType[]>([]);

  const [numOfPages, setNumOfPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(0);

  const numOfPagesArray = new Array(numOfPages).fill(0);

  useEffect(() => {
    const fetchSetCards = async () => {
      try {
        const response = await fetch(
          `${apiUrl}/get-card-set-info`,

          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
            },
            body: JSON.stringify({ setName, page: currentPage }),
          }
        );
        const data = await response.json();
        setCards(data.data || []);
        setNumOfPages(
          data.meta?.total_rows ? Math.ceil(data.meta.total_rows / 50) : 1
        );
      } catch (error) {
        setCards([]);
      }
    };

    fetchSetCards();
  }, [currentPage, setCards, setName]);

  return (
    <div style={{ display: "grid", gridRowGap: "20px", gridColumnGap: "20px" }}>
      <div>
        <Search
          setSelectedResource={setSetName}
          multiple={false}
          resourceType="setName"
          endpoint={"get-cardSets"}
        />
      </div>
      <div>
        {numOfPagesArray.length > 1 && (
          <Pagination
            numOfPagesArray={numOfPagesArray}
            setCurrentPage={setCurrentPage}
            setSearchBody={() => {}}
            searchBody={{}}
          />
        )}
      </div>

      <div style={{ paddingTop: 20 }}>
        <Cards cardDetails={cards} />
      </div>
    </div>
  );
};
