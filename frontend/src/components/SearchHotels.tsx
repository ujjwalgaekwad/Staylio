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
import { FormEvent, useState } from "react";
import { format } from "date-fns";
import { useSearchContext } from "@/contexts/SearchContext";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "@/contexts/AppContext";
import DatePicker from "react-datepicker";

const SearchHotels: React.FC = () => {
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

    if (!isLoggedIn) {
      navigate("/register");
    } else {
      navigate("/search");
    }
  };

  const handleClear = () => {
    setDestination("");
    setCheckIn(new Date());
    setCheckOut(new Date());
    setChildCount(0);
    setAdultCount(1);
  };

  return (
    <form
      onSubmit={handleSubmit}
      onReset={handleClear}
      className="w-full bg-background rounded-xl border p-4 md:p-8 mt-8 flex-1"
      aria-label="Hotel search form"
    >
      <Tabs defaultValue="hotels">
        <TabsContent value="hotels" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <InputGroup
              label="Destination"
              icon={<MapPin className="mr-2 h-4 w-4" />}
              inputProps={{
                id: "destination",
                placeholder: "Where are you going?",
                value: destination,
                onChange: (e) => setDestination(e.target.value),
                required: true,
              }}
            />

            <InputGroup
              label="Children"
              icon={<BabyIcon className="mr-2 h-4 w-4" />}
              inputProps={{
                id: "children",
                type: "number",
                placeholder: "0",
                value: childCount,
                min: 0,
                max: 20,
                required: true,
                onChange: (e) =>
                  setChildCount(parseInt(e.target.value, 10) || 0),
              }}
            />
            <InputGroup
              label="Adults"
              icon={<PersonStanding className="mr-2 h-4 w-4" />}
              inputProps={{
                id: "adults",
                type: "number",
                placeholder: "0",
                value: adultCount,
                min: 1,
                max: 20,
                required: true,
                onChange: (e) => setAdultCount(parseInt(e.target.value, 10)),
              }}
            />
            <DateInput
              label="Check-in"
              selectedDate={checkIn}
              onChange={(date) => setCheckIn(date as Date)}
            />
            <DateInput
              label="Check-out"
              selectedDate={checkOut}
              onChange={(date) => setCheckOut(date as Date)}
            />
            <Button type="submit" aria-label="Search hotels">
              <Search className="h-4 w-4 mr-2" />
              Search Hotels
            </Button>
            <Button
              variant="delete"
              type="reset"
              aria-label="Clear search fields"
            >
              <Delete className="h-4 w-4 mr-2" />
              Clear All
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </form>
  );
};

export default SearchHotels;

interface InputGroupProps {
  label: string;
  icon: React.ReactNode;
  inputProps: React.InputHTMLAttributes<HTMLInputElement>;
}

const InputGroup: React.FC<InputGroupProps> = ({ label, icon, inputProps }) => (
  <div className="space-y-2">
    <Label htmlFor={inputProps.id}>{label}</Label>
    <div className="relative">
      <span className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground">
        {icon}
      </span>
      <Input className="pl-8" {...inputProps} />
    </div>
  </div>
);

interface DateInputProps {
  label: string;
  selectedDate: Date;
  onChange: (date: Date) => void;
}

const DateInput: React.FC<DateInputProps> = ({ label, selectedDate }) => (
  <div className="space-y-2">
    <Label>{label}</Label>
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full justify-start text-left font-normal",
            !selectedDate && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {selectedDate ? format(selectedDate, "PPP") : "Select date"}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <DatePicker selected={selectedDate} inline />
      </PopoverContent>
    </Popover>
  </div>
);
