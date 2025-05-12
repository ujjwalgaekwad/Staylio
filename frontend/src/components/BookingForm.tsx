import { useForm } from "react-hook-form"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card"
import { UserType } from "@/types/Types"

type Props = {
  currentUser: UserType
}

interface BookingFormData {
  firstName: string
  lastName: string
  email: string
}

const BookingForm = ({ currentUser }: Props) => {
  const {
    register,
    formState: { errors },
  } = useForm<BookingFormData>({
    defaultValues: {
      firstName: currentUser.firstName,
      lastName: currentUser.lastName,
      email: currentUser.email,
    },
  })

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
          <Input
            readOnly
            disabled
            type="email"
            {...register("email")}
          />
        </div>
      </CardContent>
    </Card>
  )
}

export default BookingForm
