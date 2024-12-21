import { adminCategorySchema ,basicDetailsSchema} from "./schemas";
import { z } from "zod";

export type AdminCategoryFormData = z.infer<typeof adminCategorySchema>
export type ProfileBasicFormData = z.infer<typeof basicDetailsSchema>