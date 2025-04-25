import { ReactElement, useEffect } from "react";

export const apiUrl = import.meta.env.VITE_YUGIOH_API_URL;

export const ValidateToken = ({ children }: { children: ReactElement; }) => {
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
            email: localStorage.getItem("email"),
          }),
        }
      );
      const data = await response.json();
      if (!data.validJwt) {
        window.location.href = "/login";
      }
    };
    verifyToken();
  }, []);

  return <div>{children}</div>;
};
