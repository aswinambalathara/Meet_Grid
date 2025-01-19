import React from "react";
import ProtectedRoute from "@/components/wrappers/RequireAdminAuth";
import AdminEventManagements from "@/components/pagecomponents/admin/AdminEventManagement";
import { Toaster } from "react-hot-toast";

function page() {
  return (
    // <div className='flex items-center justify-center'>EVENT MANAGEMENT</div>
    <ProtectedRoute>
      <Toaster />
      <AdminEventManagements />
    </ProtectedRoute>
  );
}

export default page;
