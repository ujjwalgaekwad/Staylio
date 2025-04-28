import { HotelFormData } from "@/types/Types";
import { FormProvider, useForm } from "react-hook-form";
import HotelDetailsSection from "./HotelDetailsSection";
import TypesOfHotelSection from "./TypesOfHotelSection";
import { Button } from "./ui/button";
import HotelFacilities from "./HotelFacilities";
import GuestSection from "./GuestSection";
import SelectImages from "./SelectImages";

function ManageHotelForm() {
  const methods = useForm<HotelFormData>();
  return (
    <FormProvider {...methods}>
      <form>
        <HotelDetailsSection />
        <TypesOfHotelSection />
        <HotelFacilities />
        <GuestSection />
        <SelectImages />
        <div className="mt-4">
          <Button type="submit" className="w-full cursor-pointer">
            Save
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}

export default ManageHotelForm;
