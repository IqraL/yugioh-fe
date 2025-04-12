import react, { useEffect, useState } from "react";
import { Autocomplete, TextField } from "@mui/material";

const apiUrl = import.meta.env.VITE_YUGIOH_API_URL;

export const SearchTypes = ({
  setSelectedTypes,
}: {
  setSelectedTypes: (value: string[] | null) => void;
}) => {
  const [types, setTypes] = useState<string[]>([]);

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${apiUrl}/get-types`);
        const data = await response.json();

        setTypes(data);
        setLoading(false);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        setLoading(false);
        setError(`Failed to fetch types data`);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <Autocomplete
        options={types}
        getOptionLabel={(option) => option}
        id="auto-complete"
        autoComplete
         onChange={(event,value) => setSelectedTypes(value)}
        includeInputInList
        multiple
        renderInput={(params) => (
          <TextField {...params} label="types" variant="standard" />
        )}
      />
    </>
  );
};
