import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { HotelType } from "@/types/Types";
import { format } from "date-fns";

type Props = {
  checkIn: Date;
  checkOut: Date;
  adultCount: number;
  childCount: number;
  numberOfNights: number;
  hotelData: HotelType;
};

const BookingDetailSummary = ({
  adultCount,
  childCount,
  checkIn,
  checkOut,
  numberOfNights,
  hotelData,
}: Props) => {
  return (
    <Card className="border">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Booking Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 text-sm">
        <div>
          <p className="text-muted-foreground">Hotel</p>
          <p className="font-medium text-base">
            {`${hotelData?.name} ${hotelData?.city}`}{" "}
          </p>
        </div>
        <Separator />
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-muted-foreground">Check-In</p>
            <p>{format(checkIn, "PPP")}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Check-Out</p>
            <p>{format(checkOut, "PPP")}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Adults</p>
            <p>{adultCount}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Children</p>
            <p>{childCount}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Nights</p>
            <p>{numberOfNights}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BookingDetailSummary;
