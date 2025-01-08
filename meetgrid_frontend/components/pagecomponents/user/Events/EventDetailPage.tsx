"use client";

import Loading from "@/components/pagecomponents/user/Layout/Loading";
import { Button } from "@/components/ui/button";
import CountdownTimer from "@/components/ui/Utils/CountdownTimer";
import IEvent from "@/interfaces/IEvent";
import { getEvent } from "@/lib/api/user/EventRoutes";
import { selectedEventId } from "@/redux/slices/CheckoutSlice";
import moment from "moment";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

function EventDetailPage() {
  const pathParams = useParams();
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = pathParams;
  const [loading, setLoading] = useState(true);
  const [event, setEvent] = useState<IEvent | null>(null);

  const eventDeadline = moment(
    event?.ticket.registrationDeadline.toString()
  ).format("DD-MM-YYYY hh:mm A");
  const startDate = moment(event?.startDate).format("MMMM Do YYYY, h:mm A");
  const endDate = moment(event?.endDate).format("MMMM Do YYYY, h:mm A");
  useEffect(() => {
    (async () => {
      try {
        const response = await getEvent(id as string);
        setEvent(response.data);
      } catch (error) {
        if (error instanceof Error) {
          toast.error(error.message);
        }
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleContactActions = (contact: string, type: "email" | "phone") => {
    if (type !== "email") {
      navigator.clipboard
        .writeText(contact)
        .then(() => toast.success("Phone number copied to clipboard"))
        .catch((error) => {
          console.error(error);
          if (error instanceof Error) {
            toast.error(error.message);
          }
        });
      return;
    }
    navigator.clipboard
      .writeText(contact)
      .then(() => toast.success("Email copied to clipboard"))
      .catch((error) => {
        console.error(error);
        if (error instanceof Error) {
          toast.error(error.message);
        }
      });
    window.location.href = `mailto:${contact}`;
  };

  const handleRegister = () => {
    dispatch(selectedEventId(event?._id));
    router.push('/events/checkout')
  };

  if (loading) {
    return <Loading />;
  }

  //console.log(event?.location);

  return (
    <div className="min-h-screen px-5 flex gap-4 relative  ">
      <section className="main basis-3/4 rounded-lg overflow-y-auto bg-white/70">
        <div className="logo-nav bg-white w-full p-2 rounded-t-lg">
          <img
            src={event?.eventLogo?.url}
            className="logo rounded-lg size-[70px]"
            alt="  "
            width={"70px"}
            height={"70px"}
          />
        </div>
        <div className="content flex flex-col p-4 gap-5">
          <div className="banner ">
            <img
              src={event?.eventBanner?.url}
              alt="event-banner"
              className="w-full rounded max-h-[600px]"
            />
          </div>

          <div className="about-event">
            <h2 className="font-semiboldbold text-xl ">About Event</h2>
            <div className="about-content">
              <p>{event?.description}</p>
            </div>
          </div>

          <div className="tickets-section">
            <h2 className="font-semiboldbold text-xl">Tickets</h2>
            <div className="ticket-content mt-5">
              <ul>
                <li className="w-full min-h-36 bg-slate-300 rounded p-3">
                  <div className="top-row flex justify-between">
                    <h2 className="ticket-title text-lg font-semibold">
                      {event?.ticket.ticketName || "Normal Ticket"}
                    </h2>
                    <h3 className="bg-blue-500 p-1 rounded text-sm">
                      Tickets Left :{" "}
                      <span className="font-semibold text-red-800">
                        {event?.ticket.availableTickets}
                      </span>
                    </h3>
                  </div>
                  <h5 className="ticket-description ">
                    {event?.ticket.ticketDescription || "Normal Ticket"}
                  </h5>
                  <div className="availability flex gap-1 text-sm items-center py-1 mb-5">
                    <h3>Available Till: </h3>
                    <h3>{eventDeadline}</h3>
                  </div>

                  <div className="ticket-footer flex justify-between px-1">
                    <h1 className="ticket-type uppercase text-2xl font-bold">
                      {event?.ticket.ticketType}
                    </h1>
                    <Button onClick={handleRegister}>Register Now</Button>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="side-section bg-slate-50/70 rounded-lg p-5 flex flex-col gap-3 h-fit sticky top-0 w-1/4 ">
        <h2 className="event-title text-2xl font-bold">{event?.title}</h2>

        <div className="flex gap-3 text-slate-700">
          <p className="capitalize">
            <span>
              <i className="fa-solid fa-globe me-3"></i>
            </span>
            {event?.eventType}
          </p>
          <p className="capitalize">
            <span>
              <i className="fa-solid fa-ticket me-3"></i>
            </span>
            {event?.ticket.ticketType}
          </p>
        </div>

        {event?.eventType === "In-Person" && (
          <div className="venue">
            <h5 className="font-semibold">Venue: </h5>
            <p className="venue-name font-bold">{event.location?.venueName}</p>
            <p className="address text-sm">
              {event.location?.streetAddress}, {event.location?.city},{" "}
              {event.location?.state}, {event.location?.country},{" "}
              {event.location?.pincode}
            </p>
          </div>
        )}

        <div className="date text-sm">
          <p>
            From: <span className="font-semibold">{startDate}</span>
          </p>
          <p>
            To: <span className="font-semibold">{endDate}</span>
          </p>
        </div>

        <div className="countdown flex flex-col">
          <h3>Event Starts IN </h3>
          <CountdownTimer targetDate={event?.startDate.toString()!} />
        </div>

        <div className="action-buttons w-full flex flex-col gap-3 mb-3">
          <Button className="py-5" onClick={handleRegister}>Register Now</Button>
          {event?.eventType === "In-Person" && (
            <Link
              target="_blank"
              href={event.location?.googleMapLink!}
              className="bg-blue-800 shadow-sm hover:bg-blue-700 p-2 text-white rounded text-center"
            >
              Get Directions
            </Link>
          )}
          {/* <Button className="py-5" variant={"secondary"}>
            Official Website{" "}
            <i className="fa-solid fa-arrow-up-right-from-square"></i>
          </Button> */}
        </div>

        <div className="hosted-by border border-black rounded p-3">
          <h1 className="text-sm">Hoster By:</h1>
          <div className="content mt-3 flex flex-col">
            <div className="flex gap-2 items-center">
              <img
                className="rounded-full"
                src={event?.organizer?.image?.url}
                alt="organizor-image"
                height={50}
                width={50}
              />
              <h2 className="font-medium text-lg">
                {event?.organizer?.fullName}
              </h2>
            </div>

            <h5 className="text-sm italic mt-3">{event?.organizer?.bio}</h5>

            <div className="social mt-4" id="social">
              <h2 className="capitalize text-lg ">Contact us on</h2>
              <div className="icons flex items-center gap-2 text-xl mt-1 p-1">
                <a
                  href={
                    `https://${event?.organizer?.professionalInfo
                      ?.linkedinUrl!}` || "#social"
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fa-brands fa-linkedin cursor-pointer" />
                </a>
                <i className="fa-solid fa-globe cursor-pointer"></i>
                <i
                  className="fa-solid fa-envelope cursor-pointer"
                  onClick={() =>
                    handleContactActions(event?.organizer?.email!, "email")
                  }
                ></i>
                <i
                  className="fa-solid fa-square-phone cursor-pointer"
                  onClick={() =>
                    handleContactActions(event?.organizer?.phone!, "phone")
                  }
                ></i>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default EventDetailPage;
