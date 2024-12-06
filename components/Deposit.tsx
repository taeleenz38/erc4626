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
import abi from "@/artifacts/Vault.json";
import { useAccount } from "wagmi";
import { BigNumber } from "ethers";
import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { config } from "@/config";
import { fetchVaultContracts } from "@/utils/graph-client";

const Deposit = () => {
  const { address } = useAccount();
  const [amount, setAmount] = useState<string>("");
  const [txHash, setTxHash] = useState<string | null>(null);
  const [txHash2, setTxHash2] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [vaultContracts, setVaultContracts] = useState([]);
  const { writeContractAsync, isPending } = useWriteContract({ config });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchVaultContracts();
        setVaultContracts(data);
      } catch (error) {
        console.error("Error fetching vault contracts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const onAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
  };

  const handleDeposit = async () => {
    try {
      const amountInWei = BigNumber.from(amount).mul(BigNumber.from(10).pow(6));

      const tx = await writeContractAsync({
        abi: abi.abi,
        address: process.env.NEXT_PUBLIC_ASSET_ADDRESS,
        functionName: "approve",
        args: [selectedAddress as `0x${string}`, amountInWei],
      });

      setTxHash(tx);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const { data: approvalReceipt, isLoading: isApprovalLoading } =
    useWaitForTransactionReceipt({
      hash: txHash as `0x${string}`,
    });

  useEffect(() => {
    if (approvalReceipt) {
      const DepositTransaction = async () => {
        try {
          const depositAmount = BigNumber.from(amount).mul(
            BigNumber.from(10).pow(6)
          );

          const tx2 = await writeContractAsync({
            abi: abi.abi,
            address: selectedAddress as `0x${string}`,
            functionName: "deposit",
            args: [depositAmount, address],
          });

          setTxHash2(tx2);
        } catch (error) {
          console.error("Error during deposit:", error);
        }
      };

      DepositTransaction();
    }
  }, [amount, writeContractAsync, approvalReceipt, address, selectedAddress]);

  return (
    <>
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger className="font-bold">Deposit</AccordionTrigger>
          <AccordionContent className="flex-col w-full justify-center items-center">
            <Select onValueChange={(value) => setSelectedAddress(value)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Pool CA" />
              </SelectTrigger>
              <SelectContent className="bg-black">
                {vaultContracts.map((contract) => (
                  <SelectItem
                    key={contract.id}
                    value={contract.vaultContractAddress}
                  >
                    {contract.vaultContractAddress}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="w-full items-center gap-1.5 my-5">
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
              onClick={handleDeposit}
              disabled={isPending}
            >
              Deposit
            </Button>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </>
  );
};

export default Deposit;
