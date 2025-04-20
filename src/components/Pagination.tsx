
export const Pagination = ({
  numOfPagesArray, setCurrentPage, setSearchBody, searchBody,
}: {
  numOfPagesArray: number[];
  setCurrentPage: any;
  setSearchBody: any;
  searchBody: any;
}) => {
  return (
    <div
      style={{
        display: "flex",
        gap: "8px",
        flexWrap: "wrap",
        margin: "16px 0",
      }}
    >
      {numOfPagesArray.map((_, index) => (
        <button
          key={index}
          onClick={() => {
            setCurrentPage(index + 1);
            setSearchBody({ ...searchBody, page: index + 1 });
          }}
          style={{
            padding: "8px 12px",
            borderRadius: "6px",
            border: "1px solid #ccc",
            backgroundColor: "#fff",
            cursor: "pointer",
            transition: "all 0.2s ease-in-out",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#eee")}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#fff")}
        >
          {index + 1}
        </button>
      ))}
    </div>
  );
};
