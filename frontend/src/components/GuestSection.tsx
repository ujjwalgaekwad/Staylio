import { useFormContext } from "react-hook-form";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { HotelFormData } from "@/types/Types";

function GuestSection() {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();

  return (
    <div className="mt-6">
      <h2 className="text-2xl font-semibold mb-4">Guests</h2>
      <div className="grid grid-cols-2 gap-5">
        <Label>
          Adults
          <Input
            type="number"
            placeholder="Adult Count"
            min={0}
            {...register("adultCount", { required: "Adult count is required." })}
          />
          {errors.adultCount && (
            <span className="text-red-500 text-sm">{errors.adultCount.message}</span>
          )}
        </Label>
        <Label>
          Children
          <Input
            type="number"
            placeholder="Children Count"
            min={0}
            {...register("childCount", { required: "Children count is required." })}
          />
          {errors.childCount && (
            <span className="text-red-500 text-sm">{errors.childCount.message}</span>
          )}
        </Label>
      </div>
    </div>
  );
}

export default GuestSection;
