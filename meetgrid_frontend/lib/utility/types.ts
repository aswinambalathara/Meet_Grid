import { MediaAndOptionsSchema } from "../schemas/TicketAndMediaSchema";
import {
  adminCategorySchema,
  basicDetailsSchema,
  changePasswordSchema,
  EventFormSchema,
  professionalDetailsSchema,
} from "./schemas";
import { z } from "zod";

export type AdminCategoryFormData = z.infer<typeof adminCategorySchema>;
export type ProfileBasicFormData = z.infer<typeof basicDetailsSchema>;
export type ProfileProfessionalFormData = z.infer<
  typeof professionalDetailsSchema
>;
export type ProfilePasswordFormData = z.infer<typeof changePasswordSchema>;
export type EventFormData = z.infer<typeof EventFormSchema>;
export type EventMediaFormData = z.infer<typeof MediaAndOptionsSchema>;

export type NominatimResponse = {
  place_id: number;
  osm_type: string;
  osm_id: string;
  boundingbox: [string, string, string, string]; // [north, south, east, west]
  lat: string;
  lon: string;
  display_name: string;
  class: string;
  type: string;
  importance: number;
  address: {
    road?: string;
    suburb?: string;
    city?: string;
    county?: string;
    village?: string;
    state?: string;
    country?: string;
    country_code?: string;
    postcode?: string;
    neighbourhood?: string;
  };
  extratags?: {
    language?: string;
  };
};

export type NavLinks = {
  label: string;
  href: string;
  icon?: string;
  textcolor?: string;
};

export type HeroProps = {
  id: number;
  title: string;
  description: string;
};

export type category = {
  readonly _id?: string;
  categoryName?: string;
  categoryType?: "Professional" | "General";
  description?: string;
  createdAt?: Date;
  isDeleted?: boolean;
};

export type EventFilterOptions = {
  coordinates?: { latitude: number; longitude: number };
  categoryGroup: "Professional" | "General";
  category?: string;
  maxDistance?: number;
  eventType?: "Online" | "In-Person";
  search?: string;
};
