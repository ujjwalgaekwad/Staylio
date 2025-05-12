import BookingDetailSummary from "@/components/BookingDetailSummary";
import BookingForm from "@/components/BookingForm";
import { useSearchContext } from "@/contexts/SearchContext";
import { fetchCurrentUser } from "@/utils/api";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

const Booking = () => {
  const [numberOfNights, setNumberOfNight] = useState<number>(0);
  const search = useSearchContext();

  useEffect(() => {
    if (search.checkIn && search.checkOut) {
      const nights = Math.abs(
        (search.checkOut.getTime() -
          search.checkIn.getTime() )/ (1000 * 60 * 60 * 24)
      );
      setNumberOfNight(Math.ceil(nights));
    }
  }, [search.checkIn, search.checkOut]);

  const { data: currentUser } = useQuery({
    queryKey: ["fetchCurrentUser"],
    queryFn: () => fetchCurrentUser(),
  });
  
  return (
     <div className="container mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
      <BookingDetailSummary
        checkIn={search.checkIn}
        checkOut={search.checkOut}
        adultCount={search.adultCount}
        childCount={search.childCount}
        numberOfNights={numberOfNights}
      />
      {currentUser && <BookingForm currentUser={currentUser} />}
    </div>
  );
};

export default Booking;
