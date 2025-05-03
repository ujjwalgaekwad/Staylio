import { useFormContext } from "react-hook-form";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { HotelFormData } from "@/types/Types";

function SelectImages() {
  const {
    register,
    formState: { errors },
    watch,
  } = useFormContext<HotelFormData>();

  const exitsImages = watch("imageUrls");

  return (
    <div className="mt-6">
      <h2 className="text-2xl font-semibold mb-4">Images</h2>
      <div>
        {/* <img src="http://res.cloudinary.com/dfde0xaw3/image/upload/v1746044461/lzmckpwlscn8tyvlu4ls.avif" alt="" className="h-15 w-20" /> */}
          <div className="">
            {exitsImages?.map((url) => (
              <div className="relative group">
                <img
                  src={url}
                  alt=""
                  className="min-h-full object-cover h-14 w-16"
                />
                <button className="flex justify-center items-center absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100">
                  Delete
                </button>
              </div>
            ))}
          </div>
      </div>
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
