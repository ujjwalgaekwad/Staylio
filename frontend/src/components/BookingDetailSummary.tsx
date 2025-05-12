import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { hotelDetailById } from "@/utils/api"
import { useQuery } from "@tanstack/react-query"
import { format } from "date-fns"
import { useParams } from "react-router-dom"

type Props = {
  checkIn: Date
  checkOut: Date
  adultCount: number
  childCount: number
  numberOfNights: number
}

const BookingDetailSummary = ({
  adultCount,
  childCount,
  checkIn,
  checkOut,
  numberOfNights,
}: Props) => {
  const { hotelId } = useParams()
  const { data: hotelData } = useQuery({
    queryKey: ["hotelDetailById", hotelId],
    queryFn: () => hotelDetailById(hotelId as string),
    enabled: !!hotelId,
  })

  return (
    <Card className="border">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Booking Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 text-sm">
        <div>
          <p className="text-muted-foreground">Hotel</p>
          <p className="font-medium text-base">{`${hotelData?.name} ${hotelData?.city}`} </p>
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
  )
}

export default BookingDetailSummary
