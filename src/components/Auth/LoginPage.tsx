import { useState, useEffect } from "react";
import "./login.css";

export const apiUrl = import.meta.env.VITE_YUGIOH_API_URL;

export const LoginPage = () => {
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
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <div style={{ paddingLeft: 25 }}></div>
      <button
        className="login-btn"
        onClick={() => (window.location.href = signInUrl)}
      >
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg"
          alt="Google icon"
          style={{ width: "20px", height: "20px" }}
        />
        Sign in with Google
      </button>
    </div>
  );
};
