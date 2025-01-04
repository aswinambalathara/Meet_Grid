import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { EventCardProps } from "@/lib/constants";

function EventCard({
  id,
  image,
  date,
  eventType,
  ticketType,
  title,
  ...props
}: EventCardProps & React.ComponentPropsWithoutRef<"div">) {
  return (
    <Card key={id} {...props}>
      <CardContent className="flex min-h-52 justify-center p-3 flex-col">
        {image ? (
          <img
            src={image}
            alt="event-thumbnail"
            className="object-cover w-auto max-h-[150px] rounded-sm mb-3"
          />
        ) : (
          <div className=" w-full min-h-[150px] event-img bg-slate-600 rounded-sm mb-3" />
        )}
        <div className="event-details flex flex-col gap-5">
          <h2 className="font-semibold  truncate">{title}</h2>
          <div className="sub flex flex-col gap-2 text-sm">
            <p>
              {eventType === "Online" ? (
                <i className="fa-solid fa-globe text-green-600"></i>
              ) : (
                <i className="fa-solid fa-users-rays text-blue-600"></i>
              )}{" "}
              {eventType}
            </p>
            <p>
              <i className="fa-regular fa-calendar-days text-blue-600"></i>{" "}
              {date}
            </p>
            <p>
              <i className="fa-solid fa-ticket text-blue-600"></i> {ticketType}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default EventCard;
