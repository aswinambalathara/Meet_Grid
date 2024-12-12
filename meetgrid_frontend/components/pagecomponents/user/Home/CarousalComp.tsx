"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { HeroContent } from "@/lib/constants";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";

function CarousalComp() {
  return (
    <div className="hero-section  w-full h-[450px] relative">
      <Carousel className="absolute inset-0 w-full h-full flex">
        <CarouselContent className="flex w-full h-full">
          {HeroContent.map((item) => (
            <CarouselItem
              key={item.id}
              className="w-full h-full flex items-center justify-center"
            >
              <Card className="bg-stone-800 w-[90%] h-[80%] border-none flex flex-col justify-between overflow-auto">
                <CardHeader className="alegreya text-white">
                  <CardTitle className="text-lg sm:text-xl md:text-2xl lg:text-3xl">{item.title}</CardTitle>
                  <CardDescription className="text-sm sm:text-base md:text-lg lg:text-xl text-white">
                    {item.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="Action-buttons flex items-center gap-3 ">
                    <Button className="bg-slate-50 text-black hover:bg-slate-200">
                      Host Events <i className="fa-solid fa-chevron-right"></i>
                    </Button>
                    <Button className="bg-none ring-1 ring-slate-50 hover:bg-slate-50 hover:text-black">
                      Explore Events{" "}
                      <i className="fa-solid fa-chevron-right"></i>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-4 top-1/2 transform -translate-y-1/2" />
        <CarouselNext className="absolute right-4 top-1/2 transform -translate-y-1/2" />
      </Carousel>
    </div>
  );
}

export default CarousalComp;
