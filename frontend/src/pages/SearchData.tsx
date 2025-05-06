import { useSearchContext } from "@/contexts/SearchContext";

const SearchData = () => {
  const search = useSearchContext();
  console.log(search);
  return (
    <>
      <h1>Search Data</h1>
    </>
  );
};

export default SearchData;
