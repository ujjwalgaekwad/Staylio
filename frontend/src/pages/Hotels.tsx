import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { fetchHotels } from "@/utils/api";
import { useQuery } from "@tanstack/react-query";
import { Car, ChevronRight, Coffee, MapPin, Star, Wifi } from "lucide-react";

function Hotels() {
  const { data: hotelsData } = useQuery({
    queryKey: ["fetchHotels"],
    queryFn: fetchHotels,
  });

  if (!hotelsData) {
    return <span>Not found hotels data.</span>;
  }

  return (
    <div>
      <section className="container px-4 md:px-6 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold tracking-tighter">
              Featured Hotels
            </h2>
            <p className="text-muted-foreground">
              Handpicked accommodations for your next getaway
            </p>
          </div>
          <Button variant="link" className="hidden md:flex items-center">
            View all hotels <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {hotelsData.map((hotel, index) => (
            <Card key={index} className="overflow-hidden">
              <div className="relative">
                <img
                  src={hotel.imageFiles[2] || "/placeholder.svg"}
                  alt={hotel.name}
                  width={400}
                  height={200}
                  className="object-cover w-full h-48"
                />
                {/* {hotel?.discount && (
                  <Badge className="absolute top-2 right-2 bg-red-500">
                    {hotel.discount}
                  </Badge>
                )} */}
              </div>
              <CardHeader className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{hotel.name}</CardTitle>
                    <CardDescription className="flex items-center mt-1">
                      <MapPin className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                      {hotel.city}
                    </CardDescription>
                  </div>
                  <div className="flex items-center bg-primary/10 px-2 py-1 rounded text-primary text-sm">
                    <Star className="h-3.5 w-3.5 mr-1 fill-yellow-400 text-yellow-400" />
                    {hotel.starRating}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="flex flex-wrap gap-2 mb-3">
                  <Badge
                    variant="outline"
                    className="flex items-center gap-1 text-xs"
                  >
                    <Wifi className="h-3 w-3" /> Free WiFi
                  </Badge>
                  <Badge
                    variant="outline"
                    className="flex items-center gap-1 text-xs"
                  >
                    <Coffee className="h-3 w-3" /> Breakfast
                  </Badge>
                  <Badge
                    variant="outline"
                    className="flex items-center gap-1 text-xs"
                  >
                    <Car className="h-3 w-3" /> Parking
                  </Badge>
                </div>
              </CardContent>
              <CardFooter className="p-4 pt-0 flex justify-between items-center">
                <div>
                  <span className="text-xl font-bold">{hotel.pricePerNight}</span>
                  <span className="text-muted-foreground text-sm">
                    {" "}
                    / night
                  </span>
                </div>
                <Button size="sm">View Details</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        <div className="flex justify-center mt-8 md:hidden">
          <Button variant="outline" className="flex items-center">
            View all hotels <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
      </section>
    </div>
  );
}

export default Hotels;
