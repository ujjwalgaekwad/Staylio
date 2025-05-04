import { useFormContext } from "react-hook-form";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { HotelFormData } from "@/types/Types";

function SelectImages() {
  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext<HotelFormData>();

  const exitingImageUrls = watch("imageUrls");

  const handleDelete = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    imageUrl: string
  ) => {
    e.preventDefault();
    setValue(
      "imageUrls",
      exitingImageUrls?.filter((url) => url !== imageUrl)
    );
  };

  return (
    <div className="mt-6">
      <h2 className="text-2xl font-semibold mb-4">Images</h2>
      <Label className="flex flex-col space-y-2">
        {exitingImageUrls && (
          <div className="grid grid-cols-6 gap-4">
            {Array.from(exitingImageUrls || []).map((url, index) => (
              <div className="relative group" key={index}>
                <img src={url} className="min-h-full object-cover" alt="" />
                <button
                  onClick={(e) => handleDelete(e, url)}
                  className="absolute insert-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 text-white"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
        <Input
          type="file"
          accept="image/*"
          multiple
          {...register("imageFiles", {
            validate: (imageFiles) => {
              const totalLength =
                imageFiles.length + (exitingImageUrls?.length || 0);
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
