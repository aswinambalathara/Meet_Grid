import handleError from "@/lib/utility/errorHandler";
import { NominatimResponse } from "@/lib/utility/types";
import axios from "axios";

type coordinates = [latitude: number, longitude: number];

export const fetchPlace = async (coordinates: coordinates):Promise<NominatimResponse | undefined> => {
  try {
    const response = await axios.get(
      "https://nominatim.openstreetmap.org/reverse?",
      {
        params: {
          lat: coordinates[0],
          lon: coordinates[1],
          format:'json'
        },
      }
    );
    return response.data
  } catch (error) {
    handleError(error);
  }
};
