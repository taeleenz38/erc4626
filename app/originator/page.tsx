import React from "react";
import IssueLoan from "@/components/IssueLoan";
import DepositYield from "@/components/DepositYield";
import Drawdown from "@/components/Drawdown";

const Originator = () => {
  return (
    <div className="px-8 py-4">
      <div className="w-4/5 mx-auto flex justify-between">
        <div className="w-[48%]">
          <IssueLoan />
        </div>
        <div className="w-[48%] flex-col">
          <DepositYield />
          <Drawdown />
        </div>
      </div>
    </div>
  );
};

export default Originator;
