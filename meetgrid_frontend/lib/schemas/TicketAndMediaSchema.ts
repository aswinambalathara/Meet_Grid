import { Currency } from "lucide-react";
import * as z from "zod";
import { ALLOWED_FILE_TYPES, MAX_FILE_SIZE } from "../constants";

export const TicketSchema = z.object({
  ticketType: z
    .union([z.enum(["Free", "Paid"]), z.literal("")])
    .refine((val) => val !== "", {
      message: "Please select a ticket type",
    }),
  price: z
    .string()
    .nonempty("Price is required")
    .transform((val) => Number(val)) // Convert the string to a number
    .refine((val) => !isNaN(val) && val >= 0, {
      message: "Price must be a positive number",
    }),
  currency: z.string().nonempty("Currency is required"),
  availableTickets: z
    .string()
    .nonempty("This field is required")
    .transform((val) => Number(val)) // Convert the string to a number
    .refine((val) => Number.isInteger(val) && val >= 0, {
      message: "Available tickets must be a positive integer",
    }),
  registrationDeadline: z
    .string()
    .nonempty("This field is required")
    .refine((date) => !isNaN(Date.parse(date)), {
      message: "Invalid date",
    }),
});

export const MediaAndOptionsSchema = z.object({
  bannerImage: z
    .instanceof(File)
    .refine((file) => ALLOWED_FILE_TYPES.includes(file.type), {
      message: "Only JPEG and PNG files are allowed",
    })
    .refine((file) => file.size <= MAX_FILE_SIZE, { 
      message: "File size should be less than 5MB",
    }),

  logoImage: z
    .instanceof(File)
    .refine((file) => ALLOWED_FILE_TYPES.includes(file.type), {
      message: "Only JPEG and PNG files are allowed",
    })
    .refine((file) => file.size <= MAX_FILE_SIZE, {  
      message: "File size should be less than 5MB",
    }),

  rulesAndInstructions: z
    .string()
    .max(500, "This field can't be longer than 500 characters"),

  allowConnections: z.boolean(),
});

