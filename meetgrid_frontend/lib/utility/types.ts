import { EventBasicDetailsSchema } from "../schemas/BasicEventDetailSchema";
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