"use client";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl, { Marker } from "mapbox-gl";
import axios from "axios";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import {
  EventFormData,
  NominatimResponse,
  OfflineVenueFormdata,
} from "@/lib/utility/types";
import { useFormContext } from "react-hook-form";
import { generateGoogleMapLink } from "@/lib/utility/Helpers";
import { Input } from "@/components/ui/input";

const publicToken = process.env.NEXT_PUBLIC_MAP_TOKEN;

function Map() {
  const {
    setValue,
    getValues,
    formState: { errors },
  } = useFormContext<EventFormData>();
  const [coordinates, setCoordinates] = useState({
    latitude: 10.1632,
    longitude: 76.6413,
    zoom: 7,
  });
  const [suggestions, setSuggestions] = useState<NominatimResponse>([]);
  const [hidden, setHidden] = useState(true);
  const [search, setSearch] = useState("");
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const markerRef = useRef<Marker | null>(null);
  const locationSelectRef = useRef<HTMLSelectElement | null>(null);
  const [map, showMap] = useState(false);

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
      setValue("location.coordinates.coordinates", [lng, lat]);
    });

    return () => {
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, [coordinates]);

  const handleGeoCoding = async () => {
    if (search.length < 2) {
      return;
    }

    const searchTerm = search.toLowerCase();

    try {
      const result = await axios.get(
        "https://nominatim.openstreetmap.org/search?",
        {
          params: {
            q: searchTerm,
            format: "json",
            addressdetails: 1,
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
  };

  const handleLocationSelect = async (value: number) => {
    const place = suggestions.find((loc) => loc.place_id === value);
    setSearch(place?.display_name!);
    setSuggestions([]);
    const { lat, lon } = place!;
    setCoordinates({
      latitude: parseFloat(lat),
      longitude: parseFloat(lon),
      zoom: 17,
    });
  };

  const handleConfirmLocation = () => {
    const lat = getValues("location.coordinates.coordinates.1");
    const lng = getValues("location.coordinates.coordinates.0");
    const googleMapLink = generateGoogleMapLink(lat, lng);
    setValue("location.googleMapLink", googleMapLink);
    toast.success("Location Confirmed");
  };
  console.error(errors);
  return (
    <div className="map-section w-full flex flex-col gap-2">
      <div className="flex justify-between items-center gap-2">
        <div className="search-container relative w-full">
          <Input
            className="w-full bg-slate-50"
            value={search}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleGeoCoding();
              }
            }}
            onChange={(e) => setSearch(e.target.value)}
            onMouseOver={() => setHidden(false)}
            placeholder="Search location(eg: Thiruvananthapuram)"
          />
          <i
            className="fa-solid fa-magnifying-glass absolute right-3 bottom-2 text-zinc-700 cursor-pointer"
            onClick={handleGeoCoding}
          ></i>
          <ul
            onMouseOut={() => setHidden(true)}
            onMouseOver={() => setHidden(false)}
            className={`z-10 absolute bg-white py-2  top-10 w-full rounded-b max-h-60 overflow-scroll ${
              suggestions.length < 1 || hidden ? "hidden" : ""
            }`}
          >
            {suggestions.map((loc) => (
              <li
                className="bg-slate-200/50 p-2 mb-1 overflow-hidden text-sm cursor-pointer"
                onClick={() => handleLocationSelect(loc.place_id)}
                key={loc.place_id}
              >
                {loc.display_name}
              </li>
            ))}
          </ul>
        </div>
        <Button type="button" onClick={handleConfirmLocation}>
          Set Location
        </Button>
      </div>
      <div className="relative">
        <div
          className={`absolute text-sm w-full h-96 bg-black/50 z-10 flex items-center justify-center ${
            map ? "hidden" : ""
          }`}
        >
          <Button
            variant={"link"}
            type="button"
            className="text-white"
            onClick={() => showMap(true)}
          >
            Browse On Map
          </Button>
        </div>
        <div
          ref={mapContainerRef}
          className={`map-container w-full h-96 rounded ${
            map ? "pointer-events-auto" : "pointer-events-none"
          }`}
        />
      </div>
      <div className="text-center">
        <small>
          Double-click on the map to place a marker at your location. If your
          exact location is unavailable, select the nearest point. Click the
          'Set Location' button to confirm your selection.
        </small>
      </div>
      <small className="text-red-600 text-center">
        {errors?.location?.coordinates
          ? errors.location.coordinates.message
          : ""}
      </small>
    </div>
  );
}

export default Map;
