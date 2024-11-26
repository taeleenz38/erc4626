import Drawdown from "@/components/Drawdown";
import Repayment from "@/components/Repayment";
import RequestLoan from "@/components/RequestLoan";
import React from "react";

const Borrower = () => {
  return (
    <div className="px-8 py-4">
      <div className="w-4/5 mx-auto">
        <div className="w-full">
          <div className="mb-4">
            <RequestLoan />
          </div>
          <div className="mb-4">
            <Drawdown />
          </div>
          <div className="mb-4">
            <Repayment />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Borrower;
