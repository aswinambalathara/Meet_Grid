import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import BillingAddressForm from "@/components/ui/forms/User/Checkout/BillingAddressForm";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import React from "react";

function PaymentPage() {
  return (
    <div className="h-full w-full">
      <h1>Billing & Payments</h1>
      <Accordion
        type="single"
        className="bg-slate-50 rounded-md mt-2 mb-5"
        collapsible
        defaultValue="item-1"
      >
        <AccordionItem value="item-1" className="px-2 rounded-md">
          <AccordionTrigger>Billing Address</AccordionTrigger>
          <AccordionContent className="px-2">
            <BillingAddressForm />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <h5 className="text-sm">Payment Methods</h5>
      <div className="paymentMethods w-full bg-slate-50 min-h-10 rounded p-3 flex flex-col gap-3">
        <div className="method flex items-center gap-2 bg-slate-200 p-3 rounded">
          <input type="radio" id="razorpay" name="paymentmethod" />
          <Image
            alt="razorpay-icon"
            src={"/icons/raz-icon.jpg"}
            width={30}
            height={30}
            className="rounded-full"
          />
          <Label htmlFor="razorpay">Razorpay Gateway</Label>
        </div>
        {/* <div className="method flex items-center gap-2 bg-slate-200 p-3 rounded">
          <input type="radio" id="paypal" name="paymentmethod"/>
          <Label htmlFor="paypal">Razorpay Gateway</Label>
        </div> */}
      </div>
    </div>
  );
}

export default PaymentPage;
