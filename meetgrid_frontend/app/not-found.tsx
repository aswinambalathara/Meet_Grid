import Link from "next/link";
import React from "react";

function adminNotfound() {
  return (
    <div className="container min-h-screen w-full flex flex-col items-center justify-center bg-black">
      <div className="flex flex-col gap-1 items-center mb-10">
        <h1 className="text-4xl font-extrabold text-blue-900">404! </h1>
         <h2 className="text-4xl font-light text-blue-800">The page you are looking for not found </h2>
      </div>
      <button className="py-2 px-3 bg-slate-600 hover:bg-slate-400 rounded-md text-white transition-all ease-linear duration-100">
        <Link href={'/'}>Back to Home</Link>
      </button>
    </div>
  );
}

export default adminNotfound;
