'use client'

import { Calendar, CheckCircle, Home } from "lucide-react";
import Link from "next/link";
import React from "react";

function Confirmation() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center">
        <div className="mb-6">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
        </div>

        <h1 className="text-2xl font-bold text-gray-800 mb-2">Success!</h1>
        <p className="text-gray-600 mb-8">
          Your event has been created successfully.
        </p>

        <div className="space-y-4">
          <Link
            href={"/"}
            className="w-full flex items-center justify-center gap-2 bg-white border-2 border-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors duration-200"
          >
            <Home className="w-5 h-5" />
            <span>Go to Home</span>
          </Link>

          <Link
            href={"/profile"}
            className="w-full flex items-center justify-center gap-2 bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors duration-200"
          >
            <Calendar className="w-5 h-5" />
            <span>View Your Events</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Confirmation;
