const requestAccounts = async () =>
  window.ethereum.request({
    method: 'eth_requestAccounts',
  });

const requestKeys = async (address: string) =>
  window.ethereum.request({
    method: 'eth_getEncryptionPublicKey',
    params: [address],
  });

export { requestAccounts, requestKeys };
