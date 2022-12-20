import * as sigUtil from '@metamask/eth-sig-util';

const encryptData = (publicKey: string, data: any) =>
  Buffer.from(
    JSON.stringify(
      sigUtil.encrypt({ publicKey, data, version: 'x25519-xsalsa20-poly1305' }),
    ),
  );

const decryptData = (windowEth: any, data: Buffer, address: string) =>
  windowEth.request({
    method: 'eth_decrypt',
    params: [data, address],
  });

const signMessage = async (message: string, account: string) => {
  const hash = await (window as any).ethereum.request({
    method: 'web3_sha3',
    params: [`0x${Buffer.from(message).toString('hex')}`],
  });

  const signature = await (window as any).ethereum.request({
    method: 'eth_sign',
    params: [hash, account],
  });

  const signedMessage = `\x19Ethereum Signed Message:\n${
    Buffer.from(message).length
  }${message}${signature}`;

  return { signedMessage, signature };
};

const checkSignature = async (
  signedMessage: string,
  signature: string,
  expectedKey: string,
) => {
  const recoveredKey = await (window as any).ethereum.request({
    method: 'eth_ecrecover',
    params: [signedMessage, signature],
  });
  return recoveredKey === expectedKey;
};

export { encryptData, decryptData, signMessage, checkSignature };
