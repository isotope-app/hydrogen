import * as sigUtil from '@metamask/eth-sig-util';
import crypto from 'node:crypto';

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

const calculateMAC = (key: string, content: string) => {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv('aes-128-gcm', key, iv);
  let mac = cipher.update(content, 'utf-8', 'hex');
  mac += cipher.final('hex');
  const authTag = cipher.getAuthTag().toString('hex');
  return {
    iv: iv.toString('hex'),
    mac,
    authTag,
  };
};

const validateMAC = (
  key: string,
  content: string,
  iv: string,
  mac: string,
  authTag: string,
) => {
  const decipher = crypto.createDecipheriv('aes-128-gcm', key, iv);
  decipher.setAuthTag(Buffer.from(authTag, 'hex'));
  let decrypted = decipher.update(mac, 'hex', 'utf-8');
  decrypted += decipher.final('utf-8');
  return decrypted === content;
};

export {
  encryptData,
  decryptData,
  signMessage,
  checkSignature,
  calculateMAC,
  validateMAC,
};
