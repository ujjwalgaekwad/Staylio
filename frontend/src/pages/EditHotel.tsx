import ManageHotelForm from "@/components/ManageHotelForm";
import { useAppContext } from "@/contexts/AppContext";
import { fetchHotelById, UpdatHotelById } from "@/utils/api";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

function EditHotel() {
  const { hotelId } = useParams();
  const { showToast } = useAppContext();
  const { data: hotel } = useQuery({
    queryKey: ["fetchHotelById"],
    queryFn: () => fetchHotelById(hotelId || ""),
    enabled: !!hotelId,
  });

  const mutation = useMutation({
    mutationFn: UpdatHotelById,
    onSuccess: () => {
      showToast({ message: "Hotel data updated", type: "Success" });
    },
    onError: (error) => {
      showToast({ message: error.message, type: "Error" });
    },
  });

  const handleSave = (hotelFromData: FormData) => {
    mutation.mutate(hotelFromData);
  }

  return <ManageHotelForm hotel={hotel} onSave={handleSave} isLoading={mutation.isPending} />;
}

export default EditHotel;
