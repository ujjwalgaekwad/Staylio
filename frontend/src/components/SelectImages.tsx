import { useFormContext } from "react-hook-form";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { HotelFormData } from "@/types/Types";

function SelectImages() {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();

  return (
    <div className="mt-6">
      <h2 className="text-2xl font-semibold mb-4">Images</h2>
      <Label className="flex flex-col space-y-2">
        <Input
          type="file"
          accept="image/*"
          multiple
          {...register("imageFiles", {
            validate: (imageFiles) => {
              const totalLength = imageFiles.length;
              if (totalLength === 0) return "At least one image is required.";
              if (totalLength > 6) return "Cannot upload more than 6 images.";
              return true;
            },
          })}
        />
        {errors.imageFiles && (
          <span className="text-red-500 text-sm">
            {errors.imageFiles.message}
          </span>
        )}
      </Label>
    </div>
  );
}

export default SelectImages;
