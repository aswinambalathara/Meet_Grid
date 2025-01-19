import adminAxiosInstance from "./AdminAuthorisedRoutes";
import handleError from "@/lib/utility/errorHandler";


export const getEvents = async()=>{
    try {
        const response = await adminAxiosInstance.get('/events/get-events')
        return response.data
    } catch (error) {
        return handleError(error)
    }
}

export const approveEvent = async(eventId:string)=>{
    try {
        const response = await adminAxiosInstance.patch(`/events/approve-event/${eventId}`)
        return response.data
    } catch (error) {
        return handleError(error)
    }

}

export const rejectEvent = async(eventId:string)=>{
    try {
        const response = await adminAxiosInstance.patch(`/events/reject-event/${eventId}`)
        return response.data
    } catch (error) {
        return handleError(error)
    }

}