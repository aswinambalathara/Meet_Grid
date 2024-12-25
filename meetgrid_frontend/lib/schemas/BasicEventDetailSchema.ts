import * as z from "zod";

export const EventBasicDetailsBaseSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .regex(
      /^[a-zA-Z0-9 .,!?\-]{1,100}/,
      "Title can only contain letters, numbers, spaces, and .,!?-. (1–100 characters)."
    ),
  description: z.string().min(1, "Description is required").regex(
    /^[a-zA-Z0-9 .,!?\-:@#()\n]{1,1000}$/,
    "Description can only contain letters, numbers, spaces, and .,!?-:@#() with up to 1000 characters."
  ),
  category: z.string().min(1, "Category is required"),
  eventType: z.enum(["Online", "In-Person"], {
    message: "Event type is required and must be either 'Offline' or 'Online'",
  }),
  startDate: z
    .string()
    .nonempty("This field is required")
    .refine((date) => !isNaN(Date.parse(date)), {
      message: "Invalid date",
    }),
  endDate: z
    .string()
    .nonempty("This field is required")
    .refine((date) => !isNaN(Date.parse(date)), {
      message: "Invalid date",
    }),
});

export const EventBasicDetailsSchema = EventBasicDetailsBaseSchema.superRefine(
  ({ startDate, endDate}, ctx) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (end < start) {
      ctx.addIssue({
        code: "invalid_date",
        path: ["endDate"],
        message: "End date must be greater than start date",
      });
    }
  }
);
