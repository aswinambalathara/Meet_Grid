import React from "react";
import UserManagement from "@/components/pagecomponents/admin/UserManagement";
import ProtectedRoute from "@/components/wrappers/RequireAdminAuth";
function page() {
  return (
    <ProtectedRoute>
      <UserManagement />
    </ProtectedRoute>
  );
}

export default page;
