import { myBookingData } from "@/utils/api";
import { useQuery } from "@tanstack/react-query";

const BookingData = () => {
  const { data: bookingData, isLoading } = useQuery({
    queryKey: ["myBookingData"],
    queryFn: () => myBookingData(),
  });

  console.log("Booking data:", bookingData);
  if (!bookingData || bookingData.length == 0) {
    return <>Bookings not fount!</>;
  }

  return (
    <div>
      {isLoading ? (
        <div className="space-y-8 animate-pulse">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-6 border border-gray-200 bg-white rounded-2xl p-6 shadow-sm"
            >
              <div className="w-full h-64 lg:h-52 bg-gray-200 rounded-lg" />

              <div className="flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="h-6 bg-gray-200 rounded w-2/3"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                </div>
                <div className="space-y-3">
                  {[1, 2].map((j) => (
                    <div key={j} className="space-y-2">
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                      <div className="h-4 bg-gray-200 rounded w-2/4"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-10 px-4 lg:px-0">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight border-b pb-3">
            My Bookings
          </h1>

          {bookingData?.length === 0 ? (
            <p className="text-gray-600 text-lg">No bookings found.</p>
          ) : (
            bookingData?.map((hotel: any) => (
              <div
                key={hotel.name}
                className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-6 border border-gray-200 bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-200"
              >
                {/* Hotel Image */}
                <div className="w-full h-64 lg:h-52 rounded-lg overflow-hidden border">
                  <img
                    src={hotel.imageUrls[0]}
                    alt={hotel.name}
                    className="w-full h-full object-cover object-center"
                  />
                </div>

                {/* Info Section */}
                <div className="flex flex-col justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">
                      {hotel.name}
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      {hotel.city}, {hotel.country}
                    </p>
                  </div>

                  {/* Bookings */}
                  <div className="mt-4 space-y-3 max-h-48 overflow-y-auto pr-1.5 scrollbar-thin scrollbar-thumb-gray-300">
                    {hotel.bookings?.map((booking: any, index: number) => (
                      <div
                        key={index}
                        className="bg-muted p-4 rounded-md border text-sm text-gray-700"
                      >
                        <div>
                          <span className="font-medium text-gray-900">
                            Dates:
                          </span>{" "}
                          {new Date(booking.checkIn).toDateString()} –{" "}
                          {new Date(booking.checkOut).toDateString()}
                        </div>
                        <div className="mt-1">
                          <span className="font-medium text-gray-900">
                            Guests:
                          </span>{" "}
                          {booking.adultCount} adults, {booking.childCount}{" "}
                          children
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};
export default BookingData;
