import moment from "moment";
import { NominatimResponse } from "./types";

export function generateGoogleMapLink(latitude: number, longitude: number) {
  return `https://www.google.com/maps?q=${latitude},${longitude}`;
}

export async function fetchLocation() {
  try {
    const getLocation = new Promise<GeolocationCoordinates>(
      (resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
          (position) => resolve(position.coords),
          (error) => reject(error),
          { enableHighAccuracy: true }
        );
      }
    );

    const { latitude, longitude } = await getLocation;
    return { latitude, longitude };
  } catch (error) {
    if (error instanceof Error) {
      throw new Error("Error fetching location:", error);
    } else {
      throw new Error("Error fetching location");
    }
  }
}

export const getShortLocation = (address: NominatimResponse["address"]) => {
  const locationFields: (keyof NominatimResponse["address"])[] = [
    "neighbourhood",
    "village",
    "suburb",
    "county",
    "city",
    "state",
    "country",
  ];

  for (const field of locationFields) {
    if (address[field]) {
      return address[field];
    }
  }

  return "Location not available";
};

export const formatDate = (date: string, format: string) => {
  return moment(date).format(format);
};
