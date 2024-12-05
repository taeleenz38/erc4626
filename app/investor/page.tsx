import Balance from "@/components/Balance";
import Deposit from "@/components/Deposit";
import GetExchangeRate from "@/components/GetExchangeRate";
import Withdraw from "@/components/Withdraw";
import React from "react";

const Investor = () => {
  return (
    <div className="px-8 py-4">
      <div className="w-4/5 mx-auto flex justify-between">
        <div className="w-[48%]">
          <Deposit />
          <Withdraw />
        </div>
        <div className="w-[48%]">
          <GetExchangeRate />
          <Balance />
        </div>
      </div>
    </div>
  );
};

export default Investor;
