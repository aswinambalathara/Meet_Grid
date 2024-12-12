import React from "react";
import CarousalComp from "@/components/pagecomponents/user/Home/CarousalComp";
import { FeatureCards } from "@/lib/constants";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import TrendingEvents from "@/components/pagecomponents/user/Home/TrendingEvents";

function Page() {
  return (
    <main className="home-page min-h-screen w-full">
      <CarousalComp />
      <TrendingEvents/>
      <div className="features-section flex flex-col items-center text-white gap-10 px-5 py-16">
        <h1 className="poltawski text-2xl text-center">
          "Your Ultimate Platform for Events and Connections Discover, host, and
          connect through local and virtual events effortlessly."
        </h1>
        <div className="feature-cards flex flex-col md:flex-row justify-center gap-8">
          {FeatureCards.map((feature, idx) => (
            <Card
              key={idx}
              className={`h-64 w-72 p-5 shadow-stone-500 shadow-md ${
                idx === Math.floor(FeatureCards.length / 2) && "mt-5"
              }`}
            >
              <CardTitle className="mb-10">{feature.title}</CardTitle>
              <CardContent className="p-0">"{feature.des}"</CardContent>
            </Card>
          ))}
        </div>
      </div>
      <div className="final-action px-16 py-16 text-white bg-stone-800 ">
          <h1 className="text-2xl poltawski sm:ms-10">Join MeetGrid and Elevate Your Event Experience!</h1>
          <h2 className="text-xl poltawski sm:ms-10">Discover events, connect with participants, and make every moment count. Sign up now!</h2>
          <div className="action-buttons sm:ms-10 mt-10 flex items-center gap-3 text-black">
            <Button className="bg-orange-700 hover:bg-orange-800">Host Events</Button>
            <Button className=" bg-none ring-1 ring-orange-700 hover:bg-orange-700">Sign Up</Button>
          </div>
        </div>
    </main>
  );
}

export default Page;
