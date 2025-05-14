import BookingDetailSummary from "@/components/BookingDetailSummary";
import BookingForm from "@/components/BookingForm";
import { useAppContext } from "@/contexts/AppContext";
import { useSearchContext } from "@/contexts/SearchContext";
import {
  createPaymentIntent,
  fetchCurrentUser,
  hotelDetailById,
} from "@/utils/api";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";

const Booking = () => {
  const { stripePromise } = useAppContext();
  const { hotelId } = useParams();
  const [numberOfNights, setNumberOfNight] = useState<number>(0);
  const search = useSearchContext();

  useEffect(() => {
    if (search.checkIn && search.checkOut) {
      const nights = Math.abs(
        (search.checkOut.getTime() - search.checkIn.getTime()) /
          (1000 * 60 * 60 * 24)
      );
      setNumberOfNight(Math.ceil(nights));
    }
  }, [search.checkIn, search.checkOut]);

  const { data: currentUser } = useQuery({
    queryKey: ["fetchCurrentUser"],
    queryFn: () => fetchCurrentUser(),
  });

  const { data: hotelData } = useQuery({
    queryKey: ["hotelDetailById", hotelId],
    queryFn: () => hotelDetailById(hotelId as string),
    enabled: !!hotelId,
  });

  const { data: paymentIntentData } = useQuery({
    queryKey: ["createPaymentIntent"],
    queryFn: () =>
      createPaymentIntent(hotelId as string, numberOfNights.toString()),
    enabled: !!hotelId,
  });

  if (!hotelData) {
    return <h1>Hotel data not found</h1>;
  }

  return (
    <div className="container mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
      <BookingDetailSummary
        checkIn={search.checkIn}
        checkOut={search.checkOut}
        adultCount={search.adultCount}
        childCount={search.childCount}
        numberOfNights={numberOfNights}
        hotelData={hotelData}
      />
      {currentUser && paymentIntentData && (
        <Elements
          stripe={stripePromise}
          options={{
            clientSecret: paymentIntentData.clientSecret,
          }}
        >
          <BookingForm
            currentUser={currentUser}
            paymentIntent={paymentIntentData}
          />
        </Elements>
      )}
    </div>
  );
};

export default Booking;
