import EthereumProvider from './provider.js';

declare global {
  interface Window {
    ethereum: EthereumProvider;
  }
}

export {};
