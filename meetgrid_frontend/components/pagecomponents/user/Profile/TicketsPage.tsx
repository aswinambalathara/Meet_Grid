"use client";
import ITicket from "@/interfaces/ITicket";
import { getTickets } from "@/lib/api/user/TicketsRoutes";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Loading from "../Layout/Loading";

function EventsPage() {
  const [tickets,setTickets] = useState<ITicket[]>([]);
  const [loading,setLoading] = useState(false)
  // useEffect(()=>{
  //   (async ()=>{
  //     try {
  //       const result = await getTickets();
  //       if(result){
  //         setTickets(result.data)
  //       }
  //     } catch (error) {
  //       if(error instanceof Error){
  //         toast.error(error.message)
  //       }
  //     }finally{
  //       setLoading(false)
  //     }
  //   })()
  // },[])

  if(loading){
    return <Loading/>
  }

  return <div className="h-full w-full p-5">
    <h1 className="font-semibold text-lg text-black mb-3">Booked Tickets</h1>
    <ul className="">
      <li className="bg-slate-100 p-2 rounded text-black">

        <h1>Your tickets will list here</h1>
        
      </li>
    </ul>
  </div>;
}

export default EventsPage;
