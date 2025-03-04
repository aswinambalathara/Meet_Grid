"use client";

import React, { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import BasicEventDetails from "@/components/ui/forms/User/CreateEventForms/BasicEventDetails";
import EventLocationDetails from "@/components/ui/forms/User/CreateEventForms/EventLocationDetails";
import EventMedia from "@/components/ui/forms/User/CreateEventForms/EventMedia";
import TicketDetails from "@/components/ui/forms/User/CreateEventForms/TicketDetails";
import { EventFormSchema } from "@/lib/utility/schemas";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { category, EventFormData } from "@/lib/utility/types";
import toast, { Toaster } from "react-hot-toast";
import { getEventCategories } from "@/lib/api/user/EventRoutes";
import useImageUpload from "@/lib/hooks/useImageUpload";
import { HostEvent } from "@/lib/api/user/EventRoutes";

function HostEventPage() {
  const methods = useForm<EventFormData>({
    resolver: zodResolver(EventFormSchema),
    mode: "all",
    defaultValues: {
      allowConnections: true,
      eventType: undefined,
      category: "",
      description: "",
      endDate: undefined,
      eventBanner: undefined,
      eventLogo: undefined,
      bannerImageFile: undefined,
      location: {},
      logoImageFile: undefined,
      rulesAndInstructions: "",
      startDate: undefined,
      ticket: {},
      title: "",
      virtualDetails: {},
    },
  });
  const [loading, setLoading] = useState({ status: false, flag: "" });
  const [eventCategories, setEventCategories] = useState<category[]>([]);

  const fetchEventCategories = useCallback(async () => {
    try {
      const result = await getEventCategories();
      setEventCategories(result.data);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An unknown error occurred");
      }
    }
  }, []);

  useEffect(() => {
    if (eventCategories.length === 0) {
      fetchEventCategories();
    }
  }, [fetchEventCategories]);

  const eventType = methods.watch("eventType") || "In-Person";

  const onFormSubmit = async (data: EventFormData) => {
    try {
      setLoading({ status: true, flag: "Uploading Images" });
      const { logoImageFile, bannerImageFile, ...rest } = data;
      // upload images
      const uploadLogo = await useImageUpload(logoImageFile, "images/logos");
      const uploadBanner = await useImageUpload(
        bannerImageFile,
        "images/banners"
      );
      if (uploadLogo) {
        rest.eventLogo = {
          url: uploadLogo.newImageURL,
          public_id: uploadLogo.newImagePublicId,
        };
      }
      if (uploadBanner) {
        rest.eventBanner = {
          url: uploadBanner.newImageURL,
          public_id: uploadBanner.newImagePublicId,
        };
      }
      setLoading({ flag: "Creating Event", status: true });
      const createEvent = await HostEvent(rest);
      toast.success(createEvent.message);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    } finally {
      setLoading({ flag: "", status: false });
    }
  };

  console.error(methods.formState.errors, "logging from main");
  //console.log(methods.getValues())
  return (
    <div className="min-h-screen bg-sky-100 sm:mb-5 sm:mx-16 rounded-lg">
      <Toaster />
      <div className="header bg-gradient-to-r from-pink-800 flex items-center justify-center to-blue-950 h-28 rounded-b-full">
        <h1 className={`capitalize md:text-4xl text-white font-bold poltawski`}>
          Bring your event to Life: Create, Host, and Connect
        </h1>
      </div>
      <FormProvider {...methods}>
        <form
          className="form-content flex flex-col gap-3"
          onSubmit={methods.handleSubmit(onFormSubmit)}
        >
          <BasicEventDetails categories={eventCategories} />
          {eventType && <EventLocationDetails eventType={eventType} />}
          <TicketDetails />
          <EventMedia />
          <div className="flex items-center justify-end gap-2 pe-10 mb-5">
            {/* <Button type="button" variant={"outline"}>
              Reset Form
            </Button> */}
            <Button type="submit" disabled={loading.status}>
              {loading.status ? loading.flag : "Submit Form"}
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}

export default HostEventPage;
