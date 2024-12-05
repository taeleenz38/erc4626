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
import { useAccount } from "wagmi";
import { BigNumber } from "ethers";
import { useWriteContract } from "wagmi";
import { config } from "@/config";

const DepositYield = () => {
  const { address } = useAccount();
  const [amount, setAmount] = useState<string>("");
  const [poolCa, setPoolCa] = useState<string>("");
  const [txHash, setTxHash] = useState<string | null>(null);
  const { writeContractAsync, isPending } = useWriteContract({ config });

  const onAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
  };

  const onPoolCaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPoolCa(e.target.value);
  };

  const handleDepositYield = async () => {
    try {
      const amountInWei = BigNumber.from(amount).mul(
        BigNumber.from(10).pow(18)
      );
      const tx = await writeContractAsync({
        abi: abi.abi,
        address: poolCa as `0x${string}`,
        functionName: "depositYield",
        args: [address, amountInWei],
      });
      setTxHash(tx);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <Accordion type="single" collapsible>
        <AccordionItem value="item-4">
          <AccordionTrigger className="font-bold">
            Deposit Yield
          </AccordionTrigger>
          <AccordionContent>
            <div className="w-full items-center gap-1.5 mb-5">
              <Label htmlFor="amount">Pool</Label>
              <Input
                className="w-full mt-2"
                type="text"
                id="pool"
                placeholder="Enter the pool's CA:"
                onChange={onPoolCaChange}
                value={poolCa}
              />
            </div>
            <div className="w-full items-center gap-1.5 mb-5">
              <Label htmlFor="amount">Amount</Label>
              <Input
                className="w-full mt-2"
                type="text"
                id="amount"
                placeholder="Enter the amount you wish to deposit:"
                onChange={onAmountChange}
                value={amount}
              />
            </div>
            <Button
              className="w-full font-bold"
              onClick={handleDepositYield}
              disabled={isPending}
            >
              Deposit Yield
            </Button>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </>
  );
};

export default DepositYield;
