import React from "react";
import ProtectedRoute from "@/components/wrappers/RequireAdminAuth";
import EventCategories from "@/components/pagecomponents/admin/EventCategories";
function page() {
  return (
    <ProtectedRoute>
      <EventCategories/>
    </ProtectedRoute>
  );
}

export default page;
