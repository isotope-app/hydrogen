declare global {
  interface Window {
    // rome-ignore lint/suspicious/noExplicitAny: no type for window.ethereum yet
    ethereum: any;
  }
}

export {};
