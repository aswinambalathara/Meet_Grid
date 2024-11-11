import type { Metadata } from "next";
import Sidebar from "@/components/pagecomponents/admin/Layout/Sidebar"; 
import { ReactNode } from "react";
export const metadata: Metadata = {
  title: "Meet Grid",
  description: "Connecting You to Events, and Events to Connections",
};

export default function AdminLayout({children}:{children:ReactNode}){
  return(
    <div className="bg-indigo-900 min-h-screen w-full">
      <Sidebar/>
      <main className="flex-1 ml-[300px] p-10 min-h-screen">
      {children}
      </main>
    </div>
  )
}