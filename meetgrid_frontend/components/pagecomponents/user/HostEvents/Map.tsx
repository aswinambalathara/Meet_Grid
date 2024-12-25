"use client";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl, { Marker } from "mapbox-gl";
import axios from "axios";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { EventVenueFormData, NominatimResponse } from "@/lib/utility/types";
import { useFormContext } from "react-hook-form";
import { generateGoogleMapLink } from "@/lib/utility/Helpers";

const publicToken = process.env.NEXT_PUBLIC_MAP_TOKEN;

type MapProps = {
  streetAddress?: string;
  country?: string;
  state?: string;
  city?: string;
  pincode?: string;
};

function Map({ streetAddress, country, state, city, pincode }: MapProps) {
  const { setValue,getValues,formState:{errors} } = useFormContext<EventVenueFormData["location"]>();
  const [coordinates, setCoordinates] = useState({
    latitude: 10.1632,
    longitude: 76.6413,
    zoom: 7,
  });
  const [suggestions, setSuggestions] = useState<NominatimResponse>([]);
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const markerRef = useRef<Marker | null>(null);
  const locationSelectRef = useRef<HTMLSelectElement | null>(null);

  useEffect(() => {
    mapboxgl.accessToken = publicToken || "";

    if (!mapContainerRef.current || mapRef.current) return;
    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [coordinates.longitude, coordinates.latitude],
      zoom: coordinates.zoom,
    });

    // Add double-click event to add a marker
    mapRef.current.on("dblclick", (event) => {
      const { lng, lat } = event.lngLat;
      // Remove the existing marker, if any
      if (markerRef.current) {
        markerRef.current.remove();
      }

      // Add a new marker
      markerRef.current = new Marker()
        .setLngLat([lng, lat])
        .addTo(mapRef.current!);
      setValue("coordinates.coordinates.0", lng);
      setValue("coordinates.coordinates.1", lat);
    });

    return () => {
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, [coordinates]);

  const handleGeoCoding = async () => {
    if (streetAddress && country && state && city && pincode) {
      try {
        const result = await axios.get(
          "https://nominatim.openstreetmap.org/search?",
          {
            params: {
              street: streetAddress,
              city: city,
              state: state,
              country: country,
              postalcode: pincode,
              format: "json",
            },
          }
        );
        if (result.data.length > 0) {
          setSuggestions(result.data);
          if (locationSelectRef.current) {
            locationSelectRef.current.click();
          }

          const { lat, lon } = result.data[0];
          setCoordinates({
            latitude: parseFloat(lat),
            longitude: parseFloat(lon),
            zoom: 12,
          });
        } else {
          toast.error("nothing found");
        }
      } catch (error) {
        console.error("Error fetching coordinates", error);
        alert("Failed to fetch coordinates");
      }
    }
  };

  const handleLocationSelect = async (e: ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    const place = suggestions.find((loc) => loc.place_id === Number(value));
    const { lat, lon } = place!;
    setCoordinates({
      latitude: parseFloat(lat),
      longitude: parseFloat(lon),
      zoom: 17,
    });
  };

  const handleConfirmLocation = () => {
    const lat = getValues('coordinates.coordinates.1');
    const lng = getValues('coordinates.coordinates.0');
    const googleMapLink = generateGoogleMapLink(lat,lng);
    setValue('coordinates.googleMapLink',googleMapLink);
    toast.success('Location Confirmed')
  }

  console.error(errors)
  return (
    <div className="map-section w-full flex flex-col gap-2">
      <div className="flex justify-between items-end">
        <div>
          <p>Location</p>
          <select
            onChange={handleLocationSelect}
            name="locationList"
            defaultValue={""}
            id="locationList"
            className="overflow-hidden w-[200px] h-9 rounded text-sm"
          >
            <option value="" hidden>
              Click Search
            </option>
            {suggestions.length ? (
              suggestions.map((location) => (
                <option
                  className="overflow-hidden"
                  value={location.place_id}
                  key={location.place_id!}
                >
                  {location.display_name}
                </option>
              ))
            ) : (
              <option disabled value={"nothing found"}>
                Nothing Found
              </option>
            )}
          </select>
        </div>
        <div className="flex gap-2">
        <Button type="button" onClick={handleGeoCoding}>
          Search with Entered Details
        </Button>
        <Button variant={'outline'} type="button" onClick={handleConfirmLocation}>Set Location</Button>
        </div>
      </div>
      <div
        ref={mapContainerRef}
        className="map-container w-full h-96 rounded"
      />
      <div className="text-center"><small >Double-click on the map to place a marker at your location. If your exact location is unavailable, select the nearest point. Click the 'Set Location' button to confirm your selection.</small></div>
      <small className="text-red-600">
            {errors.coordinates? errors.coordinates.message : ""}
          </small>
    </div>
  );
}

export default Map;
