import { HotelFormData, HotelType } from "@/types/Types";
import { FormProvider, useForm } from "react-hook-form";
import HotelDetailsSection from "./HotelDetailsSection";
import TypesOfHotelSection from "./TypesOfHotelSection";
import { Button } from "./ui/button";
import HotelFacilities from "./HotelFacilities";
import GuestSection from "./GuestSection";
import SelectImages from "./SelectImages";
import { useEffect } from "react";

type Props = {
  onSave: (hotelFormData: FormData) => void;
  isLoading: boolean;
  hotel?: HotelType;
};

function ManageHotelForm({ onSave, isLoading, hotel }: Props) {
  const methods = useForm<HotelFormData>();
  const { handleSubmit, reset } = methods;

  useEffect(() => {
    reset(hotel);
  }, [hotel, reset]);

  const onSubmit = handleSubmit((formDataJson: HotelFormData) => {
    const formData = new FormData();
    if (hotel) {
      formData.append("hotelId", hotel._id);
    }
    formData.append("name", formDataJson.name);
    formData.append("city", formDataJson.city);
    formData.append("country", formDataJson.country);
    formData.append("description", formDataJson.description);
    formData.append("type", formDataJson.type);
    formData.append("pricePerNight", formDataJson.pricePerNight.toString());
    formData.append("starRating", formDataJson.starRating.toString());
    formData.append("adultCount", formDataJson.adultCount.toString());
    formData.append("childCount", formDataJson.childCount.toString());

    formDataJson.facilities.forEach((facility, index) => {
      formData.append(`facilities[${index}]`, facility);
    });

    if (formDataJson.imageUrls) {
      formDataJson.imageUrls.forEach((url, index) => {
        formData.append(`imageUrls[${index}]`, url);
      });
    }

    Array.from(formDataJson.imageFiles).forEach((imageFile) => {
      formData.append(`imageFiles`, imageFile);
    });

    onSave(formData);
  });

  return (
    <FormProvider {...methods}>
      <form onSubmit={onSubmit}>
        <HotelDetailsSection />
        <TypesOfHotelSection />
        <HotelFacilities />
        <GuestSection />
        <SelectImages />
        <div className="mt-4">
          <Button
            disabled={isLoading}
            type="submit"
            className="w-full cursor-pointer disabled:cursor-progress"
          >
            {isLoading ? "Saving..." : "Save"}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}

export default ManageHotelForm;
