"use client";

import { Button } from "@/components/ui/button";
import BasicEventDetails from "@/components/ui/forms/User/CreateEventForms/BasicEventDetails";
import EventLocationDetails from "@/components/ui/forms/User/CreateEventForms/EventLocationDetails";
import EventMedia from "@/components/ui/forms/User/CreateEventForms/EventMedia";
import TicketDetails from "@/components/ui/forms/User/CreateEventForms/TicketDetails";
import IEvent from "@/interfaces/IEvent";
import React, { useState } from "react";
import { eventFormSchema } from "@/lib/utility/schemas";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";


function HostEventPage() { 
  const methods = useForm<z.infer<typeof eventFormSchema>>({
    resolver: zodResolver(eventFormSchema),
    mode:'onBlur',
    reValidateMode:'onSubmit',
    defaultValues: {
      title: "",
      description: "",
      category: "",
      eventType: "In-Person",
      eventBanner: "",
      eventLogo: "",
    },
  });

  const { handleSubmit, reset, formState } = methods;
  const { errors } = formState;

  const onSubmit = (data: z.infer<typeof eventFormSchema>)=>{

  }
  
  return (
    <div className="min-h-screen bg-sky-100 sm:mb-5 sm:mx-16 rounded-lg">
      <div className="header bg-gradient-to-r from-pink-800 flex items-center justify-center to-blue-950 h-28 rounded-b-full">
        <h1 className={`capitalize md:text-4xl text-white font-bold poltawski`}>
          Bring your event to Life: Create, Host, and Connect
        </h1>
      </div>
      <FormProvider {...methods}>
      <form className="form-content flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
        <BasicEventDetails/>
        <EventLocationDetails eventType="In-Person"/>
        <TicketDetails/>
        <EventMedia/>
        <div className="flex items-center justify-end gap-2 pe-10 mb-5">
          <Button variant={"outline"} >Preview Form</Button>
          <Button>Submit Form</Button>
        </div>
      </form>
      </FormProvider>
    </div>
  );
}

export default HostEventPage;
