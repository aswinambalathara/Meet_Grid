import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

function page() {
  return (
    <div className="container bg-slate-600/50 rounded min-h-[400px] w-full p-5">

      <section className="add-category">
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-lg font-bold text-blue-950 px-5 rounded">
              Add Event Category
            </AccordionTrigger>
            <AccordionContent className="p-5">
              <Card className="bg-white py-4">
                <CardContent>
                  <form>
                    <div className="form-control flex flex-col gap-2 mb-5">
                      <Label htmlFor="categoryName" className="text-sm">
                        Category Name
                      </Label>
                      <Input
                        type="text"
                        placeholder="Enter category name"
                        id="categoryName"
                        name="categoryName"
                      />
                    </div>
                    <div className="form-control flex flex-col gap-2 mb-5">
                      <Label htmlFor="categoryType" className="text-sm">
                        Category Type
                      </Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a Category Type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Professional">
                            Professional
                          </SelectItem>
                          <SelectItem value="General">General</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="form-control flex flex-col gap-2 mb-5">
                      <Label htmlFor="categoryDescription" className="text-sm">
                        Category Description
                      </Label>
                      <Input
                        type="text"
                        placeholder="Enter category description"
                        id="categoryDescription"
                        name="categoryDescription"
                      />
                    </div>

                    <Button>Add New Category</Button>
                  </form>
                </CardContent>
              </Card>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>

      <section className="category-table">
        
      </section>
    </div>
  );
}

export default page;
