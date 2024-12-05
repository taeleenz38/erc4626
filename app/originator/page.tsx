import React from "react";
import IssueLoan from "@/components/IssueLoan";
import DepositYield from "@/components/DepositYield";

const Originator = () => {
  return (
    <div className="px-8 py-4">
      <div className="w-4/5 mx-auto flex justify-between">
        <div className="w-[48%]">
          <IssueLoan />
        </div>
        <div className="w-[48%]">
          <DepositYield />
        </div>
      </div>
    </div>
  );
};

export default Originator;
