import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";

export const apiUrl = import.meta.env.VITE_YUGIOH_API_URL;

export const AuthCodePage = () => {
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
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <CircularProgress />
    </div>
  );
};
