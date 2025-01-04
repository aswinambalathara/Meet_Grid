import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";

function page() {
  return (
    <div className="min-h-screen  sm:px-16  pt-5">
      <div className="container bg-white/70 min-h-screen rounded-t-3xl p-14">
        <div className="header flex flex-col sm:flex-row items-center gap-4 mb-5 relative">
          <Image
            src={"/images/profile-img.jpg"}
            className="rounded-full"
            alt="Profile-Pic"
            width={120}
            height={120}
          />
          <div className="active-indicator rounded-full h-4 w-4 bg-green-600 absolute bottom-4 left-[102px]"/>
          <div className="user-summary flex-1">
            <h2>Aswin Nair T M</h2>
            <h3>Senior Software Developer</h3>
          </div>
          <div className="actions flex flex-row sm:flex-col items-center justify-center gap-2">
            <Button>Connect</Button>
            <Button variant={"secondary"}>Message</Button>
          </div>
        </div>

        <div className="middle flex flex-col mb-10">
          <ul className="flex flex-col overflow-hidden lg:ps-32 gap-3 mb-5">
            <li className="inline-flex gap-1">
              <div className="head-text inline-flex gap-1">
                <i className="fa-regular fa-building text-black/50"></i>
                <p className="text-sm font-semibold">Company : </p>
              </div>
              <p className="text-sm">Fleapo Private Limited</p>
            </li>
            <li className="inline-flex gap-1">
              <div className="head-text inline-flex gap-1">
                <i className="fa-solid fa-location-dot text-black/50"></i>
                <p className="text-sm font-semibold">Location : </p>
              </div>
              <p className="text-sm">Trivandrum, Kerala</p>
            </li>
          </ul>

          <div className="bio-section bg-gray-500/50 rounded-2xl min-h-24 lg:ms-32 px-9 py-2 relative">
            <i className="fa-regular fa-address-book text-black/50 absolute left-3 top-3"></i>
            <p className="text-sm text-black">
              I am a passionate MERN stack developer with expertise in
              TypeScript, Next.js, and solving complex programming challenges.
              With a foundation in B.Com, I transitioned into software
              development through self-learning, embracing a growth mindset and
              a commitment to excellence. I specialize in building scalable web
              applications, optimizing user experiences, and delivering robust
              backend solutions. Currently, I’m honing my skills in
              cybersecurity and MongoDB while exploring opportunities in
              freelance development. Beyond coding, I enjoy collaborating on
              innovative projects, sharing knowledge, and continuously learning
              to stay ahead in the tech world.
            </p>
          </div>
        </div>

        <div className="end-section flex justify-start ps-32 gap-40">
          <div className="skills-section">
            <h4 className="font-semibold text-sm">Skills</h4>
            <ul className="list-disc ms-5">
              <li>Javascript</li>
              <li>Webdevoloper</li>
              <li>React</li>
            </ul>
          </div>
          <div className="social-links">
            <h4 className="font-semibold text-sm">Social Links</h4>
            <ul>
              <li className="inline-flex gap-2">
                <i className="fa-brands fa-linkedin text-blue-600"></i>
                <p className="text-sm ">Aswin Nair T M</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
