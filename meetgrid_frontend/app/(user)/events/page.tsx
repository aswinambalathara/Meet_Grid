import EventCard from "@/components/pagecomponents/user/Events/EventCard";
import { Button } from "@/components/ui/button";
import { TrendingEventsList } from "@/lib/constants";
import Image from "next/image";
import React from "react";
import "@/styles/user.css";

function page() {
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
          <Button className="w-[200px] bg-white text-black rounded-b-2xl hover:bg-white hover:text-black">
            Professional & Business
          </Button>
          <Button className="w-[200px] rounded-b-2xl ring-1 bg-transparent hover:bg-white hover:text-black ring-white">
            General
          </Button>
        </div>

        <div className="filterOptions flex items-center justify-end text-white px-5 gap-3 mb-10">
          <div className="location flex items-center gap-1 border py-1 px-2 rounded-lg">
            <i className="fa-solid fa-location-dot"></i>
            <p>Trivandrum</p>
          </div>
          <div className="filter flex items-center gap-1 border py-1 px-2 rounded-lg">
            <i className="fa-solid fa-filter"></i>
            <p>Filter</p>
            <i className="fa-solid fa-chevron-down"></i>
          </div>
        </div>

        <div className="events-list grid grid-cols-6 gap-4 p-5 mb-5">
          {TrendingEventsList.map((event, idx) => (
            <EventCard
              date={event.date}
              eventType={event.eventType}
              id={event.id}
              ticketType={event.ticketType}
              title={event.title}
              image={event.image}
            />
          ))}
        </div>

        <div className="flex items-center justify-center ">
          <Button variant={"secondary"} className="font-semibold">
            Explore More
          </Button>
        </div>
        
      </section>
    </div>
  );
}

export default page;
