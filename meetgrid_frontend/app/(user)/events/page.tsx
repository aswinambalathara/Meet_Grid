import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";

function page() {
  return (
    <div className="min-h-screen">
      <section className="banner h-80 w-full relative flex items-center justify-center mb-8">
        <Image
          src={"/images/event-bac-1.jpg"}
          fill
          alt="banner"
          className="object-cover blur-sm brightness-75"
        />
        <div className="banner-content absolute alegreya flex flex-col items-center justify-center">
          <h1 className="text-4xl font-extrabold">
            <span className="text-red-600">Discover</span> Your Next{" "}
            <span className="text-amber-600">Great Experience</span>
          </h1>
          <h5 className="font-semibold text-lg text-white">
            Explore a diverse range of local and virtual events tailored to your
            interests.
          </h5>
        </div>
      </section>
      <section className="section-events border border-b-0 min-h-96 overflow-auto rounded-t-xl">
        <div className="event-selectors flex gap-3 justify-center items-center">
          <Button className="w-[200px] bg-white text-black rounded-b-2xl hover:bg-white hover:text-black">
            Professional & Business
          </Button>
          <Button className="w-[200px] rounded-b-2xl ring-1 bg-transparent hover:bg-white hover:text-black ring-white">
            General
          </Button>
        </div>
      </section>
    </div>
  );
}

export default page;
