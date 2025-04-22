// eslint-disable-next-line @typescript-eslint/no-unused-vars
import react, { use, useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

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
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/auth" element={<AuthCodePage />} />
        <Route path="/" element={<AppWrapper />} />
      </Routes>
    </Router>
  );
}

const LoginPage = () => {
  const [signInUrl, setSignInUrl] = useState<string>("");
  useEffect(() => {
    const fetchSignInUrl = async () => {
      const response = await fetch(`${apiUrl}/auth-url`);
      const data = await response.json();
      const url = data.authorizationUrl;
      setSignInUrl(url);
    };
    fetchSignInUrl();
  }, []);
  return (
    <div>
      <h1>Login Page</h1>
      <p>Welcome to the login page!</p>
      <button onClick={() => (window.location.href = signInUrl)}>Login</button>
    </div>
  );
};

const AuthCodePage = () => {
  const [error, setError] = useState<string | null>(null);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const code = queryParams.get("code");

  ///get-tokens
  useEffect(() => {
    const fetchTokens = async () => {
      try {
        if (code) {
          const response = await fetch(`${apiUrl}/get-tokens`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ code }),
          });
          const data = await response.json();

          if (data.success) {
            localStorage.setItem("jwtToken", data.jwtToken);
            localStorage.setItem("email", data.email);
            localStorage.setItem("name", data.name);
            localStorage.setItem("picture", data.picture);
            window.location.href = "/?loginsuccess=true";
          }
        }
      } catch (error) {
        setError("login failed please try again");
      }
    };

    fetchTokens();
  }, [code]);

  useEffect(() => {
    if (error) {
      window.location.href = "/login?error=true";
    }
  }, [error]);
  return (
    <div>
      <h1>AuthCodePage </h1>
      <p>Welcome to the AuthCodePage!</p>
    </div>
  );
};
const AppWrapper = () => {
  const [searchBody, setSearchBody] = useState<any>({});
  const [metadata, setMetadata] = useState<CardMetaType | null>(null);

  const [cards, setCards] = useState<CardType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean | null>(null);

  const [numOfPages, setNumOfPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(0);

  const numOfPagesArray = new Array(numOfPages).fill(0);

  useEffect(() => {
    const verifyToken = async () => {
      const response = await fetch(
        `${apiUrl}/verify-token`,

        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
          },
          body: JSON.stringify({
            email: localStorage.getItem("email")})
        }
      );
      const data = await response.json();
      if (!data.validJwt) {
        window.location.href = "/login";
      }
    };
    verifyToken()
  }, []);
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
};

export default App;
