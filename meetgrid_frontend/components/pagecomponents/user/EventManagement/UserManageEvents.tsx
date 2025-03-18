import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";

function UserManageEvents() {
  return (
    <div className="events-management w-full h-full text-black flex flex-col gap-5">
      <section className="header flex items-center gap-1 mt-3">
        {/* <div className="alerts text-white bg-blue-950 rounded-full w-fit h-fit p-2 text-sm gap-2 flex justify-center items-center">
          <i className="fa-regular fa-bell"></i>
          <p>Notifications</p>
        </div> */}
        <Input className="bg-white" placeholder="search events" />
        <Select defaultValue="all-events">
          <SelectTrigger className="w-[180px] bg-white">
            <SelectValue placeholder="Select Filter" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all-events">All Events</SelectItem>
            <SelectItem value="approved-events">Approved Events</SelectItem>
            <SelectItem value="pending-events">Pending Approval</SelectItem>
            <SelectItem value="rejected-events">Rejected Events</SelectItem>
          </SelectContent>
        </Select>
      </section>

      <Table className="border border-white">
        <TableHeader>
          <TableRow>
            <TableHead>Event Name</TableHead>
            <TableHead>Event Type</TableHead>
            <TableHead>Start Date</TableHead>
            <TableHead>End Date</TableHead>
            <TableHead>Event Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Google Hackthon</TableCell>
            <TableCell>Online</TableCell>
            <TableCell>25/01/2025</TableCell>
            <TableCell>25/01/2025</TableCell>
            <TableCell>Active</TableCell>
            <TableCell className="flex gap-1">
              <Tooltip>
                <TooltipTrigger>
                <Link href={'/profile/manage-event/soo'}><i className="fa-regular fa-eye text-blue-500" /></Link>
                </TooltipTrigger>
                <TooltipContent className="text-[12px] bg-zinc-700 p-1 text-white rounded-md">
                  <p>View Event</p>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger>
                  <i className="fa-solid fa-pen-to-square text-yellow-500" />
                </TooltipTrigger>
                <TooltipContent className="text-[12px] bg-zinc-700 p-1 text-white rounded-md">
                  <p>Edit Event</p>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger>
                  <i className="fa-solid fa-trash-can text-red-500" />
                </TooltipTrigger>
                <TooltipContent className="text-[12px] bg-zinc-700 p-1 text-white rounded-md">
                  Cancel Event
                </TooltipContent>
              </Tooltip>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}

export default UserManageEvents;
