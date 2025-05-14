import { useForm } from "react-hook-form";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import {
  BookingFormData,
  PaymentIntentResponse,
  UserType,
} from "@/types/Types";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { StripeCardElement } from "@stripe/stripe-js";
import { useSearchContext } from "@/contexts/SearchContext";
import { useParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useAppContext } from "@/contexts/AppContext";

type Props = {
  currentUser: UserType;
  paymentIntent: PaymentIntentResponse;
};

const BookingForm = ({ currentUser, paymentIntent }: Props) => {
  const { showToast } = useAppContext();
  const search = useSearchContext();
  const stripe = useStripe();
  const elements = useElements();
  const { hotelId } = useParams();
  const {
    register,
    formState: { errors },
  } = useForm<BookingFormData>({
    defaultValues: {
      firstName: currentUser.firstName,
      lastName: currentUser.lastName,
      email: currentUser.email,
      adultCount: search.adultCount,
      childCount: search.childCount,
      checkIn: search.checkIn.toISOString(),
      checkOut: search.checkOut.toISOString(),
      hotelId: hotelId,
      totalCost: paymentIntent.totalCost,
    },
  });

  const { mutate: bookRoom } = useMutation({
    onSuccess: () => {
      showToast({ message: "Room booked!", type: "Success" });
    },
    onError: () => {
      showToast({ message: "Not save room book data", type: "Error" });
    },
  });

  const onSubmit = async (formData: BookingFormData) => {
    if (!stripe || !elements) return;

    const result = await stripe?.confirmCardPayment(
      paymentIntent.clientSecret,
      {
        payment_method: {
          card: elements?.getElement(CardElement) as StripeCardElement,
        },
      }
    );

    if (result.paymentIntent?.status === "succeeded") {
      // bookRoom()
    }
  };

  return (
    <Card className="border">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Confirm Details</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">First Name</Label>
          <Input readOnly disabled {...register("firstName")} />
          {errors.firstName && (
            <span className="text-sm text-red-500">
              {errors.firstName.message}
            </span>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">Last Name</Label>
          <Input
            readOnly
            disabled
            {...register("lastName", { required: "Enter your last name" })}
          />
          {errors.lastName && (
            <span className="text-sm text-red-500">
              {errors.lastName.message}
            </span>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input readOnly disabled type="email" {...register("email")} />
        </div>
        <div className="space-y-2">
          <h1 className="font-semibold text-sm">Payment Summary:</h1>
          <div className="bg-blue-200 p-4 rounded-md">
            <span className="font-semibold">
              ₹ {paymentIntent.totalCost.toFixed(2)}
            </span>
            <span> To included all taxes</span>
          </div>
        </div>
        <div className="space-y-2">
          <CardElement id="payment-intent" className="text-sm rounded-md p-2" />
        </div>
      </CardContent>
    </Card>
  );
};

export default BookingForm;
