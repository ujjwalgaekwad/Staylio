import { useForm } from "react-hook-form";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { useSearchContext } from "@/contexts/SearchContext";
import { useLocation, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { useAppContext } from "@/contexts/AppContext";
import DatePicker from "react-datepicker";

type Props = {
  pricePerNight?: number;
  hotelId?: string;
};

interface BookInfoFormData {
  checkIn: Date;
  checkOut: Date;
  adultCount: number;
  childCount: number;
}

const BookInfoForm = ({ pricePerNight, hotelId }: Props) => {
  const { isLoggedIn } = useAppContext();
  const navigate = useNavigate();
  const location = useLocation();
  const search = useSearchContext();
  const { register, watch, setValue, handleSubmit } = useForm<BookInfoFormData>(
    {
      defaultValues: {
        checkIn: search.checkIn,
        checkOut: search.checkOut,
        adultCount: search.adultCount,
        childCount: search.childCount,
      },
    }
  );

  const checkIn = watch("checkIn");
  const checkOut = watch("checkOut");

  const handleSignUp = (data: BookInfoFormData) => {
    search.saveSearchValues(
      "",
      data.checkIn,
      data.checkOut,
      data.adultCount,
      data.childCount
    );
    navigate("/login", { state: { from: location } });
  };

  const handleBookFormSubmit = (data: BookInfoFormData) => {
    search.saveSearchValues(
      "",
      data.checkIn,
      data.checkOut,
      data.adultCount,
      data.childCount
    );
    navigate(`/hotel/${hotelId}/booking`, { state: { from: location } });
  };

  return (
    <div className="rounded-2xl shadow-md border p-4 space-y-4 bg-white">
      <h2 className="text-xl font-semibold text-primary">
        ₹{pricePerNight}{" "}
        <span className="text-sm text-muted-foreground">/ night</span>
      </h2>
      <form
        onSubmit={
          isLoggedIn
            ? handleSubmit(handleBookFormSubmit)
            : handleSubmit(handleSignUp)
        }
        className="space-y-4"
      >
        <div className="space-y-1">
          <Label htmlFor="check-in">Check-in</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
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
              <DatePicker
                selected={checkIn}
                onChange={(date) => setValue("checkIn", date as Date)}
                className="w-full"
                calendarClassName="react-datepicker"
              />
            </PopoverContent>
          </Popover>
        </div>
        <div className="space-y-1">
          <Label htmlFor="check-out">Check-out</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
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
              <DatePicker
                selected={checkOut}
                onChange={(date) => setValue("checkOut", date as Date)}
                className="w-full"
                calendarClassName="react-datepicker"
              />
            </PopoverContent>
          </Popover>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <Label htmlFor="adultCount">Adults</Label>
            <Input
              required
              type="number"
              min={1}
              {...register("adultCount", {
                required: "Insert adult",
                min: 1,
                max: 20,
                valueAsNumber: true,
              })}
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="childCount">Children</Label>
            <Input
              type="number"
              min={0}
              {...register("childCount", { valueAsNumber: true })}
            />
          </div>
        </div>
        <div className="pt-2">
          <Button type="submit" className="w-full">
            Book Now
          </Button>
        </div>
      </form>
    </div>
  );
};

export default BookInfoForm;
