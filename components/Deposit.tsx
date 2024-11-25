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
            <div className="w-full items-center gap-1.5">
              <Label htmlFor="email">Email</Label>
              <Input className="w-full" type="text" id="email" placeholder="Email" />
            </div>
            <div className="w-full items-center gap-1.5 mt-5">
              <Label htmlFor="email">Email</Label>
              <Input className="w-full" type="text" id="email" placeholder="Email" />
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </>
  );
};

export default Deposit;
