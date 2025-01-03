import * as z from "zod";

export const EventBasicDetailsBaseSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .regex(
      /^[a-zA-Z0-9 .,!?\-]{1,100}/,
      "Title can only contain letters, numbers, spaces, and .,!?-. (1-100 characters)."
    ).transform((val)=>val.trim().toLowerCase()),
  description: z
    .string()
    .min(1, "Description is required")
    .regex(
      /^[a-zA-Z0-9 .,!?\-:@#()\n]{1,1000}$/,
      "Description can only contain letters, numbers, spaces, and .,!?-:@#() with up to 1000 characters."
    ),
  category: z.string().min(1, "Category is required"),
  startDate: z
    .string()
    .nonempty("This field is required")
    .refine((date) => !isNaN(Date.parse(date)), {
      message: "Invalid date",
    })
    .transform((date) => new Date(date)),
  endDate: z
    .string()
    .nonempty("This field is required")
    .refine((date) => !isNaN(Date.parse(date)), {
      message: "Invalid date",
    })
    .transform((date) => new Date(date)),
})




