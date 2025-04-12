import { Autocomplete, TextField } from "@mui/material";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import react, { useEffect, useState } from "react";

const apiUrl = import.meta.env.VITE_YUGIOH_API_URL;


export const SearchArchetypes = ({
  setSelectedArchetype,
}: {
  setSelectedArchetype :(value:string|null) => void;
}) => {
  const [archetypes, setArchetypes] = useState<string[]>([]);

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${apiUrl}/get-archetypes`);
        const data = await response.json();

        setArchetypes(data);
        setLoading(false);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        setLoading(false);
        setError(`Failed to fetch archetypes data`);
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
        options={archetypes}
        getOptionLabel={(option) => option}
        id="auto-complete"
        autoComplete
        onChange={(event, newValue) => setSelectedArchetype(newValue)}
        includeInputInList
        renderInput={(params) => (
          <TextField {...params} label="archetypes" variant="standard" />
        )}
      />
    </>
  );
};
