import EthereumProvider from "./provider";

declare global {
  interface Window {
    ethereum: EthereumProvider;
  }
}

export {};
