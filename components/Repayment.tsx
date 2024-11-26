import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Repayment = () => {
  return (
    <>
      <Accordion type="single" collapsible>
        <AccordionItem value="item-3">
          <AccordionTrigger className="font-bold">Repayment</AccordionTrigger>
          <AccordionContent>
            <div className="w-full items-center gap-1.5 mb-5">
              <Label htmlFor="amount">Amount</Label>
              <Input
                className="w-full mt-2"
                type="text"
                id="amount"
                placeholder="Enter the amount you wish to withdraw:"
              />
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </>
  );
};

export default Repayment;
