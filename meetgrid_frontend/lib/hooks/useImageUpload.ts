import axios from "axios";
import { CLOUDINARY_URL } from "@/config/apiConfig";
import handleError from "../utility/errorHandler";

async function useImageUpload(
  file: File,
  folderPath: string = "images/profile"
) {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "meetgrid");
  formData.append("folder", folderPath);
  try {
    const response = await axios.post(CLOUDINARY_URL as string, formData);
    const newImageURL: string = response.data.secure_url;
    const newImagePublicId: string = response.data.public_id;
    console.log(response);
    return { newImagePublicId, newImageURL };
  } catch (error) {
    handleError(error);
  }
}

export default useImageUpload;
