import { adminCategorySchema ,basicDetailsSchema, professionalDetailsSchema} from "./schemas";
import { z } from "zod";

export type AdminCategoryFormData = z.infer<typeof adminCategorySchema>
export type ProfileBasicFormData = z.infer<typeof basicDetailsSchema>
export type ProfileProfessionalFormData = z.infer<typeof professionalDetailsSchema>