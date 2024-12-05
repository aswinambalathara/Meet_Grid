import AdminLayout from "@/components/pagecomponents/admin/Layout/AdminLayout";
import type { Metadata } from "next";

import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Meet Grid",
  description: "Connecting You to Events, and Events to Connections",
};

export default function AdminLayoutWrapper({children}:{children:ReactNode}){
  return(

    <AdminLayout>
    {children}
    </AdminLayout>
  )
}