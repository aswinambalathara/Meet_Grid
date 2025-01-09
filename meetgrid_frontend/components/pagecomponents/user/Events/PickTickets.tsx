import { Button } from "@/components/ui/button";
import IEvent from "@/interfaces/IEvent";
import { updateQuantity } from "@/redux/slices/CheckoutSlice";
import { RootState } from "@/redux/store";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

function PickTickets(ticket:IEvent['ticket']) {
  const {quantity} = useSelector((state:RootState)=>state.checkout)
  const dispatch = useDispatch()
  return (
    <div className="w-full h-full">
      <h1 className="mb-2">Select Your Tickets</h1>
      <div className="ticket-detail bg-stone-50 border shadow-sm w-full rounded px-3 pt-3 pb-5 flex flex-col gap-5">
        <div className="top-row flex justify-between items-start">
        <div className="flex flex-col gap-1">
          <h1 className="text-xl">{ticket.ticketName}</h1>
          <h3 className="ticket-des text-sm font-light text-slate-600">{ticket.ticketDescription}</h3>
        </div>
        <h2 className="uppercase font-bold text-xl">{ticket.ticketType}</h2>
        </div>
        <div className="bottom flex justify-between">
            <div className="price flex gap-1 items-end">
                <span className="currency capitalize text-sm">INR</span>
                <p className="font-semibold text-xl">{ticket.price}</p>
            </div>
            <div className="quantity flex gap-3 items-center">
                <button onClick={()=>dispatch(updateQuantity(quantity-1))} className="add rounded-full size-10 bg-yellow-500 hover:bg-yellow-600 hover:text-white transition-all"><i className="fa-solid fa-minus"/></button>
                <span className="text-2xl">{quantity}</span>
                <button onClick={()=>dispatch(updateQuantity(quantity+1))} className="reduce rounded-full size-10 bg-yellow-500 hover:bg-yellow-600 hover:text-white transition-all"><i className="fa-solid fa-plus"/></button>
            </div>
        </div>
      </div>
    </div>
  );
}

export default PickTickets;
