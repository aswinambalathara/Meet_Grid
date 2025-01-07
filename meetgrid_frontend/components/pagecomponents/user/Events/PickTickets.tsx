import { Button } from "@/components/ui/button";
import React from "react";

function PickTickets() {
  return (
    <div className="w-full h-full">
      <h1 className="mb-2">Select Your Tickets</h1>
      <div className="ticket-detail bg-stone-50 border shadow-sm w-full rounded px-3 pt-3 pb-5 flex flex-col gap-5">
        <div className="top-row flex justify-between items-start">
        <div className="flex flex-col gap-1">
          <h1 className="text-xl">Ticket Name</h1>
          <h3 className="ticket-des text-sm font-light text-slate-600">Ticket description</h3>
        </div>
        <h2 className="uppercase font-bold text-xl">Paid</h2>
        </div>
        <div className="bottom flex justify-between">
            <div className="price flex gap-1 items-end">
                <span className="currency capitalize text-sm">INR</span>
                <p className="font-semibold text-xl">200</p>
            </div>
            <div className="quantity flex gap-2 items-center">
                <button className="add rounded-full size-10 bg-yellow-500 hover:bg-yellow-600 hover:text-white transition-all"><i className="fa-solid fa-minus"/></button>
                <span className="text-2xl">1</span>
                <button className="reduce rounded-full size-10 bg-yellow-500 hover:bg-yellow-600 hover:text-white transition-all"><i className="fa-solid fa-plus"/></button>
            </div>
        </div>
      </div>
    </div>
  );
}

export default PickTickets;
