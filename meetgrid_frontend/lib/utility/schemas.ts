import * as z from "zod";

export const eventFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  category: z.string().min(1, "Category is required"),
  subCategory: z.string().min(1, "Sub-category is required"),
  date: z.object({
    startDate: z
      .string()
      .refine((val) => !isNaN(new Date(val).getTime()), {
        message: "Start date must be a valid date",
      })
      .transform((val) => new Date(val)),
    endDate: z
      .string()
      .refine((val) => !isNaN(new Date(val).getTime()), {
        message: "End date must be a valid date",
      })
      .transform((val) => new Date(val))
      .refine(
        function (this: { parent: { startDate: Date } }, endDate) {
          const startDate = this.parent.startDate;
          return endDate >= startDate;
        },
        {
          message: "End date must be after the start date",
        }
      ),
  }),
  eventTime: z.object({
    startTime: z
      .string()
      .regex(/^\d{2}:\d{2}$/, "Start time must be in HH:mm format"),
    endTime: z
      .string()
      .regex(/^\d{2}:\d{2}$/, "End time must be in HH:mm format"),
  }),
  eventType: z.enum(["Online", "In-Person"], {
    required_error: "Event type is required",
  }),
  meetLink: z.string().url("Meet link must be a valid URL").optional(),
  timeZone: z.string().optional(),
  location: z
    .object({
      address: z.string().min(1, "Address is required"),
      city: z.string().min(1, "City is required"),
      state: z.string().min(1, "State is required"),
      country: z.string().min(1, "Country is required"),
      pincode: z.string().regex(/^\d{5,6}$/, "Pincode must be 5 or 6 digits"),
      coordinates: z.object({
        type: z.literal("Point"),
        coordinates: z.tuple([
          z
            .number()
            .min(-180)
            .max(180, "Longitude must be between -180 and 180"),
          z.number().min(-90).max(90, "Latitude must be between -90 and 90"),
        ]),
      }),
    })
    .optional(),
  eventLogo: z.string().url("Event logo must be a valid URL"),
  eventBanner: z.string().url("Event banner must be a valid URL"),
  tickets: z.object({
    ticketType: z.enum(["Free", "Paid"], {
      required_error: "Ticket type is required",
    }),
    price: z.number().min(0, "Price must be a positive number"),
    currency: z.string().min(1, "Currency is required"),
    available: z
      .number()
      .int()
      .min(0, "Available tickets must be a non-negative integer"),
  }),
});

const locationSchema = z.object({
  addressLine: z
    .string()
    .max(10, "Address cannot be longer than 100 characters"),
  city: z.string().max(50, "City cannot be longer than 50 characters"),
  state: z.string().max(50, "State cannot be longer than 50 characters"),
  country: z.string().max(50, "Country cannot be longer than 50 characters"),
  postalCode: z
    .string()
    .regex(/^\d{5}$/, "Postal code must be a 5-digit number"),
});

export const basicDetailsSchema = z.object({
  fullName: z
    .string()
    .nonempty("Full name is required")
    .max(100, "Full name cannot exceed 100 characters"),
  email: z
    .string()
    .nonempty("Email is required")
    .email("Invalid email address"),
  bio: z.string().max(500, "Bio cannot excedd 500 characters"),
  phoneCode: z
    .string()
    .regex(/^\+?[0-9]{1,3}$/, "Invalid phone code format")
    .min(1, "Phone code cannot be empty")
    .max(4, "Phone code must be at most 4 characters"),
  phone: z.string().regex(/^\d{10,15}$/, "Invalid Phone Number"),
  location: locationSchema.optional(),
});

export const adminCategorySchema = z.object({
  _id: z.string().optional(),
  categoryName: z.string().trim().nonempty("This field is required"),
  categoryType: z.preprocess(
    (value) => (value === "" ? undefined : value),
    z.enum(["Professional", "General"], {
      required_error: "This field is required",
    })
  ),
  description: z.string().optional(),
});
