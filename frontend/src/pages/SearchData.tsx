import { useSearchContext } from "@/contexts/SearchContext";
import { searchHotels } from "@/utils/api";
import { useQuery } from "@tanstack/react-query";

const SearchData = () => {
  const search = useSearchContext();

  const searchParams = {
    destination: search.destination,
    checkIn: search.checkIn.toISOString(),
    checkOut: search.checkOut.toISOString(),
    adultCount: search.adultCount.toString(),
    childCount: search.childCount.toString(),
  };

  const { data: hotelData } = useQuery({
    queryKey: ["searchHotels", searchParams],
    queryFn: () => searchHotels(searchParams),
  });

  console.log(hotelData);
  return (
    <div className="">
      {hotelData && (
        <div className="flex ">
          <div>
            <div>
              <h1>Filter by:</h1>
            </div>
            {/* {toto: filters} */}
          </div>
          <div>
            <div>
              <span>{hotelData?.pagination.total} hotel foun</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchData;
