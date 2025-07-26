// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { LoginPage } from "./components/Auth/LoginPage";
import { AppWrapper } from "./AppWrapper";
import { AuthCodePage } from "./components/Auth/AuthCodePage";
import { Sets } from "./components/Sets";
import { ComponentWrapper } from "./ComponentWrapper";
import { Pagination } from "./components/Pagination";
import { Cards } from "./components/Cards";

import { useEffect, useState } from "react";
import { CardType } from "./types";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/auth" element={<AuthCodePage />} />
        <Route
          path="/"
          element={
            <ComponentWrapper>
              <AppWrapper />
            </ComponentWrapper>
          }
        />
        <Route
          path="/sets"
          element={
            <ComponentWrapper>
              <Sets />
            </ComponentWrapper>
          }
        />
        <Route
          path="/users-collection"
          element={
            <ComponentWrapper>
              <UsersCollection />
            </ComponentWrapper>
          }
        />
      </Routes>
    </Router>
  );
}
export const apiUrl = import.meta.env.VITE_YUGIOH_API_URL;

export const UsersCollection = () => {
  const [cards, setCards] = useState<CardType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [numberOfPages, setNumberOfPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const numOfPagesArray = new Array(numberOfPages).fill(0);

  useEffect(() => {
    const getNumberOfPages = async () => {
      try {
        const response = await fetch(`${apiUrl}/get-owned-cards`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
          },
          body: JSON.stringify({
            userId: localStorage.getItem("email"),
          }),
        });
        const data = await response.json();
        setNumberOfPages(Math.ceil(Number(data.length) / 15));
      } catch (error) {
        console.log(error);
      }
    };
    getNumberOfPages();
  }, []);

  useEffect(() => {
    const getOwnedCards = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${apiUrl}/get-owned-cards-with-details`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
          },
          body: JSON.stringify({
            userId: localStorage.getItem("email"),
            page: currentPage,
            limit: 15,
          }),
        });

        const data = await response.json();

        if (!Array.isArray(data)) {
          setCards([]);
        } else {
          setCards(data);
        }

        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    getOwnedCards();
  }, [currentPage]);

  return (
    <div>
      <h1>My Collection</h1>
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
      {loading && <p>Loading...</p>}

      <div style={{ paddingTop: 20 }}>
        <Cards cardDetails={cards || []} />
      </div>
    </div>
  );
};
export default App;
