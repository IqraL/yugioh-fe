// eslint-disable-next-line @typescript-eslint/no-unused-vars
import react, { use, useEffect, useState } from "react";

import { SearchWrapper } from "./components/Search/SearchWrapper";
import { CardType, CardMetaType } from "./types";

const apiUrl = import.meta.env.VITE_YUGIOH_API_URL;
type SearchResponse = {
  data?: CardType[];
  meta?: CardMetaType;
  error?: string;
};

export const Pagination = ({
  numOfPagesArray,
  setCurrentPage,
  setSearchBody,
  searchBody,
}: {
  numOfPagesArray: number[];
  setCurrentPage: any;
  setSearchBody: any;
  searchBody:any
}) => {
  return numOfPagesArray.map((_, index) => (
    <>
      <button
        key={index}
        onClick={() => {
          setCurrentPage(index + 1);
          setSearchBody({ ...searchBody, page: index + 1 });
        }}
      >
        {index + 1}
      </button>
    </>
  ));
};

function App() {
  const [searchBody, setSearchBody] = useState<any>({});
  const [metadata, setMetadata] = useState<CardMetaType | null>(null);

  const [cards, setCards] = useState<CardType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean | null>(null);

  const [numOfPages, setNumOfPages] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(1);


  const numOfPagesArray = new Array(numOfPages).fill(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${apiUrl}/cards`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...searchBody, page: currentPage }),
        });
        const data: SearchResponse = await response.json();

        if (data.error) {
          throw new Error(data.error);
        } else {
          setCards(data.data && data.data.length > 0 ? data.data : []);
          setMetadata(data.meta || null);
          setNumOfPages(
            data.meta?.total_rows ? Math.ceil(data.meta.total_rows / 50) : 1
          );
          setLoading(false);
          setError(false);
        }
      } catch (error) {
        setError(true);
        setLoading(false);
        setCards([]);

        console.log("Error fetching data:", error);
      }
    };

    if (Object.keys(searchBody).length > 0) {
      fetchData();
    }
  }, [currentPage, searchBody]);

  console.log("cards", cards);
  console.log("metadata", metadata);
  console.log("numOfPages", numOfPages);
  console.log("currentPage", currentPage);
  return (
    <>
      <SearchWrapper setSearchBody={setSearchBody} />
      <div>
        {numOfPagesArray.length > 0 && (
          <Pagination
            numOfPagesArray={numOfPagesArray}
            setCurrentPage={setCurrentPage}
            setSearchBody={setSearchBody}
            searchBody={searchBody}
          />
        )}
      </div>
      {loading && <div>Loading...</div>}
      {error && <div>Failed to fetch data</div>}
      {cards && cards.length > 0 ? (
        <Card cardDetails={cards} />
      ) : (
        <div>No cards found</div>
      )}
    </>
  );
}

export const Card = ({ cardDetails }: { cardDetails: CardType[] }) => {
  return (
    <div>
      <h2>Card</h2>
      {cardDetails.map((card) => {
        if (card.type === "Spell Card") {
          return (
            <div key={card.id}>
              <div>{card.name}</div>
              <div>{card.desc}</div>
              <div>{card.race}</div>
              <div>{card.type}</div>
              <div>{card.archetype}</div>
            </div>
          );
        } else if (card.type === "Trap Card") {
          return (
            <div key={card.id}>
              <p>{card.name}</p>
            </div>
          );
        } else {
          return (
            <div key={card.id}>
              <p>{card.name}</p>
            </div>
          );
        }
      })}
    </div>
  );
};
export default App;
