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
import abi from "@/artifacts/DeployManager.json";
import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { config } from "@/config";

const DeployPool = () => {
  const [poolName, setPoolName] = useState<string>("");
  const [poolSymbol, setPoolSymbol] = useState<string>("");
  const [txHash, setTxHash] = useState<string | null>(null);
  const { writeContractAsync, isPending } = useWriteContract({ config });

  const onPoolNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPoolName(e.target.value);
  };

  const onPoolSymbolChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPoolSymbol(e.target.value);
  };

  const handleDeployPool = async () => {
    try {
      const tx = await writeContractAsync({
        abi: abi.abi,
        address: process.env
          .NEXT_PUBLIC_DEPLOY_MANAGER_ADDRESS as `0x${string}`,
        functionName: "deployVault",
        args: [
          {
            assetAddress: process.env
              .NEXT_PUBLIC_ASSET_ADDRESS as `0x${string}`,
            vaultName: poolName as string,
            vaultSymbol: poolSymbol as string,
            adminAddress: process.env
              .NEXT_PUBLIC_ADMIN_WALLET_ADDRESS as `0x${string}`,
          },
        ],
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
          <AccordionTrigger className="font-bold">Deploy Pool</AccordionTrigger>
          <AccordionContent>
            <div className="w-full items-center gap-1.5 mb-5">
              <Label htmlFor="pool-name">Pool Name</Label>
              <Input
                className="w-full mt-2"
                type="text"
                id="pool-name"
                placeholder="Enter the Pool Name:"
                onChange={onPoolNameChange}
                value={poolName || ""}
              />
            </div>
            <div className="w-full items-center gap-1.5 mb-5">
              <Label htmlFor="pool-symbol">Pool Symbol</Label>
              <Input
                className="w-full mt-2"
                type="text"
                id="pool-symbol"
                placeholder="Enter the Pool Symbol:"
                onChange={onPoolSymbolChange}
                value={poolSymbol || ""}
              />
            </div>
            <Button className="w-full font-bold" onClick={handleDeployPool}>
              Deploy Pool
            </Button>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </>
  );
};

export default DeployPool;
