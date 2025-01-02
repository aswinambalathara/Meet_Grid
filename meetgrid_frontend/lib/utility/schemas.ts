import * as z from "zod";
import { EventBasicDetailsBaseSchema } from "../schemas/BasicEventDetailSchema";
import {
  OfflineVenueSchema,
  OnlineVenueSchema,
} from "../schemas/EventVenueSchema";
import {
  TicketSchema,
  MediaAndOptionsSchema,
} from "../schemas/TicketAndMediaSchema";

export const eventFormSchema = z
  .object({ ticket: TicketSchema })
  .merge(EventBasicDetailsBaseSchema)
  .merge(MediaAndOptionsSchema)
  .extend({
    virtualDetails: OnlineVenueSchema.optional(),
    location: OfflineVenueSchema.optional(),
  }).superRefine((data, ctx) => {
    console.log('hi')
    if (data.eventType === "Online") {
      const result = OnlineVenueSchema.safeParse(data.virtualDetails);
      if (!result.success) {
        for (const issue of result.error.errors) {
          ctx.addIssue(issue);
        }
      }
    } else if (data.eventType === "In-Person") {
      const result = OfflineVenueSchema.safeParse(data.location);
      if (!result.success) {
        for (const issue of result.error.errors) {
          ctx.addIssue(issue);
        }
      }
    }
  });


export const professionalDetailsSchema = z.object({
  companyName: z
    .string()
    .nonempty("This field is required")
    .regex(/^[a-zA-Z\s]+$/, "Only text allowed")
    .max(50, "Company Name cannot exceed 50 characters"),
  jobTitle: z
    .string()
    .nonempty("This field is required")
    .regex(/^[a-zA-Z\s]+$/, "Only text allowed")
    .max(50, "Job Title cannot exceed 50 characters"),
  linkedinUrl: z
    .string()
    .optional()
    .refine(
      (val) =>
        !val ||
        /^(https?:\/\/)?(www\.)?linkedin\.com\/(in|company)\/[a-zA-Z0-9-_%]+\/?$/.test(
          val
        ),
      {
        message: "Invalid URL",
      }
    ),
  experience: z.preprocess(
    (value) =>
      typeof value === "string" && value.trim() !== ""
        ? Number(value)
        : undefined,
    z
      .number()
      .int("Experience must be a whole number")
      .min(0, "Experience must be at least 0")
      .max(50, "Tha's not possible")
  ),
  skills: z.array(z.string()).optional(),
});

const locationSchema = z.object({
  addressLine: z
    .string()
    .nonempty("This field is required")
    .max(100, "Address cannot be longer than 100 characters"),
  city: z.string().nonempty("This field is required"),
  state: z.string().nonempty("This field is required"),
  country: z.string().nonempty("This field is required"),
  postalCode: z
    .string()
    .regex(/^\d{6}$/, "Postal code must be a 6-digit number"),
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
  bio: z.string().max(500, "Bio cannot excedd 500 characters").optional(),
  phoneCode: z.string().nonempty("Phone code required"),
  phone: z
    .string()
    .nonempty("This field is required")
    .regex(/^\d{10,15}$/, "Invalid Phone Number"),
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

export const changePasswordSchema = z
  .object({
    currentPassword: z.string().optional(),
    newPassword: z
      .string()
      .nonempty("Password is required")
      .min(6, "Password must be at least 6 characters long.")
      .refine((password) => /[A-Z]/.test(password), {
        message: "Password must contain at least one uppercase letter.",
      })
      .refine((password) => /\d/.test(password), {
        message: "Password must contain at least one number.",
      })
      .refine((password) => /[@$!%*?&]/.test(password), {
        message:
          "Password must contain at least one special character (e.g., @$!%*?&).",
      }),
    confirmPassword: z.string().nonempty("This field is required"),
  })
  .refine(
    (data) =>
      !data.currentPassword || data.currentPassword !== data.newPassword,
    {
      message: "New Password cannot be current password",
      path: ["newPassword"],
    }
  )
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords does not matching",
    path: ["confirmPassword"],
  });
