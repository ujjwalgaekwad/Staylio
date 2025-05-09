import Card from "@/components/Card";
import FacilitiesFilter from "@/components/FacilitiesFilter";
import HotelTypeFilter from "@/components/HotelTypeFilter";
import Pagination from "@/components/Pagination";
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
