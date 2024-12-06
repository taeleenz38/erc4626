"use client";
import React from "react";
import { useState, useEffect } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import abi from "@/artifacts/LoanManager.json";
import { useAccount } from "wagmi";
import { BigNumber } from "ethers";
import { ethers } from "ethers";
import { useWriteContract } from "wagmi";
import { config } from "@/config";
import { fetchLoanInitiateds } from "@/utils/graph-client";

const Drawdown = () => {
  const { address } = useAccount();
  const [amount, setAmount] = useState<string>("");
  const [borrower, setBorrower] = useState<string>("");
  const [txHash, setTxHash] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [loans, setLoans] = useState([]);
  const [selectedTokenId, setSelectedTokenId] = useState<number>(0);
  const { writeContractAsync, isPending } = useWriteContract({ config });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchLoanInitiateds();
        setLoans(data);
      } catch (error) {
        console.error("Error fetching loans:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const onAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
  };

  const onBorrowerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBorrower(e.target.value);
  };

  const handleDrawdown = async () => {
    const drawdownAmount = BigNumber.from(amount).mul(
      BigNumber.from(10).pow(6)
    );

    try {
      const tx = await writeContractAsync({
        abi: abi.abi,
        address: process.env.NEXT_PUBLIC_LOAN_MANAGER_ADDRESS as `0x${string}`,
        functionName: "fundDrawdown",
        args: [selectedTokenId, borrower as `0x${string}`, drawdownAmount],
      });
      setTxHash(tx);
    } catch (error) {
      console.error("Error during drawdown:", error);
    }
  };

  return (
    <>
      <Accordion type="single" collapsible>
        <AccordionItem value="item-2">
          <AccordionTrigger className="font-bold">Drawdown</AccordionTrigger>
          <AccordionContent>
            <Select onValueChange={(value) => setSelectedTokenId(value)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Loan (Token Id)" />
              </SelectTrigger>
              <SelectContent className="bg-black">
                {loans.map((loan) => (
                  <SelectItem key={loan.Loan_id} value={loan.Loan_id}>
                    {loan.Loan_id}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="w-full items-center gap-1.5 my-5">
              <Label htmlFor="amount">Borrower</Label>
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
              <Label htmlFor="amount">Amount</Label>
              <Input
                className="w-full mt-2"
                type="text"
                id="amount"
                placeholder="Enter the amount you wish to withdraw:"
                onChange={onAmountChange}
                value={amount}
              />
            </div>
            <Button
              className="w-full mt-4"
              onClick={handleDrawdown}
              disabled={isPending}
            >
              Drawdown
            </Button>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </>
  );
};

export default Drawdown;
