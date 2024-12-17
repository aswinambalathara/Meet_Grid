import adminAxiosInstance from "./AdminAuthorisedRoutes";
import handleError from "@/lib/utility/errorHandler";

export const getEventCategories = async () =>{
    try {
        const response = await adminAxiosInstance.get('/')
    } catch (error) {
        
    }
}