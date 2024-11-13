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
import {
  blockOrUnblockUser,
  changeAccountStatus,
  getUsers,
} from "@/lib/api/admin/AdminAuthorisedRoutes";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

function UserManagement() {
  const [users, setUsers] = useState<IUser[] | []>([]);
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(0);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getUsers(offset, limit, searchTerm);
        setUsers(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUsers();
  }, [limit, offset, searchTerm]);

  const handleBlockStatus = async (id: string, isBlocked: boolean) => {
    //console.log(id, isBlocked);
    try {
      const data = await blockOrUnblockUser(id, isBlocked);
      toast.success(data.message);
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === id ? { ...user, isBlocked: !user.isBlocked } : user
        )
      );
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };

  const handleUserDeleteStatus = async (id: string, isDeactivated: boolean) => {
    try {
      const data = await changeAccountStatus(id, isDeactivated);
      toast.success(data.message);
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === id
            ? { ...user, isDeactivated: !user.isDeactivated }
            : user
        )
      );
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };

  return (
    <div className="w-full container">
      <Toaster position="top-right" />
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
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <i className="fa-solid fa-magnifying-glass absolute right-3"></i>
          </div>
        </div>
        <Table>
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
            {loading ? (
              <div></div>
            ) : !users.length ? (
              <TableRow>
                <TableCell
                  rowSpan={4}
                  colSpan={4}
                  className="text-center text-slate-900 h-32"
                >
                  No users found
                </TableCell>
              </TableRow>
            ) : (
              users.map((user) => (
                <TableRow key={user._id}>
                  <TableCell>{user.fullName}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell
                    className={
                      user.isBlocked
                        ? "text-red-700"
                        : user.isDeactivated
                        ? "text-orange-600"
                        : "text-green-900"
                    }
                  >
                    {user.isBlocked
                      ? "Blocked"
                      : user.isDeactivated
                      ? "Deactivated"
                      : "Active"}
                  </TableCell>
                  <TableCell className="flex gap-2">
                    <i className="fa-solid fa-eye text-sky-700 text-base"></i>
                    {user.isBlocked ? (
                      <i
                        className="fa-solid fa-lock text-base text-yellow-700 cursor-pointer"
                        onClick={() =>
                          handleBlockStatus(user._id!, user.isBlocked!)
                        }
                      ></i>
                    ) : (
                      <i
                        className="fa-solid fa-unlock text-base text-yellow-700 cursor-pointer"
                        onClick={() =>
                          handleBlockStatus(user._id!, user.isBlocked!)
                        }
                      ></i>
                    )}
                    {user.isDeactivated ? (
                      <i
                        className="fa-solid fa-trash-can-arrow-up text-base text-red-700 cursor-pointer"
                        onClick={() =>
                          handleUserDeleteStatus(user._id!, user.isDeactivated!)
                        }
                      ></i>
                    ) : (
                      <i
                        className="fa-solid fa-trash-can text-base text-red-700 cursor-pointer"
                        onClick={() =>
                          handleUserDeleteStatus(user._id!, user.isDeactivated!)
                        }
                      ></i>
                    )}
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
