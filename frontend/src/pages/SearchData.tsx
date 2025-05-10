import Card from "@/components/Card";
import FacilitiesFilter from "@/components/FacilitiesFilter";
import HotelTypeFilter from "@/components/HotelTypeFilter";
import Pagination from "@/components/Pagination";
import PriceFilter from "@/components/PriceFilter";
import StarRatingFilter from "@/components/StarRatingFilter";
import { useSearchContext } from "@/contexts/SearchContext";
import { searchHotels } from "@/utils/api";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

const SearchData = () => {
  const [page, setPage] = useState<number>(1);
  const [selectedStar, setSelectedStar] = useState<string[]>([]);
  const [selectHotelType, setSelectHotelType] = useState<string[]>([]);
  const [selectFacilities, setSelectFacilities] = useState<string[]>([]);
  const [selectPrice, setSelectPrice] = useState<number | undefined>();
  const [sortOption, setSortOption] = useState<string>("");

  const search = useSearchContext();

  const searchParams = {
    destination: search.destination,
    checkIn: search.checkIn.toISOString(),
    checkOut: search.checkOut.toISOString(),
    adultCount: search.adultCount.toString(),
    childCount: search.childCount.toString(),
    page: page.toString(),
    stars: selectedStar,
    types: selectHotelType,
    facilities: selectFacilities,
    maxPrice: selectPrice?.toString(),
    sortOption,
  };

  const { data: hotelData } = useQuery({
    queryKey: ["searchHotels", searchParams],
    queryFn: () => searchHotels(searchParams),
  });

  const handleStarSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const starRatings = e.target.value;
    //TODO
    setSelectedStar((prev) =>
      e.target.checked
        ? [...prev, starRatings]
        : prev.filter((star) => star !== starRatings)
    );
  };
  const handleSelectHotelType = (e: React.ChangeEvent<HTMLInputElement>) => {
    const HotelType = e.target.value;

    setSelectHotelType((prev) =>
      e.target.checked
        ? [...prev, HotelType]
        : prev.filter((type) => type !== HotelType)
    );
  };
  const handleSelectFacilities = (e: React.ChangeEvent<HTMLInputElement>) => {
    const facilityType = e.target.value;

    setSelectFacilities((prev) =>
      e.target.checked
        ? [...prev, facilityType]
        : prev.filter((type) => type !== facilityType)
    );
  };

  return (
    <div className="w-full flex gap-6 px-6 py-8">
      <div className="w-1/4 sticky top-24 self-start p-4 rounded-md space-y-6">
        <h1 className="text-xl font-bold text-gray-800">Filter By:</h1>
        <PriceFilter
          onChange={(value?: number) => setSelectPrice(value)}
          selectedPrice={selectPrice}
        />
        <StarRatingFilter selected={selectedStar} onChange={handleStarSelect} />
        <HotelTypeFilter
          selectedHotelType={selectHotelType}
          onChange={handleSelectHotelType}
        />
        <FacilitiesFilter
          selectedFacilities={selectFacilities}
          onChange={handleSelectFacilities}
        />
      </div>

      <div className="w-3/4 space-y-6">
        <div>
          <select
            title="Sort by"
            className="px-4 py-2 border rounded-md"
            name="Sort Options"
            value={sortOption}
            onChange={(event) => setSortOption(event.target.value)}
          >
            <option value="">Sort Option</option>
            <option value="starRating">Star Rating</option>
            <option value="pricePerNightAsc">Low to high</option>
            <option value="pricePerNightDesc">High to low</option>
          </select>
        </div>
        {hotelData?.data.map((hotelData) => (
          <div key={hotelData.name}>
            <Card hotelData={hotelData} />
          </div>
        ))}

        <Pagination
          onPageChange={(page) => setPage(page)}
          page={hotelData?.pagination.page || 1}
          pages={hotelData?.pagination.pages || 1}
        />
      </div>
    </div>
  );
};

export default SearchData;
