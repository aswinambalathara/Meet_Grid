import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import React from "react";

function TicketManagement() {
  return (
    <div className="ticket-management w-full h-full text-black flex flex-col gap-5">
      <section className="header flex items-center gap-1 mt-3">
        {/* <div className="alerts text-white bg-blue-950 rounded-full w-fit h-fit p-2 text-sm gap-2 flex justify-center items-center">
          <i className="fa-regular fa-bell"></i>
          <p>Notifications</p>
        </div> */}
        <Input className="bg-white" placeholder="search tickets" />
        <Select defaultValue="all-events">
          <SelectTrigger className="w-[180px] bg-white">
            <SelectValue placeholder="Select Filter" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all-events">All Tickets</SelectItem>
            <SelectItem value="approved-events">Active Tickets</SelectItem>
            <SelectItem value="pending-events">
              Cancellation Requests
            </SelectItem>
            <SelectItem value="rejected-events">Cancelled Tickets</SelectItem>
          </SelectContent>
        </Select>
      </section>

      <Table className="border border-white">
        <TableHeader>
          <TableRow>
            <TableHead className="w-1/4">Event Name</TableHead>
            <TableHead className="w-1/6">Event Type</TableHead>
            <TableHead className="w-1/6">Quantity</TableHead>
            <TableHead className="w-1/6">
              Ticket Price<span>(₹)</span>
            </TableHead>
            <TableHead className="w-1/6">
              Total<span>(₹)</span>
            </TableHead>
            <TableHead className="w-1/12">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Google Hackthon</TableCell>
            <TableCell>Online</TableCell>
            <TableCell>5</TableCell>
            <TableCell> 200</TableCell>
            <TableCell> 1000</TableCell>
            <TableCell>
              <Tooltip>
                <TooltipTrigger>
                  <i className="fa-regular ms-5 fa-eye text-blue-500" />
                </TooltipTrigger>
                <TooltipContent className="text-[12px] ms-5 bg-zinc-700 p-1 text-white rounded-md">
                  <p>View Ticket</p>
                </TooltipContent>
              </Tooltip>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}

export default TicketManagement;
