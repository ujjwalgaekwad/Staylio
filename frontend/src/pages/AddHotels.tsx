import ManageHotelForm from "@/components/ManageHotelForm";
import { useAppContext } from "@/contexts/AppContext";
import { addHotelData } from "@/utils/api";
import { useMutation } from "@tanstack/react-query";

const AddHotels = () => {
  const { showToast } = useAppContext();
  const { mutate, isPending } = useMutation({
    mutationFn: addHotelData,
    onSuccess: async () => {
      showToast({ message: "Hotel data added", type: "Success" });
    },
    onError: async (error) => {
      showToast({ message: error.message, type: "Error" });
    },
  });

  const onSave = (hotelFromData: FormData): void => {
    mutate(hotelFromData);
  };

  return (
      <ManageHotelForm onSave={onSave} isLoading={isPending} />
  );
};

export default AddHotels;
