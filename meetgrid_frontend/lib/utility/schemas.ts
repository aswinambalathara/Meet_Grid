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

const venueSchema = z.discriminatedUnion("eventType", [
  z.object({
    eventType: z.literal("Online"),
    virtualDetails: OnlineVenueSchema,
  }),
  z.object({
    eventType: z.literal("In-Person"),
    location: OfflineVenueSchema,
  }),
]);

export const EventFormSchema = z
  .object({
    ticket: TicketSchema,
  })
  .merge(EventBasicDetailsBaseSchema)
  .merge(MediaAndOptionsSchema)
  .and(venueSchema);

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

export const AttendeeSchema = z.object({
  fullName: z
    .string()
    .min(1, "Please enter your name")
    .max(50, "Name cannot be more than 50 characters"),
  phone: z
    .string()
    .nonempty("Please enter your phone number")
    .regex(/^\d{10,15}$/, "Invalid Phone Number"),
  email: z.string().email("Please enter valid email address").optional(),
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
  organisation: z
    .string()
    .regex(/^[a-zA-Z0-9&.\- ]$/, "Invalid Input")
    .max(50, "Organisation cannot be more than 50 characters")
    .optional(),
  designation: z
    .string()
    .regex(/^[a-zA-Z.\- ]$/, "Invalid Input")
    .max(50, "Designation cannot be more than 50 characters")
    .optional(),
});


export const billingAddressSchema = z.object({
  street: z
    .string()
    .min(1, "Street is required")
    .max(100, "Street cannot exceed 100 characters"),
  city: z
    .string()
    .min(1, "City is required")
    .max(50, "City cannot exceed 50 characters"),
  state: z
    .string()
    .min(1, "State is required")
    .max(50, "State cannot exceed 50 characters"),
  country: z
    .string()
    .min(1, "Country is required")
    .max(50, "Country cannot exceed 50 characters"),
  pincode: z
    .string()
    .min(6, "Pincode must be 6 digits")
    .max(6, "Pincode must be 6 digits")
    .regex(/^\d+$/, "Pincode must contain only numbers")
    .transform((value) => parseInt(value, 10))
    .refine((value) => value >= 100000 && value <= 999999, {
      message: "Pincode must be a valid 6-digit number",
    }),
});

