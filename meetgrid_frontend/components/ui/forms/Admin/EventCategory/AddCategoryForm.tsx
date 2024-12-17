"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { createEventCategory } from "@/lib/api/admin/EventCategoryRoutes";
import toast, { Toaster } from "react-hot-toast";

const schema = z.object({
  categoryName: z.string().trim().nonempty("This field is required"),
  categoryType: z.enum(["Professional", "General"], {
    required_error: "This field is required",
    invalid_type_error: "Invalid category type",
  }),
  description: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

function AddCategoryForm({
  refresh,
  closeAccordion
}: {
  refresh: React.Dispatch<React.SetStateAction<boolean>>;
  closeAccordion:()=>void
}) {
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onBlur",
    reValidateMode: "onSubmit",
  });

  const handleOnSubmit = async (data: FormData) => {
    try {
      const result = await createEventCategory(data);
      if (result?.status) toast.success(result.message);
      refresh((prev) => !prev);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    } finally {
      reset();
      closeAccordion()
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit(handleOnSubmit)}>
        <div className="form-control flex flex-col gap-2 mb-5">
          <Label htmlFor="categoryName" className="text-sm">
            Category Name <span className="text-red-500">*</span>
          </Label>
          <Input
            type="text"
            {...register("categoryName")}
            placeholder="Enter category name"
            id="categoryName"
          />
          {errors.categoryName && (
            <p className="text-sm text-red-500">
              {errors.categoryName.message}
            </p>
          )}
        </div>
        <div className="form-control flex flex-col gap-2 mb-5">
          <Label htmlFor="categoryType" className="text-sm">
            Category Type <span className="text-red-500">*</span>
          </Label>
          <select
            id="categoryType"
            defaultValue={""}
            {...register("categoryType")}
            className="border rounded-sm p-2 shadow-sm"
          >
            <option value="" disabled>
              Select category type
            </option>
            <option value="Professional">Professional</option>
            <option value="General">General</option>
          </select>
          {errors.categoryType && (
            <p className="text-sm text-red-500">
              {errors.categoryType.message}
            </p>
          )}
        </div>
        <div className="form-control flex flex-col gap-2 mb-5">
          <Label htmlFor="categoryDescription" className="text-sm">
            Category Description
          </Label>
          <Input
            type="text"
            placeholder="Enter category description"
            id="categoryDescription"
            {...register("description")}
          />
          {errors.description && (
            <p className="text-sm text-red-500">{errors.description.message}</p>
          )}
        </div>

        <Button type="submit">Add New Category</Button>
      </form>
    </>
  );
}

export default AddCategoryForm;
