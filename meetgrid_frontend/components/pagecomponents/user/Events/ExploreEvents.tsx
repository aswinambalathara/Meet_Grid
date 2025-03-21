"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { useEffect, useState } from "react";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import toast from "react-hot-toast";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

function ExploreEvents() {
  const router = useRouter();
  const [active, setActive] = useState<"Professional" | "General">(
    "Professional"
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [events, setEvents] = useState<IEvent[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [isFilterActive, setFilterActive] = useState(false);
  const [location, setLocation] = useState<string>("Enter Location");
  const [categories, setCategories] = useState<IEventCategory[]>([]);
  const [suggestions, setSuggestions] = useState<NominatimResponse[]>([]);
  const [isSortActive, setSortActive] = useState<boolean>(false);
  const [refetch, setRefetch] = useState(false);
  const [filters, setFilters] = useState<EventFilterOptions>({
    categoryGroup: active,
    coordinates: { latitude: 0, longitude: 0 },
  });

  useEffect(() => {
    const fetch = async () => {
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
        console.log("error log component", error);
        if (error instanceof Error) {
          toast.error(error.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, []);

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await fetchEvents(filters);
        if (response) {
          setEvents(response.data);
        }
      } catch (error) {
        if (error instanceof Error) {
          toast.error(error.message);
        }
      } finally {
        setLoading(false);
      }
    };
    fetch();
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
      <section className="banner h-80 w-full relative flex items-center justify-center mb-8">
        <Image
          src={"/images/event-bac-1.jpg"}
          fill
          alt="banner"
          className="object-cover blur-sm brightness-75"
        />
        <div className="banner-content absolute alegreya flex flex-col items-center justify-center">
          <h1 className="text-xl sm:text-4xl font-extrabold">
            <span className="text-red-600">Discover</span> Your Next{" "}
            <span className="text-amber-600">Great Experience</span>
          </h1>
          <h5 className="font-semibold text-sm text-center sm:text-lg text-white">
            Explore a diverse range of local and virtual events tailored to your
            interests.
          </h5>
        </div>
      </section>

      <section className="section-events border border-b-0 min-h-screen relative rounded-t-xl pb-10">
        <div className="event-selectors flex gap-3 justify-center items-center mb-5">
          <Button
            className={`w-[200px] bg-transparent border border-t-0 border-white text-white rounded-tl-xl sm:rounded-tl-sm rounded-b-2xl hover:bg-white hover:text-black ${
              active === "Professional" ? "bg-white text-black" : ""
            }`}
            onClick={() => handleEventGroupSelection("Professional")}
          >
            Professional & Business
          </Button>
          <Button
            className={`w-[200px] rounded-b-2xl rounded-tr-xl sm:rounded-tr-sm border border-t-0 border-white bg-transparent hover:bg-white hover:text-black  ${
              active === "General" ? "bg-white text-black" : ""
            }`}
            onClick={() => handleEventGroupSelection("General")}
          >
            General
          </Button>
        </div>

        <div className="filterOptions flex items-center justify-between text-white px-2 sm:px-5 gap-3 mb-10">
          <div className="sort-search flex items-center gap-3 w-full">
            <Select
              onValueChange={(value) =>
                setFilters((prev) => ({ ...prev, sort: value }))
              }
            >
              <SelectTrigger className="text-white w-fit  overflow-hidden space-x-1 p-1">
                <SelectValue placeholder={`Sort `} />
                <i className="fa-solid fa-arrow-down-wide-short"></i>
              </SelectTrigger>
              <SelectContent side="bottom">
                <SelectGroup>
                  <SelectLabel>
                    <i className="fa-solid fa-indian-rupee-sign text-blue-500" />{" "}
                    Price
                  </SelectLabel>
                  <SelectItem value="low-to-high">Low to High</SelectItem>
                  <SelectItem value="high-to-low">High to Low</SelectItem>
                </SelectGroup>
                <SelectGroup>
                  <SelectLabel>
                    <i className="fa-solid fa-location-arrow text-blue-500" />{" "}
                    Distance
                  </SelectLabel>
                  <SelectItem value="closest-first">Closest First</SelectItem>
                  <SelectItem value="farthest-first">Farthest First</SelectItem>
                </SelectGroup>
                <Button size={"sm"} className="self-center">
                  Reset
                </Button>
              </SelectContent>
            </Select>

            <div className="search-bar relative w-full">
              <Input
                placeholder="Search events"
                type="text"
                className="p-2"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm.length > 0 ? (
                <i
                  className={`fa-solid fa-xmark absolute right-2 text-sm bottom-[10px]`}
                ></i>
              ) : (
                <i
                  className={`fa-solid fa-magnifying-glass absolute right-2 text-sm bottom-[10px]`}
                ></i>
              )}
            </div>
          </div>

          <div className="flex border border-white rounded">
            <div className={`bg-transparent text-white flex items-center gap-1 rounded p-1 max-w-28 sm:max-w-48 overflow-hidden`}>
              <i className="fa-solid fa-location-dot "></i>
              <p className="text-xs sm:text-sm">{location}</p>
            </div>
            <Button
              onClick={() => setFilterActive(!isFilterActive)}
              className={`bg-transparent text-slate-300 hover:text-slate-50 border-l-2 p-1 border-white rounded-none max-w-48 overflow-hidden`}
            >
              <i className="fa-solid fa-filter"></i>
              <p className="hidden sm:block">Filter</p>
            </Button>
          </div>
        </div>

        <Dialog
          open={isFilterActive}
          onOpenChange={(open) => setFilterActive(open)}
        >
          <DialogContent className="border border-black bg-white/70">
            <DialogHeader>
              <DialogTitle>Sort & Filters</DialogTitle>
            </DialogHeader>
            <div className="flex flex-col gap-2 content">
              <div className={`search relative `}>
                <Input
                  type="text"
                  placeholder="Enter location"
                  className="w-full"
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
                  className="rounded h-8 text-sm capitalize cursor-pointer text-black"
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
                <Button
                  className="text-white"
                  onClick={() => setRefetch(!refetch)}
                >
                  Apply Filters
                </Button>
                <Button variant={"secondary"} onClick={handleResetFilter}>
                  Reset
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

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
