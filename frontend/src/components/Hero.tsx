import { CalendarIcon, MapPin, Search } from "lucide-react";
import { Label } from "./ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Input } from "./ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { Calendar } from "./ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useState } from "react";
import { format } from "date-fns";

function Hero() {
  const [date, setDate] = useState<Date>();
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-muted relative">
      <div className="container px-4 md:px-6 flex flex-col items-center text-center space-y-4 relative z-10">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
          Find Your Perfect Stay
        </h1>
        <p className="max-w-[700px] text-muted-foreground md:text-xl">
          Discover amazing hotels and accommodations worldwide at the best
          prices.
        </p>
        <div className="w-full max-w-4xl bg-background rounded-xl shadow-lg p-4 mt-8">
          <Tabs defaultValue="hotels" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="hotels">Hotels</TabsTrigger>
              <TabsTrigger value="packages">Vacation Packages</TabsTrigger>
            </TabsList>
            <TabsContent value="hotels" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="location">Destination</Label>
                  <div className="relative">
                    <MapPin className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
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
                          !date && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : "Select date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
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
                          !date && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : "Select date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="guests">Guests</Label>
                  <Select>
                    <SelectTrigger id="guests">
                      <SelectValue placeholder="Select guests" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 Adult</SelectItem>
                      <SelectItem value="2">2 Adults</SelectItem>
                      <SelectItem value="3">2 Adults, 1 Child</SelectItem>
                      <SelectItem value="4">2 Adults, 2 Children</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Button className="w-full md:w-auto">
                <Search className="mr-2 h-4 w-4" /> Search Hotels
              </Button>
            </TabsContent>
            <TabsContent value="packages" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="package-from">From</Label>
                  <div className="relative">
                    <MapPin className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="package-from"
                      placeholder="Departure city"
                      className="pl-8"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="package-to">To</Label>
                  <div className="relative">
                    <MapPin className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="package-to"
                      placeholder="Destination"
                      className="pl-8"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Departure</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !date && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : "Select date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="package-travelers">Travelers</Label>
                  <Select>
                    <SelectTrigger id="package-travelers">
                      <SelectValue placeholder="Select travelers" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 Adult</SelectItem>
                      <SelectItem value="2">2 Adults</SelectItem>
                      <SelectItem value="3">2 Adults, 1 Child</SelectItem>
                      <SelectItem value="4">2 Adults, 2 Children</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Button className="w-full md:w-auto">
                <Search className="mr-2 h-4 w-4" /> Search Packages
              </Button>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-r z-0">
        <img src="https://vibrant.holiday/media_images/package/images/15608622254.jpg" className="h-[600px] w-full" alt="" />
      </div>
    </section>
  );
}

export default Hero;
