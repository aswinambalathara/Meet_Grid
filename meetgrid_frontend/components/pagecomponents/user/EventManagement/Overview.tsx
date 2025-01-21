import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";
import { SalesChart } from "./SalesChart";

function Overview() {
  return (
    <div className="w-full text-black bg-slate-300 flex gap-2">
      <section className="events-overview bg-slate-200 w-full p-2 flex flex-col gap-2">
        <h1 className="bg-white p-2 font-bold rounded">Events Overview</h1>
        <Card>
          <CardHeader className="flex-row justify-between items-center">
            <div>
              <CardTitle className="flex gap-3 mb-1">
                <i className="fa-regular fa-bell" />
                <p>Alerts</p>
              </CardTitle>
              <CardDescription className="text-xs">
                Alerts regarding events
              </CardDescription>
            </div>
            <small className="bg-blue-500 text-white font-semibold rounded-full size-8 grid place-items-center">
              10
            </small>
          </CardHeader>
        </Card>
        <Card>
          <CardContent className="p-3">
            <ul className="text-slate-50">
              <li className="flex gap-2 items-center justify-between mb-3 bg-cyan-700 p-2 rounded">
                <p>Events Hosted</p>
                <p>10</p>
              </li>
              <li className="flex gap-2 items-center justify-between mb-3 bg-green-700 p-2 rounded">
                <p>Approved Events</p>
                <p>10</p>
              </li>
              <li className="flex gap-2 items-center justify-between mb-3 bg-yellow-400 p-2 rounded">
                <p>Pending Events</p>
                <p>10</p>
              </li>
              <li className="flex gap-2 items-center justify-between mb-3 bg-yellow-700 p-2 rounded">
                <p>Cancelled Events</p>
                <p>10</p>
              </li>
              <li className="flex gap-2 items-center justify-between bg-red-700 p-2 rounded">
                <p>Rejected Events</p>
                <p>10</p>
              </li>
            </ul>
          </CardContent>
        </Card>
      </section>
      <section className="tickets-overview w-full bg-slate-200 p-2 flex flex-col gap-2">
        <h1 className="bg-white p-2 font-bold rounded">Sales Overview</h1>
        <Card>
          <CardContent className="p-2 flex flex-col gap-2">
          <Card>
          <CardHeader className="flex-row px-5 py-3 justify-between items-center">
            <div>
              <CardTitle className="flex gap-3 mb-1">
                <i className="fa-regular fa-bell" />
                <p>Alerts</p>
              </CardTitle>
              <CardDescription className="text-xs">
                Alerts regarding Sales
              </CardDescription>
            </div>
            <small className="bg-blue-500 text-white font-semibold rounded-full size-8 grid place-items-center">
              10
            </small>
          </CardHeader>
        </Card>
            <div className="flex p-2 bg-green-400 rounded text-white flex-col items-center justify-center">
              <p>Total Sales</p>
              <p className="font-bold">
                <span>₹</span>200000
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="sales-chart ">
          <SalesChart/>
        </Card>
      </section>
    </div>
  );
}

export default Overview;
