import * as z from "zod";
import { EventBasicDetailsBaseSchema } from "../schemas/BasicEventDetailSchema";
import { EventVenueSchema } from "../schemas/EventVenueSchema";
import {
  TicketSchema,
  MediaAndOptionsSchema,
} from "../schemas/TicketAndMediaSchema";

export const eventFormSchema = z
  .object({ticket:TicketSchema})
  .merge(EventBasicDetailsBaseSchema)
  .merge(EventVenueSchema)
  .merge(MediaAndOptionsSchema)
  .superRefine((data, ctx) => {
    if (data.eventType === "Online") {
      // Validate online event fields
      if (!data.virtualPlatform) {
        ctx.addIssue({
          code: "custom",
          path: ["virtualPlatform"],
          message: "Virtual platform is required for online events.",
        });
      }
      if (!data.meetLink) {
        ctx.addIssue({
          code: "custom",
          path: ["meetLink"],
          message: "Meet link is required for online events.",
        });
      }
      if (!data.timeZone) {
        ctx.addIssue({
          code: "custom",
          path: ["timeZone"],
          message: "Time zone is required for online events.",
        });
      }
    } else if (data.eventType === "In-Person") {
      // Validate in-person event fields
      const location = data.location;
      if (!location || !location.venueName) {
        ctx.addIssue({
          code: "custom",
          path: ["location", "venueName"],
          message: "Venue name is required for in-person events.",
        });
      }
      if (!location || !location.streetAddress) {
        ctx.addIssue({
          code: "custom",
          path: ["location", "streetAddress"],
          message: "Street address is required for in-person events.",
        });
      }
      if (!location || !location.city) {
        ctx.addIssue({
          code: "custom",
          path: ["location", "city"],
          message: "City is required for in-person events.",
        });
      }
      if (!location || !location.state) {
        ctx.addIssue({
          code: "custom",
          path: ["location", "state"],
          message: "State is required for in-person events.",
        });
      }
      if (!location || !location.country) {
        ctx.addIssue({
          code: "custom",
          path: ["location", "country"],
          message: "Country is required for in-person events.",
        });
      }
      if (!location || !location.pincode) {
        ctx.addIssue({
          code: "custom",
          path: ["location", "pincode"],
          message: "Pincode is required for in-person events.",
        });
      }
      if (!location || !location?.coordinates) {
        ctx.addIssue({
          code: "custom",
          path: ["location", "coordinates"],
          message: "Coordinates required for in-person events.",
        });
      }

      if (!location || !location?.googleMapLink) {
        ctx.addIssue({
          code: "custom",
          path: ["location", "coordinates"],
          message: "Map required for in-person events.",
        });
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
