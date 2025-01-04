import { Button } from "@/components/ui/button";
import React from "react";

function page() {
  return (

    <div className="min-h-screen px-5 flex gap-4 relative  ">
      <section className="main basis-3/4 rounded-lg overflow-y-auto bg-white/70">
        <div className="logo-nav bg-white w-full p-2 rounded-t-lg">
          <img
            src="https://media.konfhub.com/event_poster/2024/October/22/1729579213632-2b78df2b-afd6-4dff-93a7-430ffdfc1359.png"
            className="logo rounded-lg"
            alt=""
            width={"100px"}
            height={"100px"}
          />
        </div>
        <div className="content flex flex-col p-4 gap-5">
          <div className="banner ">
            <img
              src="https://media.konfhub.com/event_poster/2024/October/22/1729579213632-2b78df2b-afd6-4dff-93a7-430ffdfc1359.png"
              alt="event-banner"
              className="w-full rounded max-h-[600px]"
            />
          </div>

          <div className="about-event">
            <h2 className="font-semiboldbold text-xl ">About Event</h2>
            <div className="about-content">
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni
                error a animi mollitia itaque corporis dolor, iste nam odio
                officia facilis eius labore maxime neque, sit voluptatem porro
                placeat laudantium.
              </p>
            </div>
          </div>

          <div className="tickets-section">
            <h2 className="font-semiboldbold text-xl">Tickets</h2>
            <div className="ticket-content mt-5">
              <ul>
                <li className="w-full min-h-36 bg-slate-300 rounded p-3">
                  <h2 className="ticket-title text-lg font-semibold">
                    Ticket Title
                  </h2>
                  <h5 className="ticket-description ">Ticket description</h5>

                  <div className="availability flex gap-1 text-sm items-center py-1 mb-5">
                    <h3>Available Till: </h3>
                    <h3>20th Dec 2024, 05:00 PM IST</h3>
                  </div>

                  <div className="ticket-footer flex justify-between px-1">
                    <h1 className="ticket-type uppercase text-2xl font-bold">
                      Free
                    </h1>
                    <Button>Register Now</Button>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>

      </section>

      <section className="side-section bg-slate-50/70 rounded-lg p-5 flex flex-col gap-3 h-fit sticky top-0 w-1/4 ">
        <h2 className="event-title text-2xl font-bold">
          Agile Conferance 2024
        </h2>

        <div className="flex gap-3 text-slate-700">
          <p className="capitalize">
            <span>
              <i className="fa-solid fa-globe me-3"></i>
            </span>
            In-person
          </p>
          <p className="capitalize">
            <span>
              <i className="fa-solid fa-ticket me-3"></i>
            </span>
            Paid
          </p>
        </div>

        <div className="venue">
          <h5 className="font-semibold">Venue: </h5>
          <h6 className="text-sm">
            Lorem ipsum dolor, luptatem fuga facere, quaerat magnam ut? Numquam
            quas molestias quasi. Fuga, cumque vero!
          </h6>

          <h6 className="landmark mt-3">Near something</h6>
        </div>

        <div className="date">
          <h3 className="text-base">Dec 20th, 2024 5:00 PM to 8:00 PM IST</h3>
        </div>

        <div className="countdown flex flex-col">
          <h3>Event Starts IN </h3>
          <div className="counter text-3xl font-bold ">4D : 5H : 28M : 7S</div>
        </div>

        <div className="action-buttons w-full flex flex-col gap-3 mb-3">
          <Button className="py-5">Buy Now</Button>
          <Button className="py-5" variant={"secondary"}>
            Official Website{" "}
            <i className="fa-solid fa-arrow-up-right-from-square"></i>
          </Button>
        </div>

        <div className="hosted-by border border-black rounded p-3">
          <h1 className="text-sm">Hoster By:</h1>
          <div className="content mt-3 flex flex-col">
            <h2 className="font-medium text-lg">Nikhil Neelakandan</h2>

            <h5 className="text-sm italic mt-3">
              Description about the event organisor Lorem ipsum dolor, sit amet
              consectetur adipisicing elit. Maxime placeat voluptas repudiandae
              dolore, beatae architecto cupiditate fugit tempora iusto sint
              necessitatibus neque quidem quod minima accusamus expedita
              pariatur molestias voluptatibus?
            </h5>

            <div className="social mt-4">
              <h2 className="capitalize text-lg ">Contact us on</h2>
              <div className="icons flex gap-2 text-xl mt-1 p-1">
                <i className="fa-brands fa-linkedin"></i>
                <i className="fa-solid fa-globe"></i>
                <i className="fa-solid fa-envelope"></i>
                <i className="fa-solid fa-square-phone"></i>
              </div>
            </div>
          </div>
        </div>
      </section>
      
    </div>

    
  );
}

export default page;
