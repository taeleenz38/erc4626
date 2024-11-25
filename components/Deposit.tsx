import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Deposit = () => {
  return (
    <>
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger className="font-bold">Deposit</AccordionTrigger>
          <AccordionContent className="flex-col w-full justify-center items-center">
            <div className="w-full items-center gap-1.5 mb-5">
              <Label htmlFor="amount">Amount</Label>
              <Input className="w-full mt-2" type="text" id="amount" placeholder="Enter the amount you wish to deposit:" />
            </div>
            {/* <div className="w-full items-center gap-1.5 mb-5">
              <Label htmlFor="pool">Pool</Label>
              <Input className="w-full mt-2" type="text" id="pool" placeholder="Select the pool you wish to deposit to:" />
            </div> */}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </>
  );
};

export default Deposit;
