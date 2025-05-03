import ManageHotelForm from "@/components/ManageHotelForm";
import { fetchHotelById } from "@/utils/api";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom"

function EditHotel() {
    const {hotelId} = useParams();
    const {data: hotel} = useQuery({
        queryKey: ["fetchHotelById"],
        queryFn: () => fetchHotelById(hotelId || ""),
        enabled: !!hotelId
    })

  return <ManageHotelForm hotel={hotel}/>
}

export default EditHotel
