import React, { createContext, useContext, ReactNode } from "react";
import { readContract, getWalletClient } from "@wagmi/core";
import contractStuff from "./abi.json";
import { config } from './config'

// Define the contract context type
interface ContractContextType {
  contractAbi: any[]; // Update with the actual type of your contractAbi
  contractAddress: any;
  contract: any | null; // Update with the actual type of your contract
}

// Create a context with default values
const ContractContext = createContext<ContractContextType>({
  contractAbi: [],
  contractAddress: "",
  contract: null,
});

// Custom hook to use the context
export const useContract = () => useContext(ContractContext);

// Context provider component
interface ContractProviderProps {
  children: ReactNode;
}

export const ContractProvider: React.FC<ContractProviderProps> = ({
  children,
}) => {
  const contractAbi = contractStuff;
  const contractAddress = "0xf685Ead4cdEB1dfdB6001FF723bFc1Bb254A5402";
  const walletClient = getWalletClient(config);

  // Create the contract instance
  const contract = readContract(config, {
    address: contractAddress,
    abi: contractAbi,
    functionName: ""
  });

  // Create the context value
  const contextValue: ContractContextType = {
    contractAbi,
    contractAddress,
    contract,
  };

  return (
    <ContractContext.Provider value={contextValue}>
      {children}
    </ContractContext.Provider>
  );
};
