import * as z from "zod";

// export const EventVenueSchema = z.object({
//   virtualPlatform: z.string().nonempty("This Field is required").optional(),
//   meetLink: z.string().url("Meet link must be a valid URL").optional(),
//   timeZone: z.string().nonempty("This Field is required").optional(),
//   accessInstructions: z
//     .string()
//     .max(500, "Access Instructions cannot be longer than 500 characters")
//     .optional(),
//   location: z.object({
//     venueName: z
//       .string()
//       .nonempty("This field is required")
//       .min(1, "Venue Name is required")
//       .optional(),
//     streetAddress: z.string().min(1, "Street Address is required").optional(),
//     city: z.string().min(1, "City is required").optional(),
//     state: z.string().min(1, "State is required").optional(),
//     country: z.string().min(1, "Country is required").optional(),
//     pincode: z
//       .string()
//       .regex(/^\d{5,6}$/, "Pincode must 6 digits")
//       .optional(),
//     googleMapLink: z.string().url("Must be a valid URL"),
//     coordinates: z
//       .object({
//         type: z.literal("Point"),
//         coordinates: z.tuple([z.number(), z.number()]),
//       })
//       .optional(),
//   }),
// });

export const OnlineVenueSchema = z.object({
  virtualPlatform: z
    .string()
    .nonempty("Virtual platform is required for online events."),
  meetLink: z.string().url("Meet link must be a valid URL."),
  timeZone: z.string().nonempty("Time zone is required for online events."),
  accessInstructions: z
    .string()
    .max(500, "Access instructions cannot exceed 500 characters")
    .optional(),
});

export const OfflineVenueSchema = z.object({
  venueName: z.string().nonempty("Venue name is required."),
  streetAddress: z.string().nonempty("Street address is required."),
  city: z.string().nonempty("City is required."),
  state: z.string().nonempty("State is required."),
  country: z.string().nonempty("Country is required."),
  pincode: z.string().regex(/^\d{5,6}$/, "Pincode must be 5 or 6 digits."),
  googleMapLink: z.string().nonempty('Location required').url("Google Map link must be a valid URL."),
  coordinates: z.object({
    type: z.literal("Point"),
    coordinates: z.tuple([z.number(), z.number()]),
  }),
});
