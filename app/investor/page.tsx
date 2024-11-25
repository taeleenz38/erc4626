import Deposit from "@/components/Deposit";
import Withdraw from "@/components/Withdraw";
import React from "react";

const Investor = () => {
  return (
    <div className="px-8 py-4">
      <div className="w-4/5 mx-auto flex justify-between">
        <div className="w-[48%]">
          <Deposit />
        </div>
        <div className="w-[48%]">
          <Withdraw />
        </div>
      </div>
    </div>
  );
};

export default Investor;
