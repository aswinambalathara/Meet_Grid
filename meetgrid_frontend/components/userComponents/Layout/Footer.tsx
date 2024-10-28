'use client'
import React from "react";
import "@/styles/user.css";
import Image from "next/image";
import { usePathname } from "next/navigation";

function Footer() {
  const path = usePathname()
  if(path.includes('login') || path.includes('signup')){
    return null
  }
  return (
    <div className="user-footer w-full min-h-[350px] bg-footer-brown">
      <div className="footer-content min-h-[350px] p-12 text-white">
        <h4 className=" font-bold font text-3xl mb-10">MEET GRID</h4>
        <div className="footer-contents flex flex-col sm:flex-row justify-between sm:items-center px-5">
          <div className="quick-links mb-5 sm:mb-0 ">
            <strong>Quick Links</strong>
            <ul className="mt-6 font-light">
              <li className="text-sm mb-2">Home</li>
              <li className="text-sm mb-2">Browse Events</li>
              <li className="text-sm mb-2">Host an Event</li>
              <li className="text-sm mb-2">How It Works</li>
            </ul>
          </div>
          <div className="company mb-5 sm:mb-0 ">
            <strong>Company</strong>
            <ul className="mt-6 font-light">
              <li className="text-sm mb-2">About Us</li>
              <li className="text-sm mb-2">Contact Us</li>
              <li className="text-sm mb-2">Help & Support</li>
              <li className="text-sm mb-2">Privacy Policy</li>
            </ul>
          </div>
          <div className="social flex flex-col justify-center sm:items-center mr-8">
            <strong>Follow Us</strong>
            <ul className="mt-6 flex">
              <li className="mr-3">
                <Image
                  src="/icons/insta.svg"
                  alt="instagram"
                  width={25}
                  height={25}
                />
              </li>
              <li className="mr-3">
                <Image
                  src="/icons/facebook.svg"
                  alt="instagram"
                  width={25}
                  height={25}
                />
              </li>
              <li className="mr-3">
                <Image
                  src="/icons/linkedin.svg"
                  alt="instagram"
                  width={25}
                  height={25}
                />
              </li>
              <li className="mr-3">
                <Image
                  src="/icons/x.svg"
                  alt="instagram"
                  width={25}
                  height={25}
                />
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="copyright h-12 text-white flex justify-center items-center bg-black">
        <small>&copy;2024 MeetGrid. All rights reserved.</small>
      </div>
    </div>
  );
}

export default Footer;
