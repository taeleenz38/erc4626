import React from "react";
import DeployPool from "@/components/DeployPool";
import AddInvestor from "@/components/AddInvestor";
import AddOriginator from "@/components/AddOriginator";

const Admin = () => {
  return (
    <div className="px-8 py-4">
      <div className="w-4/5 mx-auto">
        <div className="w-full">
          <div className="mb-4">
            <DeployPool />
          </div>
          <div className="mb-4">
            <AddInvestor />
          </div>
          <div className="mb-4">
            <AddOriginator />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
