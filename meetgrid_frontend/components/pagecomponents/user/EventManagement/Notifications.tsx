import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";

function Notifications() {
  return (
    <div className="w-full text-black bg-slate-300 flex">
      <ul className="bg-slate-50 w-full h-full space-y-2 overflow-auto p-2 rounded">
        <li>
          <Card className="w-full">
            <CardHeader className="flex-row justify-between p-4">
              <div className="space-y-1">
                <CardTitle >Event Rejected</CardTitle>
                <CardDescription className="max-w-96 truncate">
                  Some event description
                  </CardDescription>
              </div>
              <div className="actions flex gap-1 items-center">
                <Button variant={"link"} size={"sm"}>View</Button>
                <i className={`fa-regular  fa-circle-xmark cursor-pointer hover:text-red-600`} />
              </div>
            </CardHeader>
          </Card>
        </li>
      </ul>
    </div>
  );
}

export default Notifications;
