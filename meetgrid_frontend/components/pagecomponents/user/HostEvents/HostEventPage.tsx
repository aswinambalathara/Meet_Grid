"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import BasicEventDetails from "@/components/ui/forms/User/CreateEventForms/BasicEventDetails";
import EventLocationDetails from "@/components/ui/forms/User/CreateEventForms/EventLocationDetails";
import EventMedia from "@/components/ui/forms/User/CreateEventForms/EventMedia";
import TicketDetails from "@/components/ui/forms/User/CreateEventForms/TicketDetails";
import { eventFormSchema } from "@/lib/utility/schemas";
import { useForm,FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { EventFormData } from "@/lib/utility/types";
import { Toaster } from "react-hot-toast";


function HostEventPage() { 
  const methods = useForm<EventFormData>({
    resolver: zodResolver(eventFormSchema),
    mode:'onChange',
    reValidateMode:'onSubmit',
  });


  const eventType = methods.watch('eventType') || 'In-Person'
  
  const onFormSubmit = (data: EventFormData)=>{
    console.log('hi')
    console.log(methods.formState.errors)
console.log(data)
  }
console.log(methods.formState.errors ,'hi')

  return (
    <div className="min-h-screen bg-sky-100 sm:mb-5 sm:mx-16 rounded-lg">
      <Toaster/>
      <div className="header bg-gradient-to-r from-pink-800 flex items-center justify-center to-blue-950 h-28 rounded-b-full">
        <h1 className={`capitalize md:text-4xl text-white font-bold poltawski`}>
          Bring your event to Life: Create, Host, and Connect
        </h1>
      </div>
      <FormProvider {...methods}>
      <form className="form-content flex flex-col gap-3" onSubmit={methods.handleSubmit(onFormSubmit)}>
        <BasicEventDetails />
        {eventType && <EventLocationDetails eventType={eventType}/>}
        <TicketDetails/>
        <EventMedia/>
        <div className="flex items-center justify-end gap-2 pe-10 mb-5">
          <Button type="button" variant={"outline"} >Preview Form</Button>
          <Button >Submit Form</Button>
        </div>
      </form>
      </FormProvider>
    </div>
  );
}

export default HostEventPage;
