"use client";
import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { fetchLoanInitiateds } from "@/utils/graph-client";

// Helper function to format Unix timestamp
const formatDate = (timestamp) => {
  if (!timestamp) return "N/A";
  const date = new Date(timestamp * 1000); // Convert seconds to milliseconds
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

// Helper function to format interest rate
const formatInterestRate = (rate) => {
  if (!rate) return "N/A";
  return (parseInt(rate, 10) / 1e18).toFixed(0); // Convert wei to a readable number
};

// Helper function to format principal
const formatPrincipal = (principal) => {
  if (!principal) return "N/A";
  return (parseInt(principal, 10) / 1e6).toFixed(0); // Adjust divisor to match units
};

const Loans = () => {
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchLoanInitiateds();

        // Sort loans by Loan_id in descending order
        const sortedLoans = data.sort((a, b) => b.Loan_id - a.Loan_id);

        setLoans(sortedLoans);
      } catch (error) {
        console.error("Error fetching loans:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="px-8 py-4">
      <div className="w-4/5 mx-auto">
        <h1 className="text-2xl font-bold">Loans</h1>
        {loading ? (
          <p className="text-center">Loading loans...</p>
        ) : loans.length === 0 ? (
          <p className="text-center">No loans available.</p>
        ) : (
          <div className="grid grid-cols-2 gap-2 mt-2">
            {loans.map((loan) => (
              <Card key={loan.id}>
                <CardHeader>
                  <CardTitle>ID: {loan.Loan_id || "Unknown Loan ID"}</CardTitle>
                  <CardDescription>Borrower: {loan.borrower}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>
                    <strong>Start Date:</strong> {formatDate(loan.startDate)}
                  </p>
                  <p>
                    <strong>Maturity Date:</strong>{" "}
                    {formatDate(loan.maturityDate)}
                  </p>
                  <p>
                    <strong>Principal:</strong>{" "}
                    {formatPrincipal(loan.principal)}
                  </p>
                  <p>
                    <strong>Interest Rate:</strong>{" "}
                    {formatInterestRate(loan.interestRate)}%
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Loans;
