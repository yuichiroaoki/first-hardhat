/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
import { Contract } from "@ethersproject/contracts";
import { useEffect, useState } from "react";

/*
  ~ What it does? ~
  Loads your local contracts and gives options to read values from contracts
  or write transactions into them
  ~ How can I use? ~
  const readContracts = useContractLoader(localProvider) // or
  const writeContracts = useContractLoader(userProvider)
  ~ Features ~
  - localProvider enables reading values from contracts
  - userProvider enables writing transactions into contracts
  - Example of keeping track of "purpose" variable by loading contracts into readContracts
    and using ContractReader.js hook:
    const purpose = useContractReader(readContracts,"YourContract", "purpose")
  - Example of using setPurpose function from our contract and writing transactions by Transactor.js helper:
    tx( writeContracts.YourContract.setPurpose(newPurpose) )
*/


const loadContract = (
    contractName: any, 
    signer: any
    ) => {
  const newContract = new Contract(
    require(`../contracts/${contractName}.address.ts`),
    require(`../contracts/${contractName}.abi.ts`),
    signer,
  );
  // try {
  //   newContract.bytecode = require(`../contracts/${contractName}.bytecode.ts`);
  // } catch (e) {
  //   console.log(e);
  // }
  return newContract;
};

export default function useContractLoader(providerOrSigner: any) {
  const [contracts, setContracts] = useState();
  useEffect(() => {
    async function loadContracts() {
      if (typeof providerOrSigner !== "undefined") {
        try {
          // we need to check to see if this providerOrSigner has a signer or not
          let signer: any;
          let accounts;
          if (providerOrSigner && typeof providerOrSigner.listAccounts === "function") {
            accounts = await providerOrSigner.listAccounts();
          }

          if (accounts && accounts.length > 0) {
            signer = providerOrSigner.getSigner();
          } else {
            signer = providerOrSigner;
          }

          const contractList = require("../contracts/contracts.ts");

          const newContracts = contractList.reduce((accumulator: any, contractName: any) => {
            accumulator[contractName] = loadContract(contractName, signer);
            return accumulator;
          }, {});
          setContracts(newContracts);
        } catch (e) {
          console.log("ERROR LOADING CONTRACTS!!", e);
        }
      }
    }
    loadContracts();
  }, [providerOrSigner]);
  return contracts;
}