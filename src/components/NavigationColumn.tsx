import React from "react";
import { Button } from "@mui/material";

export const NavigationColumn = () => {
  return (
    <div
      style={{
        display: "flex",
        gap: 10,
        flexDirection: "column",
        paddingTop: 20,
      }}
    >
      <Button
        variant="contained"
        onClick={() => {
          window.location.href = "/";
        }}
      >
        Search parameters
      </Button>
      <Button
        variant="contained"
        onClick={() => {
          window.location.href = "/sets";
        }}
      >
        Search by sets
      </Button>

      <Button
        variant="contained"
        onClick={() => {
          window.location.href = "/users-collection";
        }}
      >
       My collection
      </Button>
    </div>
  );
};
