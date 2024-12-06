"use client";
import React from "react";
import { useAccount } from "wagmi";
import { useReadContract } from "wagmi";
import { abi } from "@/artifacts/Asset.json";
import { BigNumber } from "ethers"; // Import BigNumber

const Borrower = () => {
  const { address } = useAccount();

  const {
    data: balance,
    error,
    isLoading: isReading,
  } = useReadContract({
    abi,
    address: process.env.NEXT_PUBLIC_ASSET_ADDRESS as `0x${string}`,
    functionName: "balanceOf",
    args: [address],
    enabled: !!process.env.NEXT_PUBLIC_ASSET_ADDRESS,
  });

  const formatBalance = (balance) => {
    if (!balance) return "0";
    try {
      const value = BigNumber.from(balance).div(BigNumber.from(10).pow(6));
      return value.toString();
    } catch (error) {
      console.error("Error formatting balance:", error);
      return "Error";
    }
  };
  return (
    <div className="px-8 py-4">
      <div className="w-4/5 mx-auto">Balance: {formatBalance(balance)}</div>
    </div>
  );
};

export default Borrower;
