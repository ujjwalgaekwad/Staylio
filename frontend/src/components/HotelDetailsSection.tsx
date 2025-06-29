import { useFormContext } from "react-hook-form";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { HotelFormData } from "@/types/Types";
import { Textarea } from "./ui/textarea";

function HotelDetailsSection() {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();

  return (
    <div className="flex flex-col">
        <h1 className="text-2xl font-bold mb-5 text-gray-800">Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
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
          <div className="flex flex-col">
            <Label>
              Star Rating
              <select
                className="w-[180px] p-2 rounded-md"
                {...register("starRating", {
                  required: "This field is required.",
                })}
              >
                <option>Star</option>
                {[1, 2, 3, 4, 5].map((star) => (
                  <option key={star} value={star}>
                    {star}
                  </option>
                ))}
              </select>
            </Label>
            {errors.starRating?.type === "required" && (
              <span className="text-sm text-red-400">
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
        </div>
      </div>
  );
}

export default HotelDetailsSection;
