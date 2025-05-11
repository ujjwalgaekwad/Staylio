import {
  BabyIcon,
  CalendarIcon,
  Delete,
  MapPin,
  PersonStanding,
  Search,
} from "lucide-react";
import { Label } from "./ui/label";
import { Tabs, TabsContent } from "./ui/tabs";
import { Input } from "./ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { Calendar } from "./ui/calendar";
import { FormEvent, useState } from "react";
import { format } from "date-fns";
import { useSearchContext } from "@/contexts/SearchContext";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "@/contexts/AppContext";

function SearchBar() {
  const navigate = useNavigate();
  const { isLoggedIn } = useAppContext();
  const search = useSearchContext();

  const [destination, setDestination] = useState<string>(search.destination);
  const [checkIn, setCheckIn] = useState<Date>(search.checkIn);
  const [checkOut, setCheckOut] = useState<Date>(search.checkOut);
  const [childCount, setChildCount] = useState<number>(search.childCount);
  const [adultCount, setAdultCount] = useState<number>(search.adultCount);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    search.saveSearchValues(
      destination,
      checkIn,
      checkOut,
      childCount,
      adultCount
    );

    if (!isLoggedIn) return navigate("/register");
    navigate("/search");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full bg-background rounded-xl border p-4 mt-8 flex-1"
    >
      <Tabs defaultValue="hotels" className="w-full">
        <TabsContent value="hotels" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label htmlFor="location">Destination</Label>
              <div className="relative">
                <MapPin className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  required
                  type="text"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  id="location"
                  placeholder="Where are you going?"
                  className="pl-8"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Children</Label>
              <div className="relative">
                <BabyIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  required
                  type="number"
                  max={20}
                  min={0}
                  value={childCount}
                  onChange={(e) => setChildCount(parseInt(e.target.value))}
                  id="location"
                  placeholder="Where are you going?"
                  className="pl-8"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Adult</Label>
              <div className="relative">
                <PersonStanding className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  required
                  type="number"
                  max={20}
                  min={1}
                  value={adultCount}
                  onChange={(e) => setAdultCount(parseInt(e.target.value))}
                  id="location"
                  placeholder="Where are you going?"
                  className="pl-8"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Check-in</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !checkIn && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {checkIn ? format(checkIn, "PPP") : "Select date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={checkIn}
                    onSelect={(date) => setCheckIn(date as Date)}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="space-y-2">
              <Label>Check-out</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !checkOut && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {checkOut ? format(checkOut, "PPP") : "Select date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={checkOut}
                    onSelect={(date) => setCheckOut(date as Date)}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
          <Button className="w-full md:w-auto" type="submit">
            <Search className="h-4 w-4" />
            Search Hotels
          </Button>
        </TabsContent>
      </Tabs>
    </form>
  );
}

export default SearchBar;
