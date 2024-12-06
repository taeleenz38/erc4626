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
import { useReadContract } from "wagmi";
import { abi } from "@/artifacts/Vault.json";
import { ethers } from "ethers";

const GetExchangeRate = () => {
  const [vaultContracts, setVaultContracts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedAddress, setSelectedAddress] = useState(null);

  const {
    data: exchangeRate,
    error,
    isLoading: isReading,
  } = useReadContract({
    abi,
    address: selectedAddress as `0x${string}`,
    functionName: "getExchangeRate",
    enabled: !!selectedAddress,
  });

  const formattedExchangeRate = exchangeRate
    ? parseFloat(ethers.utils.formatUnits(exchangeRate, 18)).toFixed(2)
    : null;

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
          <AccordionTrigger className="font-bold">
            LP Token Value
          </AccordionTrigger>
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
                  <p>Loading exchange rate...</p>
                ) : error ? (
                  <p>Error fetching exchange rate</p>
                ) : (
                  <p>Value: ${formattedExchangeRate}</p>
                )}
              </div>
            )}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </>
  );
};

export default GetExchangeRate;
