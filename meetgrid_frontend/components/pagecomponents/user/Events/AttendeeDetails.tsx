import AttendeeForm from "@/components/ui/forms/User/Checkout/AttendeeForm";
import { AttendeeFormData } from "@/lib/utility/types";
import { updateAttendees } from "@/redux/slices/CheckoutSlice";
import { RootState } from "@/redux/store";
import React from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

function AttendeeDetails() {
  const { quantity } = useSelector((state: RootState) => state.checkout);
  const dispatch = useDispatch();
  const forms = Array.from({ length: quantity }, (_, index) => index);

  const handleSubmit = (index: number, data: AttendeeFormData) => {
    dispatch(updateAttendees({ index: index, data: data }));
    toast.success(`Attendee ${index+1} data updated`)
  };

  return (
    <div className="w-full h-full">
      {forms.map((_, index) => (
        <AttendeeForm
          key={index}
          attendeeIndex={index}
          quantity={quantity}
          onSubmit={handleSubmit}
        />
      ))}
    </div>
  );
}

export default AttendeeDetails;
