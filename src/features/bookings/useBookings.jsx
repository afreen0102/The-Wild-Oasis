import { useSearchParams } from "react-router-dom";
import { getBookings } from "../../services/apiBookings";
import { useQuery } from "@tanstack/react-query";

export default function useBookings() {

    const [searchParams] = useSearchParams();


    const filterValue = searchParams.get('status');
    const filter = !filterValue || filterValue === 'all' ? null : { field: 'totalPrice', value : 5000, method: 'gte'}
    const { data: bookings, isLoading } = useQuery({
        queryKey: ["bookings", filter],
        queryFn : () => getBookings({filter})
      });

    return { bookings, isLoading };  

}