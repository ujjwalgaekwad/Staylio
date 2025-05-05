import { useSearchContext } from "@/contexts/SearchContext";
import { useState } from "react";

const SearchBar = () => {
  const search = useSearchContext();
  const [destination, setDestination] = useState<string>(search.destination);

  return <div></div>;
};

export default SearchBar;
