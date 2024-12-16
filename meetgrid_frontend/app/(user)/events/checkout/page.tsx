"use client";

import { Button } from "@/components/ui/button";
import React from "react";

function page() {
  return (
    <div className="min-h-screen container bg-slate-50 ">
      <div className="payment-header flex gap-5 bg-white p-4 mb-5 shadow">
        <button className="border-2 border-black px-5 py-5 rounded-full hover:bg-black/80 hover:text-white transition-all duration-50 ease-linear">
          <i className="fa-solid fa-arrow-left"></i>
        </button>
        <div className="event-info flex flex-col gap-1 text-slate-700 justify-center">
          <h1 className="text-xl font-semibold">Event Name</h1>
          <h4 className="text-sm ">Event date</h4>
        </div>
      </div>

      <section className="payment-section mx-5 flex gap-2">
        <div className="main basis-3/4 shadow bg-white min-h-full flex">
          <div className="side bg-slate-200 min-h-[480px] max-w-20 flex flex-col justify-between items-center py-5">
            <div className="flex flex-col items-center gap-1">
              <span className="bg-slate-800 rounded-full w-10 h-10 text-white text-center leading-10">
                <i className="fa-solid fa-check"></i>
              </span>
              <small className="text-center">Pick Tickets</small>
            </div>

            <div className="flex flex-col items-center gap-1 justify-center">
              <span className="bg-slate-800 rounded-full w-10 h-10 text-white text-center leading-10">
                <i className="fa-solid fa-users"></i>
              </span>
              <small className="text-center">Attendee Details</small>
            </div>

            <div className="flex flex-col items-center gap-1 justify-center">
              <span className="bg-slate-800 rounded-full w-10 h-10 text-white text-center leading-10">
                <i className="fa-solid fa-wallet"></i>
              </span>
              <small className="text-center">Payment</small>
            </div>
          </div>
          <div className="w-full p-4"></div>
        </div>

        <div className="ticket-summary basis-1/4 rounded shadow bg-clip-padding border-[5px] border-slate-200 bg-white sticky top-0 h-fit p-2 flex flex-col gap-2">
          <h2>Ticket Summary</h2>
          <div className="content">
            <ul className="ticket-list mb-4">
              <li className="flex justify-between pe-2">
                <small>Community Ticket</small>
                <small>x1</small>
              </li>
            </ul>
            <div className="total flex justify-between pe-2 ">
              <h3>Total</h3>
              <h3>FREE</h3>
            </div>
          </div>
          <div className="footer">
            <Button className="w-full">Check out</Button>
          </div>
        </div>

      </section>
    </div>
  );
}

export default page;
