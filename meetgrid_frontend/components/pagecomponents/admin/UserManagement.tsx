"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import IUser from "@/interfaces/IUser";
import React, { useState } from "react";

function UserManagement() {
  const [users, setUsers] = useState<IUser[] | []>([]);

  return (
    <div className="w-full container">
      <div className="main-container bg-slate-300/50 rounded-lg min-h-screen p-5">
        <div className="mb-6 text-slate-800">
        <h2 className=" text-xl  font-semibold">All Users</h2>
        <small>A list of all users with their details</small>
        </div>
        <div className="search-container mb-10 flex flex-col gap-2 text-slate-900">
        <Label className=" font-medium">Search User</Label>
        <div className=" relative flex items-center">
          <Input
            type="text"
            id="search-term"
            placeholder="Search User"
            className="py-5 placeholder:text-white/50 border-slate-900"
          />
          <i className="fa-solid fa-magnifying-glass absolute right-3"></i>
        </div>
      </div>
        <Table >
          {/* <TableCaption>List of Users</TableCaption> */}
          <TableHeader>
            <TableRow>
              <TableHead className="text-slate-900">Full Name</TableHead>
              <TableHead className="text-slate-900">Email Address</TableHead>
              <TableHead className="text-slate-900">Status</TableHead>
              <TableHead className="text-slate-900">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="overflow-y-auto">
            {!users.length ? (
              <TableRow>
                <TableCell rowSpan={4} colSpan={4} className="text-center text-slate-900 h-32">No users found</TableCell>
              </TableRow>
            ) : (
              users.map((user, index) => (
                <TableRow key={index}>
                  <TableCell>{user.fullName}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    {user.isBlocked
                      ? "Blocked"
                      : user.isDeactivated
                      ? "Deactivated"
                      : "Active"}
                  </TableCell>
                  <TableCell>
                  <i className="fa-solid fa-eye"></i>
                  <i className="fa-regular fa-trash-can"></i>
                  <i className="fa-solid fa-ban"></i>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default UserManagement;
