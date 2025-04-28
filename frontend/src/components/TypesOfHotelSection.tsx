import { typesOfHotels } from "@/config/hotelOptions";
import { useFormContext } from "react-hook-form";
import { Label } from "./ui/label";
import { HotelFormData } from "@/types/Types";

function TypesOfHotelSection() {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext<HotelFormData>();
  const typeWatch = watch("type");

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Type of Hotel</h2>
      <div className="grid grid-cols-3 gap-3">
        {typesOfHotels.map((type) => (
          <Label
            key={type}
            className={`cursor-pointer px-4 py-2 text-sm font-semibold rounded-full ${
              typeWatch === type ? "bg-blue-400 text-white" : "bg-gray-200"
            }`}
          >
            <input
              type="radio"
              value={type}
              {...register("type", { required: "Type is required." })}
              className="hidden"
            />
            {type}
          </Label>
        ))}
      </div>
      {errors.type && (
        <span className="text-red-500 text-sm">{errors.type.message}</span>
      )}
    </div>
  );
}

export default TypesOfHotelSection;
