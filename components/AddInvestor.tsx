"use client";
import React from "react";
import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import abi from "@/artifacts/Vault.json";
import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { config } from "@/config";

const AddInvestor = () => {
  const [investorWallet, setInvestorWallet] = useState<string>("");
  const [poolAddress, setPoolAddress] = useState<string>("");
  const [txHash, setTxHash] = useState<string | null>(null);
  const { writeContractAsync, isPending } = useWriteContract({ config });

  const onInvestorWalletChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInvestorWallet(e.target.value);
  };

  const onPoolAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPoolAddress(e.target.value);
  };

  const handleAddInvestor = async () => {
    try {
      const tx = await writeContractAsync({
        abi: abi.abi,
        address: poolAddress as `0x${string}`,
        functionName: "addInvestor",
        args: [investorWallet as `0x${string}`],
      });
      setTxHash(tx);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger className="font-bold">
            Add Investor
          </AccordionTrigger>
          <AccordionContent>
            <div className="w-full items-center gap-1.5 mb-5">
              <Label htmlFor="pool-name">Pool Address:</Label>
              <Input
                className="w-full mt-2"
                type="text"
                id="pool-name"
                placeholder="Enter the Pool Address:"
                onChange={onPoolAddressChange}
                value={poolAddress || ""}
              />
            </div>
            <div className="w-full items-center gap-1.5 mb-5">
              <Label htmlFor="pool-name">Investor Wallet</Label>
              <Input
                className="w-full mt-2"
                type="text"
                id="pool-name"
                placeholder="Enter the Investor's Wallet Address:"
                onChange={onInvestorWalletChange}
                value={investorWallet || ""}
              />
            </div>
            <Button className="w-full font-bold" onClick={handleAddInvestor}>
              Add Investor To Pool
            </Button>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </>
  );
};

export default AddInvestor;