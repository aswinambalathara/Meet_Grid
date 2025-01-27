"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import IEvent from "@/interfaces/IEvent";
import React, { useState } from "react";
import { SalesChart } from "./SalesChart";

function ManageEvent() {
  const [event, setEvent] = useState<IEvent | null>(null);
  const eventType: 'Online' | 'Offline' = "Offline";
  return (
    <div className="min-h-screen w-full bg-blue-700/20 text-black p-5 space-y-3">
      <h1 className="text-white font-bold text-xl">Manage Event</h1>
      <section className="event-detail w-full ring-1 ring-white rounded bg-white mt-5 shadow shadow-white flex flex-col">
        <h2 className="bg-slate-200 p-1 text-sm font-semibold">
          Basic Event Details
        </h2>
        <div className="basic-details p-2 flex items-center justify-between text-sm my-4">
          <div className="start flex flex-col gap-1">
            <h1 className="font-bold text-lg max-w-80 truncate">
              Google Hackthon
            </h1>
            <small className="max-w-96 truncate inline-block">
              Lorem ismallsum dolor sit amet consectetur adipisicing elit. Non
              numquam, sapiente recusandae porro cupiditate obcaecati itaque
              nisi expedita culpa. Vel aspernatur deleniti quae provident
              explicabo molestias amet sunt dolorum quia.
            </small>

            <div className="flex gap-2">
              <p className="font-semibold">Technology</p>
              <div className="event-type flex gap-1 items-center">
                <i className="fa-solid fa-globe" />
                <p>Online</p>
              </div>
            </div>
          </div>
          <div
            className={`status text-center ${
              event?.eventStatus.status === "Pending"
                ? "bg-yellow-500"
                : event?.eventStatus.status === "Rejected" ||
                  event?.eventStatus.status === "Cancelled"
                ? "bg-red-500"
                : "bg-green-500"
            } p-2 rounded`}
          >
            <p>Status</p>
            <p className="font-bold">{event?.eventStatus.status || "Active"}</p>
          </div>
          <div className="dead-line text-center bg-white/20 p-2 rounded">
            <p>Registration Deadline</p>
            <p>27/01/2025</p>
          </div>
          <div className="start-date  text-center bg-white/20 p-2 rounded">
            <p>Start Date</p>
            <p>27/01/2025</p>
          </div>
          <div className="end-date  text-center bg-white/20 p-2 rounded">
            <p>End Date</p>
            <p>30/01/2025</p>
          </div>
          <div className="end actions flex flex-col gap-2">
            <Button size={"sm"}>Edit Event</Button>
            <Button size={"sm"} variant={"destructive"}>
              Cancel Event
            </Button>
          </div>
        </div>

        <div className="event-details flex">

          <div className="location-details w-full text-center">
            <h2 className="bg-slate-200 p-1 text-sm font-semibold">
              Location Details
            </h2>
            <div className="content py-4 px-2 text-sm flex flex-col gap-2 leading-5">
              {event?.eventType === 'Online'? (<>
              <div className="">
                <strong>Virtual Platform</strong>
                <p>Google Meet</p>
              </div>
              <div className="">
                <strong>Meet Link</strong>
                <p>https://meet.google.com/eed-ged-gtr</p>
              </div>
              <div className="">
                <strong>TimeZone</strong>
                <p>Indian / Reunion</p>
              </div>
              </>):(<>
              <div className="capitalize">
                <p className="font-semibold">venue Name</p>
                <p>street address</p>
                <p>city, state, country, 695615</p>
                <a href="https://www.google.com/maps?q=23.536201,-56.239816" className="font-semibold text-blue-500">GoogleMap</a>
              </div>
              </>)}
            </div>
          </div>

          <div className="ticket-details w-full text-center">
            <h2 className="bg-slate-200 p-1 text-sm font-semibold">
              Ticket Details
            </h2>
            <div className="content py-4 px-2 flex flex-col text-sm gap-1 leading-5">
              <div className="row-1 flex gap-2 justify-center">
                <p className="uppercase font-semibold"><i className="fa-solid fa-ticket text-black/50"/> paid</p>
                <p className="uppercase font-semibold"><i className="fa-solid fa-money-bills text-black/50"/> INR</p>
              </div>
              <h1 className="font-bold text-xl">200</h1>
              <div>
                <p>Tickets Left: <span>200</span></p>
              </div>
            </div>
          </div>

          <div className="media w-full text-center">
            <h2 className="bg-slate-200 p-1 text-sm font-semibold">
              Event Media
            </h2>
            <div className="content flex items-end gap-2 py-4 px-2 text-sm justify-center">
              <div className="logo flex flex-col items-center">

                <img src="/images/event-bac-1.jpg" alt="logo" className="aspect-square size-20"/>
                <p>Logo</p>
              </div>
              <div className="banner flex flex-col items-center">

                <img src="/images/event-bac-1.jpg" alt="banner" className="aspect-video w-52"/>
                <p>Banner</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      <section className="overview w-full ring-1 ring-white rounded bg-white mt-5 shadow shadow-white flex flex-col text-sm ">
        <h1 className="bg-slate-200 font-semibold p-1">Overview</h1>
        <div className="overview-wrapper p-2 flex gap-2">
          <div className="count w-1/4 flex flex-col">
          <Card>
            <CardContent className="text-center p-2 bg-lime-500 rounded text-white ">
              <h1 className="font-semibold">Total Sales</h1>
              <h1 className="text-xl font-bold">20000</h1>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="text-center p-2 bg-amber-500 rounded text-white ">
              <h1 className="font-semibold">Total Refunds</h1>
              <h1 className="text-xl font-bold">100</h1>
            </CardContent>
          </Card>
          </div>
          <Card className=" graph w-3/4">
            <CardContent>
              <SalesChart/>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}

export default ManageEvent;
