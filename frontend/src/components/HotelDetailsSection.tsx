import { useFormContext } from "react-hook-form";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { HotelFormData } from "@/types/Types";
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function HotelDetailsSection() {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();

  return (
    <div className="flex flex-col mt-4">
      <div className="w-full ">
        <h1 className="text-3xl font-bold mb-10 text-gray-800">Add Hotel</h1>

        <form className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          <div className="flex flex-col space-y-2">
            <Label htmlFor="name">Hotel Name</Label>
            <Input
              id="name"
              placeholder="Enter hotel name"
              {...register("name", { required: "Name is required." })}
            />
            {errors.name && (
              <span className="text-red-500 text-sm">
                {errors.name.message}
              </span>
            )}
          </div>
          <div className="flex flex-col space-y-2">
            <Label htmlFor="city">City</Label>
            <Input
              id="city"
              placeholder="Enter city"
              {...register("city", { required: "City is required." })}
            />
            {errors.city && (
              <span className="text-red-500 text-sm">
                {errors.city.message}
              </span>
            )}
          </div>
          <div className="flex flex-col space-y-2">
            <Label htmlFor="country">Country</Label>
            <Input
              id="country"
              placeholder="Enter country"
              {...register("country", { required: "Country is required." })}
            />
            {errors.country && (
              <span className="text-red-500 text-sm">
                {errors.country.message}
              </span>
            )}
          </div>
          <div className="flex flex-col space-y-2">
            <Label htmlFor="pricePerNight">Price Per Night ($)</Label>
            <Input
              type="number"
              min={1}
              id="pricePerNight"
              placeholder="Enter price"
              {...register("pricePerNight", { required: "Price is required." })}
            />
            {errors.pricePerNight && (
              <span className="text-red-500 text-sm">
                {errors.pricePerNight.message}
              </span>
            )}
          </div>
          <div className="flex flex-col space-y-2">
            <Label htmlFor="starRating">Star Rating</Label>
            <Select
              {...register("starRating", { required: "Rating is required." })}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select rating" />
              </SelectTrigger>
              <SelectContent>
                {[1, 2, 3, 4, 5].map((star) => (
                  <SelectItem key={star} value={star.toString()}>
                    {star}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.starRating && (
              <span className="text-red-500 text-sm">
                {errors.starRating.message}
              </span>
            )}
          </div>
          <div className="flex flex-col md:col-span-2 space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Describe the hotel..."
              {...register("description", {
                required: "Description is required.",
              })}
              rows={5}
            />
            {errors.description && (
              <span className="text-red-500 text-sm">
                {errors.description.message}
              </span>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default HotelDetailsSection;
