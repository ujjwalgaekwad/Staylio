import { hotelFacilities } from "@/config/hotelOptions";
import { useFormContext } from "react-hook-form";
import { HotelFormData } from "@/types/Types";

function HotelFacilities() {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();

  return (
    <div className="mt-6">
      <h2 className="text-2xl font-semibold mb-4">Facilities</h2>
      <div className="grid grid-cols-3 gap-3">
        {hotelFacilities.map((facility) => (
          <label key={facility} className="flex items-center gap-2 text-gray-800">
            <input
              type="checkbox"
              value={facility}
              {...register("facilities", {
                required: "Please select at least one facility.",
              })}
            />
            {facility}
          </label>
        ))}
      </div>
      {errors.facilities && (
        <span className="text-red-500 text-sm">{errors.facilities.message}</span>
      )}
    </div>
  );
}

export default HotelFacilities;
