import { adminCategorySchema ,basicDetailsSchema, changePasswordSchema, professionalDetailsSchema} from "./schemas";
import { z } from "zod";

export type AdminCategoryFormData = z.infer<typeof adminCategorySchema>
export type ProfileBasicFormData = z.infer<typeof basicDetailsSchema>
export type ProfileProfessionalFormData = z.infer<typeof professionalDetailsSchema>
export type ProfilePasswordFormData = z.infer<typeof changePasswordSchema>