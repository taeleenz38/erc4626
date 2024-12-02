"use client";
import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useReadContract } from "wagmi";
import abi from "@/artifacts/Vault.json";
import { fetchVaultContracts } from "@/utils/graph-client";

const DeployedPools = () => {
  const [vaultContracts, setVaultContracts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [symbols, setSymbols] = useState({});

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

  useEffect(() => {
    const fetchSymbols = async () => {
      const symbolPromises = vaultContracts.map(async (contract) => {
        try {
          const { data } = await useReadContract({
            abi: abi.abi,
            address: contract.vaultContractAddress as `0x${string}`,
            functionName: "symbol",
            args: [],
          });
          return { address: contract.vaultContractAddress, symbol: data };
        } catch {
          return { address: contract.vaultContractAddress, symbol: "N/A" };
        }
      });

      const results = await Promise.all(symbolPromises);
      const symbolMap = results.reduce((acc, item) => {
        acc[item.address] = item.symbol;
        return acc;
      }, {});
      setSymbols(symbolMap);
    };

    if (vaultContracts.length > 0) {
      fetchSymbols();
    }
  }, [vaultContracts]);

  return (
    <>
      <Accordion type="single" collapsible>
        <AccordionItem value="item-4">
          <AccordionTrigger className="font-bold">
            Deployed Pools
          </AccordionTrigger>
          <AccordionContent>
            {loading ? (
              <p>Loading...</p>
            ) : (
              <ul className="list-disc list-inside">
                {vaultContracts.map((contract) => (
                  <div className="flex justify-between" key={contract.id}>
                    <p>
                      <span className="font-bold">Symbol: </span>
                      {symbols[contract.vaultContractAddress] || "Fetching..."}
                    </p>
                    <p>
                      <span className="font-bold">CA: </span>
                      {contract.vaultContractAddress}
                    </p>
                  </div>
                ))}
              </ul>
            )}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </>
  );
};

export default DeployedPools;
