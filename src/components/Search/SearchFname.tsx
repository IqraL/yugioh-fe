import react from "react";
import {TextField } from "@mui/material";

export const SearchFname = ({
  setSelectedFname,
}: {
  setSelectedFname: (value: string | null) => void;
}) => {
  return (
    <TextField
      id="outlined-basic"
      label="name"
      variant="outlined"
      onChange={(event) => setSelectedFname(event.target.value)} />
  );
};
