import { Link } from "react-router-dom";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { HotelType } from "@/types/Types";

type Props = {
  hotelData: HotelType;
};

export default function HotelCard({ hotelData }: Props) {
  return (
    <Card className="grid grid-cols-1 xl:grid-cols-[2fr_3fr] border border-slate-300 rounded-lg overflow-hidden gap-6 p-4 sm:p-6">
      <div className="w-full h-[250px] sm:h-[300px] rounded-md overflow-hidden">
        <img
          src={hotelData.imageUrls?.[0] || ""}
          alt={hotelData.name}
          className="w-full h-full object-cover object-center"
        />
      </div>
      <CardContent className="grid grid-rows-[auto_1fr_auto] gap-4 p-0">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              {Array.from({ length: hotelData.starRating }).map((_, index) => (
                  <Star key={index} className="w-4 h-4 fill-orange-400 stroke-orange-400" />
              ))}
            </div>
            <span>{hotelData.type}</span>
          </div>

          <Link
            to={`/detail/${hotelData._id}`}
            className="text-xl sm:text-2xl font-semibold text-primary hover:underline block"
          >
            {hotelData.name}
          </Link>
        </div>

        <p className="text-sm text-gray-600 line-clamp-4">
          {hotelData.description}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 items-end gap-3">
          <div className="flex flex-wrap gap-2 items-center">
            {hotelData.facilities.slice(0, 3).map((facility, i) => (
              <Badge key={i} variant="secondary" className="capitalize text-xs">
                {facility}
              </Badge>
            ))}
            {hotelData.facilities.length > 3 && (
              <span className="text-xs text-muted-foreground cursor-pointer">
                +{hotelData.facilities.length - 3} more
              </span>
            )}
          </div>
          <div className="flex flex-col items-start sm:items-end gap-1">
            <span className="text-lg font-bold">
              ₹ {hotelData.pricePerNight}{" "}
              <span className="text-sm font-normal">/ night</span>
            </span>
            <Button asChild className="text-sm sm:text-base">
              <Link to={`/detail/${hotelData._id}`}>View More</Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
