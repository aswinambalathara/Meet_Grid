import IEventCategory from "@/interfaces/IEventCategory";
import adminAxiosInstance from "./AdminAuthorisedRoutes";
import handleError from "@/lib/utility/errorHandler";

export const createEventCategory = async (formData: IEventCategory) => {
  try {
    const response = await adminAxiosInstance.post(
      "/event-categories/create",
      formData
    );
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const getEventCategories = async () => {
  try {
    const response = await adminAxiosInstance.get(
      "/event-categories/get-categories"
    );
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const deleteEventCategory = async (id: string) => {
  try {
    const response = await adminAxiosInstance.patch(
      `/event-categories/delete/${id}`
    );
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const editEventCategory = async (formData: IEventCategory) => {
  try {
    const response = await adminAxiosInstance.patch(
      "/event-categories/edit",
      formData
    );
    return response.data;
  } catch (error) {
    handleError(error);
  }
};
