import BookInfoForm from "@/components/BookInfoForm";
import { hotelDetailById } from "@/utils/api";
import { useQuery } from "@tanstack/react-query";
import { Star } from "lucide-react";
import { useParams } from "react-router-dom";

const Details = () => {
  const { hotelId } = useParams();
  const { data: hotelData } = useQuery({
    queryKey: ["hotelDetailById"],
    queryFn: () => hotelDetailById(hotelId as string),
    enabled: !!hotelId,
  });

  return (
    <div className="py-6">
      <div className="space-y-2">
        <div className="flex items-center gap-1 text-yellow-500">
          {Array.from({ length: hotelData?.starRating || 0 }).map((_, i) => (
            <Star key={i} className="w-4 h-4 fill-yellow-400" />
          ))}
        </div>
        <h1 className="text-3xl font-bold text-foreground">
          {hotelData?.name || "TAj Sky"}
        </h1>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {hotelData?.imageUrls.map((image, index) => (
          <div
            key={index}
            className="rounded-xl overflow-hidden h-60 shadow-md"
          >
            <img
              src={image}
              alt={hotelData?.name}
              className="w-full h-full object-cover object-center"
            />
          </div>
        ))}
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {hotelData?.facilities.map((facility: string, index: number) => (
          <div
            key={index}
            className="border border-muted rounded-lg p-3 text-sm text-muted-foreground"
          >
            {facility}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6">
        <div className="whitespace-pre-line text-base text-muted-foreground">
          {hotelData?.description}
        </div>
        <div>
          <BookInfoForm
            pricePerNight={hotelData?.pricePerNight}
            hotelId={hotelData?._id}
          />
        </div>
      </div>
    </div>
  );
};

export default Details;
