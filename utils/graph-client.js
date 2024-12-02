import { GraphQLClient } from "graphql-request";

const API_URL =
  "https://api.studio.thegraph.com/query/96253/decrefi3/version/latest";

export const client = new GraphQLClient(API_URL, {
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
