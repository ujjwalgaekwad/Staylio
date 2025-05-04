import { HotelFormData } from "@/types/Types";
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
  hotel?: HotelFormData;
};

function ManageHotelForm({ onSave, isLoading, hotel }: Props) {
  const methods = useForm<HotelFormData>();
  const { handleSubmit, reset } = methods;

  useEffect(() => {
    reset(hotel);
  }, [hotel, reset]);

  const onSubmit = handleSubmit((formDataJson: HotelFormData) => {
    const formData = new FormData();
    const data: HotelFormData = {
      name: formDataJson.name,
      city: formDataJson.city,
      country: formDataJson.country,
      description: formDataJson.description,
      type: formDataJson.type,
      adultCount: formDataJson.adultCount,
      childCount: formDataJson.childCount,
      facilities: formDataJson.facilities,
      pricePerNight: formDataJson.pricePerNight,
      starRating: formDataJson.starRating,
      imageFiles: formDataJson.imageFiles,
      _id: hotel?._id || "",
    };

    if (hotel) {
      formData.append("hotelId", hotel._id);
    }

    data.facilities.forEach((facililty, index) => {
      formData.append(`facilities[${index}]`, facililty.toString());
    });

    if(data.imageUrls) {
      data.imageUrls.forEach((url, index) => {
        formData.append(`imageUrls[${index}]`, url)
      })
    }

    Array.from(formDataJson.imageFiles).forEach((imageFile) => {
      formData.append(`imageFiles`, imageFile);
    });

    let key: keyof HotelFormData;
    for (key in data) {
      if (data.hasOwnProperty(key)) {
        formData.append(key, data[key] as string);
      }
    }

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
