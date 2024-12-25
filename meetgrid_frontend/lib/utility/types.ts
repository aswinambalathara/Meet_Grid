import { EventBasicDetailsSchema } from "../schemas/BasicEventDetailSchema";
import { EventVenueSchema } from "../schemas/EventVenueSchema";
import {
  adminCategorySchema,
  basicDetailsSchema,
  changePasswordSchema,
  eventFormSchema,
  professionalDetailsSchema,
} from "./schemas";
import { z } from "zod";

export type AdminCategoryFormData = z.infer<typeof adminCategorySchema>;
export type ProfileBasicFormData = z.infer<typeof basicDetailsSchema>;
export type ProfileProfessionalFormData = z.infer<
  typeof professionalDetailsSchema
>;
export type ProfilePasswordFormData = z.infer<typeof changePasswordSchema>;
export type EventFormData = z.infer<typeof eventFormSchema>;
export type EventBasicDetailForm = z.infer<typeof EventBasicDetailsSchema>
export type EventVenueFormData = z.infer<typeof EventVenueSchema>

export type NominatimResponse = {
  place_id: number;
  osm_type: string;
  osm_id: string;
  boundingbox: [string, string, string, string];  // [north, south, east, west]
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
    state?: string;
    country?: string;
    country_code?: string;
    postcode?: string;
  };
  extratags?: {
    language?: string;
  };
}[];

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
