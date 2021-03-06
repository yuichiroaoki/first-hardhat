import { Contract } from "@ethersproject/contracts";
import { Web3Provider } from "@ethersproject/providers";
import { useState, useEffect } from "react";

/*
  when you want to load an existing contract using just the provider, address, and ABI
*/

/*
  ~ What it does? ~
  Enables you to load an existing mainnet DAI contract using the provider, address and abi
  ~ How can I use? ~
  const mainnetDAIContract = useContractLoader(mainnetProvider, DAI_ADDRESS, DAI_ABI)
  ~ Features ~
  - Specify mainnetProvider
  - Specify DAI_ADDRESS and DAI_ABI, you can load/write them using constants.js
*/
export default function useContractLoader(
  provider: Web3Provider,
  address: string,
  ABI: any,
) {
  const [contract, setContract] = useState<Contract>();
  useEffect(() => {
    async function loadContract() {
      try {
        // we need to check to see if this provider has a signer or not
        let signer;
        const accounts = await provider.listAccounts();
        if (accounts && accounts.length > 0) {
          signer = provider.getSigner();
        } else {
          signer = provider;
        }

        const customContract = new Contract(address, ABI, signer);
        // if(optionalBytecode) customContract.bytecode = optionalBytecode

        setContract(customContract);
      } catch (e) {
        console.log("ERROR LOADING EXTERNAL CONTRACT AT "+address+" (check provider, address, and ABI)!!", e);
      }
    }
    loadContract();
  }, [provider, address, ABI]);
  return contract;
}