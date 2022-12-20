const requestAccounts = async () =>
  (window as any).ethereum.request({
    method: 'eth_requestAccounts',
  });

const requestKeys = async (address: string) =>
  (window as any).ethereum.request({
    method: 'eth_getEncryptionPublicKey',
    params: [address],
  });

export { requestAccounts, requestKeys };
