import { GraphQLClient } from "graphql-request";

const API_URL =
  "https://api.studio.thegraph.com/query/96253/decrefi3/version/latest";

const API_URL2 =
  "https://api.studio.thegraph.com/query/96253/decrefi5/version/latest";

export const client = new GraphQLClient(API_URL, {
  headers: {
    "Content-Type": "application/json",
  },
});

export const client2 = new GraphQLClient(API_URL2, {
  headers: {
    "Content-Type": "application/json",
  },
});

export const fetchVaultContracts = async () => {
  const query = `
    query Subgraphs {
      vaultContractDeployeds(first: 5) {
        id
        vaultContractAddress
        blockNumber
        blockTimestamp
      }
    }
  `;

  const data = await client.request(query);
  return data.vaultContractDeployeds;
};

export const fetchLoanInitiateds = async () => {
  const query = `
    query Subgraphs {
      loanInitiateds(first: 5) {
        Loan_id
        blockNumber
        blockTimestamp
        borrower
        id
        fundPool
        transactionHash
        startDate
        principal
        originator
        maturityDate
        interestRate
      }
    }
  `;

  const data = await client2.request(query);
  return data.loanInitiateds;
};
