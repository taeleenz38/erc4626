"use client";
import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { fetchVaultContracts } from "@/utils/graph-client";

const DeployedPools = () => {
  const [vaultContracts, setVaultContracts] = useState([]);
  const [loading, setLoading] = useState(true);

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
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <Accordion type="multiple" collapsible>
          {vaultContracts.map((contract) => (
            <AccordionItem key={contract.id} value={contract.id}>
              <AccordionTrigger className="font-bold">
                Pool: {contract.name || "Unknown Name"} (Symbol:{" "}
                {contract.symbol || "N/A"})
              </AccordionTrigger>
              <AccordionContent>
                <p>
                  <span className="font-bold">Contract Address: </span>
                  {contract.vaultContractAddress}
                </p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      )}
    </div>
  );
};

export default DeployedPools;
