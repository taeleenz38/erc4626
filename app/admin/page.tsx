import React from "react";
import DeployPool from "@/components/DeployPool";
import IssueLoan from "@/components/IssueLoan";
import FundLoan from "@/components/FundLoan";

const Admin = () => {
  return (
    <div className="px-8 py-4">
      <div className="w-4/5 mx-auto">
        <div className="w-full">
          <div className="mb-4">
            <DeployPool />
          </div>
          <div className="mb-4">
            <IssueLoan />
          </div>
          <div className="mb-4">
            <FundLoan />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
