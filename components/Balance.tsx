"use client";
import React, { useEffect, useState } from "react";
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
import { fetchVaultContracts } from "@/utils/graph-client";
import { useAccount } from "wagmi";
import { useReadContract } from "wagmi";
import { abi } from "@/artifacts/Vault.json";

const Balance = () => {
  const { address } = useAccount();
  const [vaultContracts, setVaultContracts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedAddress, setSelectedAddress] = useState(null);

  const {
    data: balance,
    error,
    isLoading: isReading,
  } = useReadContract({
    abi,
    address: selectedAddress as `0x${string}`,
    functionName: "balanceOf",
    args: [address],
    enabled: !!selectedAddress,
  });

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

  return (
    <>
      <Accordion type="single" collapsible>
        <AccordionItem value="item-4">
          <AccordionTrigger className="font-bold">Get Balance</AccordionTrigger>
          <AccordionContent>
            {loading ? (
              <p>Loading...</p>
            ) : (
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
            )}
            {selectedAddress && (
              <div className="mt-4">
                {isReading ? (
                  <p>Loading balance...</p>
                ) : error ? (
                  <p>Error fetching balance</p>
                ) : (
                  <p>Balance: {balance}</p>
                )}
              </div>
            )}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </>
  );
};

export default Balance;