"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import EventCard from "./EventCard";
import IEvent from "@/interfaces/IEvent";
import { EventFilterOptions, NominatimResponse } from "@/lib/utility/types";
import { fetchEvents, getEventCategories } from "@/lib/api/user/EventRoutes";
import Loading from "../Layout/Loading";
import { fetchLocation, getShortLocation } from "@/lib/utility/Helpers";
import { Input } from "@/components/ui/input";
import debounce from "@/lib/utility/debounce";
import { fetchPlace } from "@/lib/api/external";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import axios from "axios";
import IEventCategory from "@/interfaces/IEventCategory";
import { useRouter } from "next/navigation";

function ExploreEvents() {
  const router = useRouter();
  const [active, setActive] = useState<"Professional" | "General">(
    "Professional"
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [events, setEvents] = useState<IEvent[]>([]);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [isFilterActive, setFilterActive] = useState(false);
  const [location, setLocation] = useState<string>("Enter Location");
  const [categories, setCategories] = useState<IEventCategory[]>([]);
  const [suggestions, setSuggestions] = useState<NominatimResponse[]>([]);
  const [refetch, setRefetch] = useState(false);
  const [filters, setFilters] = useState<EventFilterOptions>({
    categoryGroup: active,
    coordinates: { latitude: 0, longitude: 0 },
  });

  useEffect(() => {
    (async () => {
      try {
        const { latitude, longitude } = await fetchLocation();

        setFilters((prev) => ({
          ...prev,
          coordinates: { latitude, longitude },
        }));

        const [categoryResponse, eventsResponse, placeResponse] =
          await Promise.all([
            getEventCategories(),
            fetchEvents({
              ...filters,
              coordinates: { latitude, longitude },
            }),
            fetchPlace([latitude, longitude]),
          ]);
        placeResponse && setLocation(getShortLocation(placeResponse?.address!));
        categoryResponse && setCategories(categoryResponse.data);
        eventsResponse && setEvents(eventsResponse.data);
      } catch (error) {
        if (error instanceof Error) {
          //console.error("Error fetching location or events:", error);
          toast.error(error.message);
        }
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetchEvents(filters);
        if (response) {
          setEvents(response.data);
        }
      } catch (error) {
        if (error instanceof Error) {
          toast.error(error.message);
        }
      }
    })();
  }, [active, location, refetch]);

  const handleEventGroupSelection = (
    eventGroup: "Professional" | "General"
  ) => {
    setActive(eventGroup);
    setFilters((prev) => ({
      ...prev,
      categoryGroup: eventGroup,
      category: "",
    }));
  };

  const handleLocationInput = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = e.target;
    if (value.length < 3) return;
    try {
      const result = await axios.get(
        "https://nominatim.openstreetmap.org/search?",
        {
          params: {
            q: value,
            format: "json",
            addressdetails: 1,
          },
        }
      );
      if (result) {
        setSuggestions(result.data);
      }
    } catch (error) {
      if (error instanceof Error) {
        //console.error("Error fetching location:", error);
        toast.error(error.message);
      }
    }
  };

  const handleLocationSelect = (e: React.MouseEvent<HTMLLIElement>) => {
    const placeId = e.currentTarget.dataset.value;
    const place = suggestions.filter(
      (sg) => sg.place_id === parseInt(placeId!)
    );
    // console.log(place);
    setFilters((prev) => ({
      ...prev,
      coordinates: {
        latitude: parseFloat(place[0].lat),
        longitude: parseFloat(place[0].lon),
      },
    }));
    setLocation(getShortLocation(place[0].address));
    setIsSearchActive(false);
  };
  const debouncedLocationInput = debounce(handleLocationInput, 500);

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value as EventFilterOptions["eventType"];
    setFilters((prev) => ({
      ...prev,
      eventType: value,
    }));
  };

  const handleResetFilter = () => {
    setFilters((prev) => ({
      ...prev,
      category: "",
      eventType: undefined,
      maxDistance: undefined,
    }));
    setRefetch(!refetch);
  };

  const handleCardClick = (id: string) => {
    router.push(`/events/${id}`);
  };

  if (loading) {
    return <Loading />;
  }

  //console.log(filters.coordinates);
  return (
    <div className="min-h-screen">
      <Toaster />
      <section className="banner h-80 w-full relative flex items-center justify-center mb-8">
        <Image
          src={"/images/event-bac-1.jpg"}
          fill
          alt="banner"
          className="object-cover blur-sm brightness-75"
        />
        <div className="banner-content absolute alegreya flex flex-col items-center justify-center">
          <h1 className="text-4xl font-extrabold">
            <span className="text-red-600">Discover</span> Your Next{" "}
            <span className="text-amber-600">Great Experience</span>
          </h1>
          <h5 className="font-semibold text-lg text-white">
            Explore a diverse range of local and virtual events tailored to your
            interests.
          </h5>
        </div>
      </section>

      <section className="section-events border border-b-0 min-h-screen relative rounded-t-xl pb-10">
        <div className="event-selectors flex gap-3 justify-center items-center mb-5">
          <Button
            className={`w-[200px] bg-transparent ring-1 text-white ring-white rounded-b-2xl hover:bg-white hover:text-black ${
              active === "Professional" ? "bg-white text-black" : ""
            }`}
            onClick={() => handleEventGroupSelection("Professional")}
          >
            Professional & Business
          </Button>
          <Button
            className={`w-[200px] rounded-b-2xl ring-1 bg-transparent hover:bg-white hover:text-black ring-white ${
              active === "General" ? "bg-white text-black" : ""
            }`}
            onClick={() => handleEventGroupSelection("General")}
          >
            General
          </Button>
        </div>

        <div className="filterOptions flex items-start justify-end text-white px-5 gap-3 mb-10">
          <div className={`search relative ${!isSearchActive && "hidden"} `}>
            <Input
              type="text"
              placeholder="Enter location"
              className="max-w-60"
              onChange={debouncedLocationInput}
            />
            <i
              className="fa-solid fa-xmark absolute right-2 top-2 cursor-pointer"
              onClick={() => setIsSearchActive(false)}
            />
            <ul
              className={`bg-slate-200/50 text-sm mt-1 text-black py-2 rounded-b absolute w-full overflow-auto max-h-60 z-10 ${
                !suggestions.length && "hidden"
              }`}
            >
              {suggestions.length &&
                suggestions.map((suggestion) => (
                  <li
                    key={suggestion.place_id}
                    className="bg-slate-100 p-1 text-sm mb-1 cursor-pointer"
                    data-value={suggestion.place_id}
                    onClick={handleLocationSelect}
                  >
                    {suggestion.display_name}
                  </li>
                ))}
            </ul>
          </div>
          <Button
            className={`bg-transparent text-slate-300 ring-1 ring-white p-2 max-w-48 overflow-hidden hover:text-white ${
              isSearchActive && "hidden"
            }`}
            onClick={() => setIsSearchActive(true)}
          >
            <i className="fa-solid fa-location-dot"></i>
            <p>{location}</p>
          </Button>
          <Button
            onClick={() => setFilterActive(!isFilterActive)}
            className={`bg-transparent text-slate-300 hover:text-slate-50 ring-1 ring-white p-2 max-w-48 overflow-hidden`}
          >
            <i className="fa-solid fa-filter"></i>
            Filter
            <i className="fa-solid fa-chevron-down "></i>
          </Button>
        </div>

        <div
          className={`bg-white/50 w-5/6 sm:w-2/6  h-40 overflow-auto absolute right-5 top-24 rounded filters py-5 px-3 flex flex-col gap-3 text-sm ${
            !isFilterActive && "hidden"
          }`}
        >
          <div className="control flex flex-col gap-1">
            <p>
              Max Distance <span>({filters.maxDistance || 5}KM)</span>{" "}
            </p>
            <Slider
              onValueChange={(values) =>
                setFilters((prev) => ({
                  ...prev,
                  maxDistance: values[0],
                }))
              }
              min={5}
              value={[filters.maxDistance || 5]}
              defaultValue={[5]}
              max={100}
              step={1}
            />
          </div>
          <div className="control flex flex-col gap-1">
            <p>Categories</p>
            <select
              name="event-categories"
              defaultValue={""}
              value={filters.category}
              className="rounded h-8 text-sm capitalize cursor-pointer"
              id="event-categories"
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  category: e.target.value,
                }))
              }
            >
              <option value={""} hidden>
                Select category
              </option>
              {categories.length ? (
                categories
                  .filter(
                    (category) =>
                      category.categoryType === filters.categoryGroup
                  )
                  .map((category) => (
                    <option
                      className="capitalize cursor-pointer"
                      key={category._id}
                      value={category._id}
                    >
                      {category.categoryName}
                    </option>
                  ))
              ) : (
                <option>No category found</option>
              )}
            </select>
          </div>
          <div className="control flex flex-col gap-1">
            <p>Event Type</p>
            <div className="radioGroup flex gap-2">
              <input
                type="hidden"
                name="eventType"
                id="default"
                value={""}
                defaultChecked
              />
              <div className="radio-item flex items-center space-x-1">
                <input
                  type="radio"
                  id="type-1"
                  name="eventType"
                  className="size-4"
                  value={"Online"}
                  onChange={handleRadioChange}
                  checked={filters.eventType === "Online"}
                />
                <Label htmlFor="type-1">Online</Label>
              </div>
              <div className="radio-item flex items-center space-x-1">
                <input
                  type="radio"
                  id="type-2"
                  name="eventType"
                  className="size-4"
                  value={"In-Person"}
                  onChange={handleRadioChange}
                  checked={filters.eventType === "In-Person"}
                />
                <Label htmlFor="type-2">In-Person</Label>
              </div>
            </div>
          </div>
          <div className="control flex gap-1 mt-4 justify-end">
            <Button className="text-white" onClick={() => setRefetch(!refetch)}>
              Apply Filters
            </Button>
            <Button variant={"secondary"} onClick={handleResetFilter}>
              Reset
            </Button>
          </div>
        </div>
        <div
          className={`events-list grid ${
            events.length
              ? "sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6"
              : ""
          } gap-4 p-5 mb-5`}
        >
          {events.length ? (
            events.map((event, idx) => (
              <EventCard
                key={idx}
                className="hover:scale-95 transition-all ease-out duration-200 cursor-pointer"
                date={{
                  startDate: event.startDate.toString(),
                  endDate: event.endDate.toString(),
                }}
                eventType={event.eventType}
                id={event._id!}
                ticketType={event.ticket.ticketType}
                title={event.title}
                image={event.eventBanner?.url}
                onClick={() => handleCardClick(event._id!)}
              />
            ))
          ) : (
            <div className="flex items-center justify-center w-full h-96">
              <h2 className="text-white ">No Events found</h2>
            </div>
          )}
        </div>

        <div className="flex items-center justify-center ">
          {events.length > 0 && (
            <Button className="bg-white text-black">Load More</Button>
          )}
        </div>
      </section>
    </div>
  );
}

export default ExploreEvents;
