
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";
import Notifications from "../EventManagement/Notifications";
import UserManageEvents from "../EventManagement/UserManageEvents";
import TicketManagement from "../EventManagement/TicketManagement";

function YourEvents() {
  return (

    <div className="YourEvents-Container w-full p-5 h-full overflow-auto">
      {/* <h1 className="text-black font-bold text-lg mb-2">Event Management Dashboard</h1> */}
    <Tabs defaultValue="notifications" className="w-full">
      <TabsList className="grid sm:grid-cols-3">
        <TabsTrigger value="notifications">Notifications</TabsTrigger>
        <TabsTrigger value="event-management">Your Events</TabsTrigger>
        <TabsTrigger value="ticket-management">Tickets</TabsTrigger>
      </TabsList>
      <TabsContent value="notifications">
        <Notifications />
      </TabsContent>
      <TabsContent value="event-management">
        <UserManageEvents/>
      </TabsContent>
      <TabsContent value="ticket-management">
        <TicketManagement/>
      </TabsContent>
    </Tabs>
    </div>
  );
}

export default YourEvents;


{/* <div className="h-full w-full p-5 text-black">
<h2 className="font-semibold mb-5">Your Hosted Events</h2>
<Card className=" overview-section mb-5">
  <CardContent className="p-5 flex justify-around w-full">
    <Card className="overview-card">
      <CardHeader>
        <CardTitle>
          <h1>Events Overview</h1>
        </CardTitle>
      </CardHeader>
      <CardContent className="text-sm">
        <div className="status-card flex gap-5 justify-between items-center">
          <h2 className="text-blue-600">Total Hosted Events</h2>
          <h1 className="font-bold text-lg">10</h1>
        </div>
        <div className="status-card flex gap-5 justify-between items-center">
          <h2 className="text-yellow-600">Events Waiting for Approval</h2>
          <h1 className="font-bold text-lg">10</h1>
        </div>
        <div className="status-card flex gap-5 justify-between items-center">
          <h2 className="text-green-600">Approved Events</h2>
          <h1 className="font-bold text-lg">10</h1>
        </div>
      </CardContent>
    </Card>
    <Card className="overview-card">
      <CardHeader>
        <CardTitle>
          <h1>Sales Overview</h1>
        </CardTitle>
      </CardHeader>
      <CardContent className="text-sm">
        <div className="status-card flex gap-5 justify-between items-center">
          <h2 className="text-blue-600">Total Hosted Events</h2>
          <h1 className="font-bold text-lg">10</h1>
        </div>
        <div className="status-card flex gap-5 justify-between items-center">
          <h2 className="text-yellow-600">Events Waiting for Approval</h2>
          <h1 className="font-bold text-lg">10</h1>
        </div>
        <div className="status-card flex gap-5 justify-between items-center">
          <h2 className="text-green-600">Approved Events</h2>
          <h1 className="font-bold text-lg">10</h1>
        </div>
      </CardContent>
    </Card>
    <Card className="overview-card">
      <CardHeader>
        <CardTitle>
          <h1>Requests</h1>
        </CardTitle>
      </CardHeader>
      <CardContent className="text-sm">
        <div className="status-card flex gap-5 justify-between items-center">
          <h2 className="text-blue-600">Total Hosted Events</h2>
          <h1 className="font-bold text-lg">10</h1>
        </div>
        <div className="status-card flex gap-5 justify-between items-center">
          <h2 className="text-yellow-600">Events Waiting for Approval</h2>
          <h1 className="font-bold text-lg">10</h1>
        </div>
        <div className="status-card flex gap-5 justify-between items-center">
          <h2 className="text-green-600">Approved Events</h2>
          <h1 className="font-bold text-lg">10</h1>
        </div>
      </CardContent>
    </Card>
  </CardContent>
</Card>

<div className="event-table flex flex-col gap-2">
  <div className="table-actions flex">
    <Input type="search" placeholder="search event" className="max-w-52 max-h-8"/>
  </div>
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead>Event Name</TableHead>
        <TableHead>Event Status</TableHead>
        <TableHead>Registration Deadline</TableHead>
        <TableHead>StartDate</TableHead>
        <TableHead>End Date</TableHead>
        <TableHead>Actions</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow>
        <TableCell>Google Hackthon</TableCell>
        <TableCell>Active</TableCell>
        <TableCell>10/12/2025 11:00PM</TableCell>
        <TableCell>10/12/2025 11:00PM</TableCell>
        <TableCell>10/12/2025 11:00PM</TableCell>
        <TableCell className="flex gap-2">
          <Tooltip>
            <TooltipTrigger>
              <i className="fa-regular fa-eye text-blue-500" />
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
</div> */}