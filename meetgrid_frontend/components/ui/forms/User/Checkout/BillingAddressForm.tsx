import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { billingAddressSchema } from "@/lib/utility/schemas";
import { billingAddressFormData } from "@/lib/utility/types";
import { updateBillingAddress } from "@/redux/slices/CheckoutSlice";
import { RootState } from "@/redux/store";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

function BillingAddressForm() {
  const { billingAddress } = useSelector((state: RootState) => state.checkout);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<billingAddressFormData>({
    resolver: zodResolver(billingAddressSchema),
    mode: "all",
    defaultValues: {
      street: billingAddress?.street,
      city: billingAddress?.city,
      country: billingAddress?.country,
      pincode: billingAddress?.pincode,
      state: billingAddress?.state,
    },
  });

  const onSubmit = (data: billingAddressFormData) => {
    dispatch(updateBillingAddress(data));
    toast.success('Billing address updated')
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
      <div className="form-control mb-5">
        <Label>
          Street <span className="text-red-600">*</span>
        </Label>
        <Input {...register("street")} type="text" />
        <small className="text-red-600 transition-all ">
          {errors.street && errors.street.message}
        </small>
      </div>
      <div className="row flex items-start justify-between gap-2 mb-5">
        <div className="form-control w-full">
          <Label>
            City <span className="text-red-600">*</span>
          </Label>
          <Input {...register("city")} type="text" />
          <small className="text-red-600 transition-all ">
            {errors.city && errors.city.message}
          </small>
        </div>
        <div className="form-control w-full">
          <Label>
            State <span className="text-red-600">*</span>
          </Label>
          <Input {...register("state")} type="text" />
          <small className="text-red-600 transition-all ">
            {errors.state && errors.state.message}
          </small>
        </div>
      </div>
      <div className="row flex items-start justify-between gap-2 mb-5">
        <div className="form-control w-full">
          <Label>
            Country <span className="text-red-600">*</span>
          </Label>
          <Input {...register("country")} type="text" />
          <small className="text-red-600 transition-all ">
            {errors.country && errors.country.message}
          </small>
        </div>
        <div className="form-control w-full">
          <Label>
            Pincode <span className="text-red-600">*</span>{" "}
          </Label>
          <Input {...register("pincode")} type="text" />
          <small className="text-red-600 transition-all ">
            {errors.pincode && errors.pincode.message}
          </small>
        </div>
      </div>

      <div className="footer flex items-center justify-end gap-2">
        <Button type="submit">Submit Address</Button>
      </div>
    </form>
  );
}

export default BillingAddressForm;
