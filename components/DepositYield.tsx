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
import { useWriteContract } from "wagmi";
import { fetchVaultContracts } from "@/utils/graph-client";
import { config } from "@/config";

const DepositYield = () => {
  const { address } = useAccount();
  const [amount, setAmount] = useState<string>("");
  const [txHash, setTxHash] = useState<string | null>(null);
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

  const handleDepositYield = async () => {
    try {
      const amountInWei = BigNumber.from(amount).mul(BigNumber.from(10).pow(6));
      const tx = await writeContractAsync({
        abi: abi.abi,
        address: selectedAddress as `0x${string}`,
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
        <AccordionItem value="item-2">
          <AccordionTrigger className="font-bold">
            Deposit Yield
          </AccordionTrigger>
          <AccordionContent>
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
