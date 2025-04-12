import { Autocomplete, TextField } from "@mui/material";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import react, { useEffect, useState } from "react";

const apiUrl = import.meta.env.VITE_YUGIOH_API_URL;

export const Search = ({
  setSelectedResource,
  multiple,
  resourceType,
  endpoint,
}: {
  setSelectedResource: (value: string | string[] | null) => void;
  multiple: boolean;
  resourceType: string;
  endpoint: string;
}) => {
  const [resource, setResource] = useState<string[]>([]);

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${apiUrl}/${endpoint}`);
        const data = await response.json();

        setResource(data);
        setLoading(false);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        setLoading(false);
        setError(`Failed to ${resourceType} levels data`);
      }
    };
    fetchData();
  }, [endpoint, resourceType]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <Autocomplete
        multiple={multiple}
        options={resource}
        getOptionLabel={(option) => option}
        id="auto-complete"
        autoComplete
        onChange={(event, newValue) => setSelectedResource(newValue)}
        includeInputInList
        renderInput={(params) => (
          <TextField {...params} label={resourceType} variant="standard" />
        )}
      />
    </>
  );
};
