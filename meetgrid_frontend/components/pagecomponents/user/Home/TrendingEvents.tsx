import React from "react";
import { TrendingEventsList } from "@/lib/constants";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import { URL } from "url";

function TrendingEvents() {
  return (
    <div className="w-full py-4 min-h-[400px] h-[400px]">
      <h1 className="text-white font-bold text-2xl ms-16 mb-5">
        TrendingEvents
      </h1>
      <div className="event-slide-wrapper flex justify-center items-center bg-stone-800 h-full ">
        <Carousel className="w-11/12">
          <CarouselContent className="-ml-1">
            {TrendingEventsList.map((event, index) => (
              <CarouselItem
                key={event.id}
                className="pl-1 md:basis-1/3 lg:basis-1/4"
              >
                <div className="p-1">
                  <Card>
                    <CardContent className="flex min-h-52 justify-center p-3 flex-col">
                      {event.image ? (
                        <img
                          src={event.image}
                          alt="event-thumbnail"
                          className="object-cover w-auto max-h-[150px] rounded-sm mb-3"
                        />
                      ) : (
                        <div className="w-full min-h-[150px] event-img bg-slate-600 rounded-sm mb-3" />
                      )}
                      <div className="event-details flex flex-col gap-5">
                        <h2 className="font-semibold  truncate">
                          {event.title}
                        </h2>
                        <div className="sub flex flex-col gap-2 text-sm">
                          <p>
                            {event.eventType === "Online" ? (
                              <i className="fa-solid fa-globe text-green-600"></i>
                            ) : (
                              <i className="fa-solid fa-users-rays text-blue-600"></i>
                            )}{" "}
                            {event.eventType}
                          </p>
                          <p>
                            <i className="fa-regular fa-calendar-days text-blue-600"></i>{" "}
                            {event.date}
                          </p>
                          <p>
                            <i className="fa-solid fa-ticket text-blue-600"></i>{" "}
                            {event.ticketType}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  );
}

export default TrendingEvents;
