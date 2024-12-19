"use client";
import React, { useEffect, useState } from "react";
import CategoryForm, { AdminCategoryFormProps, FormData } from "@/components/ui/forms/Admin/EventCategory/CategoryForm";
import {
  Table,
  TableBody,
  TableCaption,
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
import { Button } from "@/components/ui/button";
import { Dialog ,DialogContent, DialogHeader} from "@/components/ui/dialog";
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";

 function EventCategories() {
  const [loading, setLoading] = useState(false);
  const [eventCategories, setEventCategories] = useState<IEventCategory[]>([]);
  const [refresh, setRefresh] = useState(false);
  const [isOpen, setOpen] = useState(false);
  const [formMode,setFormMode] = useState<'edit'|'add'> ('add');
  const [selectedCategory,setEditCategory] = useState<IEventCategory | null> (null)

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

  const handleAddCategory = async (data:FormData):Promise<string> =>{
    return 'success'
  }

  const handleEditCategory = async (data:FormData):Promise<string> =>{
    return 'edit success'
  }

  const handleModalOpen = (id?:string) =>{
    if(id){
    const editCategory = eventCategories.find((cat)=>cat._id === id);
    setEditCategory(editCategory!);
    setFormMode('edit');
    setOpen(true)
    }else{
      setFormMode('add');
      setOpen(true)
    }
  }

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

const formProps:AdminCategoryFormProps = {
  initialValues:formMode === 'edit' && selectedCategory? {
    categoryName:selectedCategory.categoryName,
    categoryType:selectedCategory.categoryType,
    description:selectedCategory.description
  }:{},
  buttonText: formMode === "edit"? 'Save Changes' : "Submit Category",
  onSubmit:formMode === 'edit'? handleEditCategory : handleAddCategory
}

  return (
    <div className="container bg-slate-600/50 rounded min-h-screen w-full p-5">
      <Toaster />
      <section className="category-table">
        <div className="flex items-start justify-between pe-5">
          <div>
          <h1 className="font-bold text-2xl text-blue-900">
            Event Categories
          </h1>
          <small>List of event categories</small>
          </div>
          <Button onClick={()=>handleModalOpen()}>Add New Category</Button>
        </div>
        <Table className="mt-5 bg-white/70 rounded border-spacing-5">
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
              <TableRow >
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
                  <TableCell className="capitalize">{category.categoryName}</TableCell>
                  <TableCell>{category.categoryType}</TableCell>
                  <TableCell className="truncate basis-1/4 capitalize">
                    {category.description ? category.description : "nil"}
                  </TableCell>
                  <TableCell className="flex gap-2">
                    <i className="fa-solid fa-eye text-blue-600 cursor-pointer"></i>
                    <i
                      className="fa-solid fa-pen-to-square text-orange-700 cursor-pointer"
                      onClick={() => handleModalOpen(category._id!)}
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
        <Dialog open={isOpen} onOpenChange={setOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="font-semibold">
                {formMode === 'edit'? 'Edit Category' : 'Add Category'}
              </DialogTitle>
              <DialogDescription className="text-sm text-blue-500">
              {formMode === 'edit'? 'Make changes in event category' : 'Create you new category'}
          </DialogDescription>
            </DialogHeader>
          <CategoryForm {...formProps}/>
          </DialogContent>
        </Dialog>
        <div className="pagination">

        </div>
    </div>
  );
}

export default EventCategories;
