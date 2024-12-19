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
import { adminCategorySchema } from "@/lib/utility/schemas";

export type FormData = z.infer<typeof adminCategorySchema>;

export type AdminCategoryFormProps = {
  onSubmit: (data: FormData) => Promise<string>;
  initialValues?: Partial<FormData>;
  buttonText?: string;
};

function CategoryForm({
  onSubmit,
  initialValues = {},
  buttonText = "Submit",
}: AdminCategoryFormProps) {
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(adminCategorySchema),
    defaultValues: initialValues,
    mode: "onBlur",
    reValidateMode: "onSubmit",
  });

  const handleOnSubmit = async (data: FormData) => {
    try {
      const result = await onSubmit(data);
      toast.success(result)
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message)
      }
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
            defaultValue=""
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

        <Button type="submit">{buttonText}</Button>
      </form>
    </>
  );
}

export default CategoryForm;
