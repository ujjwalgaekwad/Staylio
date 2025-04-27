import { HotelFormData } from "@/types/Types";
import { FormProvider, useForm } from "react-hook-form";
import HotelDetailsSection from "./HotelDetailsSection";

function ManageHotelForm() {
  const methods = useForm<HotelFormData>();
  return (
    <FormProvider {...methods}>
      <form>
        <HotelDetailsSection />
      </form>
    </FormProvider>
  );
}

export default ManageHotelForm;
