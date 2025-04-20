// eslint-disable-next-line @typescript-eslint/no-unused-vars
import react, { use, useEffect, useState } from "react";

import { SearchWrapper } from "./components/Search/SearchWrapper";
import { CardType, CardMetaType } from "./types";
import { Pagination } from "./components/Pagination";
import { Cards } from "./components/Cards";

const apiUrl = import.meta.env.VITE_YUGIOH_API_URL;
type SearchResponse = {
  data?: CardType[];
  meta?: CardMetaType;
  error?: string;
};

function App() {
  const [searchBody, setSearchBody] = useState<any>({});
  const [metadata, setMetadata] = useState<CardMetaType | null>(null);

  const [cards, setCards] = useState<CardType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean | null>(null);

  const [numOfPages, setNumOfPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(0);

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
      }
    };

    if (Object.keys(searchBody).length > 0) {
      fetchData();
    }
  }, [currentPage, searchBody]);

  return (
    <>
      <SearchWrapper
        setSearchBody={setSearchBody}
        setCurrentPage={setCurrentPage}
      />
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
      {cards && cards.length > 1 ? (
        <Cards cardDetails={cards} />
      ) : (
        <div>Please enter a valid search</div>
      )}
    </>
  );
}

export default App;
