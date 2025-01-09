"use client";
import React, { lazy, Suspense, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Loading from "../Layout/Loading";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import UserNotFound from "@/app/not-found";
import toast from "react-hot-toast";
import { getEvent } from "@/lib/api/user/EventRoutes";
import { updateTicketPrice } from "@/redux/slices/CheckoutSlice";
import IEvent from "@/interfaces/IEvent";
import { formatDate } from "@/lib/utility/Helpers";
const PickTickets = lazy(
  () => import("@/components/pagecomponents/user/Events/PickTickets")
);
const AttendeeDetails = lazy(
  () => import("@/components/pagecomponents/user/Events/AttendeeDetails")
);
const PaymentPage = lazy(
  () => import("@/components/pagecomponents/user/Events/PaymentPage")
);

function Checkout() {
  const {
    eventId,
    quantity,
    ticketPrice,
    totalPrice,
    billingAddress,
    payment,
    attendees,
  } = useSelector((state: RootState) => state.checkout);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [event, setEvent] = useState<IEvent | null>(null);
  const steps = ["PICK-TICKETS", "ATTENDEE-DETAILS", "PAYMENT"];
  const [activeStep, setActiveStep] = useState<(typeof steps)[number]>(
    steps[0]
  );

  useEffect(() => {
    const handlePopState = () => {
      console.log("user clicked back button");
    };

    (async () => {
      try {
        const result = await getEvent(eventId);
        setEvent(result.data);
        dispatch(updateTicketPrice(result.data.ticket.price));
      } catch (error) {
        if (error instanceof Error) {
          toast.error(error.message);
        }
      } finally {
        setLoading(false);
      }
    })();

    window.addEventListener("popstate", handlePopState);
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  const renderStep = () => {
    switch (activeStep) {
      case "PICK-TICKETS":
        return <PickTickets {...event?.ticket!} />;
      case "ATTENDEE-DETAILS":
        return <AttendeeDetails />;
      case "PAYMENT":
        return <PaymentPage />;
    }
  };

  const validateAttendees = () => {
    if (!attendees || attendees.length === 0) {
      return false;
    }
    const requiredFields: Array<keyof (typeof attendees)[0]> = [
      "fullName",
      "phone",
    ];

    return attendees.every((attendee) =>
      requiredFields.every((field) => !!attendee[field])
    );
  };

  console.log(attendees);

  const handleProceed = () => {
    if (activeStep === "PICK-TICKETS") {
      setActiveStep(steps[steps.indexOf(activeStep) + 1]);
      return;
    }

    if (activeStep === "ATTENDEE-DETAILS") {
      const isReady = validateAttendees();
      if (!isReady || !attendees?.length) {
        toast.error("Fill all forms and save before proceeding");
        return;
      }
      setActiveStep(steps[steps.indexOf(activeStep) + 1]);
    }

    if (activeStep === "PAYMENT") {
      if (!billingAddress) {
        toast.error("Please add billing address");
        return;
      }

      if (!payment?.method) {
        toast.error("Please select payment method");
        return;
      }
    }
  };

  const handleBackButton = () => {
    const activeStepIdx = steps.indexOf(activeStep);
    if (activeStepIdx <= 0) return;
    setActiveStep(steps[activeStepIdx - 1]);
  };

  if (!eventId) {
    return UserNotFound();
  }

  if (loading) {
    return <Loading />;
  }


  return (
    <div className="min-h-screen container bg-slate-50 ">
      <div className="payment-header flex gap-5 bg-white p-4 mb-5 shadow">
        <button
          onClick={handleBackButton}
          className="border-2 border-black px-5 py-5 rounded-full hover:bg-black/80 hover:text-white transition-all duration-50 ease-linear"
        >
          <i className="fa-solid fa-arrow-left"></i>
        </button>

        <div className="event-info flex flex-col gap-1 text-slate-700 justify-center">
          <h1 className="text-xl font-semibold">{event?.title}</h1>
          <h4 className="text-sm ">
            {formatDate(
              event?.startDate.toString()!,
              "MMMM Do YYYY, h:mm:ss A"
            )}{" "}
            TO{" "}
            {formatDate(event?.endDate.toString()!, "MMMM Do YYYY, h:mm:ss A")}
          </h4>
        </div>
      </div>

      <section className="payment-section mx-5 flex flex-col sm:flex-row gap-2">
        <div className="main basis-3/4 shadow bg-white min-h-full flex">
          <div className="side bg-slate-200 min-h-[480px] max-w-20 flex flex-col justify-between items-center py-5 relative">
            <div className="flex flex-col items-center justify-center gap-1 drop-shadow">
              <span
                className={`rounded-full w-10 h-10 text-center leading-10 ${
                  steps.indexOf(activeStep) >= steps.indexOf("PICK-TICKETS")
                    ? "bg-slate-800 text-white"
                    : "bg-white"
                }`}
              >
                <i className="fa-solid fa-check"></i>
              </span>
              <small className="text-center z-10">Pick Tickets</small>
            </div>

            <div className="flex flex-col items-center gap-1 justify-center drop-shadow">
              <span
                className={`rounded-full w-10 h-10  text-center leading-10 ${
                  steps.indexOf(activeStep) >= steps.indexOf("ATTENDEE-DETAILS")
                    ? "bg-slate-800 text-white"
                    : "bg-white"
                }`}
              >
                <i className="fa-solid fa-users"></i>
              </span>
              <small className="text-center">Attendee Details</small>
            </div>

            <div className="flex flex-col items-center gap-1 justify-center drop-shadow">
              <span
                className={`rounded-full w-10 h-10 text-center leading-10 ${
                  steps.indexOf(activeStep) >= steps.indexOf("PAYMENT")
                    ? "bg-slate-800 text-white"
                    : "bg-white"
                }`}
              >
                <i className="fa-solid fa-wallet"></i>
              </span>
              <small className="text-center">Payment</small>
            </div>
          </div>

          <div className="w-full p-4 step-display">
            <Suspense fallback={<Loading />}>{renderStep()}</Suspense>
          </div>
        </div>

        <div className="ticket-summary basis-1/4 rounded shadow bg-clip-padding border-[5px] border-slate-200 bg-white sticky top-0 h-fit p-2 flex flex-col gap-2">
          <h2>Ticket Summary</h2>
          <div className="content">
            <ul className="ticket-list mb-4">
              <li className="flex justify-between pe-2">
                <small>{event?.ticket.ticketName}</small>
                <small>x{quantity}</small>
              </li>
              <li className="flex justify-between pe-2">
                <small>Sub Total</small>
                <small>{quantity * ticketPrice}</small>
              </li>
            </ul>
            <div className="total flex justify-between pe-2 ">
              <h3>Total</h3>
              <h3>
                {event?.ticket.ticketType === "Free" ? "Free" : totalPrice}
              </h3>
            </div>
          </div>
          <div className="footer">
            <Button onClick={handleProceed} className="w-full">
              {activeStep === "PAYMENT"
                ? "Checkout"
                : `Proceed to ${steps[steps.indexOf(activeStep) + 1]}`}
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Checkout;
