"use client";
import React from "react";
import { useState, useEffect } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import abi from "@/artifacts/LoanManager.json";
import { useAccount } from "wagmi";
import { BigNumber } from "ethers";
import { ethers } from "ethers";
import { useWriteContract } from "wagmi";
import { config } from "@/config";

const IssueLoan = () => {
  const { address } = useAccount();
  const [borrower, setBorrower] = useState<string>("");
  const [interest, setInterest] = useState<string>("");
  const [principal, setPrincipal] = useState<string>("");
  const [start, setStart] = useState<string>("");
  const [maturity, setMaturity] = useState<string>("");
  const [txHash, setTxHash] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const { writeContractAsync, isPending } = useWriteContract({ config });

  const onBorrowerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBorrower(e.target.value);
  };

  const onAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
  };

  const onInterestChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInterest(e.target.value);
  };

  const onPrincipalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrincipal(e.target.value);
  };

  const onStartChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStart(e.target.value);
  };

  const onMaturityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMaturity(e.target.value);
  };

  const handleIssueLoan = async () => {
    try {
      const interestRate = BigNumber.from(interest).mul(
        BigNumber.from(10).pow(18)
      );
      const principalAmount = BigNumber.from(principal).mul(
        BigNumber.from(10).pow(6)
      );

      const startTimestamp = Math.floor(new Date(start).getTime() / 1000);
      const maturityTimestamp = Math.floor(new Date(maturity).getTime() / 1000);

      const tx = await writeContractAsync({
        abi: abi.abi,
        address: process.env.NEXT_PUBLIC_LOAN_MANAGER_ADDRESS as `0x${string}`,
        functionName: "issueLoan",
        args: [
          borrower as `0x${string}`,
          "",
          interestRate,
          principalAmount,
          startTimestamp,
          maturityTimestamp,
          ethers.constants.HashZero,
        ],
      });
      setTxHash(tx);
    } catch (error) {
      console.error("Error issuing loan:", error);
    }
  };

  return (
    <>
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger className="font-bold">Issue Loan</AccordionTrigger>
          <AccordionContent>
            <div className="w-full items-center gap-1.5 mb-5">
              <Label htmlFor="borrower">Borrower</Label>
              <Input
                className="w-full mt-2"
                type="text"
                id="borrower"
                placeholder="Enter the borrower's wallet address:"
                onChange={onBorrowerChange}
                value={borrower}
              />
            </div>
            <div className="w-full items-center gap-1.5 mb-5">
              <Label htmlFor="interest">Interest Rate (%)</Label>
              <Input
                className="w-full mt-2"
                type="text"
                id="interest"
                placeholder="Enter the interest rate:"
                onChange={onInterestChange}
                value={interest}
              />
            </div>
            <div className="w-full items-center gap-1.5 mb-5">
              <Label htmlFor="principal">Principal</Label>
              <Input
                className="w-full mt-2"
                type="text"
                id="principal"
                placeholder="Enter the principal:"
                onChange={onPrincipalChange}
                value={principal}
              />
            </div>
            <div className="w-full items-center gap-1.5 mb-5">
              <Label htmlFor="start">Start Date</Label>
              <Input
                className="w-full mt-2"
                type="date"
                id="start"
                placeholder="Enter the start date:"
                onChange={onStartChange}
                value={start}
              />
            </div>
            <div className="w-full items-center gap-1.5 mb-5">
              <Label htmlFor="maturity">Maturity Date</Label>
              <Input
                className="w-full mt-2"
                type="date"
                id="maturity"
                placeholder="Enter the maturity date:"
                onChange={onMaturityChange}
                value={maturity}
              />
            </div>
            <Button
              className="w-full font-bold"
              onClick={handleIssueLoan}
              disabled={isPending}
            >
              Issue Loan
            </Button>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </>
  );
};

export default IssueLoan;
