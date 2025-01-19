"use client";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import IEvent from "@/interfaces/IEvent";
import React, { useEffect, useState } from "react";
import Loading from "@/app/admin/loading";
import {
  approveEvent,
  getEvents,
  rejectEvent,
} from "@/lib/api/admin/EventManagement";
import toast from "react-hot-toast";
import { Card, CardContent } from "@/components/ui/card";

function AdminEventManagement() {
  const [events, setEvents] = useState<IEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [refetch, setRefetch] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const result = await getEvents();
        if (result) {
          setEvents(result.data);
        }
      } catch (error) {
        if (error instanceof Error) {
          toast.error(error.message);
        }
      } finally {
        setLoading(false);
      }
    })();
  }, [refetch]);

  const handleEventStatusChange = async (
    isApproved: boolean,
    eventId: string
  ) => {
    try {
      if (isApproved) {
        await approveEvent(eventId);
      } else {
        await rejectEvent(eventId);
      }
      setRefetch(!refetch);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="w-full h-full">
      <h1 className="mb-5 text-lg font-semibold">Events Overview</h1>

      <div className="overview grid grid-cols-4 gap-3">
        <Card className="min-h-36 bg-cyan-400/50">
          <CardContent className="p-4">
            <h2 className="font-semibold">All Events</h2>
            <ul>
              <li className="flex justify-between">
                <p>Online: </p>
                <p>10</p>
              </li>
              <li className="flex justify-between">
                <p>In-Person: </p>
                <p>10</p>
              </li>
            </ul>
          </CardContent>
        </Card>
        <Card className="min-h-36 bg-green-200">
          <CardContent className="p-4">
            <h2 className="font-semibold">Active Events</h2>
            <ul>
              <li className="flex justify-between">
                <p>Online: </p>
                <p>10</p>
              </li>
              <li className="flex justify-between">
                <p>In-Person: </p>
                <p>10</p>
              </li>
            </ul>
          </CardContent>
        </Card>
        <Card className="min-h-36 bg-yellow-200/70">
          <CardContent className="p-4">
            <h2 className="font-semibold">Pending Events</h2>
            <ul>
              <li className="flex justify-between">
                <p>Online: </p>
                <p>10</p>
              </li>
              <li className="flex justify-between">
                <p>In-Person: </p>
                <p>10</p>
              </li>
            </ul>
          </CardContent>
        </Card>
        <Card className="min-h-36 bg-red-200">
          <CardContent className="p-4">
            <h2 className="font-semibold">Cancelled Events</h2>
            <ul>
              <li className="flex justify-between">
                <p>Online: </p>
                <p>10</p>
              </li>
              <li className="flex justify-between">
                <p>In-Person: </p>
                <p>10</p>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>

      <Table className="mt-5 bg-white/70 rounded border-spacing-5">
        <TableHeader>
          <TableRow>
            <TableHead className="text-slate-900">Event Name</TableHead>
            <TableHead className="text-slate-900">Event Type</TableHead>
            <TableHead className="text-slate-900">Event Status</TableHead>
            <TableHead className="text-slate-900">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {events.length ? (
            events.map((event, index) => (
              <TableRow key={event._id}>
                <TableCell>{event.title}</TableCell>
                <TableCell>{event.eventType}</TableCell>
                <TableCell
                  className={`${
                    event.status === "Pending"
                      ? "text-yellow-500"
                      : event.status === "Rejected" ||
                        event.status === "Cancelled"
                      ? "text-red-500"
                      : "text-green-600"
                  }`}
                >
                  {event.status}
                </TableCell>
                <TableCell className="flex gap-1">
                  <Button size={"sm"}>View</Button>
                  {event.status === "Pending" && (
                    <div className="quick-action flex gap-1">
                      <Button
                        onClick={() =>
                          handleEventStatusChange(true, event._id!)
                        }
                        size={"sm"}
                        className="bg-green-700"
                      >
                        Approve
                      </Button>
                      <Button
                        onClick={() =>
                          handleEventStatusChange(false, event._id!)
                        }
                        size={"sm"}
                        variant={"destructive"}
                      >
                        Reject
                      </Button>
                    </div>
                  )}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <p>No events found</p>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

export default AdminEventManagement;
