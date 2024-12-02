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
        console.log("Vault contracts:", data);
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
          <AccordionTrigger className="font-bold">Deployed Pools</AccordionTrigger>
          <AccordionContent>
            {loading ? (
              <p>Loading...</p>
            ) : (
              <ul className="list-disc list-inside">
                {vaultContracts.map((contract) => (
                  <div key={contract.id}>
                    <p><span className="font-bold">CA: </span>{contract.vaultContractAddress}</p>
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
