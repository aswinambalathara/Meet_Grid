"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import AddCategoryForm from "@/components/ui/forms/Admin/EventCategory/AddCategoryForm";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import IEventCategory from "@/interfaces/IEventCategory";
import {
  deleteEventCategory,
  getEventCategories,
} from "@/lib/api/admin/EventCategoryRoutes";
import toast, { Toaster } from "react-hot-toast";

function EventCategories() {
  const [loading, setLoading] = useState(false);
  const [eventCategories, setEventCategories] = useState<IEventCategory[]>([]);
  const [refresh,setRefresh] = useState(false)
  const accordionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getEventCategories();
        setEventCategories(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    fetchCategories();
  }, [refresh]);

  const handleEditCategory = (id: string) => {
    const eventCategory = eventCategories.find((event) => event._id === id);
    console.log(eventCategory);
  };

  const handleDelete = async (id: string) => {
    const confirm = window.confirm(
      "Are you sure, This action cannot be reverted"
    );
    if (confirm) {
      try {
        const result = await deleteEventCategory(id);
        if (result.status) {
          toast.success(result.message);
          const updatedList = eventCategories.filter(
            (event) => event._id !== id
          );
          setEventCategories(updatedList);
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  const toggleAccordion = () =>{
    const accordionItem = accordionRef.current?.querySelector('.accordion-item')
    if(accordionItem){
        accordionItem.classList.toggle('open')
    }
  }

  return (
    <div className="container bg-slate-600/50 rounded min-h-[400px] w-full p-5">
      <Toaster />
      <section className="category-table mb-5">
        <h1 className="font-bold text-2xl ms-2 text-blue-900">
          Event Categories
        </h1>
        <Table className="mt-5 bg-white/70 rounded">
          {/* <TableCaption>List of Users</TableCaption> */}
          <TableHeader>
            <TableRow>
              <TableHead className="text-slate-900">Category Name</TableHead>
              <TableHead className="text-slate-900">Category Type</TableHead>
              <TableHead className="text-slate-900">Description</TableHead>
              <TableHead className="text-slate-900">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="overflow-y-auto">
            {loading ? (
              <TableRow>
                <TableCell
                  rowSpan={4}
                  colSpan={4}
                  className="text-center text-slate-900 h-32"
                >
                  <p>Loading . . .</p>
                </TableCell>
              </TableRow>
            ) : !eventCategories.length ? (
              <TableRow>
                <TableCell
                  rowSpan={4}
                  colSpan={4}
                  className="text-center text-slate-900 h-32"
                >
                  No eventCategories found
                </TableCell>
              </TableRow>
            ) : (
              eventCategories.map((category) => (
                <TableRow key={category._id}>
                  <TableCell>{category.categoryName}</TableCell>
                  <TableCell>{category.categoryType}</TableCell>
                  <TableCell className="truncate basis-1/4">
                    {category.description ? category.description : "nil"}
                  </TableCell>
                  <TableCell className="flex gap-2">
                    <i className="fa-solid fa-eye text-blue-600 cursor-pointer"></i>
                    <i
                      className="fa-solid fa-pen-to-square text-orange-700 cursor-pointer"
                      onClick={() => handleEditCategory(category._id!)}
                    ></i>
                    <i
                      className="fa-solid fa-trash text-red-700 cursor-pointer"
                      onClick={() => handleDelete(category._id!)}
                    ></i>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </section>

      <section className="add-category">
        <Accordion type="single" collapsible ref={accordionRef}>
          <AccordionItem value="item-1" className="accordion-item">
            <AccordionTrigger className="text-lg font-bold text-blue-950 px-5 rounded">
              Add Event Category
            </AccordionTrigger>
            <AccordionContent className="p-5">
              <Card className="bg-white py-4">
                <CardContent>
                  <AddCategoryForm refresh={setRefresh} closeAccordion={toggleAccordion}/>
                </CardContent>
              </Card>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>
    </div>
  );
}

export default EventCategories;
